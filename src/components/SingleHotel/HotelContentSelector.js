import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchFoodBar } from "./Menu";
import { useGlobalContext } from "../../context";
const HotelContentSelector = ({ content, hotelName }) => {
  const { location } = useParams();
  const [selected, setSelected] = useState(1);
  const { windowSize } = useGlobalContext();
  const contents = [
    { name: "Overview", url: "info", id: 1 },
    { name: "Order Online", url: "order", id: 2 },
    { name: "Reviews", url: "reviews", id: 3 },
  ];

  useEffect(() => {
    const serviceSelection = () => {
      if (content) {
        switch (content) {
          case "info":
            setSelected(1);
            break;
          case "order":
            setSelected(2);
            break;
          case "reviews":
            setSelected(3);
            break;
          default:
            setSelected(1);
            break;
        }
      }
    };

    serviceSelection();
  }, [content]);

  return (
    <>
      <section className="hotel-content-selection">
        {contents.map((item) => {
          const { name, url, id } = item;
          // passing state as true to move the hotel header at top position
          //when we click one link from another then state will be passed
          return (
            <Link
              to={`/${location}/${hotelName.replaceAll(" ", "-")}/${url}`}
              className="hotel-content-info"
              key={id}
              state={true}
            >
              <h2
                style={{
                  color: selected === id ? "rgb(238, 118, 118)" : "grey",
                }}
              >
                {name}
              </h2>
              {selected === id && <div className="underline"></div>}
            </Link>
          );
        })}

        {windowSize < 1229 && windowSize > 768 && <SearchFoodBar />}
      </section>

      <hr />
    </>
  );
};

export default HotelContentSelector;
