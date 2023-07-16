import { useState } from "react";

import { BiChevronDown } from "react-icons/bi";

import exploreSection from "../../data/exploreSection.json";

const ExploreSection = () => {
  return (
    <section className="explore-section">
      <div className="explore-title">
        <h2>Explore options near me</h2>
      </div>
      <div className="explore-items-container">
        {exploreSection.map((item) => {
          return <ExploreItems {...item} key={item.id} />;
        })}
      </div>
    </section>
  );
};

const ExploreItems = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="explore-item-one">
      <div
        className="explore-item-title"
        onClick={() => setShowInfo(!showInfo)}
      >
        <h3>{title}</h3>
        <span className={`${showInfo ? "rotate-btn" : ""}`}>
          <BiChevronDown />
        </span>
      </div>

      {showInfo && (
        <ul className="explore-item-description">
          {info.map((data, index) => {
            return <li key={index}>{data}</li>;
          })}
        </ul>
      )}
    </article>
  );
};

export default ExploreSection;
