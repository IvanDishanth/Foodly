import logo from "../assets/Images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-5 py-1 bg-black text-[#FAB503] fixed top-0 left-0 right-0 z-50">
            <Link to="/">
                <img src={logo} alt="Foodly Logo" className="h-8" />
            </Link>
            <div className="space-x-6 text-sm">
               
                <Link to="/login" className="hover:underline">log in</Link>
            </div>
        </nav>
    );
};

export default Navbar;