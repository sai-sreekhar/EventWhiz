import { useDispatch, useSelector } from "react-redux";
import withAuth from "./withAuth";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { eventActions } from "../redux";
import { apiStatus, eventOperations } from "../redux/events/eventTypes";
import { Box, Snackbar, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useParams } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EventRegistrations = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formattedData, setFormattedData] = useState({
    rows: [],
    columns: [
      {
        field: "id",
        hide: true,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "name",
        headerName: "Name",
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "email",
        headerName: "Email",
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        editable: false,
        field: "contact",
        headerName: "Contact",
        width: 250,
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
    ],
  });
  const params = useParams();
  const eventId = params.eventId;
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventActions.getHostedEventRegistrations(eventId));
  }, []);

  useEffect(() => {
    if (
      events.apiStatus === apiStatus.FAILURE &&
      events.eventOperation === eventOperations.GET_HOSTED_EVENT_REGISTRATIONS
    ) {
      setSnackbarOpen(true);
    } else if (
      events.apiStatus === apiStatus.SUCCESS &&
      events.eventOperation === eventOperations.GET_HOSTED_EVENT_REGISTRATIONS
    ) {
      setSnackbarOpen(false);
      const newRows = events.hostedEventRegistrations[eventId].map((row) => {
        return {
          id: row._id,
          name: row.userId.name,
          email: row.userId.email,
          contact: row.userId.contact,
          bookedOn: new Date(Number(row.createdAt)).toUTCString(),
        };
      });
      setFormattedData((prevData) => {
        return { ...prevData, rows: newRows };
      });
    } else {
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
          marginTop: "8px",
        }}
      >
        <Typography variant="h4" align="center">
          Registrations for event
        </Typography>
        <DataGrid
          sx={{
            mt: 2,
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            backgroundColor: "lightcyan",
          }}
          {...formattedData}
          loading={
            events.apiStatus === apiStatus.IN_PROGRESS &&
            events.eventOperation ===
              eventOperations.GET_HOSTED_EVENT_REGISTRATIONS
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

export default withAuth(EventRegistrations);
