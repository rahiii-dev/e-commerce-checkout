import { Outlet } from "react-router-dom";
import Logo from "../molecules/Logo";

const LogoPageLayout = () => {
    return (
        <>
            <header>
                <nav className="container p-4">
                    <Logo />
                </nav>
            </header>
            <main className="min-h-screen">
                <Outlet/>
            </main>
        </>
    );
};


export default LogoPageLayout;
