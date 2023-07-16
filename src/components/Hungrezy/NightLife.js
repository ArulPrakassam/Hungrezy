import { useEffect, useState } from "react";
import FilterContainer from "./FilterContainer";
import { useGlobalContext } from "../../context";
import hungrezy from "../../data/hungrezy.json";
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import ItemsContainer from "./ItemsContainer";

const NightLife = ({ location, nightlife }) => {
  const { windowSize } = useGlobalContext();

  useEffect(() => {
    document.title = `Nightlife Restaurants in ${
      location.charAt(0).toUpperCase() + location.slice(1)
    } - Hungrezy`;
  }, [location]);
  return (
    <>
      <section className="main-section">
        <NightlifeCollections windowSize={windowSize} location={location} />
        {/* filter section for desktop*/}
        {windowSize <= 768 ? "" : <FilterContainer />}
        <NightlifeHotels location={location} nightlife={nightlife} />
      </section>
    </>
  );
};

const NightlifeCollections = ({ windowSize, location }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <div className="collections-intro">
        <h2>Collections</h2>
        <div className="collections-description">
          <p>
            Explore curated lists of top restaurants, cafes, pubs, and bars in{" "}
            {location.charAt(0).toUpperCase() + location.slice(1)}, based on
            trends
          </p>
          {windowSize <= 768 ? (
            ""
          ) : (
            <Link to={`/${location.toLowerCase()}/collections`} target="_blank">
              All collections in{" "}
              {location.charAt(0).toUpperCase() + location.slice(1)}
              <span>
                <AiFillCaretRight />
              </span>
            </Link>
          )}
        </div>
      </div>
      <div className="scroll-btns-holder">
        <div className="collections-slider">
          <div className="collections-slider-container">
            {hungrezy.Nightlife.collections.map((collectionItem) => {
              const { img, title, count, id } = collectionItem;
              return (
                <Link
                  to={`/${location.toLowerCase()}/collections/${title.replaceAll(
                    " ",
                    "-"
                  )}`}
                  className="collection-item-one slider-item-one"
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
      </div>
      {windowSize <= 768 && (
        <div className="collections-description see-all-collections">
          <Link to={`/${location.toLowerCase()}/collections`} target="_blank">
            All collections in{" "}
            {location.charAt(0).toUpperCase() + location.slice(1)}
            <span>
              <AiFillCaretRight />
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

const NightlifeHotels = ({ location, nightlife, service }) => {
  return (
    <>
      <div className="main-section-heading">
        <h1>
          Nightlife Restaurants near me in{" "}
          {location.charAt(0).toUpperCase() + location.slice(1)}
        </h1>
      </div>
      <div className="items-container">
        {nightlife.map((item) => {
          return (
            <ItemsContainer
              location={location}
              {...item}
              key={item.title.replaceAll(" ", "-")}
              url="info"
            />
          );
        })}
      </div>
    </>
  );
};
export default NightLife;
