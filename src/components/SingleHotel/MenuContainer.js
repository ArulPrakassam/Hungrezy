import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useRef, useState } from "react";
import { useGlobalContext } from "../../context";

const MenuContainer = ({ item }) => {
  const { windowSize } = useGlobalContext();
  //this is used to show the initial order buttons of the food items
  const [showBtn, setShowBtn] = useState(false);

  const refCount = useRef();

  const increaseOrder = () => {
    let count = parseInt(refCount.current.textContent) + 1;
    refCount.current.textContent = count;
  };
  const decreaseOrder = () => {
    let count = parseInt(refCount.current.textContent) - 1;
    if (count <= 0) {
      setShowBtn(false);
    } else {
      refCount.current.textContent = count;
    }
  };

  //for star rating
  const [fullStar, halfStar] = item.ratings;
  let starIconArr = [];
  let totalStar = 5;
  if (halfStar === 0) {
    for (let i = fullStar; i > 0; i--) {
      totalStar--;
      starIconArr.push(<BsStarFill className="star-rating-icon" />);
    }
    if (totalStar !== 0) {
      for (let i = totalStar; i > 0; i--) {
        starIconArr.push(<BsStar className="star-rating-icon" />);
      }
    }
  } else {
    for (let i = fullStar; i > 0; i--) {
      totalStar--;
      starIconArr.push(<BsStarFill className="star-rating-icon" />);
    }
    for (let i = halfStar; i > 0; i--) {
      totalStar--;
      starIconArr.push(<BsStarHalf className="star-rating-icon" />);
    }
    if (totalStar !== 0) {
      for (let i = totalStar; i > 0; i--) {
        starIconArr.push(<BsStar className="star-rating-icon" />);
      }
    }
  }

  return windowSize >= 579 ? (
    <DesktopMenuContainer
      {...item}
      refCount={refCount}
      increaseOrder={increaseOrder}
      decreaseOrder={decreaseOrder}
      showBtn={showBtn}
      setShowBtn={setShowBtn}
      starIconArr={starIconArr}
    />
  ) : (
    <MobileMenuContainer
      {...item}
      refCount={refCount}
      increaseOrder={increaseOrder}
      decreaseOrder={decreaseOrder}
      showBtn={showBtn}
      setShowBtn={setShowBtn}
      starIconArr={starIconArr}
    />
  );
};

const DesktopMenuContainer = ({
  img,
  name,
  price,
  veg,
  refCount,
  showBtn,
  setShowBtn,
  increaseOrder,
  decreaseOrder,
  starIconArr,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="single-food-item">
      <div className="food-details">
        <div className="food-img">
          {imageLoaded ? "" : <div className="image-loading"></div>}
          <img
            src={img}
            alt={name}
            className="food-item-img"
            style={imageLoaded ? {} : { display: "none" }}
            onLoad={() => setImageLoaded(true)}
          />
          {veg ? (
            <img
              src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353931/Hungrezy/veg-icon.png"
              alt="veg icon"
              className="food-icon"
              style={imageLoaded ? {} : { display: "none" }}
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353959/Hungrezy/non-veg-icon.png"
              alt="non-veg icon"
              className="food-icon"
              style={imageLoaded ? {} : { display: "none" }}
            />
          )}
        </div>
        <div className="food-description">
          <p className="food-name">{name}</p>
          <div className="star-rating-icons">
            {starIconArr.map((icons, index) => {
              return (
                <span className="star-rating-icon" key={index}>
                  {icons}
                </span>
              );
            })}
          </div>
          <p className="food-price">&#8377;{price}</p>
        </div>
      </div>
      <div className="order-count">
        {showBtn ? (
          <>
            <button className="remove-one" onClick={decreaseOrder}>
              <AiOutlineMinus />
            </button>
            <p className="current-order-count" ref={refCount}>
              1
            </p>
            <button className="add-one" onClick={increaseOrder}>
              <AiOutlinePlus />
            </button>
          </>
        ) : (
          <button className="initial-add" onClick={() => setShowBtn(true)}>
            ADD
            <span className="initial-add-icon">
              <AiOutlinePlus />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

const MobileMenuContainer = ({
  img,
  name,
  price,
  veg,
  refCount,
  showBtn,
  setShowBtn,
  increaseOrder,
  decreaseOrder,
  starIconArr,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="single-food-item">
      <div className="food-details">
        <div className="food-description">
          {veg ? (
            <img
              src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353931/Hungrezy/veg-icon.png"
              alt="veg icon"
              className="food-icon"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353959/Hungrezy/non-veg-icon.png"
              alt="non-veg icon"
              className="food-icon"
            />
          )}
          <p className="food-name">{name}</p>
          <div className="star-rating-icons">
            {starIconArr.map((icons, index) => {
              return (
                <span className="star-rating-icon" key={index}>
                  {icons}
                </span>
              );
            })}
          </div>
          <p className="food-price">&#8377;{price}</p>
        </div>
        <div className="food-img">
          {imageLoaded ? "" : <div className="image-loading"></div>}
          <img
            src={img}
            alt={name}
            className="food-item-img"
            style={imageLoaded ? {} : { display: "none" }}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="order-count">
            {showBtn ? (
              <>
                <button className="remove-one" onClick={decreaseOrder}>
                  <AiOutlineMinus />
                </button>
                <p className="current-order-count" ref={refCount}>
                  1
                </p>
                <button className="add-one" onClick={increaseOrder}>
                  <AiOutlinePlus />
                </button>
              </>
            ) : (
              <button className="initial-add" onClick={() => setShowBtn(true)}>
                ADD
                <span className="initial-add-icon">
                  <AiOutlinePlus />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuContainer;
