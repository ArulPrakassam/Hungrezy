import { AiFillStar } from "react-icons/ai";
import HotelContentSelector from "./HotelContentSelector";
import { useGlobalContext } from "../../context";
const SingleHotelHeader = ({
  img,
  title,
  cuisines,
  ratings,
  address,
  content,
  hotelName,
  veg,
}) => {
  const { refHotelHeader, windowSize } = useGlobalContext();
  return (
    <>
      {windowSize <= 768 ? (
        ""
      ) : (
        <div className="banner-image">
          <img src={img} alt={title} className="img1" />
          <img
            src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689354841/Hungrezy/hotel-banner-img-1.avif"
            alt="hotel tables"
            className="img2"
          />
          <img
            src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689354232/Hungrezy/hotel-banner-img-2.jpg"
            alt="hotel tables"
            className="img3"
          />
          <img
            src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689354250/Hungrezy/hotel-banner-img-3.jpg"
            alt="hotel tables"
            className="img4"
          />
        </div>
      )}
      <section className="hotel-header" ref={refHotelHeader}>
        <div className="hotel-info-container">
          <div className="hotel-info">
            <h1>{title}</h1>
            <p>{cuisines}</p>
            <p>{address}</p>
            {veg && (
              <p>
                <img
                  src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353931/Hungrezy/veg-icon.png"
                  alt="veg icon"
                  className="food-icon-filter"
                />
                <span style={{ color: "#34AD3A" }}>Pure Veg</span>
              </p>
            )}
          </div>

          <div className="hotel-ratings">
            <p>
              <span>{ratings}</span>
              <span className="hotel-rating-icon">
                <AiFillStar />
              </span>
            </p>
          </div>
        </div>
        <div className="open-status">
          <p>
            <span>Open now</span> - 7am - 10:30pm (Today)
          </p>
        </div>
        <HotelContentSelector content={content} hotelName={hotelName} />
      </section>
    </>
  );
};
export default SingleHotelHeader;
