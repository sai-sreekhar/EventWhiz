import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux";
import { apiStatus, authOperation, authStatus } from "../redux/auth/authTypes";
import { useLocation, useNavigate } from "react-router";
import * as React from "react";
import MuiAlert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import "./../styles/Bootstrap.css";
import "./../styles/Login.css";
import Logo from "./../assets/images/Group91.png";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [redirectPath, setRedirectPath] = useState("/");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      auth.apiStatus === apiStatus.FAILURE &&
      auth.authOperation === authOperation.LOGIN &&
      auth.authStatus === authStatus.NOT_LOGGED_IN
    ) {
      setOpen(true);
    }

    if (
      auth.apiStatus === apiStatus.SUCCESS &&
      auth.authOperation === authOperation.LOGIN &&
      auth.authStatus === authStatus.LOGGED_IN &&
      auth.accessToken
    ) {
      //if redirect path is home or service or testimonials or contactus then redirect to dashboard
      if (
        redirectPath === "/" ||
        redirectPath === "/services" ||
        redirectPath === "/testimonials" ||
        redirectPath === "/contact"
      ) {
        navigate("/dashboard");
        return;
      }

      navigate(redirectPath);
    }

    return () => {};
  }, [auth.apiStatus, auth.authOperation, auth.authStatus]);

  useEffect(() => {
    setRedirectPath(location.state?.path || "/");
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
      dispatch(authActions.login(email, password));
    }
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {auth.errorReason}
        </Alert>
      </Snackbar>
      <div className="LoginWholeBody container-fluid">
        <div className="row">
          <div className="col-6 ImageLogin">
            <div className="EventWhizlogo">
              <Link to={"/"} className="">
                <img src={Logo} alt="" />
              </Link>
            </div>
            <div className="LoginText">
              To Continue,
              <br />
              Sign in to EventWhiz.
            </div>
          </div>
          <div className="col-6 SideImage">
            <div className="row pageCenter">
              <div
                className="col-12 text-center pb-4 "
                style={{ fontWeight: "600", fontSize: "3.3rem" }}
              >
                Welcome back!
              </div>
              <div className="offset-3 col-9">
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={!!emailError}
                    helperText={emailError}
                    sx={{ width: "70%" }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ width: "70%" }}
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "white",
                      textDecoration: "none",
                      border: "2px solid black",
                      padding: "8px 20px",
                      fontSize: "18px",
                      background: "transparent",
                      position: "relative",
                      transition: "all 0.5s",
                      overflow: "hidden",
                      backgroundColor: "#274A8D",
                      borderRadius: "5px",
                      fontFamily: "Oswald",
                      width: "40%",
                      marginLeft: "15%",
                      "&:hover": {
                        textDecoration: "none",
                        border: "2px solid black",
                        padding: "8px 20px",
                        fontSize: "18px",
                        background: "transparent",
                        position: "relative",
                        transition: "all 0.5s",
                        overflow: "hidden",
                        backgroundColor: "#274A8D",
                        borderRadius: "5px",
                        fontFamily: "Oswald",
                        color: "black",
                      },
                    }}
                    loading={
                      auth.apiStatus === apiStatus.IN_PROGRESS &&
                      auth.authOperation === authOperation.LOGIN &&
                      auth.authStatus === authStatus.NOT_LOGGED_IN
                    }
                  >
                    <span className="pe-2">Login</span>
                    <FaSignInAlt />
                  </LoadingButton>
                </Box>
                <div className="RegisterButton">
                  <div
                    style={{
                      paddingTop: "20px",
                      paddingLeft: "25px",
                      fontSize: "18px",
                    }}
                  >
                    {"Don't have an account?"}
                  </div>
                  <Link to={"/signup"} className="">
                    <button className="btn1 btn-1 mt-3">REGISTER NOW</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
