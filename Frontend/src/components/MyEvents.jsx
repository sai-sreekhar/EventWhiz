import { useDispatch, useSelector } from "react-redux";
import withAuth from "./withAuth";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { eventActions } from "../redux";
import MuiAlert from "@mui/material/Alert";
import { apiStatus, eventOperations } from "../redux/events/eventTypes";
import LoadingButton from "@mui/lab/LoadingButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyEvents = () => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [eventidToDelete, setEventIdToDelete] = useState(null);
  const events = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventActions.getMyHostedEvents());
  }, []);

  useEffect(() => {
    if (
      events.apiStatus === apiStatus.IN_PROGRESS &&
      events.eventOperation === eventOperations.GET_MY_HOSTED_EVENTS
    ) {
      setBackdropOpen(true);
      setSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.GET_MY_HOSTED_EVENTS
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.GET_MY_HOSTED_EVENTS
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.DELETE_MY_HOSTED_EVENT
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.DELETE_MY_HOSTED_EVENT
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
      dispatch(eventActions.getMyHostedEvents());
    } else {
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

  const deleteEventHandler = (eventId) => {
    setEventIdToDelete(eventId);
    dispatch(eventActions.deleteMyHostedEvent(eventId));
  };

  return (
    <>
      <div style={{ height: "130vh" }}>
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
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            marginTop: "-250px",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            marginBottom="30px"
            sx={{ color: "white" }}
          >
            MY HOSTED EVENTS
          </Typography>

          <Grid container spacing={2} pl={2} pr={2}>
            {events.myHostedEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      navigate(`/browseEvents/${event._id}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.image}
                      alt="Event Image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {event.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(Number(event.date)).toUTCString()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{
                        backgroundColor: "blue",
                        ":hover": { backgroundColor: "green" },
                      }}
                      onClick={() => {
                        navigate(`/browseEvents/${event._id}`);
                      }}
                    >
                      <Typography variant="body2" color="white">
                        View Event
                      </Typography>
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        backgroundColor: "blue",
                        ":hover": { backgroundColor: "green" },
                      }}
                      onClick={() => {
                        navigate(`/updateEvent/${event._id}`);
                      }}
                    >
                      <Typography variant="body2" color="white">
                        Update Details
                      </Typography>
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        backgroundColor: "blue",
                        ":hover": { backgroundColor: "green" },
                      }}
                      onClick={() => {
                        navigate(`/myEvents/registrations/${event._id}`);
                      }}
                    >
                      <Typography variant="body2" color="white">
                        View Registrations
                      </Typography>
                    </Button>
                    <LoadingButton
                      size="small"
                      sx={{
                        backgroundColor: "red",
                        ":hover": { backgroundColor: "darkred" },
                      }}
                      onClick={() => {
                        deleteEventHandler(event._id);
                      }}
                      variant="contained"
                      loading={
                        events.apiStatus === apiStatus.IN_PROGRESS &&
                        events.eventOperation ===
                          eventOperations.DELETE_MY_HOSTED_EVENT &&
                        eventidToDelete === event._id
                      }
                    >
                      <Typography variant="body2" color="white">
                        Delete Event
                      </Typography>
                    </LoadingButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default withAuth(MyEvents);
