import { ReactComponent as LogoDark } from "../assets/admin/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link style={{ textDecoration:"none" }} to="/admin">
        <div>MCW</div>
    </Link>
  );
};

export default Logo;
