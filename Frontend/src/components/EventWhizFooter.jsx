import logo from "./../assets/images/Group91.png";
import "@fontsource/cabin";
import { FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import "./../styles/Bootstrap.css";
import "./../styles/EventWhizFooter.css";

const EventWhizFooter = () => {
  return (
    <div className="FooterEverything">
      <div className="HorizontalLineWhite" />
      <div className="container-fluid footer py-3 ">
        <div className="row">
          <div className="col-md-3 col-sm-5">
            <div className="fw-bold footer-heading">Menu</div>
            <div className="footer-sub pt-2">
              <div>
                <a href={"Link"}>Events</a>
              </div>
              <div>
                <a href={"Link"}>About</a>
              </div>
              <div>
                <a href={"Link"}>Terms & Condition</a>
              </div>
              <div>
                <a href={"Link"}>Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-7 text-center">
            <div className="fw-bold footer-heading mobile-padding">
              Connect us
            </div>
            <div className="pt-2" style={{ paddingTop: "1rem" }}>
              <a
                href={"Link"}
                className="me-sm-1 me-md-1 fs-md-2 ms-xl-3 ms-lg-2 ms-sm-1 p-2 fa-brands"
              >
                <FaSquareXTwitter />
              </a>
              <a href={"Link"} className="me-sm-1 me-md-1">
                <i className="fa-brands fs-md-2 ms-xl-3 ms-lg-2 ms-sm-1 p-2">
                  <FaInstagram />
                </i>
              </a>
              <a href={"Link"} className="me-sm-1 me-md-1">
                <i className="fa-brands fs-md-2 ms-xl-3 ms-lg-2 ms-sm-1 p-2">
                  <FaFacebook />
                </i>
              </a>
            </div>
          </div>
          <div className="col-md-3 col-sm-5 tablet-pading">
            <div className="fw-bold footer-heading">Contact</div>
            <div className="footer-sub pt-2 footer-sub-contact">
              <a href={"Link"} className="contact-msg">
                Send us a Message
              </a>
            </div>
            <div className="footer-sub pt-3 footer-sub-contact">
              85 Golden Street , Dalingjut
              <br />
              EPR 2019,United States
            </div>
            <div className="footer-sub pt-3 footer-sub-contact">
              <a href={"Link"} className="contact-msg">
                vitstudent@gmail.com
                <br />
              </a>
              1243-231-34413
            </div>
          </div>
          <div className="col-md-4 text-center col-sm-7 tablet-pading ">
            <div className="d-inline">
              <img src={logo} alt="Logo" height="71px" width="290px" />
            </div>
            <div
              style={{ paddingTop: "1rem" }}
              className="footer-sub text-center footer-sub-logo"
            >
              Reowned brand to incoperate
              <br />
              happiness to your life
            </div>
            <div
              style={{ paddingTop: "2rem" }}
              className="footer-sub text-center footer-sub-logo"
            >
              copyright@2023 | All rights reserved
              <br />
              Designed and Developed by Team 19.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventWhizFooter;
