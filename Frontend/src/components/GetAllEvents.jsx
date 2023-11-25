import {
  Backdrop,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../redux";
import { apiStatus, eventOperations } from "../redux/events/eventTypes";
import * as React from "react";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GetAllEvents() {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  useEffect(() => {
    dispatch(eventActions.getAllEvents());
  }, []);

  useEffect(() => {
    if (
      events.apiStatus === apiStatus.IN_PROGRESS &&
      events.eventOperation === eventOperations.GET_ALL_EVENTS
    ) {
      setBackdropOpen(true);
      setSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.GET_ALL_EVENTS
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.GET_ALL_EVENTS
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
  return (
    <>
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

      <Grid
        item
        xs={12}
        sm={6}
        md={9}
        sx={{
          backgroundColor: "white",
          pt: 2,
          pb: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Grid container spacing={2} pl={2} pr={2}>
          {events.events.map((event) => (
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
                    sx={{ borderRadius: "10px" }}
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
                    color="primary"
                    onClick={() => {
                      navigate(`/browseEvents/${event._id}`);
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default GetAllEvents;
