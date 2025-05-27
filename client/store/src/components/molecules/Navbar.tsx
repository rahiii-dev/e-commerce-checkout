import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { ShoppingBag, User } from "lucide-react";

const Navbar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navLinkBaseClasses = "hover:underline hover:text-accent transition-colors duration-300 ease-in-out";
    const iconLinkBaseClasses = "transition-transform duration-300";
    const getNavLinkClasses = (path: string) => clsx(isActive(path) && "underline text-accent", navLinkBaseClasses);
    const getIconLinkClasses = (path: string) => clsx(iconLinkBaseClasses, isActive(path) ? "text-accent scale-110" : "hover:scale-110");

    return (
        <nav className="p-4">
            <div className="flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li><Link to="/" className={getNavLinkClasses("/")}>Home</Link></li>
                    <li><Link to="/products" className={getNavLinkClasses("/products")}>Products</Link></li>
                </ul>

                <Logo />

                <ul className="flex space-x-4">
                    <li>
                        <Link to="/profile">
                            <User className={getIconLinkClasses("/profile")} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <ShoppingBag className={getIconLinkClasses("/cart")} />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
