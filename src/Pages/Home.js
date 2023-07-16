import { useEffect } from "react";
import Header from "../components/Home/Header";
import MainSection from "../components/Home/MainSection";
import ExploreSection from "../components/SharedLayout/ExploreSection";
import Footer from "../components/SharedLayout/Footer";
import "../styles/Home/home.css";
import { useGlobalContext } from "../context";

const Home = () => {
  useEffect(() => {
    document.title = "Hungrezy";
  }, []);
  const { windowSize } = useGlobalContext();
  return (
    <main>
      <Header windowSize={windowSize} />
      <MainSection windowSize={windowSize} />
      <ExploreSection />
      <Footer />
    </main>
  );
};
export default Home;
