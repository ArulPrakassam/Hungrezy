import serviceSelectionItems from "../../data/serviceSelectionItems.json";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ServiceSelector = ({ location, service }) => {
  const { windowSize } = useGlobalContext();

  const [selected, setSelected] = useState(1);

  // for service selection mobile version
  const [showNav, setShowNav] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

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

  useEffect(() => {
    const serviceSelection = () => {
      if (service) {
        switch (service) {
          case "delivery":
            setSelected(1);
            break;
          case "dine-out":
            setSelected(2);
            break;
          case "nightlife":
            setSelected(3);
            break;
          default:
            setSelected(1);
            break;
        }
      }
    };

    serviceSelection();
  }, [service]);
  return (
    <header className="hungrezy-header">
      {/* service selection */}
      {windowSize <= 768 ? (
        showNav && (
          <div className="service-selection-mobile">
            {serviceSelectionItems.map((item) => {
              return (
                <ServiceSelectionMobile
                  {...item}
                  key={item.id}
                  location={location}
                  selected={selected}
                />
              );
            })}
          </div>
        )
      ) : (
        <div className="service-selection">
          {serviceSelectionItems.map((item) => {
            return (
              <ServiceSelectionDesktop
                key={item.id}
                {...item}
                location={location}
                selected={selected}
              />
            );
          })}
        </div>
      )}
    </header>
  );
};

const ServiceSelectionMobile = ({
  title,
  img,
  id,
  url,
  location,
  selected,
}) => {
  return (
    <Link
      to={`/${location}/${url}`}
      className="service-selection-item-mobile"
      data-label={title}
      key={id}
    >
      {selected === id && <div className="underline"></div>}
      <div className="service-selection-content-mobile">
        <img
          src={img}
          alt={title}
          style={{
            filter: selected === id ? "" : "grayscale(90%)",
          }}
        />
        <h2
          style={{
            color: selected === id ? "rgb(238, 118, 118)" : "black",
          }}
        >
          {title}
        </h2>
      </div>
    </Link>
  );
};
const ServiceSelectionDesktop = ({
  title,
  img,
  id,
  color,
  url,
  location,
  selected,
}) => {
  return (
    <Link
      to={`/${location}/${url}`}
      className="service-selection-item"
      key={id}
    >
      <div className="service-selection-content">
        <div
          className="service-selection-img"
          style={{
            backgroundColor: selected === id ? `${color}` : "aliceblue",
          }}
        >
          <img
            src={img}
            alt={title}
            style={{
              filter: selected === id ? "" : "grayscale(90%)",
            }}
          />
        </div>

        <h2
          style={{
            color: selected === id ? "rgb(238, 118, 118)" : "black",
          }}
        >
          {title}
        </h2>
      </div>
      {selected === id && <div className="underline"></div>}
    </Link>
  );
};

export default ServiceSelector;
