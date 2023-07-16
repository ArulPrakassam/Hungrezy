import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 500) {
        setVisible(true);
      } else if (scrolled <= 500) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    visible && (
      <button className="back-to-top" onClick={scrollToTop}>
        <AiOutlineArrowUp />
      </button>
    )
  );
};

export default ScrollToTop;
