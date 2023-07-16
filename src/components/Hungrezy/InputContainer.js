import { MdOutlineGpsFixed } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const InputContainer = ({ location = "Pondicherry, Puducherry" }) => {
  const [showContent, setShowContent] = useState(false);
  const refContainer = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (refContainer.current.value) {
      navigate(`/${refContainer.current.value}/delivery`);
    }
  };
  return (
    <div className="hungrezy input-container">
      <form className="input-container-one" onSubmit={handleSubmit}>
        <span className="location-icon" title="location">
          <HiLocationMarker />
        </span>
        <input
          type="text"
          placeholder={location.charAt(0).toUpperCase() + location.slice(1)}
          className="hungrezy location-search"
          name="location"
          ref={refContainer}
        />
        <span
          className="dropdown-icon"
          title="dropdown"
          onClick={() => setShowContent(!showContent)}
        >
          {showContent ? <AiFillCaretUp /> : <AiFillCaretDown />}

          <span className="line"></span>
        </span>
      </form>
      <form
        className="input-container-two"
        onSubmit={(e) => e.preventDefault()}
      >
        <span className="search-icon" title="search">
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
          className="hungrezy hotel-search"
          name="hotel"
        />
      </form>
      {/* dropdown content */}
      {showContent && (
        <div className="hungrezy dropdown-content">
          <span className="gps-icon">
            <MdOutlineGpsFixed />
            <span>Detect current location</span>
          </span>

          <p>Using GPS</p>
        </div>
      )}
    </div>
  );
};

export default InputContainer;
