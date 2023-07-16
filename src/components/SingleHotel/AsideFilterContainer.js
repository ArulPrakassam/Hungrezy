import { useState, useEffect } from "react";
import { SearchFoodBar } from "./Menu";
import { useGlobalContext } from "../../context";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { VegNonVegFilter } from "./Menu";
const AsideFilterContainer = ({ refFoods, veg }) => {
  const [selected, setSelected] = useState(0);
  const { windowSize, refHotelHeader, asideBar } = useGlobalContext();
  //this useEffect will change the color the button when you scroll to that particular section
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
  return (
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
  );
};
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

export default AsideFilterContainer;
export { MobileAsideFilterContainer };
