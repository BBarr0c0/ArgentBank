import "./navbar.scss";
import Logo from "../../assets/argentBankLogo.png";
import {Link} from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="nav">
      <Link to="/">
        <img src={Logo} alt="Argent Bank - logo" />
      </Link>
      <ul>
        <li>Sign in</li>
      </ul>
    </nav>
  );
};

export default Navbar;
