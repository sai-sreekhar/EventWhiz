import "./../styles/Dashboard.css";
import "./../styles/Bootstrap.css";
import c1 from "./../assets/images/c1.jpg";
import c2 from "./../assets/images/c2.jpg";
import c3 from "./../assets/images/c3.jpg";
import c4 from "./../assets/images/c4.jpg";
import c5 from "./../assets/images/c5.jpg";
import f1 from "./../assets/images/f1.jpeg";
import f2 from "./../assets/images/f2.jpeg";
import f3 from "./../assets/images/f3.jpeg";
import f4 from "./../assets/images/f4.jpeg";
import f5 from "./../assets/images/f5.jpeg";
import f6 from "./../assets/images/f6.jpeg";
import p1 from "./../assets/images/p1.jpeg";
import p2 from "./../assets/images/p2.jpeg";
import p3 from "./../assets/images/p3.jpeg";
import p4 from "./../assets/images/p4.jpeg";
import thunder from "./../assets/images/thunder.png";
import steps from "./../assets/images/steps.png";
import Event from "./EventWhizFooter";
import { Link } from "react-router-dom";
import {
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CImage,
} from "@coreui/react";
import withAuth from "./withAuth";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
    <div className="body-dash">
      <div className="con">
        {/* Carousel begin */}
        <CCarousel controls indicators transition="crossfade">
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={c1}
              alt="slide 1 "
              style={{ height: "700px" }}
            />
            <CCarouselCaption className="carousel-caption d-none d-md-block">
              <div className="text">
                <h2 className="t1">Hey {auth.userData.name},</h2>
                <h2 className="t2 display-2 text-warning fw-bold">Eventwhiz</h2>
                <h1 className="t2 display-1 text-white fw-normal">
                  Creating moments
                </h1>
                <Link to={"/browseEvents"} className="">
                  <button className="button2"></button>
                </Link>
              </div>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={c2}
              alt="slide 2"
              style={{ height: "700px" }}
            />
            <CCarouselCaption className="carousel-caption d-none d-md-block">
              <div className="text">
                <h2 className="t1">Hey {auth.userData.name},</h2>
                <h2 className="t2 display-2 text-warning fw-bold">Eventwhiz</h2>
                <h1 className="t2 display-1 text-white fw-normal">
                  Creating moments
                </h1>
                <Link to={"/browseEvents"} className="">
                  <button className="button2"></button>
                </Link>
              </div>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={c3}
              alt="slide 3"
              style={{ height: "700px" }}
            />
            <CCarouselCaption className="carousel-caption d-none d-md-block">
              <div className="text">
                <h2 className="t1">Hey {auth.userData.name},</h2>
                <h2 className="t2 display-2 text-warning fw-bold">Eventwhiz</h2>
                <h1 className="t2 display-1 text-white fw-normal">
                  Creating moments
                </h1>
                <Link to={"/browseEvents"} className="">
                  <button className="button2"></button>
                </Link>
              </div>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={c4}
              alt="slide 4"
              style={{ height: "700px" }}
            />
            <CCarouselCaption className="carousel-caption d-none d-md-block">
              <div className="text">
                <h2 className="t1">Hey {auth.userData.name},</h2>
                <h2 className="t2 display-2 text-warning fw-bold">Eventwhiz</h2>
                <h1 className="t2 display-1 text-white fw-normal">
                  Creating moments
                </h1>
                <Link to={"/browseEvents"} className="">
                  <button className="button2"></button>
                </Link>
              </div>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src={c5}
              alt="slide 5"
              style={{ height: "700px" }}
            />
            <CCarouselCaption className="carousel-caption d-none d-md-block">
              <div className="text">
                <h2 className="t1">Hey {auth.userData.name},</h2>
                <h2 className="t2 display-2 text-warning fw-bold">Eventwhiz</h2>
                <h1 className="t2 display-1 text-white fw-normal">
                  Creating moments
                </h1>
                <Link to={"/browseEvents"} className="">
                  <button className="button2"></button>
                </Link>
              </div>
            </CCarouselCaption>
          </CCarouselItem>
        </CCarousel>

        {/* Carousel end */}

        <h1 className="heading1">Event Categories</h1>

        {/* Category Cards */}
        <div className="cat-cards">
          <div className="card1">
            <div className="card-front">
              <img className="image4" src={p1} alt="music" />
              <p className="title pt-2">Business & Seminars</p>
            </div>
            <div className="card-back">
              <p>
                Effortlessly orchestrate your next seminar or business meeting
                with the simplicity of a single click.
              </p>
            </div>
          </div>
          <div className="card2">
            <div className="card-front">
              <img className="image4" src={p2} />
              <p className="title pt-2">Sports & Fitness</p>
            </div>
            <div className="card-back">
              <p>
                Connect with your customers or effortlessly book tickets for any
                sports and fitness events at your convenience.
              </p>
            </div>
          </div>
          <div className="card3">
            <div className="card-front">
              <img className="image4" src={p3} />
              <p className="title pt-2">Music & Concerts</p>
            </div>
            <div className="card-back">
              <p>
                Experience the bash! Immerse yourself in the synergy of music,
                sound, lights, and vibes. We are here to craft a platform that
                connects you directly with your audience.
              </p>
            </div>
          </div>
          <div className="card4">
            <div className="card-front">
              <img className="image4" src={p4} />
              <p className="title pt-2">Food & Drinks</p>
            </div>
            <div className="card-back">
              <p>
                Indulge in a feast of food, drinks, and home parties, and more!
                Secure your spot at the festivities with just a click – donot
                miss out, act now!
              </p>
            </div>
          </div>
        </div>

        {/* Category cards end */}

        <h1 className="heading1">
          <img className="img-thunder" src={thunder} alt="thunder" />
          Popular Events
        </h1>

        {/* Popular Event Cards start */}
        <div className="popular-cards">
          <div className="cardp">
            <div className="card-image">
              <img className="card-image" src={f1} alt="popular events" />
            </div>
            <div className="category px-2"> MANIPAL </div>
            <div className="heading2 px-2">
              A Global Marketing Conference
              <div className="date1">02 Jan 2023 | Banjan Grounds</div>
            </div>
            <div className="card-fotter">
              <p className="author">
                <span>Music & Concert</span>
              </p>
            </div>
          </div>

          <div className="cardp">
            <div className="card-image">
              <img className="card-image" src={f2} alt="popular events" />
            </div>
            <div className="category px-2"> MANIPAL </div>
            <div className="heading2 px-2">
              A Global Marketing Conference
              <div className="date1">02 Jan 2023 | Banjan Grounds</div>
            </div>
            <div className="card-fotter">
              <p className="author">
                <span>Music & Concert</span>
              </p>
            </div>
          </div>

          <div className="cardp">
            <div className="card-image">
              <img className="card-image" src={f3} alt="popular events" />
            </div>
            <div className="category px-2"> MANIPAL </div>
            <div className="heading2 px-2">
              A Global Marketing Conference
              <div className="date1">02 Jan 2023 | Banjan Grounds</div>
            </div>
            <div className="card-fotter">
              <p className="author">
                <span>Music & Concert</span>
              </p>
            </div>
          </div>
        </div>
        <div className="popular-cards">
          <div className="cardp">
            <div className="card-image">
              <img className="card-image" src={f4} alt="popular events" />
            </div>
            <div className="category px-2"> MANIPAL </div>
            <div className="heading2 px-2">
              A Global Marketing Conference
              <div className="date1">02 Jan 2023 | Banjan Grounds</div>
            </div>
            <div className="card-fotter">
              <p className="author">
                <span>Music & Concert</span>
              </p>
            </div>
          </div>
          <div className="cardp">
            <div className="card-image">
              <img className="card-image" src={f5} alt="popular events" />
            </div>
            <div className="category px-2"> MANIPAL </div>
            <div className="heading2 px-2">
              A Global Marketing Conference
              <div className="date1">02 Jan 2023 | Banjan Grounds</div>
            </div>
            <div className="card-fotter">
              <p className="author">
                <span>Music & Concert</span>
              </p>
            </div>
          </div>
          <div className="cardp">
            <div className="card-image">
              <img className="card-image" src={f6} alt="popular events" />
            </div>
            <div className="category px-2"> MANIPAL </div>
            <div className="heading2 px-2">
              A Global Marketing Conference
              <div className="date1">02 Jan 2023 | Banjan Grounds</div>
            </div>
            <div className="card-fotter">
              <p className="author">
                <span>Music & Concert</span>
              </p>
            </div>
          </div>
        </div>

        {/* Popular Event Cards end */}

        <div className="heading3">
          <Link to={"/browseEvents"} className="">
            <button
              className="button2 mx-1"
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            ></button>
          </Link>
        </div>
        <div className="stepsbox">
          <p className="heading4 display-4 text-black">In 3 Simple steps</p>
          <img className="stepsimg" src={steps}></img>
        </div>
      </div>
      <Event />
    </div>
    </>

  );
};

export default withAuth(Dashboard);
