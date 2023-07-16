import { useEffect } from "react";
import { DesktopNav } from "../components/SharedLayout/Navbar";
import Footer from "../components/SharedLayout/Footer";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";
import { HiUser } from "react-icons/hi";
const Error = () => {
  useEffect(() => {
    document.title = "404 - Hungrezy";
  }, []);
  const { windowSize } = useGlobalContext();
  const location = useLocation();
  return (
    <main>
      {windowSize <= 765 ? (
        <nav className="mobile-navbar">
          <div className="hungrezy mobile-nav">
            <Link to="/" style={{ color: "black" }}>
              <h1 title="logo">Hungrezy</h1>
            </Link>
            <span className="mobile-nav-login-icon" title="login-user">
              <HiUser />
            </span>
          </div>
        </nav>
      ) : (
        <DesktopNav />
      )}
      <section className="error-section">
        <img
          src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689354661/Hungrezy/error-404.png"
          alt="error 404"
        />
        {<p>{location.state}</p>}
        <div className="back-to-home">
          <Link to="/">
            <button className="back-to-home-btn">Back to Home</button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};
export default Error;
