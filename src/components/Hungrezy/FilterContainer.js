import { AiOutlineClose } from "react-icons/ai";
import buttons from "../../data/buttons.json";
import { useSearchParams, useLocation } from "react-router-dom";

const FilterContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const service = location.pathname.split("/")[2] || "delivery";
  //this is used to add the URL Params to the URL when the button is clicked
  const filterFunction = (e) => {
    const totalParams = Object.fromEntries(searchParams);

    //getting dataset from buttons
    const set = e.currentTarget.dataset.filter;
    const value = e.currentTarget.dataset.value;

    //when I click the button
    if (searchParams.has(set)) {
      searchParams.delete(set);
      setSearchParams(searchParams);
    } else {
      //if key value is not in URL then it is added
      setSearchParams({ ...totalParams, [set]: value });
    }
  };
  return (
    <section className="filter-container">
      <div className="filter-buttons">
        {/* <button className="filter-btn">
          <span className="filter-icon">
            <AiOutlineControl />
          </span>
          Filters
        </button> */}

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
  );
};

export default FilterContainer;
