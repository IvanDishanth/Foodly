import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiHome, FiDollarSign, FiCalendar, FiSettings, FiMenu, FiSearch, FiBell, FiUser } from 'react-icons/fi';

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for all data
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  // Stats data
  const [stats, setStats] = useState([
    { title: 'Total Users', value: '0', change: '+0%', trend: 'up' },
    { title: 'Total Restaurants', value: '0', change: '+0%', trend: 'up' },
    { title: 'Active Bookings', value: '0', change: '+0%', trend: 'up' },
    { title: 'Total Revenue', value: '$0', change: '+0%', trend: 'up' }
  ]);

     const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    cuisine: '',
    status: 'pending'
  });

  // ...existing code...

  // Add these handlers
  const handleRestaurantInput = (e) => {
    const { name, value } = e.target;
    setNewRestaurant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    if (
      !newRestaurant.name ||
      !newRestaurant.email ||
      !newRestaurant.password ||
      !newRestaurant.address ||
      !newRestaurant.phone ||
      !newRestaurant.cuisine
    ) {
      setError("Please fill all required fields.");
      return;
    }
    try {
      await createNewRestaurant(newRestaurant);
      setShowAddRestaurant(false);
      setNewRestaurant({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        cuisine: '',
        status: 'pending'
      });
    } catch (err) {
      setError("Failed to create restaurant. Please check your input.");
    }
  };


  // Get auth token and config
  const getConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const config = getConfig();

      const usersRes = await axios.get('http://localhost:5000/api/admin/users', config);
      const restaurantsRes = await axios.get('http://localhost:5000/api/admin/restaurants', config);
      const bookingsRes = await axios.get('http://localhost:5000/api/admin/bookings', config);
      const paymentsRes = await axios.get('http://localhost:5000/api/admin/payments', config);

      setUsers(usersRes.data);
      setRestaurants(restaurantsRes.data);
      setBookings(bookingsRes.data);
      setPayments(paymentsRes.data);

      setStats([
        { title: 'Total Users', value: usersRes.data.length.toString(), change: '+12%', trend: 'up' },
        { title: 'Total Restaurants', value: restaurantsRes.data.length.toString(), change: '+5%', trend: 'up' },
        { title: 'Active Bookings', value: bookingsRes.data.filter(b => b.status === 'confirmed').length.toString(), change: '-3%', trend: 'down' },
        { 
          title: 'Total Revenue', 
          value: `$${paymentsRes.data.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}`, 
          change: '+18%', 
          trend: 'up' 
        }
      ]);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle user status
  const toggleUserStatus = async (id) => {
    try {
      const user = users.find(u => u._id === id);
      const newStatus = user.status === 'active' ? 'suspended' : 'active';
      
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { status: newStatus },
        getConfig()
      );
      
      setUsers(users.map(u => 
        u._id === id ? { ...u, status: newStatus } : u
      ));
    } catch (err) {
      setError('Failed to update user status');
    }
  };

  // Update restaurant status
  const updateRestaurantStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/restaurants/${id}`,
        { status },
        getConfig()
      );
      setRestaurants(restaurants.map(r => 
        r._id === id ? { ...r, status } : r
      ));
    } catch (err) {
      setError('Failed to update restaurant status');
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/bookings/${id}/status`,
        { status },
        getConfig()
      );
      setBookings(bookings.map(b => 
        b._id === id ? { ...b, status } : b
      ));
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  // Delete item
  const deleteItem = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      let endpoint = '';
      switch (type) {
        case 'user':
          endpoint = `http://localhost:5000/api/admin/users/${id}`;
          break;
        case 'restaurant':
          endpoint = `http://localhost:5000/api/admin/restaurants/${id}`;
          break;
        case 'booking':
          endpoint = `http://localhost:5000/api/admin/bookings/${id}`;
          break;
        case 'payment':
          endpoint = `http://localhost:5000/api/admin/payments/${id}`;
          break;
        default:
          return;
      }

      await axios.delete(endpoint, getConfig());
      
      switch (type) {
        case 'user':
          setUsers(users.filter(u => u._id !== id));
          break;
        case 'restaurant':
          setRestaurants(restaurants.filter(r => r._id !== id));
          break;
        case 'booking':
          setBookings(bookings.filter(b => b._id !== id));
          break;
        case 'payment':
          setPayments(payments.filter(p => p._id !== id));
          break;
      }
    } catch (err) {
      setError(`Failed to delete ${type}`);
    }
  };

  // Create new restaurant
  const createNewRestaurant = async (restaurantData) => {
    try {
      const payload = {
        ...restaurantData,
        password: restaurantData.password || "changeme123" // Always send password!
      };
      const response = await axios.post(
        'http://localhost:5000/api/admin/restaurants',
        payload,
        getConfig()
      );
      setRestaurants([...restaurants, response.data.restaurant]);
      return response.data;
    } catch (err) {
      setError('Failed to create restaurant');
      console.error('Error creating restaurant:', err);
      throw err;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
          <button 
            onClick={fetchData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[...bookings.slice(0, 5), ...payments.slice(0, 5)]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.amount ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {item.amount ? <FiDollarSign size={18} /> : <FiCalendar size={18} />}
                      </div>
                      <div className="ml-4 flex-grow">
                        <p className="font-medium">
                          {item.amount 
                            ? `Payment from ${item.restaurant?.name || 'Restaurant'}` 
                            : `Booking at ${item.restaurantId?.name || 'Restaurant'}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.date || item.createdAt).toLocaleDateString()} • 
                          {item.amount ? ` $${item.amount.toFixed(2)}` : ` ${item.guests} guests`}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'completed' || item.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleUserStatus(user._id)}
                          className={`mr-2 ${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        >
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                          onClick={() => deleteItem('user', user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'restaurants':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {restaurants.map(restaurant => (
                    <tr key={restaurant._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiHome className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                            <div className="text-sm text-gray-500">{restaurant.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {restaurant.admin?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          restaurant.status === 'verified' ? 'bg-green-100 text-green-800' :
                          restaurant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {restaurant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {restaurant.address || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {restaurant.status !== 'verified' && (
                            <button
                              onClick={() => updateRestaurantStatus(restaurant._id, 'verified')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                          )}
                          {restaurant.status !== 'rejected' && (
                            <button
                              onClick={() => updateRestaurantStatus(restaurant._id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => deleteItem('restaurant', restaurant._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map(booking => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{booking._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.userId?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.restaurantId?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${booking.amount?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Accept
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map(payment => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{payment._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.restaurant?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => deleteItem('payment', payment._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-6">System Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Commission Rate</h4>
                <div className="flex items-center">
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2">%</span>
                  <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Update
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Payment Schedule</h4>
                <div className="flex items-center space-x-4">
                  <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Update
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">System Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="ml-2">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="ml-2">SMS notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2">Push notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };












  
   


















  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#FAB503] text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-indigo-700"
          >
            <FiMenu size={20} />
          </button>
        </div>
        <nav className="mt-6">
          <NavItem 
            icon={<FiHome size={20} />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            sidebarOpen={sidebarOpen}
          />
          <NavItem 
            icon={<FiUsers size={20} />} 
            text="Users" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
            sidebarOpen={sidebarOpen}
          />
          <NavItem 
            icon={<FiHome size={20} />} 
            text="Restaurants" 
            active={activeTab === 'restaurants'} 
            onClick={() => setActiveTab('restaurants')}
            sidebarOpen={sidebarOpen}
          />
          <NavItem 
            icon={<FiCalendar size={20} />} 
            text="Bookings" 
            active={activeTab === 'bookings'} 
            onClick={() => setActiveTab('bookings')}
            sidebarOpen={sidebarOpen}
          />
          <NavItem 
            icon={<FiDollarSign size={20} />} 
            text="Payments" 
            active={activeTab === 'payments'} 
            onClick={() => setActiveTab('payments')}
            sidebarOpen={sidebarOpen}
          />
          <NavItem 
            icon={<FiSettings size={20} />} 
            text="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            sidebarOpen={sidebarOpen}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="text-gray-600" />
                </div>
                {sidebarOpen && <span className="ml-2 font-medium">Admin</span>}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {/* <main className="p-6">
          {activeTab !== 'dashboard' && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2>
              {activeTab === 'restaurants' && (
                <button 
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  onClick={() => {
                    // Here you would typically open a modal to create a new restaurant
                    const newRestaurant = {
                      name: "New Restaurant",
                      email: "new@restaurant.com",
                      password: "changeme123", // <-- REQUIRED for backend!
                      address: "123 Main St",
                      phone: "123-456-7890",
                      cuisine: "International",
                      status: "pending"
                    };
                    createNewRestaurant(newRestaurant);
                  }}
                >
                  <span>Add New Restaurant</span>
                </button>
              )}
            </div>
          )}
          {renderContent()}
        </main> */}




  // ...existing code...


    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      {/* ...existing sidebar code... */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        {/* ...existing header code... */}

        {/* Content Area */}
        <main className="p-6">
          {activeTab !== 'dashboard' && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2>
              {activeTab === 'restaurants' && (
                <button 
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  onClick={() => setShowAddRestaurant(true)}
                >
                  <span>Add New Restaurant</span>
                </button>
              )}
            </div>
          )}
          {renderContent()}
        </main>
        {/* Add this modal just before closing Main Content */}
        {showAddRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddRestaurant(false)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Add New Restaurant</h3>
              <form onSubmit={handleAddRestaurant} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newRestaurant.name}
                  onChange={handleRestaurantInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newRestaurant.email}
                  onChange={handleRestaurantInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newRestaurant.password}
                  onChange={handleRestaurantInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={newRestaurant.address}
                  onChange={handleRestaurantInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={newRestaurant.phone}
                  onChange={handleRestaurantInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="cuisine"
                  placeholder="Cuisine"
                  value={newRestaurant.cuisine}
                  onChange={handleRestaurantInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add Restaurant
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>


// ...existing NavItem and export...










      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, sidebarOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-4 ${active ? 'bg-black' : 'hover:bg-indigo-700'} transition-colors duration-200`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      {sidebarOpen && <span className="ml-3">{text}</span>}
    </button>
  );
};

export default SuperAdminDashboard;