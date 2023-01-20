import { Outlet } from "react-router-dom";
import Navbar from "./Nav";
import Footer from "./Footer";

const Layouts = () => {
    return (
        <div className="container">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layouts;
