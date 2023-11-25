import { useDispatch, useSelector } from "react-redux";
import withAuth from "./withAuth";
import { Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import LoadingButton from "@mui/lab/LoadingButton";
import { eventActions } from "../redux";
import React, { useEffect, useState } from "react";
import { apiStatus, eventOperations } from "../redux/events/eventTypes";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import UploadModalButton from "./UploadModalButton";
import { AWS_S3_EVENTS_BASE_URL } from "../constants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HostEvent() {
  const auth = useSelector((state) => state.auth);
  const [dateTime, setDateTime] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dataTimeError, setDateTimeError] = useState(false);
  const [uploadFailedSnackbarOpen, setUploadFailedSnackbarOpen] =
    useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailureError, setUploadFailureError] = useState("");
  const [fileName, setFileName] = useState("");
  const [generatedEventId, setGeneratedEventId] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.HOST_EVENT
    ) {
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.HOST_EVENT
    ) {
      navigate("/myEvents");
      setSnackbarOpen(false);
    }
  }, [events.apiStatus, events.eventOperation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (dateTime < Date.now()) {
      setDateTimeError(true);
      return;
    }
    if (!uploadSuccess) {
      setUploadFailedSnackbarOpen(true);
      setUploadFailureError("Please upload an image");
      return;
    }

    const data = new FormData(event.currentTarget);
    const eventDetails = {
      name: data.get("title"),
      location: data.get("location"),
      limit: data.get("limit"),
      description: data.get("description"),
      date: dateTime,
      image: `${AWS_S3_EVENTS_BASE_URL}/${generatedEventId}/${fileName}`,
      price: 1000,
    };
    dispatch(eventActions.hostEvent(eventDetails));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
    setDateTimeError(false);
    setUploadFailedSnackbarOpen(false);
  };

  const handleDateTimeChange = (newValue) => {
    setDateTime(newValue.$d.getTime());
  };

  const onUploadSuccess = (fileName, eventId) => {
    setFileName(fileName);
    setGeneratedEventId(eventId);
    setUploadSuccess(true);
  };

  const onUploadFailure = (error) => {
    setUploadFailureError(error);
    setUploadFailedSnackbarOpen(true);
  };

  return (
    <>
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

      <Snackbar
        open={uploadFailedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {uploadFailureError}
        </Alert>
      </Snackbar>

      <div className="con-hostpage">
        <div className="heading5 text-white">
          HOST
          <div className="heading5-1">EVENTS</div>
        </div>
        <div>
          <img
            className="gif1"
            src="https://images.lemonly.com/wp-content/uploads/2018/08/07150313/Homebase_Thumb_v01.gif"
          ></img>
        </div>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            mt: 2,
            p: 2,
            backgroundImage: "linear-gradient(45deg,#2063ac,#4598EC,#DFCA9F)",
            width: "50%",
            borderRadius: "10px",
            marginLeft: "170px",
            marginTop: "170px",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: 'no-drop',
            }}
            xs={12}
            sm={12}
            md={6}
            mt={2}
            p={2}
            
          >
            <Typography variant="h3" color="black" sx={{ fontSize: "38px" }}>
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
            <Typography variant="h3" color="black" sx={{ fontSize: "38px" }}>
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
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="location"
              label="Location"
              name="location"
              autoComplete="location"
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
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Select Date"
                slotProps={{ textField: { fullWidth: true } }}
                defaultValue={dayjs(Date.now())}
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
            />
            {uploadSuccess ? (
              <Button fullWidth variant="contained" disabled>
                Image Uploaded Successfully
              </Button>
            ) : (
              <UploadModalButton
                onUploadSuccess={onUploadSuccess}
                onUploadFailure={onUploadFailure}
              ></UploadModalButton>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#274A8D" }}
              loading={
                events.apiStatus === apiStatus.IN_PROGRESS &&
                events.eventOperation === eventOperations.HOST_EVENT
              }
            >
              Host Event
            </LoadingButton>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(HostEvent);
