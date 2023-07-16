import { MdOutlineAppShortcut } from "react-icons/md";
import { HiUser } from "react-icons/hi";

const Navbar = ({ windowSize }) => {
  return (
    <nav>
      <div className="short-text-container">
        <span className="mini-mobile-icon" title="download app">
          <MdOutlineAppShortcut />
        </span>
        <span className="short-text">Get the App</span>
      </div>
      <ul className="nav-links">
        {windowSize <= 768 ? (
          <li className="nav-link login-icon">
            <HiUser />
          </li>
        ) : (
          <>
            <li className="nav-link">Investor Relations</li>
            <li className="nav-link">Add restaurant</li>
            <li className="nav-link">Log in</li>
            <li className="nav-link">Sign up</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
