# Hungrezy

This is a food ordering web application project. Creating a good user interface using react is the main purpose of this project. The user interface is inspired from zomato web app.

The live URL [Hungrezy](https://hungrezy-app.netlify.app/)

## ServiceSelector

- Delivery
- Dining out
- Nightlife

**In ServiceSelector.js**

```js
const [selected, setSelected] = useState();
```

```js
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
```

The service prop come from Hungrezy.js and based upon the service the switch case set the setSelected().

It is two components for mobile and desktop version. Based on the screen size the component changes.

```js
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
```

Link from the react-router is used to navigate from one service to another. When id and selected matches then the style for that particular service is applied and all other services have different style.

## ShowServiceContent

**In context.js**

```js
let defaultHotelValues = hungrezy.delivery.hotels;

const vegFilter = (data) => {
  const items = data.filter((filterItem) => filterItem.veg);
  return items;
};
const ratingFilter = (data) => {
  const items = data.filter((filterItem) => filterItem.ratings > 4);
  return items;
};

let defaultDiningValues = hungrezy["Dining Out"].hotels;

const outdoorSeating = (data) => {
  const items = data.filter((filterItem) => filterItem.outdoorSeating);
  return items;
};

let defaultNightlifeValues = hungrezy.Nightlife.hotels;

const distanceFilter = (data) => {
  const items = data.toSorted((i, j) =>
    i.reach > j.reach ? 1 : i.reach < j.reach ? -1 : 0
  );
  return items;
};
```

The vegFilter, ratingFilter, outdoorSeating, distanceFilter function helps to filter the values. defaultValues of all holds all the values of the hotels.

**In ShowServiceContent.js**

It is used to show the content based upon the service and able to filter the items based upon the URL params.

```js
const [searchParams, setSearchParams] = useSearchParams();
const [hotels, setHotels] = useState([]);
const {
  defaultHotelValues,
  vegFilter,
  ratingFilter,
  defaultDiningValues,
  outdoorSeating,
  defaultNightlifeValues,
  distanceFilter,
} = useGlobalContext();
```

useSearchParams is used to get URL Params

```js
useEffect(() => {
  const totalParams = Object.fromEntries(searchParams);
  const objectKeys = Object.keys(totalParams);

  if (service === "delivery") {
    fetchHotels(objectKeys);
  } else if (service === "dine-out") {
    fetchDining(objectKeys);
  } else if (service === "nightlife") {
    fetchNightlife(objectKeys);
  }
}, [searchParams, service, fetchHotels, fetchDining, fetchNightlife]);
```

```js
const fetchHotels = useCallback(
  (objectKeys) => {
    if (objectKeys.length === 0) {
      //this is used when there is no params in url.  Also this is used in starting of the page

      setHotels(defaultHotelValues);
    } else {
      //this check is used for finding the execution of first if statement
      //then for the first executed if statement, we need to pass defaultHotelValues
      //after the first executed if statement, we incremented the value of check

      let check = 0;

      objectKeys.forEach((item) => {
        if (item === "veg") {
          //in the else statement we pass the hotels (which may already have some filtered items)
          if (check === 0) {
            setHotels(vegFilter(defaultHotelValues));
            check++;
          } else {
            setHotels((prev) => vegFilter(prev));
          }
        } else if (item === "ratings") {
          if (check === 0) {
            setHotels(ratingFilter(defaultHotelValues));
            check++;
          } else {
            setHotels((prev) => ratingFilter(prev));
          }
        } else {
          setHotels(defaultHotelValues);
        }
      });
    }
  },
  [defaultHotelValues, ratingFilter, vegFilter]
);
```

```js
const fetchDining = useCallback(
  (objectKeys) => {
    if (objectKeys.length === 0) {
      //this is used when there is no params in url.  Also this is used in starting of the page
      setDining(defaultDiningValues);
    } else {
      //this check is used for finding the execution of first if statement
      //then for the first executed if statement, we need to pass defaultDiningValues
      //after the first executed if statement, we incremented the value of check

      let check = 0;

      objectKeys.forEach((item) => {
        if (item === "outdoor") {
          //in the else statement we pass the hotels (which may already have some filtered items)
          if (check === 0) {
            setDining(outdoorSeating(defaultDiningValues));
            check++;
          } else {
            setDining((prev) => outdoorSeating(prev));
          }
        } else if (item === "ratings") {
          if (check === 0) {
            setDining(ratingFilter(defaultDiningValues));
            check++;
          } else {
            setDining((prev) => ratingFilter(prev));
          }
        } else {
          setDining(defaultDiningValues);
        }
      });
    }
  },
  [defaultDiningValues, outdoorSeating, ratingFilter]
);
```

```js
const fetchNightlife = useCallback(
  (objectKeys) => {
    if (objectKeys.length === 0) {
      //this is used when there is no params in url.  Also this is used in starting of the page
      setNightlife(defaultNightlifeValues);
    } else {
      //this check is used for finding the execution of first if statement
      //then for the first executed if statement, we need to pass defaultNightlifeValues
      //after the first executed if statement, we incremented the value of check

      let check = 0;

      objectKeys.forEach((item) => {
        if (item === "distance") {
          //in the else statement we pass the hotels (which may already have some filtered items)
          if (check === 0) {
            setNightlife(distanceFilter(defaultNightlifeValues));
            check++;
          } else {
            setNightlife((prev) => distanceFilter(prev));
          }
        } else if (item === "ratings") {
          if (check === 0) {
            setNightlife(ratingFilter(defaultNightlifeValues));
            check++;
          } else {
            setNightlife((prev) => ratingFilter(prev));
          }
        } else {
          setNightlife(defaultNightlifeValues);
        }
      });
    }
  },
  [defaultNightlifeValues, distanceFilter, ratingFilter]
);
```

```js
let check = 0;
```

check is used to find the first executing if condition. Because the first executing condition is the starting point so we need to give defaultValues. Then only the filter will work correctly.

```js
if (service === "delivery") {
  return <Delivery location={location} hotels={hotels}></Delivery>;
} else if (service === "dine-out") {
  return <DiningOut location={location} dining={dining}></DiningOut>;
} else if (service === "nightlife") {
  return <NightLife location={location} nightlife={nightlife}></NightLife>;
}
```

service and location props is given from Hungrezy.js. Based upon the service prop, correct component is returned.

**In FilterContainer.js**

FilterContainer has filter buttons, by using this we can filter. When the url is changed by params then based upon it, filter is executed and items are shown.

```js
const [searchParams, setSearchParams] = useSearchParams();
```

```js
const filterFunction = (e) => {
  const totalParams = Object.fromEntries(searchParams);

  const set = e.currentTarget.dataset.filter;
  const value = e.currentTarget.dataset.value;

  if (searchParams.has(set)) {
    searchParams.delete(set);
    setSearchParams(searchParams);
  } else {
    setSearchParams({ ...totalParams, [set]: value });
  }
};
```

This is the filterFunction, when we click a button then from that button we get dataset value and we get totalParams from searchParams.

If the value is not present as param in the URL then we add it to the URL by setSearchParams.

```js
setSearchParams({ ...totalParams, [set]: value });
```

If the value is present as param in the URL then we delete it from the URL.

```js
searchParams.delete(set);
setSearchParams(searchParams);
```

```js
<section className="filter-container">
  <div className="filter-buttons">
    <button className="filter-btn">
      <span className="filter-icon">
        <AiOutlineControl />
      </span>
      Filters
    </button>

    {buttons[service].map((item, index) => {
      return (
        <button
          className={`${
            searchParams.has(item.filterName)
              ? "filter-btn button-selected"
              : "filter-btn"
          }`}
          onClick={(e) => filterFunction(e)}
          data-filter={item.filterName}
          data-value={item.filterValue}
          key={index}
        >
          {item.name}{" "}
          {searchParams.has(item.filterName) && (
            <span>
              <AiOutlineClose />
            </span>
          )}
        </button>
      );
    })}
  </div>
</section>
```

The button color change and showing the cross arrow by searchParams.has().

The key of search param and the data-filter value should be same to change the color and enabling or disabling cross arrow based upon the button selected or not.

```js
<button
  className={`${
    searchParams.has(item.filterName)
      ? "filter-btn button-selected"
      : "filter-btn"
  }`}
  onClick={(e) => filterFunction(e)}
  data-filter={item.filterName}
  data-value={item.filterValue}
  key={index}
>
  {item.name}{" "}
  {searchParams.has(item.filterName) && (
    <span>
      <AiOutlineClose />
    </span>
  )}
</button>
```

## DiningOut

**DiningOut.js**

```js
const scrollContainer = useRef();
const refItem = useRef();
const [showBtn, setShowBtn] = useState({ prev: false, next: true });

const scrollRightFunction = () => {
  setShowBtn({ ...showBtn, prev: true });

  scrollContainer.current.scrollLeft +=
    refItem.current.getBoundingClientRect().width;

  //it is used to find that the scroll is reached at right last in horizontal

  if (
    scrollContainer.current.offsetWidth + scrollContainer.current.scrollLeft ===
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
```

```js
<div className="scroll-btns-holder">
  <div className="collections-slider-container" ref={scrollContainer}>
    <div className="collection-slider">
      {hungrezy["Dining Out"].collections.slice(0, 8).map((collectionItem) => {
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
```

It is used for scrolling the collection items.

## Menu

**context.js**

```js
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
```

**Menu.js**

```js
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
```

```js
//generate a array of useRef
const refFoods = useRef([]);
refFoods.current = asideBar.map(() => createRef());
```

It is used to generate separate ref for each food section like breakfast, lunch etc.,

```js
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
```

A state is passed from the link in delivery, dining out, nightlife section. This state is used to move the page to top and make a sticky content selector like reviews, menu, overview.

```js
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
```

```js
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
```

VegNonVegFilter is used to filter veg and non veg foods in non veg restaurant. It is not visible in veg restaurant.

```js
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
```

```js
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
```

It is used to search menu.

## MenuContainer

**MenuContainer.js**

```js
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
```

Star rating for the food is dynamically calculated from item.ratings. starIconArr has all final calculated icons.

```js
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
```

```js
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
```

increaseOrder, decreaseOrder function is used to add and decrease food count in menu.

## AsideFilterContainer

**In AsideFilterContainer.js**

```js
const [selected, setSelected] = useState(0);
const { windowSize, refHotelHeader, asideBar } = useGlobalContext();

useEffect(() => {
  function scrolling() {
    //this is used to find that the particular section is reached top or not
    refFoods.current.forEach((item, index) => {
      let scrollDiv =
        item.current.offsetTop -
        refHotelHeader.current.getBoundingClientRect().height;

      if (window.scrollY >= scrollDiv) {
        setSelected(index);
      }
    });
  }
  window.addEventListener("scroll", scrolling);
  return () => window.removeEventListener("scroll", scrolling);
}, []);
```

```js
<section className="aside-filter-section">
  {windowSize >= 1229 && <SearchFoodBar />}
  {windowSize > 768 && !veg && <VegNonVegFilter />}
  <ul className="filter-labels">
    {asideBar.map((aside, index) => {
      return (
        <FilterNames
          aside={aside}
          index={index}
          selected={selected}
          refFoods={refFoods}
          key={index}
        />
      );
    })}
  </ul>
</section>
```

```js
const FilterNames = ({
  aside,
  index,
  selected,
  refFoods,
  isOpen,
  setIsOpen,
  mobile,
}) => {
  const { refHotelHeader } = useGlobalContext();
  const showSelectedFood = (index) => {
    //when you click the button then the respective section go to top and color will be changed to that button by the useEffect()
    const scrollDiv = refFoods.current[index].current.offsetTop;

    //it is used to find the mobile device
    if (mobile) {
      window.scrollTo({
        top:
          scrollDiv -
          document.querySelector(".mobile-top-bar").getBoundingClientRect()
            .height,
        behavior: "auto",
      });
      //it is used to close the modal after clicking the button
      setIsOpen(!isOpen);
    } else {
      window.scrollTo({
        top: scrollDiv - refHotelHeader.current.getBoundingClientRect().height,
        behavior: "auto",
      });
    }
  };
  return (
    <li
      className="filter-name"
      key={index}
      style={{
        color: selected === index ? "rgb(241, 100, 126)" : "black",
        background:
          selected === index && !isOpen
            ? "linear-gradient(90deg, rgb(255,252,252) 0%, rgba(241,69,69,0.35) 100%, rgb(226,19,19) 100%)"
            : "",
        borderRight:
          selected === index && !isOpen ? "4px solid rgb(241, 100, 126)" : "",
      }}
      onClick={() => showSelectedFood(index)}
    >
      {aside}
    </li>
  );
};
```

```js
const MobileAsideFilterContainer = ({ refFoods }) => {
  const [selected, setSelected] = useState(0);

  //hide menu btn when footer is reached
  const [hideBtn, setHideBtn] = useState(false);
  //aside filter container for mobile
  const [isOpen, setIsOpen] = useState(false);
  const mobile = true;
  const { refHotelHeader, asideBar } = useGlobalContext();

  //used to prevent scrolling when menu modal is opened
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    function scrolling() {
      //this is used to find that the particular section is reached top or not
      refFoods.current.forEach((item, index) => {
        let scrollDiv =
          item.current.offsetTop -
          refHotelHeader.current.getBoundingClientRect().height;

        if (window.scrollY >= scrollDiv) {
          setSelected(index);
        }
      });

      //this is used to hide btn when it is reached footer
      if (
        window.scrollY +
          document.querySelector(".footer").getBoundingClientRect().height >=
        document.querySelector(".footer").offsetTop
      ) {
        setHideBtn(true);
      } else {
        setHideBtn(false);
      }
    }
    window.addEventListener("scroll", scrolling);
    return () => window.removeEventListener("scroll", scrolling);
  }, []);

  return (
    <section className="mobile-aside-filter">
      {isOpen && (
        <div className="modal-background" onClick={() => setIsOpen(false)}>
          <div className="modal-menu-content">
            <ul className="filter-labels">
              {asideBar.map((aside, index) => {
                return (
                  <FilterNames
                    aside={aside}
                    index={index}
                    selected={selected}
                    refFoods={refFoods}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    mobile={mobile}
                    key={index}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div className="show-menu-btn">
        {/* hide menu btn when footer is reached */}
        {!hideBtn && (
          <button
            className="show-menu"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span>
              {isOpen ? <IoCloseSharp /> : <MdOutlineRestaurantMenu />}
            </span>
            Menu
          </button>
        )}
      </div>
    </section>
  );
};
```

## Tech Stack

**Client:** React

**Hosting:** Netlify
