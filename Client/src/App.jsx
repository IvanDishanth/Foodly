import React from "react";
import UserZone from "./pages/UserZone.jsx";
import Navbar from "./components/Navbar.jsx";
import FoodyHero from "./pages/FoodyHero.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <>
    {/* <Navbar /> */}
    <FoodyHero />
    <About />
    <UserZone />
    </>
  );
}

export default App;