import "./../styles/Bootstrap.css";
import "./../styles/ServicePage.css";
import Image1 from "./../assets/images/EventsImage1.png";
import Image2 from "./../assets/images/EventsImage2.png";
import Image3 from "./../assets/images/EventsImage3.png";
import Image4 from "./../assets/images/EventsImage4.png";
import Image5 from "./../assets/images/EventsImage5.png";
import Image6 from "./../assets/images/EventsImage6.png";
import Navbar from "./HomeNavBar";
import EventWhixFooter from "./EventWhizFooter";
import { Link } from "react-router-dom";
const ServicePage = () => {
  return (
    <div className="ServiceWholeBody">
      <div className="container-fluid">
        <div
          className="container container-body"
          style={{ borderRadius: "35px" }}
        >
          <Navbar />
          <div className="ServiceBody pt-2">
            <div className="row py-5">
              <div className="col-12 text-center">
                <div className="ServiceBodyHeading1">THIS IS WHAT</div>
                <div className="ServiceBodyHeading2">WE SERVE</div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 ServiceBodySub">
                <div className="container1">
                  <img
                    className="image"
                    src={Image2}
                    alt="Your Image"
                    width={"500rem"}/>
                  <div className="overlay Image1">
                    <h1 className="overlayHeading">Attend</h1>
                    <h2 className="overlaySubHeading">Events</h2>
                    <p className="overlayContent">
                    Join us for a captivating experience where we bring together individuals to celebrate and engage in meaningful conversations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 ServiceBodySub">
                <div className="container1">
                  <img
                    className="image"
                    src={Image1}
                    alt="Your Image"
                    width={"500rem"}
                  />
                  <div className="overlay Image2">
                    <h1 className="overlayHeading">Hosting</h1>
                    <h2 className="overlaySubHeading">Events</h2>
                    <p className="overlayContent">
                    Elevate your events with warmth and hospitality as we create moments of joy and connection.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 ServiceBodySub">
                <div className="container1">
                  <img
                    className="image"
                    src={Image3}
                    alt="Your Image"
                    width={"500rem"}
                  />
                  <div className="overlay Image3">
                    <h1 className="overlayHeading">Organizers</h1>
                    <h2 className="overlaySubHeading">For events</h2>
                    <p className="overlayContent">
                    Behind every successful event is a dedicated team of organizers committed to turning visions into reality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 ServiceBodySub">
                <div className="container1">
                  <img
                    className="image"
                    src={Image4}
                    alt="Your Image"
                    width={"500rem"}
                  />
                  <div className="overlay Image4">
                    <h1 className="overlayHeading">Professional</h1>
                    <h2 className="overlaySubHeading">Planners</h2>
                    <p className="overlayContent">
                    Trust our professional planners to seamlessly transform your vision into a meticulously executed event.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 ServiceBodySub">
                <div className="container1">
                  <img
                    className="image"
                    src={Image5}
                    alt="Your Image"
                    width={"500rem"}
                  />
                  <div className="overlay Image5">
                    <h1 className="overlayHeading">Venue</h1>
                    <h2 className="overlaySubHeading">Partners</h2>
                    <p className="overlayContent">
                    Craft unforgettable experiences with our trusted venue partners, tailoring settings for seamless and memorable events.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 ServiceBodySub">
                <div className="container1">
                  <img
                    className="image"
                    src={Image6}
                    alt="Your Image"
                    width={"500rem"}
                  />
                  <div className="overlay Image6">
                    <h1 className="overlayHeading">Dashboard</h1>
                    <h2 className="overlaySubHeading">view</h2>
                    <p className="overlayContent">
                      Explore data insights on our sleek dashboard for smart decision-making and a streamlined user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EventWhixFooter />
    </div>
  );
};

export default ServicePage;
