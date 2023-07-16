import InputContainer from "../Hungrezy/InputContainer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiUser } from "react-icons/hi";
import MobileLocationSearch from "../Hungrezy/MobileLocationSearch";
import MobileHotelSearch from "../Hungrezy/MobileHotelSearch";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";
const Navbar = () => {
  const { windowSize } = useGlobalContext();
  const [showNav, setShowNav] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const { location } = useParams();
  useEffect(() => {
    const scrolling = () => {
      //going down shows navbar and location search bar

      if (window.scrollY > prevScrollY) {
        setShowNav(false);
      } else {
        //going up shows hotel search bar
        setShowNav(true);
      }
      setPrevScrollY(window.scrollY);
    };

    window.addEventListener("scroll", scrolling);
    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, [prevScrollY]);

  return windowSize <= 768 ? (
    showNav ? (
      <nav className="mobile-navbar">
        <div className="hungrezy mobile-nav">
          <Link to="/" style={{ color: "black" }}>
            <h1 title="logo">Hungrezy</h1>
          </Link>
          <span className="mobile-nav-login-icon" title="login-user">
            <HiUser />
          </span>
        </div>
        {<MobileLocationSearch location={location} />}
      </nav>
    ) : (
      <nav className="mobile-navbar">
        <MobileHotelSearch />
      </nav>
    )
  ) : (
    <DesktopNav location={location} />
  );
};

export default Navbar;

const DesktopNav = ({ location }) => {
  return (
    <nav className="hungrezy desktop-nav">
      <div className="hungrezy desktop-nav-content">
        <Link to="/" style={{ color: "black" }}>
          <h1 title="logo">Hungrezy</h1>
        </Link>
        <InputContainer location={location} />
        <ul>
          <li>Log in</li>
          <li>Sign up</li>
        </ul>
      </div>
    </nav>
  );
};
export { DesktopNav };
