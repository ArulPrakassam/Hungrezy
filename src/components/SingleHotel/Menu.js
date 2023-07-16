import { useParams, useLocation } from "react-router-dom";
import { createRef, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useGlobalContext } from "../../context";
import MenuContainer from "./MenuContainer";
import AsideFilterContainer from "./AsideFilterContainer";
import menudata from "../../data/menudata.json";
import { MobileAsideFilterContainer } from "./AsideFilterContainer";
import { AiOutlineClose } from "react-icons/ai";

const Menu = ({ hotelName, veg }) => {
  const { location } = useParams();
  const scrollState = useLocation();
  const {
    refHotelHeader,
    windowSize,
    defaultAsideBar,
    defaultMenuData,
    asideBar,
    menuData,
    setMenuData,
    setAsideBar,
    refAsideBar,
  } = useGlobalContext();

  let { tempAsideBar, tempMenuData } = useGlobalContext();

  useEffect(() => {
    //filtering the food based upon the hotel veg type when page is loaded initially
    if (veg) {
      let keyValues = {};
      defaultAsideBar.forEach((aside) => {
        const newMenuData = menudata[aside].filter((item) => item.veg === veg);
        keyValues = { ...keyValues, [aside]: newMenuData };
      });
      //removing the keys which don't have values
      for (const key in keyValues) {
        if (keyValues[key].length < 1) {
          delete keyValues[key];
        }
      }
      //it is used for the total data of that page
      defaultMenuData.current = keyValues;
      refAsideBar.current = Object.keys(keyValues);
      //it is used for temporary data
      tempMenuData.current = keyValues;
      tempAsideBar.current = Object.keys(keyValues);

      //it is used for dynamic data of that page
      setAsideBar(Object.keys(keyValues));
      setMenuData(defaultMenuData.current);
    } else {
      //it is used for the total data of that page
      defaultMenuData.current = menudata;
      refAsideBar.current = defaultAsideBar;
      //it is used for temporary data
      tempMenuData.current = menudata;
      tempAsideBar.current = defaultAsideBar;

      //it is used for dynamic data of that page
      setAsideBar(defaultAsideBar);
      setMenuData(defaultMenuData.current);
    }
  }, []);

  //generate a array of useRef
  const refFoods = useRef([]);
  refFoods.current = asideBar.map(() => createRef());

  useEffect(() => {
    document.title = `Menu of ${hotelName}, ${
      location.charAt(0).toUpperCase() + location.slice(1)
    }`;
  }, []);

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

  return (
    <>
      {windowSize <= 768 ? (
        <div className="mobile-top-bar">
          <SearchFoodBar />
          <VegNonVegFilter />
        </div>
      ) : (
        ""
      )}
      <section className="menu-top-container">
        {windowSize > 768 ? (
          <AsideFilterContainer refFoods={refFoods} veg={veg} />
        ) : (
          <MobileAsideFilterContainer refFoods={refFoods} />
        )}

        <section className="order-online-section">
          <h2>Order Online</h2>
          <div className="food-menu-container">
            {asideBar.length < 1 ? (
              <p className="message">Sorry, no matching foods</p>
            ) : (
              asideBar.map((aside, index) => {
                return (
                  <section
                    className={`${aside.toLowerCase()} food-category-container`}
                    key={index}
                    ref={refFoods.current[index]}
                  >
                    <h3 className="food-cateogry-title">{aside}</h3>
                    {menuData[aside].map((item, index) => {
                      return <MenuContainer item={item} key={index} />;
                    })}
                  </section>
                );
              })
            )}
          </div>
        </section>
      </section>
    </>
  );
};

const VegNonVegFilter = () => {
  const vegNonVegFilter = [
    {
      name: "Veg",
      icon: "https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353931/Hungrezy/veg-icon.png",
    },
    {
      name: "Non-veg",
      icon: "https://res.cloudinary.com/dhxjitf9n/image/upload/v1689353959/Hungrezy/non-veg-icon.png",
    },
  ];
  return (
    <div className="veg-non-veg-filter">
      <div className="veg-non-veg-buttons">
        {vegNonVegFilter.map((item, index) => (
          <VegNonVegFilterFunction {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

const VegNonVegFilterFunction = ({ name, icon }) => {
  const [selectBtn, setSelectBtn] = useState(false);

  const {
    defaultMenuData,
    setAsideBar,
    setMenuData,
    refAsideBar,
    refFoodType,
  } = useGlobalContext();
  let { tempAsideBar, tempMenuData } = useGlobalContext();

  //it is used to change the veg and non veg filter data
  const changeFoodItems = (value) => {
    let keyValues = {};
    refAsideBar.current.forEach((aside) => {
      const newMenuData = defaultMenuData.current[aside].filter(
        (item) => item.veg === value
      );
      keyValues = { ...keyValues, [aside]: newMenuData };
    });

    //removing the keys which don't have values
    for (const key in keyValues) {
      if (keyValues[key].length < 1) {
        delete keyValues[key];
      }
    }

    //setting temporary data
    tempAsideBar.current = Object.keys(keyValues);
    tempMenuData.current = keyValues;
    setAsideBar(Object.keys(keyValues));
    setMenuData(keyValues);
  };
  const selectButtonFunction = (name) => {
    setSelectBtn(!selectBtn);

    //refFoodType is used for veg and non veg button pressed (true, false) values
    if (name === "Veg") {
      refFoodType.current = {
        ...refFoodType.current,
        veg: !refFoodType.current.veg,
      };
    } else if (name === "Non-veg") {
      refFoodType.current = {
        ...refFoodType.current,
        nonVeg: !refFoodType.current.nonVeg,
      };
    }

    //now we are checking the veg and non veg
    if (refFoodType.current.veg && refFoodType.current.nonVeg) {
      //when both are true, set default values of the page
      tempAsideBar.current = refAsideBar.current;
      tempMenuData.current = defaultMenuData.current;
      setAsideBar(refAsideBar.current);
      setMenuData(defaultMenuData.current);
    } else if (refFoodType.current.veg) {
      changeFoodItems(true);
    } else if (refFoodType.current.nonVeg) {
      changeFoodItems(false);
    } else {
      //when nothing is selected then set default values of the page
      tempAsideBar.current = refAsideBar.current;
      tempMenuData.current = defaultMenuData.current;
      setAsideBar(refAsideBar.current);
      setMenuData(defaultMenuData.current);
    }
  };
  return (
    <button
      className={selectBtn ? "food-type btn-selected" : "food-type"}
      onClick={() => selectButtonFunction(name)}
    >
      <img src={icon} alt={name} className="food-icon-filter" />
      {name}
      {selectBtn && (
        <span>
          <AiOutlineClose />
        </span>
      )}
    </button>
  );
};

const SearchFoodBar = () => {
  //to get input from food search bar
  const refInput = useRef();
  const { setAsideBar, setMenuData } = useGlobalContext();
  let { tempAsideBar, tempMenuData } = useGlobalContext();

  //temporary data is used for searchFilter
  const searchFilter = () => {
    let asideBar = tempAsideBar.current;
    let menuData = tempMenuData.current;
    let keyValues = {};
    let value = refInput.current.value.toLowerCase();
    asideBar.forEach((aside) => {
      const newMenuData = menuData[aside].filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      keyValues = { ...keyValues, [aside]: newMenuData };
    });
    //removing the keys which don't have values
    for (const key in keyValues) {
      if (keyValues[key].length < 1) {
        delete keyValues[key];
      }
    }
    setAsideBar(Object.keys(keyValues));
    setMenuData(keyValues);
  };
  return (
    <div className="search-food-menu">
      <span className="search-menu-icon">
        <BsSearch />
      </span>
      <input
        type="text"
        ref={refInput}
        placeholder="Search within menu"
        className="search-menu"
        onChange={searchFilter}
      />
      <span
        className="close-menu-icon"
        onClick={() => {
          refInput.current.value = "";
          searchFilter();
        }}
      >
        <IoCloseSharp />
      </span>
    </div>
  );
};

export default Menu;
export { SearchFoodBar, VegNonVegFilter };
