import { authActions } from "./authTypes";
import { API_V1_BASE_URL } from "../../constants";

const signupInProgress = () => {
  return {
    type: authActions.SIGNUP_IN_PROGRESS,
  };
};

const signupSuccess = (userData, accessToken) => {
  return {
    type: authActions.SIGNUP_SUCCESS,
    payload: { userData, accessToken },
  };
};

const signupFailure = (error) => {
  return {
    type: authActions.SIGNUP_FAILURE,
    payload: { error },
  };
};

const loginInProgress = () => {
  return {
    type: authActions.LOGIN_IN_PROGRESS,
  };
};

const loginSuccess = (userData, accessToken) => {
  return {
    type: authActions.LOGIN_SUCCESS,
    payload: { userData, accessToken },
  };
};

const loginFailure = (error) => {
  return {
    type: authActions.LOGIN_FAILURE,
    payload: { error },
  };
};

const logoutInProgress = () => {
  return {
    type: authActions.LOGOUT_IN_PROGRESS,
  };
};

const logoutSuccess = () => {
  return {
    type: authActions.LOGOUT_SUCCESS,
  };
};

const logoutFailure = (error) => {
  return {
    type: authActions.LOGOUT_FAILURE,
    payload: { error },
  };
};

const updateUserDetailsInProgress = () => {
  return {
    type: authActions.UPDATE_USER_DETAILS_IN_PROGRESS,
  };
};

const updateUserDetailsSuccess = (userData) => {
  return {
    type: authActions.UPDATE_USER_DETAILS_SUCCESS,
    payload: { userData },
  };
};

const updateUserDetailsFailure = (error) => {
  return {
    type: authActions.UPDATE_USER_DETAILS_FAILURE,
    payload: { error },
  };
};

const signup = (name, email, contact, password) => {
  return async (dispatch) => {
    dispatch(signupInProgress());
    try {
      const response = await fetch(`${API_V1_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, contact, password }),
      });
      const data = await response.json();
      if (data.status === "success") {
        dispatch(signupSuccess(data.data.userData, data.data.accessToken));
      } else {
        dispatch(signupFailure(data.data.errorDesc));
      }
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };
};

const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginInProgress());
    try {
      const response = await fetch(`${API_V1_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === "success") {
        dispatch(loginSuccess(data.data.userData, data.data.accessToken));
      } else {
        dispatch(loginFailure(data.data.errorDesc));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

const logout = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    dispatch(logoutInProgress());
    try {
      const response = await fetch(`${API_V1_BASE_URL}/auth/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure(data.data.errorDesc));
      }
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
};

const updateUserDetails = (name, email, contact) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    dispatch(updateUserDetailsInProgress());
    try {
      const response = await fetch(`${API_V1_BASE_URL}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, email, contact }),
      });
      const data = await response.json();
      if (data.status === "success") {
        dispatch(updateUserDetailsSuccess(data.data.user));
      } else {
        dispatch(updateUserDetailsFailure(data.data.errorDesc));
      }
    } catch (error) {
      dispatch(updateUserDetailsFailure(error.message));
    }
  };
};

export { signup, login, logout, updateUserDetails };
