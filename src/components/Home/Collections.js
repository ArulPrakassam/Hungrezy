import { AiFillCaretRight } from "react-icons/ai";
import hungrezy from "../../data/hungrezy.json";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
const Collections = ({ windowSize }) => {
  let { location } = useParams();
  if (!location) {
    location = "Puducherry";
  }
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <section className="collections">
      <div>
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
              <Link
                to={`/${location.toLowerCase()}/collections`}
                target="_blank"
              >
                All collections in{" "}
                {location.charAt(0).toUpperCase() + location.slice(1)}
                <span>
                  <AiFillCaretRight />
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="collections-container">
          {hungrezy.collections.slice(0, 4).map((collectionItem) => {
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
        {windowSize <= 768 ? (
          <div className="collections-description see-all-collections">
            <Link to={`/${location.toLowerCase()}/collections`} target="_blank">
              All collections in{" "}
              {location.charAt(0).toUpperCase() + location.slice(1)}
              <span>
                <AiFillCaretRight />
              </span>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};
export default Collections;
