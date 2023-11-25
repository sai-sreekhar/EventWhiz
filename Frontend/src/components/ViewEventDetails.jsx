import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { eventActions } from "../redux";
import {
  Backdrop,
  Box,
  CardMedia,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { apiStatus, eventOperations } from "../redux/events/eventTypes";
import MuiAlert from "@mui/material/Alert";
import withAuth from "./withAuth";
import LoadingButton from "@mui/lab/LoadingButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewEventDetails() {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const eventId = params.eventId;
  const events = useSelector((state) => state.events);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(eventActions.getEventDetails(eventId));
  }, []);

  useEffect(() => {
    if (
      events.apiStatus === apiStatus.IN_PROGRESS &&
      events.eventOperation === eventOperations.GET_EVENT_DETAILS
    ) {
      setBackdropOpen(true);
      setSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.GET_EVENT_DETAILS
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.GET_EVENT_DETAILS
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.BUY_TICKET
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.BUY_TICKET
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
      navigate("/myBookings");
    } else if (
      events.apiStatus === apiStatus.IN_PROGRESS &&
      events.eventOperation === eventOperations.BUY_TICKET
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
    }
  }, [events.apiStatus, events.eventOperation]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const buyTicketHandler = () => {
    dispatch(eventActions.buyTicket(eventId));
  };

  return (
    <>
      <div
        style={{
          height: "1000px",
          backgroundImage:
            "linear-gradient(#031326,#0a1a2e,rgba(7, 21, 39, 0.9))",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {events.errorReason}
          </Alert>
        </Snackbar>

        {events.eventDetails[eventId] && (
          <Grid
            container
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={12} mt={5}>
              <Typography variant="h3" color="#d0d0d0">
                {events.eventDetails[eventId].name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mb={5}>
              <CardMedia
                component="img"
                height="400px"
                width="auto"
                image={events.eventDetails[eventId].image}
                alt="Event Image"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              mb={5}
              sx={{
                display: "flex",
                padding: "30px",
                backgroundImage:
                  "linear-gradient(45deg,#2063ac,#4598EC,#DFCA9F)",
                width: "900px",
                height: "400px",
                borderRadius: "10px",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                flexGrow={1}
              >
                <Typography color="black">
                  <b
                    style={{
                      fontSize: "30px",
                      fontWeight: "30px",
                      color: "black",
                      fontFamily: "monospace",
                    }}
                  >
                    EVENT ON:
                  </b>{" "}
                  <span
                    style={{
                      color: "black",
                      fontSize: "27px",
                      fontWeight: "30px",
                    }}
                  >
                    {new Date(
                      Number(events.eventDetails[eventId].date)
                    ).toUTCString()}
                  </span>
                </Typography>

                <Typography color="black">
                  <b
                    style={{
                      fontSize: "18px",
                      fontWeight: "30px",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    VENUE:{" "}
                  </b>
                  <span style={{ fontSize: "17px", fontFamily: "cabin" }}>
                    {events.eventDetails[eventId].location}
                  </span>
                </Typography>
                <Typography color="black">
                  <b
                    style={{
                      fontSize: "18px",
                      fontWeight: "30px",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    PARTICIPANTS LIMIT:{" "}
                  </b>
                  <span style={{ fontSize: "17px", fontFamily: "cabin" }}>
                    {events.eventDetails[eventId].limit}
                  </span>
                </Typography>
                <Typography
                  style={{ marginTop: "8px", marginBottom: "20px" }}
                  color="black"
                >
                  <b
                    style={{
                      fontSize: "18px",
                      fontWeight: "30px",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    DESCRIPTION:{" "}
                  </b>
                  <span style={{ fontSize: "17px", fontFamily: "cabin" }}>
                    {events.eventDetails[eventId].description}
                  </span>
                </Typography>
                <Typography color="black">
                  <b
                    style={{
                      fontSize: "18px",
                      fontWeight: "30px",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    ORGANIZER:{" "}
                  </b>
                  <span style={{ fontSize: "17px", fontFamily: "cabin" }}>
                    {events.eventDetails[eventId].hostName}
                  </span>
                </Typography>
                <Typography color="black">
                  <b
                    style={{
                      fontSize: "18px",
                      fontWeight: "30px",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    CONTACT:{" "}
                  </b>
                  <span style={{ fontSize: "17px", fontFamily: "cabin" }}>
                    {events.eventDetails[eventId].hostContact}
                  </span>
                </Typography>
                <Typography color="black">
                  <b
                    style={{
                      fontSize: "18px",
                      fontWeight: "30px",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    EMAIL:{" "}
                  </b>
                  <span style={{ fontSize: "17px", fontFamily: "cabin" }}>
                    {events.eventDetails[eventId].hostEmail}
                  </span>
                </Typography>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={buyTicketHandler}
                  loading={
                    events.apiStatus === apiStatus.IN_PROGRESS &&
                    events.eventOperation === eventOperations.BUY_TICKET
                  }
                >
                  BUY TICKET
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}

export default withAuth(ViewEventDetails);
