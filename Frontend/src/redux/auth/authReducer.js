import { apiStatus, authActions, authOperation, authStatus } from "./authTypes";

const initialState = {
  accessToken: 0,
  abc: "string",
  apiStatus: apiStatus.IDLE,
  authOperation: authOperation.INVALID,
  authStatus: authStatus.NOT_LOGGED_IN,
  errorReason: null,
  userData: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.SIGNUP_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        authOperation: authOperation.SIGNUP,
        authStatus: authStatus.NOT_LOGGED_IN,
        userData: null,
        errorReason: null,
        accessToken: null,
      };
    case authActions.SIGNUP_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        authOperation: authOperation.SIGNUP,
        authStatus: authStatus.LOGGED_IN,
        userData: action.payload.userData,
        errorReason: null,
        accessToken: action.payload.accessToken,
      };
    case authActions.SIGNUP_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        authOperation: authOperation.SIGNUP,
        authStatus: authStatus.NOT_LOGGED_IN,
        userData: null,
        errorReason: action.payload.error,
        accessToken: null,
      };
    case authActions.LOGIN_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        authOperation: authOperation.LOGIN,
        authStatus: authStatus.NOT_LOGGED_IN,
        userData: null,
        errorReason: null,
        accessToken: null,
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        authOperation: authOperation.LOGIN,
        authStatus: authStatus.LOGGED_IN,
        userData: action.payload.userData,
        errorReason: null,
        accessToken: action.payload.accessToken,
      };
    case authActions.LOGIN_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        authOperation: authOperation.LOGIN,
        authStatus: authStatus.NOT_LOGGED_IN,
        userData: null,
        errorReason: action.payload.error,
        accessToken: null,
      };
    case authActions.LOGOUT_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        authOperation: authOperation.LOGOUT,
        authStatus: authStatus.LOGGED_IN,
        errorReason: null,
      };
    case authActions.LOGOUT_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        authOperation: authOperation.LOGOUT,
        authStatus: authStatus.NOT_LOGGED_IN,
        userData: null,
        errorReason: null,
        accessToken: null,
      };
    case authActions.LOGOUT_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        authOperation: authOperation.LOGOUT,
        authStatus: authStatus.LOGGED_IN,
        errorReason: action.payload.error,
      };
    case authActions.UPDATE_USER_DETAILS_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        authOperation: authOperation.UPDATE_USER_DETAILS,
        authStatus: authStatus.LOGGED_IN,
        errorReason: null,
      };
    case authActions.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        authOperation: authOperation.UPDATE_USER_DETAILS,
        authStatus: authStatus.LOGGED_IN,
        userData: action.payload.userData,
        errorReason: null,
      };
    case authActions.UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        authOperation: authOperation.UPDATE_USER_DETAILS,
        authStatus: authStatus.LOGGED_IN,
        errorReason: action.payload.error,
      };
    default:
      return state;
  }
}
