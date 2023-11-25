import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../styles/CardSlider.css";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";

const CardSlider = () => {
  const cardData = [
    {
      Title: "IIFA Awards",
      Description:
        "Bollywood's prestigious film awards, globally celebrating excellence in Indian cinema.",
      City: "Mumbai",
      Date: "22-09-2019",
    },
    {
      Title: "World Cup",
      Description:
        "The pinnacle of international cricket, featuring the world's best teams in a thrilling final match.",
      City: "London",
      Date: "14-07-2019",
    },
    {
      Title: "Navratri Festival",
      Description:
        "A vibrant nine-night Hindu festival celebrating the goddess Durga through dance and music.",
      City: "Various",
      Date: "29-09-2019",
    },
    {
      Title: "Ganesh Chaturthi",
      Description:
        "Hindu festival honoring Lord Ganesha, marked by elaborate idol processions and cultural events.",
      City: "Mumbai",
      Date: "02-09-2019",
    },
    {
      Title: "Auto Expo",
      Description:
        "India's largest automobile exhibition showcasing the latest innovations and trends in the automotive industry.",
      City: "Greater Noida",
      Date: "07-02-2020",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {cardData.map((card, index) => (
          <div key={index} className="card">
            <div className="carousel-body">
              <div className="carousel-body-sub">
                <div className="CarouselBodyHeading">{card.Title}</div>
                <div className="CarouselBodyDesc">{card.Description}</div>
                <div className="CarouselBodyLocDate">
                  <FaCalendarDays />
                  {card.Date}
                </div>
                <div className="CarouselBodyLocDate">
                  <FaLocationDot />
                  {card.City}
                </div>
                <button className="btn btn-primary my-3 rounded-pill">
                  Attend
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="custom-dots">
        {cardData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
