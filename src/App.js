import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Home from "./Pages/Home";
import Hungrezy from "./Pages/Hungrezy";
import SingleHotel from "./Pages/SingleHotel";
import CollectionPage from "./Pages/CollectionPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import HotelSharedLayout from "./components/SharedLayout/HotelSharedLayout";
import SingleCollectionPage from "./Pages/SingleCollectionPage";
import Error from "./Pages/Error";

//this will help to stay at top of the page when we navigate from one page to another
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:location" element={<SharedLayout />}>
            <Route index element={<Hungrezy />} />
            <Route
              path="/:location/delivery"
              element={<Hungrezy service="delivery" />}
            />
            <Route
              path="/:location/dine-out"
              element={<Hungrezy service="dine-out" />}
            />
            <Route
              path="/:location/nightlife"
              element={<Hungrezy service="nightlife" />}
            />
          </Route>
          <Route path="/:location/:hotelName" element={<HotelSharedLayout />}>
            <Route index element={<SingleHotel />} />
            <Route
              path="/:location/:hotelName/info"
              element={<SingleHotel content="info" />}
            />
            <Route
              path="/:location/:hotelName/order"
              element={<SingleHotel content="order" />}
            />
            <Route
              path="/:location/:hotelName/reviews"
              element={<SingleHotel content="reviews" />}
            />
          </Route>
          <Route path="/:location/collections" element={<CollectionPage />} />
          <Route
            path="/:location/collections/:collection"
            element={<SingleCollectionPage />}
          />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
