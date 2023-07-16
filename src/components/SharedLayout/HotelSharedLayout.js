import { DesktopNav } from "./Navbar";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const HotelSharedLayout = () => {
  const { windowSize } = useGlobalContext();
  const { location } = useParams();
  return (
    <main>
      {windowSize <= 768 ? "" : <DesktopNav location={location} />}
      <Outlet></Outlet>
      <Footer></Footer>
    </main>
  );
};
export default HotelSharedLayout;
