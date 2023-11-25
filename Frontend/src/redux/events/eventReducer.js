import { apiStatus, eventActions, eventOperations } from "./eventTypes";

const initialState = {
  events: [],
  apiStatus: apiStatus.IDLE,
  errorReason: null,
  eventDetails: {},
  bookedEvents: [],
  myHostedEvents: [],
  hostedEventRegistrations: {},
  eventOperation: eventOperations.INVALID,
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case eventActions.GET_ALL_EVENTS_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.GET_ALL_EVENTS,
        errorReason: null,
      };
    case eventActions.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.GET_ALL_EVENTS,
        events: action.payload.events,
        errorReason: null,
      };
    case eventActions.GET_ALL_EVENTS_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.GET_ALL_EVENTS,
        errorReason: action.payload.error,
      };
    case eventActions.GET_EVENT_DETAILS_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.GET_EVENT_DETAILS,
        errorReason: null,
      };
    case eventActions.GET_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.GET_EVENT_DETAILS,
        eventDetails: {
          ...state.eventDetails,
          [action.payload.eventId]: action.payload.eventDetails,
        },
        errorReason: null,
      };
    case eventActions.GET_EVENT_DETAILS_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.GET_EVENT_DETAILS,
        errorReason: action.payload.error,
      };
    case eventActions.HOST_EVENT_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.HOST_EVENT,
        errorReason: null,
      };
    case eventActions.HOST_EVENT_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.HOST_EVENT,
        errorReason: null,
      };
    case eventActions.HOST_EVENT_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.HOST_EVENT,
        errorReason: action.payload.error,
      };
    case eventActions.BUY_TICKET_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.BUY_TICKET,
        errorReason: null,
      };
    case eventActions.BUY_TICKET_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.BUY_TICKET,
        errorReason: null,
      };
    case eventActions.BUY_TICKET_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.BUY_TICKET,
        errorReason: action.payload.error,
      };
    case eventActions.GET_ALL_BOOKINGS_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.GET_ALL_BOOKINGS,
        errorReason: null,
      };
    case eventActions.GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.GET_ALL_BOOKINGS,
        bookedEvents: action.payload.bookedEvents,
        errorReason: null,
      };
    case eventActions.GET_ALL_BOOKINGS_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.GET_ALL_BOOKINGS,
        errorReason: action.payload.error,
      };
    case eventActions.DELETE_EVENT_BOOKING_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.DELETE_EVENT_BOOKING,
        errorReason: null,
      };
    case eventActions.DELETE_EVENT_BOOKING_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.DELETE_EVENT_BOOKING,
        errorReason: null,
      };
    case eventActions.DELETE_EVENT_BOOKING_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.DELETE_EVENT_BOOKING,
        errorReason: action.payload.error,
      };
    case eventActions.GET_MY_HOSTED_EVENTS_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.GET_MY_HOSTED_EVENTS,
        errorReason: null,
      };
    case eventActions.GET_MY_HOSTED_EVENTS_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.GET_MY_HOSTED_EVENTS,
        myHostedEvents: action.payload.myHostedEvents,
        errorReason: null,
      };
    case eventActions.GET_MY_HOSTED_EVENTS_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.GET_MY_HOSTED_EVENTS,
        errorReason: action.payload.error,
      };
    case eventActions.DELETE_MY_HOSTED_EVENT_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.DELETE_MY_HOSTED_EVENT,
        errorReason: null,
      };
    case eventActions.DELETE_MY_HOSTED_EVENT_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.DELETE_MY_HOSTED_EVENT,
        errorReason: null,
      };
    case eventActions.DELETE_MY_HOSTED_EVENT_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.DELETE_MY_HOSTED_EVENT,
        errorReason: action.payload.error,
      };
    case eventActions.UPDATE_EVENT_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.UPDATE_EVENT,
        errorReason: null,
      };
    case eventActions.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.UPDATE_EVENT,
        errorReason: null,
      };
    case eventActions.UPDATE_EVENT_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.UPDATE_EVENT,
        errorReason: action.payload.error,
      };
    case eventActions.GET_HOSTED_EVENT_REGISTRATIONS_IN_PROGRESS:
      return {
        ...state,
        apiStatus: apiStatus.IN_PROGRESS,
        eventOperation: eventOperations.GET_HOSTED_EVENT_REGISTRATIONS,
        errorReason: null,
      };
    case eventActions.GET_HOSTED_EVENT_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        apiStatus: apiStatus.SUCCESS,
        eventOperation: eventOperations.GET_HOSTED_EVENT_REGISTRATIONS,
        hostedEventRegistrations: {
          ...state.hostedEventRegistrations,
          [action.payload.eventId]: action.payload.eventRegistrations,
        },
        errorReason: null,
      };
    case eventActions.GET_HOSTED_EVENT_REGISTRATIONS_FAILURE:
      return {
        ...state,
        apiStatus: apiStatus.FAILURE,
        eventOperation: eventOperations.GET_HOSTED_EVENT_REGISTRATIONS,
        errorReason: action.payload.error,
      };
    default:
      return state;
  }
}
