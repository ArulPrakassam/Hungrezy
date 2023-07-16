import InputContainer from "./InputContainer";
import Navbar from "./Navbar";

const Header = ({ windowSize }) => {
  return (
    <header className="header">
      {/* nav bar */}
      <Navbar windowSize={windowSize} />
      {/* header */}
      <section className="header-center">
        <div className="header-center-container">
          <h1 className="title">Hungrezy</h1>
          <p className="description">
            Discover the best food & drinks in Puducherry
          </p>
          <InputContainer />
        </div>
      </section>
    </header>
  );
};

export default Header;
