import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
const ItemsContainer = ({
  img,
  title,
  cuisines,
  imageOverlay,
  ratings,
  price,
  location,
  address,
  reach,
  url,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Link
      to={`/${location.toLowerCase()}/${title.replaceAll(" ", "-")}/${url}`}
      className="single-item-one"
    >
      <div className="hotel-img">
        {imageLoaded ? "" : <div className="image-loading"></div>}
        <img
          src={img}
          alt={title}
          style={imageLoaded ? {} : { display: "none" }}
          onLoad={() => setImageLoaded(true)}
        />
        {imageLoaded ? imageOverlay : ""}
      </div>

      <div className="hotel-content">
        <h2 className="hotel-name">{title}</h2>
        <p>
          <span>{ratings}</span>
          <span className="food-rating-icon">
            <AiFillStar />
          </span>
        </p>
      </div>
      <div className="cuisines">
        <p className="cuisines-names">{cuisines}</p>
        <p className="price">&#8377;{price}</p>
      </div>
      <div className="location">
        <p className="address">{address}</p>
        <p className="reach">{reach}</p>
      </div>
    </Link>
  );
};

export default ItemsContainer;
