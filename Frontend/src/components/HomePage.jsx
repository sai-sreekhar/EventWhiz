// TODO: Slide Buttons kudirithe cheyi font increasing.
import "./../styles/Bootstrap.css";
import "./../styles/HomePage.css";
import Image1 from "./../assets/images/image35.png";
import Image2 from "./../assets/images/image36.png";
import "@fontsource/cabin";
import "@fontsource/oswald";
import CardSlider from "./CardSlider";
import Navbar from "./HomeNavBar";
import EventWhixFooter from "./EventWhizFooter";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    // call api or anything
    var cols = document.getElementsByClassName('slick-next');
    cols[0].style.fontSize='50px'
    // cols[0].style.content="\2192"
    // for(let i=0; i<cols.length; i++) {
    //   cols[i].style.width = '450px';  
    //   cols[i].style.marginLeft = '15px';  
    // }
 },[]);
  return (
    <div className="HomeWholeBody">
      <div className="container-fluid">
        <div
          className="container container-body "
          style={{ borderRadius: "35px" }}
        >
          <Navbar />
          <div className="HomeBody">
            <div className="HomeWelcome">
              <div className="row">
                <div className="col-4 HomeWelcomeSub">
                  <div style={{ fontSize: "32px" }}>Welcome to</div>
                  <div style={{ fontSize: "58px" }}>EventWhiz</div>
                </div>
                <div className="col-1"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 text-end">
                <img
                  src={Image1}
                  alt=""
                  className="HomeWelcomeSubImage1"
                  height={"372px"}
                />
              </div>
              <div className="col-3 text-end">
                <img
                  src={Image2}
                  alt=""
                  className="HomeWelcomeSubImage2"
                  height={"350px"}
                />
              </div>
              <div className="col-5 HomeWelcomeSubText">
                HOST
                <br />
                YOUR
                <br />
                EVENTS
              </div>
            </div>
            <div className="container container-SubBody">
              <div style={{ color: "#000000" }}>CELEBRATE WITH</div>
              <div style={{ color: "#194476" }}>EVENTWHIZ</div>
              <div style={{ fontSize: "28px" }} className="pt-4">
                Uncover a world of extraordinary experiences and create memories
                that will last a lifetime. From exhilarating concerts to
                captivating workshops, we have something for every soul to
                cherish. Dive into a curated selection of events, effortlessly
                plan your next adventure, and let{" "}
                <span className="EventWhizTitle">EventWhiz</span> be your guide
                to unforgettable moments.
              </div>
              <div className="row pb-5">
                <div className="col-6 text-end pe-5">
                  <Link to={"/login"} className="">
                    <button className="btn1">Sign in</button>
                  </Link>
                </div>
                <div className="ps-3 col-6 text-start">
                  <Link to={"/signup"} className="">
                    <button className="btn1 btn-1">REGISTER NOW</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="popular-events">POPULAR EVENTS</div>
            <CardSlider />
            <div className="caption">
              <span className="text-danger">“</span>
              Creating memories, Crafting moments
              <span className="text-danger">”</span>
            </div>
            <div className="ps-3 col-12 text-center pb-5 pt-4">
              <Link to={"/signup"} className="">
                <button className="btn1 btn-1">REGISTER NOW</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <EventWhixFooter />
    </div>
  );
};

export default HomePage;
