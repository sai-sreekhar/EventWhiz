import PropTypes from "prop-types";
import HomeNavBar from "./HomeNavBar";
import DashboardNavBar from "./DashboardNavBar";

function NavbarController(props) {
  return (
    <>
      {props.type === 1 ? (
        <DashboardNavBar></DashboardNavBar>
      ) : (
        <HomeNavBar></HomeNavBar>
      )}
    </>
  );
}

NavbarController.propTypes = {
  type: PropTypes.number.isRequired,
};

export default NavbarController;
