import withAuth from "./withAuth";
import { Grid } from "@mui/material";
import BrowseEventsHeader from "./BrowseEventsHeader";
import SearchEvents from "./SearchEvents";
import GetAllEvents from "./GetAllEvents";

const BrowseEvents = () => {
  return (
    <>
      <Grid
        container
        sx={{
          height: "900px",
        }}
      >
        <BrowseEventsHeader />
        <SearchEvents />
        <GetAllEvents />
      </Grid>
      {/* <div className="text-white mt-2">EventWhiz !</div> */}
    </>
  );
};

export default withAuth(BrowseEvents);
