import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import hungrezy from "../data/hungrezy.json";
import { AiFillCaretRight } from "react-icons/ai";
import { useGlobalContext } from "../context";
import { DesktopNav } from "../components/SharedLayout/Navbar";
import Footer from "../components/SharedLayout/Footer";
import ExploreSection from "../components/SharedLayout/ExploreSection";
import "../styles/collectionpage.css";
const CollectionPage = () => {
  const { location } = useParams();

  const { windowSize } = useGlobalContext();
  useEffect(() => {
    document.title = `Hungrezy Collections | ${
      location.charAt(0).toUpperCase() + location.slice(1)
    }`;
  }, []);
  return (
    <main>
      {windowSize <= 768 ? (
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
        <DesktopNav location={location} />
      )}
      <TotalCollections location={location} />
      <ExploreSection />
      <Footer />
    </main>
  );
};

const TotalCollections = ({ location }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <section className="collections collections-page">
      <div>
        <div className="collections-intro collections-page">
          <h2>
            Collections - {location.charAt(0).toUpperCase() + location.slice(1)}
          </h2>
        </div>
        <div className="collections-container">
          {hungrezy.collections.map((collectionItem) => {
            const { img, title, count, id } = collectionItem;
            return (
              <Link
                to={`/${location.toLowerCase()}/collections/${title.replaceAll(
                  " ",
                  "-"
                )}`}
                className="collection-item-one"
                key={id}
              >
                <div className="collection-img">
                  {imageLoaded ? "" : <div className="image-loading"></div>}
                  <img
                    src={img}
                    alt={title}
                    style={imageLoaded ? {} : { display: "none" }}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                <div className="collection-details">
                  <h3>{title}</h3>
                  <p>
                    {count}
                    <span>
                      <AiFillCaretRight />
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default CollectionPage;
