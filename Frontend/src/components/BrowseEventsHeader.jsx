import { Grid, Typography } from "@mui/material";

function BrowseEventsHeader() {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      sx={{
        height: "150px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundImage: "linear-gradient(#010613,#031326)",
      }}
    >
      <Typography variant="h5" align="center" color="white">
        ALL UPCOMING
      </Typography>
      <Typography variant="h4" align="center" color="white" marginBottom="10px">
        EVENTS
      </Typography>
    </Grid>
  );
}

export default BrowseEventsHeader;
