import { Component } from "react";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { DashboardModal } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { API_V1_BASE_URL } from "../constants";
import { v4 as uuidv4 } from "uuid";

class UploadModalButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      generatedEventId: "",
    };

    // Create & configure Uppy instance
    this.uppy = new Uppy({
      id: "uppy",
      restrictions: {
        maxFileSize: 10000000, //10MB
        allowedFileTypes: ["image/*"],
        maxNumberOfFiles: 1,
      },
      autoProceed: false,
      debug: true,
    });

    // Tell it to use their AWS S3 plugin
    // Will get pre-signed URL from server API
    this.uppy.use(AwsS3, {
      getUploadParameters: async (file) => {

        try {
          const body = {
            type: 1,
            eventId: uuidv4(),
          };

          this.setState({
            generatedEventId: body.eventId,
          });

          const response = await fetch(
            `${API_V1_BASE_URL}/aws/s3/signUrl/put/${file.name}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${props.auth.accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
          const data = await response.json();
          // Return an object in the correct shape.
          if (data.status === "success") {
            return {
              url: data.data.preSignedUrl,
              method: "PUT",
              fields: [],
              headers: [],
            };
          } else {
            props.onUploadFailure(data.data.errorDesc);
          }
        } catch (error) {
          console.error("Error fetching upload parameters:", error);
          // Handle the error as needed.
          props.onUploadFailure(error.message);
        }
      },
    });

    this.uppy.on("upload-success", (file, response) => {
      props.onUploadSuccess(file.name, this.state.generatedEventId);
    });

    this.uppy.on("upload-error", (file, error, response) => {
      props.onUploadFailure(error.message);
    });
  }

  componentWillUnmount() {
    // Close the Uppy instance
    this.uppy.close();
  }

  handleOpen = () => {
    this.setState({
      modalOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Button fullWidth variant="contained" onClick={this.handleOpen}>
          Upload Image
        </Button>
        <DashboardModal
          uppy={this.uppy}
          closeModalOnClickOutside
          open={this.state.modalOpen}
          onRequestClose={this.handleClose}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModalButton);
