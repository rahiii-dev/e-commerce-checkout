import { useNavigate } from "react-router-dom";
import Text from "../atoms/Text";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <Text size="4xl" as="h1" variant="primary" className="font-bold cursor-pointer leading-tight" onClick={() => navigate("/")}>
      Store
    </Text>
  );
};

export default Logo;