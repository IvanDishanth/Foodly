import React, { useState } from 'react';
import UNavpar from './UNavpar.jsx';
import bg from '../../assets/Images/bguser.jpg';
import Footer from '../../components/Footer.jsx';
import { Link } from 'react-router-dom';

const foodTags = ['Briyani', 'Kottu', 'Rice', 'Noodles', 'Dhosa', 'Hoppers', 'Rotti'];

const restaurantData = {
  Briyani: [
    { title: 'Briyani House', image: '/images/briyani1.jpg' },
    { title: 'Spicy Briyani Hub', image: '/images/briyani2.jpg' },
    { title: 'Briyani House', image: '/images/briyani1.jpg' },
    { title: 'Spicy Briyani Hub', image: '/images/briyani2.jpg' },
    { title: 'Briyani House', image: '/images/briyani1.jpg' },
    { title: 'Spicy Briyani Hub', image: '/images/briyani2.jpg' },
    { title: 'Briyani House', image: '/images/briyani1.jpg' },
    { title: 'Spicy Briyani Hub', image: '/images/briyani2.jpg' },
    { title: 'Briyani House', image: '/images/briyani1.jpg' },
    { title: 'Spicy Briyani Hub', image: '/images/briyani2.jpg' },
    { title: 'Briyani House', image: '/images/briyani1.jpg' },
    { title: 'Spicy Briyani Hub', image: '/images/briyani2.jpg' },
    { title: 'Briyani House', image: '/images/briyani1.jpg' },
    { title: 'Spicy Briyani Hub', image: '/images/briyani2.jpg' },
  ],
  Kottu: [
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Kottu King', image: '/images/kottu1.jpg' },
    { title: 'Night Kottu Club', image: '/images/kottu2.jpg' },
  ],
  Rice: [
    { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
      { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
      { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
      { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
      { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
      { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
      { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
      { title: 'Rice & Curry Spot', image: '/images/rice1.jpg' },
    { title: 'Home Rice Cafe', image: '/images/rice2.jpg' },
  ],
  Noodles: [
    { title: 'Noodle Factory', image: '/images/noodles1.jpg' },
    { title: 'Spicy Noodle Town', image: '/images/noodles2.jpg' },
     { title: 'Noodle Factory', image: '/images/noodles1.jpg' },
    { title: 'Spicy Noodle Town', image: '/images/noodles2.jpg' },
     { title: 'Noodle Factory', image: '/images/noodles1.jpg' },
    { title: 'Spicy Noodle Town', image: '/images/noodles2.jpg' },
     { title: 'Noodle Factory', image: '/images/noodles1.jpg' },
    { title: 'Spicy Noodle Town', image: '/images/noodles2.jpg' },
     { title: 'Noodle Factory', image: '/images/noodles1.jpg' },
    { title: 'Spicy Noodle Town', image: '/images/noodles2.jpg' },
  ],
  Dhosa: [
    { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
        { title: 'South Dhosa Delight', image: '/images/dhosa1.jpg' },
    { title: 'Dhosa Corner', image: '/images/dhosa2.jpg' },
  ],
  Hoppers: [
    { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
     { title: 'Hopper Street', image: '/images/hoppers1.jpg' },
    { title: 'Golden Hopper Hut', image: '/images/hoppers2.jpg' },
  ],
  Rotti: [
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
    { title: 'Rotti Circle', image: '/images/rotti1.jpg' },
    { title: 'Ceylon Rotti Stop', image: '/images/rotti2.jpg' },
  ],
};

function UserDashboard() {
  const [selectedFood, setSelectedFood] = useState('Briyani');

  return (
    <>
    <div className="flex flex-wrap gap-3 px-6 py-3 items-center justify-center fixed top-[124px] left-0 right-0 bg-black z-10">
      {foodTags.map((tag, idx) => (
        <button
          key={idx}
          onClick={() => setSelectedFood(tag)}
          className={`px-4 py-2 border-black hover:border-[#FAB503] rounded-[10px] font-medium ${
            selectedFood === tag
              ? 'bg-[#FAB503] text-black'
              : 'hover:bg-[#FAB503] hover:text-black bg-gray-700 text-[#FAB503]'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>

    <nav className="flex justify-start items-center justify-center gap-10 px-6 py-0 text-[#FAB503] font-semibold fixed top-[98px] left-0 right-0 bg-black z-10">
      <Link to="#" className="border-b-2 border-black hover:border-[#FAB503]">Foods</Link>
      <Link to="#" className="border-b-2 border-black hover:border-[#FAB503]">Plays</Link>
    </nav>
    
       
      <UNavpar
        selectedFood={selectedFood}
        setSelectedFood={setSelectedFood}
        foodTags={foodTags}
      />

      <div className="flex flex-wrap bg-black mt-[180px] gap-6 px-6 py-4 items-center justify-center">
        {restaurantData[selectedFood]?.map((card, idx) => (
          <div key={idx} className="bg-gray-900 rounded-2xl overflow-hidden shadow-md w-72">
            <img src={card.image} alt={card.title} className="w-full h-44 object-cover" />
            <div className="p-4 text-center font-medium">{card.title}</div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;