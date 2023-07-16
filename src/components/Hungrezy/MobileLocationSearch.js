import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import FilterContainer from "./FilterContainer";
import { BsSearch } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
const MobileLocationSearch = ({ location }) => {
  const refContainer = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (refContainer.current.value) {
      navigate(`/${refContainer.current.value}/delivery`);
    }
  };
  return (
    <div className="mobile-location-section">
      <form className="mobile-input-container" onSubmit={handleSubmit}>
        <div className="mobile-input-content">
          <span className="mobile-location-icon" title="location">
            <HiLocationMarker />
          </span>
          <input
            type="text"
            placeholder={location}
            className="mobile-location-search"
            name="location"
            ref={refContainer}
          />
        </div>
        <span className="mobile-search-icon" title="search">
          <BsSearch />
        </span>
      </form>
      <FilterContainer />
    </div>
  );
};
export default MobileLocationSearch;
