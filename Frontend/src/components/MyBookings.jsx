import { useDispatch, useSelector } from "react-redux";
import withAuth from "./withAuth";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { eventActions } from "../redux";
import { apiStatus, eventOperations } from "../redux/events/eventTypes";
import { Box, Snackbar, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyBookings = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [eventBookingIdToDelete, setEventBookingIdToDelete] = useState(null);
  const [formattedData, setFormattedData] = useState({
    columns: [
      {
        field: "id",
        hide: true,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "bookedOn",
        headerName: "Booked On",
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "eventName",
        headerName: "Event Name",
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "eventDate",
        headerName: "Event Date",
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "eventLocation",
        headerName: "Event Location",
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "viewEvent",
        headerName: "Event Info",
        width: 250,
        align: "center",
        renderCell: (params) => {
          return <a href={`/browseEvents/${params.value}`}>View Event</a>;
        },
        headerAlign: "center",
      },

      {
        editable: false,
        field: "deleteRegistration",
        headerName: "Delete Booking",
        width: 200,
        align: "center",
        renderCell: (params) => {
          return (
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {
                setEventBookingIdToDelete(params.value);
                dispatch(eventActions.deleteEventBooking(params.value));
              }}
              sx={{
                mt: 3,
                mb: 3,
                backgroundColor: "red",
                ":hover": {
                  backgroundColor: "red",
                },
              }}
              loading={
                events.apiStatus === apiStatus.IN_PROGRESS &&
                events.eventOperation ===
                  eventOperations.DELETE_EVENT_BOOKING &&
                eventBookingIdToDelete === params.value
              }
            >
              Delete Registration
            </LoadingButton>
          );
        },
        headerAlign: "center",
      },
    ],
    rows: [],
  });

  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventActions.getAllBookings());
  }, []);

  useEffect(() => {
    if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.GET_ALL_BOOKINGS
    ) {
      setSnackbarOpen(true);
      setSuccessSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.GET_ALL_BOOKINGS
    ) {
      setSuccessSnackbarOpen(false);
      setSnackbarOpen(false);
      const newRows = events.bookedEvents.map((row) => {
        return {
          id: row._id,
          bookedOn: new Date(Number(row.createdAt)).toUTCString(),
          eventName: row.eventId.name,
          eventDate: new Date(Number(row.eventId.date)).toUTCString(),
          eventLocation: row.eventId.location,
          viewEvent: row.eventId._id,
          deleteRegistration: row.eventId._id,
        };
      });
      setFormattedData((prevData) => {
        return { ...prevData, rows: newRows };
      });
    } else if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.DELETE_EVENT_BOOKING
    ) {
      setSnackbarOpen(true);
      setSuccessSnackbarOpen(false);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.DELETE_EVENT_BOOKING
    ) {
      setSuccessSnackbarOpen(true);
      setSnackbarOpen(false);
      dispatch(eventActions.getAllBookings());
    } else {
      setSnackbarOpen(false);
      setSuccessSnackbarOpen(false);
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
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Event Booking Deleted Successfully
        </Alert>
      </Snackbar>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "120vh",
          width: "100%",
          marginTop: "8px",
        }}
      >
        <Typography variant="h5" align="center" color="#d0d0d0">
          REGISTERED EVENTS
        </Typography>
        <DataGrid
          sx={{
            mt: 2,
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            backgroundColor: "#ADD8E6",
          }}
          {...formattedData}
          loading={
            events.apiStatus === apiStatus.IN_PROGRESS &&
            events.eventOperation === eventOperations.GET_ALL_BOOKINGS
          }
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </>
  );
};

export default withAuth(MyBookings);
