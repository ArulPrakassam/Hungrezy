import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const SharedLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
      <ScrollToTop />
    </main>
  );
};
export default SharedLayout;
