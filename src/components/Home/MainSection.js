import Collections from "./Collections";
import { Link } from "react-router-dom";
import { useState } from "react";
const MainSection = ({ windowSize }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <section className="home-main-section">
      {/* services */}
      <div className="services">
        <div className="service-container">
          <Link className="order-online" to="/puducherry/delivery">
            <div className="order-online-img">
              {imageLoaded ? "" : <div className="image-loading"></div>}
              <img
                src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353801/Hungrezy/order-online.jpg"
                alt="order-online"
                style={imageLoaded ? {} : { display: "none" }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            <h2>Order Online</h2>
            <p>Stay home and order to your doorstep</p>
          </Link>

          <Link className="dining" to="/puducherry/dine-out">
            <div className="dining-img">
              {imageLoaded ? "" : <div className="image-loading"></div>}
              <img
                src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353837/Hungrezy/dine-out.jpg"
                alt="order-online"
                style={imageLoaded ? {} : { display: "none" }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            <h2>Dining</h2>
            <p>View the city's favourite dining venues</p>
          </Link>
        </div>
      </div>

      {/* collections */}
      <Collections windowSize={windowSize} />
    </section>
  );
};

export default MainSection;
