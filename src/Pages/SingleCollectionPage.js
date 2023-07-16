import { useParams, Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { HiUser } from "react-icons/hi";
import { DesktopNav } from "../components/SharedLayout/Navbar";
import Footer from "../components/SharedLayout/Footer";
import hungrezy from "../data/hungrezy.json";
import ItemsContainer from "../components/Hungrezy/ItemsContainer";
import ExploreSection from "../components/SharedLayout/ExploreSection";
import ScrollToTop from "../components/SharedLayout/ScrollToTop";
const SingleCollectionPage = () => {
  const { collection, location } = useParams();
  const { windowSize } = useGlobalContext();
  const navigate = useNavigate();
  //getting the total collections
  const totalCollections = hungrezy.collections;

  //finding the particular hotel details
  const collectionDetails = totalCollections.find(
    (collectionItem) => collectionItem.title.replaceAll(" ", "-") === collection
  );

  useEffect(() => {
    if (!collectionDetails) {
      navigate("/error", {
        state: `Sorry! we are not able to find the place ${collection.replaceAll(
          "-",
          " "
        )}`,
      });
    } else {
      document.title = `${collectionDetails.title} in ${
        location.charAt(0).toUpperCase() + location.slice(1)
      }`;
    }
  }, []);
  if (!collectionDetails) {
    return;
  }
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
      <SingleCollection {...collectionDetails} location={location} />
      <ExploreSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};
const SingleCollection = ({ img, title, location }) => {
  return (
    <div className="single-collection-page">
      <header className="single-collection-page-header">
        <div className="collection-banner">
          <img src={img} alt={title} />
          <div className="overlay-text">
            <h2>{title}</h2>
          </div>
        </div>
      </header>
      <div className="items-container">
        {hungrezy.collectionPage.map((item) => {
          return (
            <ItemsContainer
              {...item}
              key={item.title.replaceAll(" ", "-")}
              location={location}
              url="info"
            />
          );
        })}
      </div>
    </div>
  );
};
export default SingleCollectionPage;
