import Delivery from "./Delivery";
import DiningOut from "./DiningOut";
import NightLife from "./NightLife";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const ShowServiceContent = ({ location, service = "delivery" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [dining, setDining] = useState([]);
  const [nightlife, setNightlife] = useState([]);
  const {
    defaultHotelValues,
    vegFilter,
    ratingFilter,
    defaultDiningValues,
    outdoorSeating,
    defaultNightlifeValues,
    distanceFilter,
  } = useGlobalContext();

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

  if (service === "delivery") {
    return <Delivery location={location} hotels={hotels}></Delivery>;
  } else if (service === "dine-out") {
    return <DiningOut location={location} dining={dining}></DiningOut>;
  } else if (service === "nightlife") {
    return <NightLife location={location} nightlife={nightlife}></NightLife>;
  }
};
export default ShowServiceContent;
