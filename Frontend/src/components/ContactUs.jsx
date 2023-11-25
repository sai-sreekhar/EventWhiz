import Navbar from "./HomeNavBar";
import Footer from "./EventWhizFooter";
import "./../styles/Bootstrap.css";
import "./../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="ContactWholeBody">
      <div className="container-fluid">
        <div
          className="container container-body"
          style={{ borderRadius: "35px" }}
        >
          <Navbar />
          <div className="ContactBody pt-2">
            <div className="row py-5">
              <div className="col-12 text-center">
                <div className="ContactBodyHeading1">THIS IS WHAT</div>
                <div className="ContactBodyHeading2">WE SERVE</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="offset-1 col-6  text-end">
              <img
                src="https://cdn.dribbble.com/users/1602563/screenshots/8869646/media/ddc33ce2c8e2570c410123f375e2c35c.gif"
                alt=""
                className="img-fluid image-gif"
              />
            </div>
            <div className="ms-2 pt-2 col-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="YOUR NAME"
                />
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="EMAIL"
                />
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="SUBJECT"
                />
                <textarea
                  name=""
                  id=""
                  className="form-control mb-4"
                  rows={"5"}
                  placeholder="MESSAGE"
                ></textarea>
                <button className="btn-12 mb-4">
                  <span>SEND MESSAGE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
