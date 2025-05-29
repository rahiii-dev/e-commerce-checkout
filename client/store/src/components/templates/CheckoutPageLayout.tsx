import Logo from "../molecules/Logo";

const CheckoutPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header>
                <nav className="container p-4">
                    <Logo />
                </nav>
            </header>
            <main className="min-h-screen">{children}</main>
        </>
    );
};


export default CheckoutPageLayout;
