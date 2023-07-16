import { useEffect, useRef, useState } from "react";
import FilterContainer from "./FilterContainer";
import { useGlobalContext } from "../../context";
import {
  AiFillCaretRight,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import hungrezy from "../../data/hungrezy.json";
import { Link } from "react-router-dom";
import ItemsContainer from "./ItemsContainer";

const DiningOut = ({ location, dining }) => {
  const { windowSize } = useGlobalContext();

  useEffect(() => {
    document.title = `Best Dining Restaurants in ${
      location.charAt(0).toUpperCase() + location.slice(1)
    } - Hungrezy`;
  }, [location]);

  return (
    <>
      <section className="main-section">
        <CollectionsScroll location={location} windowSize={windowSize} />

        {/* filter section for desktop*/}
        {windowSize <= 768 ? "" : <FilterContainer />}

        {/* dining hotels */}
        <DiningHotels location={location} dining={dining} />
      </section>
    </>
  );
};
const CollectionsScroll = ({ location, windowSize }) => {
  const scrollContainer = useRef();
  const refItem = useRef();
  const [showBtn, setShowBtn] = useState({ prev: false, next: true });
  const [imageLoaded, setImageLoaded] = useState(false);

  const scrollRightFunction = () => {
    setShowBtn({ ...showBtn, prev: true });

    scrollContainer.current.scrollLeft +=
      refItem.current.getBoundingClientRect().width;

    //it is used to find that the scroll is reached at right last in horizontal

    if (
      scrollContainer.current.offsetWidth +
        scrollContainer.current.scrollLeft ===
      scrollContainer.current.scrollWidth
    ) {
      setShowBtn({ ...showBtn, next: false });
    }
  };
  const scrollLeftFunction = () => {
    setShowBtn({ ...showBtn, next: true });
    scrollContainer.current.scrollLeft -=
      refItem.current.getBoundingClientRect().width;

    //it is used to find that the scroll is reached at left last in horizontal
    if (scrollContainer.current.scrollLeft === 0) {
      setShowBtn({ ...showBtn, prev: false });
    }
  };
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
        <div className="collections-slider-container" ref={scrollContainer}>
          <div className="collection-slider">
            {hungrezy["Dining Out"].collections
              .slice(0, 8)
              .map((collectionItem) => {
                const { img, title, count, id } = collectionItem;
                return (
                  <Link
                    to={`/${location.toLowerCase()}/collections/${title.replaceAll(
                      " ",
                      "-"
                    )}`}
                    className="collection-item-one slider-item-one"
                    key={id}
                    ref={refItem}
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
        <div className="scroll-arrow-btns">
          {showBtn.prev && (
            <button className="arrow-btn-left" onClick={scrollLeftFunction}>
              <AiOutlineArrowLeft />
            </button>
          )}
          {showBtn.next && (
            <button className="arrow-btn-right" onClick={scrollRightFunction}>
              <AiOutlineArrowRight />
            </button>
          )}
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
const DiningHotels = ({ location, dining }) => {
  return (
    <>
      <div className="main-section-heading">
        <h1>
          Trending Dining Restaurants in{" "}
          {location.charAt(0).toUpperCase() + location.slice(1)}
        </h1>
      </div>
      <div className="items-container">
        {dining.map((item) => {
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

export default DiningOut;
