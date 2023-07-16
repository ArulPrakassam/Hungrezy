import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { HiThumbUp } from "react-icons/hi";
import { useGlobalContext } from "../../context";
import reviewsData from "../../data/reviewData";
const Reviews = ({ hotelName }) => {
  const { location } = useParams();
  const { refHotelHeader } = useGlobalContext();
  const scrollState = useLocation();

  //when we get true state then the hotel header is moved to up while clicking the link
  //when initial loading the URL it will not work
  useEffect(() => {
    if (scrollState.state) {
      window.scrollTo({
        top: refHotelHeader.current.offsetTop,
        behavior: "auto",
      });
    }
  }, [scrollState.state]);
  useEffect(() => {
    document.title = `Reviews of ${hotelName}, ${
      location.charAt(0).toUpperCase() + location.slice(1)
    }`;
  }, []);

  return (
    <>
      <section className="review-section">
        <h2>{hotelName} Reviews</h2>
        {reviewsData.map((item, index) => {
          return <ReviewContainer {...item} key={index} />;
        })}
      </section>
    </>
  );
};

const ReviewContainer = ({
  name,
  profile,
  ratings,
  votes,
  comments,
  reviews,
  reviewText,
  reviewTime,
}) => {
  const [btn, setBtn] = useState(false);
  const [like, setLike] = useState(false);

  const buttonHandler = () => {
    setBtn(!btn);
  };
  const likeHandler = () => {
    setLike(!like);
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="review-container">
      <div className="reviewer-container">
        {/* reviewer details */}
        <div className="reviewer-details">
          <div className="profile-img">
            {imageLoaded ? "" : <div className="image-loading"></div>}
            <img
              src={profile}
              alt={name}
              style={imageLoaded ? {} : { display: "none" }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className="reviewer-content">
            <p className="reviewer-name">{name}</p>
            <p className="reviews-given">{reviews} reviews . 0 Followers</p>
          </div>
        </div>
        {/* follow button */}
        <button
          className="follow-button"
          style={{
            backgroundColor: btn ? "rgb(240, 140, 158)" : "white",
            color: btn ? "white" : "rgb(240, 140, 158)",
          }}
          onClick={buttonHandler}
        >
          {btn ? "Followed" : "Follow"}
        </button>
      </div>
      <div className="review-details">
        <div className="review">
          {/* ratings */}
          <p className="review-ratings">
            <span>{ratings}</span>
            <span className="review-rating-icon">
              <AiFillStar />
            </span>
          </p>
          <p> DELIVERY</p>
          <p className="review-time">{reviewTime} hours ago</p>
        </div>
        {/* review */}
        <p className="review-text">{reviewText}</p>
        <p className="review-votes">
          {votes} Votes for helpful, {comments} Comments
        </p>
        {/* reaction icons */}
        <div className="review-upvote">
          <p onClick={likeHandler}>
            <span>{like ? <HiThumbUp /> : <FiThumbsUp />}</span>
            Helpful
          </p>
          <p>
            <span>
              <BiCommentDetail />
            </span>
            Comment
          </p>
          <p>
            <span>
              <RiShareForwardLine />
            </span>
            Share
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
