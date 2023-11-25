import {
  Box,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import celebration from "./../assets/images/Celebration-unscreen.gif";

const defaultTheme = createTheme();

function SearchEvents() {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#ADD8E6",
        pb: 2,
        mt: 2,
        mb: 2,
      }}
    >
      <div
        style={{
          position: "sticky",
          width: "100%",
          top: "0px",
          color: "white",
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs" >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="searchEvents"
                label="Type Event Name or City or State"
                name="searchEvents"
                autoComplete="search-events"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  slotProps={{ textField: { fullWidth: true } }}
                  defaultValue={dayjs("2022-04-17")}
                  sx={{marginTop:'20px'}}
                />
              </LocalizationProvider>
            </Box>
            <img
              className="gif2"
              style={{
                width: "400px",
                height: "300px",
                marginTop: "200px",
                marginLeft: "-60px",
              }}
              src={celebration}
            ></img>
          </Container>
        </ThemeProvider>
      </div>
    </Grid>
  );
}

export default SearchEvents;
