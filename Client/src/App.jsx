import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gateway from "./pages/Gateway.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/Login.jsx";
import Service from "./pages/Service.jsx";
import Video from "./pages/Video.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import Uprofile from "./pages/User/Userprofile.jsx";
import UNavpar from "./pages/User/UNavpar.jsx";
import Footer from "./components/Footer.jsx";
import RDashboard from "./pages/Restaurant/RestaurantDashboard.jsx";
import RestaurantDetails from "./pages/User/RestaurantDetails.jsx"; 





function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Gateway" element={<Gateway />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/Uprofile" element={<Uprofile />} />
        <Route path="/UNavpar" element={<UNavpar />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/restaurantDashboard" element={<RDashboard />} />
         <Route path="/restaurant" element={<RestaurantDetails />} />
      </Routes>
    </>
  );
}

export default App;
