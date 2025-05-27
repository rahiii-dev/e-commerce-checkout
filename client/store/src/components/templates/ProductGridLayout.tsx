
const ProductGridLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {children}
        </div>
    );
}

export default ProductGridLayout;
