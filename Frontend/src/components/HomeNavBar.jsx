import logo from "./../assets/images/Group91.png";
import "./../styles/HomeNavBar.css";
import "./../styles/Bootstrap.css";
import { Link } from "react-router-dom";
const HomeNavBar = () => {
  return (
    <div>
      <div className="container-navbar mt-3">
        <div className="row">
          <div className="col-3 text-end">
            <img src={logo} alt="Logo" width={"290px"} height={"71px"} />
          </div>
          <div className="offset-2 col-3 navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link text-white pe-3">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/services"} className="nav-link text-white pe-3">
                    Service
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/testimonials"}
                    className="nav-link text-white pe-3"
                  >
                    Testimonials
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/contact"} className="nav-link text-white pe-3">
                    ContactUs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="offset-2 col-2 navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/dashboard"} className="text-white ">
                    <button className="button ms-3">
                      Dashboard
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                        ></path>
                      </svg>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="HorizontalLine"></div>
    </div>
  );
};

export default HomeNavBar;
