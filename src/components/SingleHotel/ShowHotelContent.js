import Overview from "./Overview";
import Menu from "./Menu";
import Reviews from "./Reviews";
const ShowHotelContent = ({ content = "info", hotelName, hotelDetails }) => {
  if (content === "info") {
    return <Overview hotelName={hotelName} {...hotelDetails} />;
  } else if (content === "order") {
    return <Menu hotelName={hotelName} {...hotelDetails} />;
  } else if (content === "reviews") {
    return <Reviews hotelName={hotelName} />;
  }
};
export default ShowHotelContent;
