import { useEffect } from "react";
import FilterContainer from "./FilterContainer";
import { useGlobalContext } from "../../context";
import ItemsContainer from "./ItemsContainer";

const Delivery = ({ location, hotels }) => {
  const { windowSize } = useGlobalContext();

  useEffect(() => {
    document.title = `Delivery Restaurants in ${
      location.charAt(0).toUpperCase() + location.slice(1)
    } - Hungrezy`;
  }, [location]);

  return (
    <section className="main-section">
      {/* filter section for desktop*/}
      {windowSize <= 768 ? "" : <FilterContainer />}
      <div className="main-section-heading">
        <h1>
          Delivery Restaurants in{" "}
          {location.charAt(0).toUpperCase() + location.slice(1)}
        </h1>
      </div>
      <div className="items-container">
        {hotels.map((item) => {
          return (
            <ItemsContainer
              key={item.title.replaceAll(" ", "-")}
              {...item}
              location={location}
              imageOverlay={
                <div className="image-overlay">
                  <p className="offer">50% OFF up to 100</p>
                </div>
              }
              url="order"
            />
          );
        })}
      </div>
    </section>
  );
};

export default Delivery;
