const Footer = () => {
    return (
        <footer className="bg-surface text-white px-6 py-4 text-center text-sm md:text-base">
            <p>
                &copy; {new Date().getFullYear()} <span className="font-semibold text-accent">Store App</span>. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
