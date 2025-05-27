import { Outlet } from 'react-router-dom';
import Footer from '../molecules/Footer';
import Navbar from '../molecules/Navbar';

const AppLayout = () => {
    return (
        <div>
            <header className="bg-surface text-white p-4">
                <Navbar />
            </header>
            <main className="p-4 container mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
