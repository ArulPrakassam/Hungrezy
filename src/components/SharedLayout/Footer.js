import { FaLinkedin, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-title">
        <h2>Hungrezy</h2>
      </div>
      <div className="footer-container">
        <div className="footer-contents">
          <h3>ABOUT FOOD PLATE</h3>
          <ul>
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Work With Us</li>
            <li>Investor Relations</li>
            <li>Report Fraud</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-contents">
          <h3>FOODVERSE</h3>
          <ul>
            <li>Hungrezy</li>
            <li>Blinkit</li>
            <li>Feeding India</li>
            <li>Hyperpure</li>
            <li>Report Fraud</li>
            <li>Hungryland</li>
          </ul>
        </div>

        <div className="footer-contents">
          <h3>FOR RESTAURANTS</h3>
          <ul>
            <li>Partner With Us</li>
            <li>Apps For You</li>
          </ul>
          <h3>FOR ENTERPRIES</h3>
          <ul>
            <li>Hungrezy For Enterprise</li>
          </ul>
        </div>

        <div className="footer-contents">
          <h3>LEARN MORE</h3>
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms</li>
            <li>Sitemap</li>
          </ul>
        </div>

        <div className="footer-contents social-icons">
          <h3>SOCIAL LINKS</h3>
          <ul>
            <a href="https://www.switch2knowledge.com/">
              <li>
                <AiOutlineGlobal className="social-icon" />
              </li>
            </a>
            <a href="https://www.youtube.com/channel/UCzz1ofQIE6VJm73BSOkgxUw">
              <li>
                <FaYoutube className="social-icon" />
              </li>
            </a>
            <a href="https://www.linkedin.com/in/arul-prakassam">
              <li>
                <FaLinkedin className="social-icon" />
              </li>
            </a>
            <a href="https://twitter.com/ArulPrakassam">
              <li>
                <FaTwitter className="social-icon" />
              </li>
            </a>
            <a href="https://www.facebook.com/ArulPrakassam">
              <li>
                <FaFacebook className="social-icon" />
              </li>
            </a>
          </ul>
        </div>
      </div>
      <div className="footer-credits">
        <p>
          Copyright &copy;{new Date().getFullYear()}. Developed By Arul
          Prakassam
        </p>
      </div>
    </section>
  );
};

export default Footer;
