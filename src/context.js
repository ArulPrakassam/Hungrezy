import React, { useState, useEffect, useContext, useRef } from "react";
import hungrezy from "./data/hungrezy.json";
import menudata from "./data/menudata.json";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  //menu section
  const refHotelHeader = useRef();

  const defaultAsideBar = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Breads",
    "Fried Rice and Noodles",
    "Street Foods",
    "Chinese",
    "Pizza",
    "Ice Cream",
    "Beverages",
  ];

  //it is used for the total data of that page
  const defaultMenuData = useRef(menudata);
  const refAsideBar = useRef();

  //it is used for dynamic data of that page
  const [asideBar, setAsideBar] = useState(defaultAsideBar);
  const [menuData, setMenuData] = useState(defaultMenuData.current);

  //it is used for temporary data

  let tempMenuData = useRef();
  let tempAsideBar = useRef();

  //used for veg and non veg buttons
  const refFoodType = useRef({ veg: false, nonVeg: false });

  //delivery items section
  let defaultHotelValues = hungrezy.delivery.hotels;

  const vegFilter = (data) => {
    const items = data.filter((filterItem) => filterItem.veg);
    return items;
  };
  const ratingFilter = (data) => {
    const items = data.filter((filterItem) => filterItem.ratings > 4);
    return items;
  };

  //dining out items section
  let defaultDiningValues = hungrezy["Dining Out"].hotels;

  const outdoorSeating = (data) => {
    const items = data.filter((filterItem) => filterItem.outdoorSeating);
    return items;
  };

  //nightlife items section

  let defaultNightlifeValues = hungrezy.Nightlife.hotels;

  //compareFn(a, b) return value	sort order
  // > 0	sort a after b, e.g. [b, a]
  // < 0	sort a before b, e.g. [a, b]

  const distanceFilter = (data) => {
    const items = data.toSorted((i, j) =>
      i.reach > j.reach ? 1 : i.reach < j.reach ? -1 : 0
    );
    return items;
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        windowSize,
        defaultHotelValues,
        vegFilter,
        ratingFilter,
        defaultDiningValues,
        outdoorSeating,
        defaultNightlifeValues,
        distanceFilter,
        refHotelHeader,
        defaultAsideBar,
        defaultMenuData,
        asideBar,
        setAsideBar,
        menuData,
        setMenuData,
        refAsideBar,
        refFoodType,
        tempAsideBar,
        tempMenuData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
