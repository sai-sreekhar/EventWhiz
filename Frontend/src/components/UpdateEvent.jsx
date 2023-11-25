import { useDispatch, useSelector } from "react-redux";
import withAuth from "./withAuth";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import LoadingButton from "@mui/lab/LoadingButton";
import { eventActions } from "../redux";
import React, { useEffect, useState } from "react";
import { apiStatus, eventOperations } from "../redux/events/eventTypes";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateEvent() {
  const auth = useSelector((state) => state.auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [dataTimeError, setDateTimeError] = useState(false);
  const params = useParams();
  const eventId = params.eventId;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const [dateTime, setDateTime] = useState(events.eventDetails[eventId].date);


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
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.GET_EVENT_DETAILS
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.GET_EVENT_DETAILS
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.IN_PROGRESS &&
      events.eventOperation === eventOperations.UPDATE_EVENT
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.UPDATE_EVENT
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(false);
      navigate("/myEvents");
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.UPDATE_EVENT
    ) {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    } else {
      setBackdropOpen(false);
      setSnackbarOpen(false);
    }
  }, [events.apiStatus, events.eventOperation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (dateTime < Date.now()) {
      setDateTimeError(true);
      return;
    }

    const data = new FormData(event.currentTarget);
    const eventDetails = {
      name: data.get("title"),
      location: data.get("location"),
      limit: data.get("limit"),
      description: data.get("description"),
      date: dateTime,
      price: 1000,
    };
    dispatch(eventActions.updateEvent(eventId, eventDetails));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleDateTimeChange = (newValue) => {
    setDateTime(newValue.$d.getTime());
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

      <Snackbar
        open={dataTimeError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {"Date and Time cannot be in the past"}
        </Alert>
      </Snackbar>

      {events.eventDetails[eventId] && (
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            mt: 2,
            p: 2,
            backgroundColor: "lightblue",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
            sm={12}
            md={6}
            mt={2}
            p={2}
          >
            <Typography variant="h3" color="black">
              Host Details
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              disabled
              id="name"
              label="Name"
              name="name"
              autoComplete="Name"
              defaultValue={auth.userData.name}
            />
            <TextField
              margin="normal"
              disabled
              fullWidth
              name="email"
              label="email"
              id="email"
              autoComplete="email"
              defaultValue={auth.userData.email}
            />
            <TextField
              margin="normal"
              disabled
              fullWidth
              id="contact"
              label="contact"
              name="contact"
              autoComplete="contact"
              defaultValue={auth.userData.contact}
            ></TextField>
          </Grid>
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column" }}
            xs={12}
            sm={12}
            md={6}
            p={2}
          >
            <Typography variant="h3" color="black">
              Event Details
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              required
              id="title"
              label="Event Title"
              name="title"
              autoComplete="title"
              autoFocus
              defaultValue={events.eventDetails[eventId].name}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="location"
              label="Location"
              name="location"
              autoComplete="location"
              defaultValue={events.eventDetails[eventId].location}
            />
            <TextField
              margin="normal"
              fullWidth
              type="number"
              required
              id="limit"
              label="Participants Limit"
              name="limit"
              autoComplete="limit"
              defaultValue={events.eventDetails[eventId].limit}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Select Date"
                slotProps={{ textField: { fullWidth: true } }}
                defaultValue={dayjs(
                  new Date(Number(events.eventDetails[eventId].date))
                )}
                sx={{
                  mt: 1,
                }}
                name="date"
                onChange={handleDateTimeChange}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              fullWidth
              required
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              defaultValue={events.eventDetails[eventId].description}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={
                events.apiStatus === apiStatus.IN_PROGRESS &&
                events.eventOperation === eventOperations.HOST_EVENT
              }
            >
              Update Event
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default withAuth(UpdateEvent);
