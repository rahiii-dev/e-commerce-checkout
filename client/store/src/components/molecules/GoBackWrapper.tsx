import { ArrowLeft } from "lucide-react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const GoBackWrapper = ({children}: {children: React.ReactNode}) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center mb-4">
            <Button onClick={() => navigate(-1)} variant="icon" className="cursor-pointer bg-transparent">
                <ArrowLeft />
            </Button>
            <div>
               {children}
            </div>
        </div>
    );
}

export default GoBackWrapper;
