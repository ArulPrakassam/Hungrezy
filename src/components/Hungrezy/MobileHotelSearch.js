import { BsSearch } from "react-icons/bs";
import FilterContainer from "./FilterContainer";
const MobileHotelSearch = () => {
  return (
    <div className="mobile-hotel-section">
      <form
        className="hotel-mobile-input-container"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="hotel mobile-input-content">
          <span className="hotel-mobile-search-icon" title="search">
            <BsSearch />
          </span>
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="mobile-hotel-search"
            name="hotel"
          />
        </div>
      </form>
      <FilterContainer />
    </div>
  );
};

export default MobileHotelSearch;
