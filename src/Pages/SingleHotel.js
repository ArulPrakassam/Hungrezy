import { useParams, useNavigate } from "react-router-dom";
import SingleHotelHeader from "../components/SingleHotel/SingleHotelHeader";
import ShowHotelContent from "../components/SingleHotel/ShowHotelContent";
import hungrezy from "../data/hungrezy.json";
import Error from "./Error";
import { useEffect } from "react";

const SingleHotel = ({ content }) => {
  const { hotelName } = useParams();
  const totalHotels = [
    ...hungrezy.delivery.hotels,
    ...hungrezy["Dining Out"].hotels,
    ...hungrezy.Nightlife.hotels,
    ...hungrezy.collectionPage,
  ];
  const navigate = useNavigate();
  //finding the particular hotel details
  const hotelDetails = totalHotels.find(
    (hotel) => hotel.title.replaceAll(" ", "-") === hotelName
  );
  useEffect(() => {
    if (!hotelDetails) {
      navigate("/error", {
        state: `Sorry! we are not able to find the place ${hotelName.replaceAll(
          "-",
          " "
        )}`,
      });
    }
  }, []);
  if (!hotelDetails) {
    return;
  }
  return (
    <section className="single-hotel-page">
      <SingleHotelHeader
        {...hotelDetails}
        content={content}
        hotelName={hotelDetails.title}
      />
      <ShowHotelContent
        content={content}
        hotelName={hotelDetails.title}
        hotelDetails={hotelDetails}
      />
    </section>
  );
};

export default SingleHotel;
