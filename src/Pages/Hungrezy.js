import { useParams } from "react-router-dom";
import ExploreSection from "../components/SharedLayout/ExploreSection";
import ServiceSelector from "../components/Hungrezy/ServiceSelector";
import "../styles/Hungrezy/hungrezy.css";
import ShowServiceContent from "../components/Hungrezy/ShowServiceContent";

const Hungrezy = ({ service }) => {
  const { location } = useParams();

  return (
    <>
      <ServiceSelector location={location} service={service} />
      <ShowServiceContent location={location} service={service} />
      <ExploreSection />
    </>
  );
};

export default Hungrezy;
