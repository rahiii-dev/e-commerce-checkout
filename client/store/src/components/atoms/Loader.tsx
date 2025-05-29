import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface LoaderProps {
    size?: number;
    className?: string;
}

const Loader = ({ size = 24, className}: LoaderProps) => {
    return (
        <div className={twMerge("flex items-center justify-center", className)}>
            <Loader2 className="animate-spin text-surface" size={size} />
        </div>
    );
};

export default Loader;