import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { useGlobalContext } from "../../context";
const Overview = ({ hotelName, veg, cuisines, price }) => {
  const { location } = useParams();
  const { refHotelHeader } = useGlobalContext();
  const scrollState = useLocation();

  const moreInfoList = [
    "Breakfast",
    "Home Delivery",
    "Takeaway available",
    "Wifi",
  ];
  //when we get true state then the hotel header is moved to up while clicking the link
  //when initial loading the URL it will not work
  useEffect(() => {
    if (scrollState.state) {
      window.scrollTo({
        top: refHotelHeader.current.offsetTop,
        behavior: "auto",
      });
    }
  }, [scrollState.state]);
  useEffect(() => {
    document.title = `${hotelName} in ${
      location.charAt(0).toUpperCase() + location.slice(1)
    } - Hungrezy`;
  }, []);
  return (
    <section className="overview-section">
      <h2>About this place</h2>
      <h3>Cuisines</h3>
      <ul className="cuisines-list">
        {cuisines.split(",").map((cuisine, index) => {
          return (
            <li className="cuisine-one" key={index}>
              {cuisine}
            </li>
          );
        })}
      </ul>
      <h3>People Say This Place is Known For</h3>
      <p>
        Courteous Staff, Breakfast, Good Service, Quantity, Good Food, Ambiance
      </p>
      <h3>Average Cost</h3>
      <p>&#8377;{price} people (approx.)</p>
      <h3>More Info</h3>
      <ul className="more-info-list">
        {moreInfoList.map((item, index) => {
          return (
            <li key={index}>
              <span>
                <TiTick />
              </span>
              {item}
            </li>
          );
        })}

        {veg ? (
          <li>
            <span>
              <TiTick />
            </span>
            Vegetarion Only
          </li>
        ) : (
          <li>
            <span>
              <TiTick />
            </span>
            Both Veg and Non-Veg
          </li>
        )}
      </ul>
    </section>
  );
};
export default Overview;
