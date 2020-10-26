import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  REQUEST_FRIEND,
  ADD_FRIEND,
  REMOVE_FRIEND,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    case REQUEST_FRIEND:
      return {
        ...state,
        profile: { ...state.profile, friendRequests: payload },
        loading: false,
      };

    case ADD_FRIEND:
      return {
        ...state,
        profile: { ...state.profile, friends: payload },
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        error: payload,
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    default:
      return state;
  }
}
