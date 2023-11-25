import { useDispatch, useSelector } from "react-redux";
import withAuth from "./withAuth";
import { Button, Grid, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { authActions } from "../redux/index";
import { apiStatus, authOperation } from "../redux/auth/authTypes";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const [editState, setEditState] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (editState) {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const contact = e.target.contact.value;
      dispatch(authActions.updateUserDetails(name, email, contact));
    } else {
      setEditState(true);
    }
  };

  useEffect(() => {
    if (
      auth.apiStatus === apiStatus.SUCCESS &&
      auth.authOperation === authOperation.UPDATE_USER_DETAILS
    ) {
      setEditState(false);
      setSnackbarOpen(false);
    } else if (
      auth.apiStatus === apiStatus.FAILURE &&
      auth.authOperation === authOperation.UPDATE_USER_DETAILS
    ) {
      setEditState(true);
      setSnackbarOpen(true);
    }
  }, [auth.apiStatus, auth.authOperation]);

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
          {auth.errorReason}
        </Alert>
      </Snackbar>

      <div style={{ height: "130vh" }}>
        <h1 style={{ textAlign: "center", color: "white", paddingTop: "50px" }}>
          Profile Page
        </h1>
        <h2 style={{ textAlign: "center", color: "white" }}>
          Welcome {auth.userData.name}
        </h2>
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
            marginLeft: "400px",
            marginTop: "75px",
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
            md={12}
            mt={2}
            p={2}
          >
            <TextField
              margin="normal"
              fullWidth
              disabled={!editState}
              id="name"
              label="Name"
              name="name"
              autoComplete="Name"
              defaultValue={auth.userData.name}
            />
            <TextField
              margin="normal"
              disabled={!editState}
              fullWidth
              name="email"
              label="Email"
              id="email"
              autoComplete="email"
              defaultValue={auth.userData.email}
            />
            <TextField
              margin="normal"
              disabled={!editState}
              fullWidth
              id="contact"
              label="Contact"
              name="contact"
              autoComplete="contact"
              defaultValue={auth.userData.contact}
            ></TextField>
            {editState ? (
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#274A8D" }}
                loading={
                  auth.apiStatus === apiStatus.IN_PROGRESS &&
                  auth.authOperation === authOperation.UPDATE_USER_DETAILS
                }
              >
                Save Details
              </LoadingButton>
            ) : (
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#274A8D" }}
                onClick={() => setEditState(true)}
              >
                Edit Details
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withAuth(Profile);
