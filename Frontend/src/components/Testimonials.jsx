import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../styles/Bootstrap.css";
import "./../styles/Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa6";
import Navbar from "./HomeNavBar";
import EventWhixFooter from "./EventWhizFooter";
const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="TestimonialsWholeBody">
      <div className="container-fluid">
        <div
          className="container container-body"
          style={{ borderRadius: "35px" }}
        >
          <Navbar />
          <div className="TestimonialsBody pt-2">
            <div className="row py-5">
              <div className="col-12 text-center">
                <div className="TestimonialsBodyHeading1">
                  WHAT DO THEY SAY?
                </div>
                <div className="TestimonialsBodyHeading2">RECENT REVIEWS</div>
              </div>
            </div>
            <div className="slideshow-container pb-5">
              <Slider {...settings}>
                <div>
                  <div className="card">
                    <h1 className="CardName">Godala Sai Sreekar</h1>
                    <h5>-Developer</h5>
                    <div className="CardCaption">
                      <FaQuoteLeft />
                      <br />
                      EventWhiz provides a seamless and user-friendly interface, making it incredibly easy to host or attend events with just a single click. The intuitive design enhances the overall user experience, ensuring a hassle-free process from event creation to ticket purchase.
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card">
                    <h1 className="CardName">Nalam Guna Sri Krishna</h1>
                    <h5>-Developer</h5>
                    <div className="CardCaption">
                      <FaQuoteLeft />
                      <br />
                      I'm impressed with EventWhiz's efficient event management system. Whether you're a host or attendee, the platform streamlines the process of filling out event details and purchasing tickets. It's a one-stop solution that simplifies the entire event experience.
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card">
                    <h1 className="CardName">Sam Pillutla</h1>
                    <h5>-Developer</h5>
                    <div className="CardCaption">
                      <FaQuoteLeft />
                      <br />
                      EventWhiz has truly revolutionized event planning. The convenience of being able to host or join events with just a few clicks saves so much time. No more complicated forms or tedious processes – just a quick and easy way to make your events happen.
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card">
                    <h1 className="CardName">CH DEVAK REDDY</h1>
                    <h5>-Tester</h5>
                    <div className="CardCaption">
                      <FaQuoteLeft />
                      <br />
                      One of the standout features of EventWhiz is the platform's attention to detail. As a host, I appreciate the ability to provide comprehensive event details, ensuring attendees have all the information they need. It creates a more informed and engaged event experience.
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card">
                    <h1 className="CardName">MANCHUKONDA ABHIRAM</h1>
                    <h5>-Tester</h5>
                    <div className="CardCaption">
                      <FaQuoteLeft />
                      <br />
                      EventWhiz's ticketing system is not only user-friendly but also highly secure. The platform prioritizes the safety of transactions, giving both hosts and attendees peace of mind. It's great to know that your event and financial information are in safe hands.
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <EventWhixFooter/>
    </div>
  );
};

export default Testimonials;
