export const authActions = {
  SIGNUP_IN_PROGRESS: '@auth/signupInProgress',
  SIGNUP_SUCCESS: '@auth/signupSuccess',
  SIGNUP_FAILURE: '@auth/signupFailure',
  LOGIN_IN_PROGRESS: '@auth/loginInProgress',
  LOGIN_SUCCESS: '@auth/loginSuccess',
  LOGIN_FAILURE: '@auth/loginFailure',
  LOGOUT_IN_PROGRESS: '@auth/logoutInProgress',
  LOGOUT_SUCCESS: '@auth/logoutSuccess',
  LOGOUT_FAILURE: '@auth/logoutFailure',
  UPDATE_USER_DETAILS_IN_PROGRESS: '@auth/updateUserDetailsInProgress',
  UPDATE_USER_DETAILS_SUCCESS: '@auth/updateUserDetailsSuccess',
  UPDATE_USER_DETAILS_FAILURE: '@auth/updateUserDetailsFailure',
};

export const apiStatus = {
  IN_PROGRESS: 0,
  SUCCESS: 1,
  FAILURE: 2,
  IDLE: 3,
};

export const authOperation = {
  SIGNUP: 0,
  LOGIN: 1,
  LOGOUT: 2,
  UPDATE_USER_DETAILS: 3,
  INVALID: 3
};

export const authStatus = {
  LOGGED_IN: 0,
  NOT_LOGGED_IN: 1,
};
