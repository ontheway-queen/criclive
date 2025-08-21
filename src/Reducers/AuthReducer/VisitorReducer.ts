import {
  AUTH_VISITOR_USER_FAILED,
  AUTH_VISITOR_USER_SUCCESS,
  VISITOR_PROFILE_IMAGE_UPDATE,
} from '../../Helpers/Constant';

const visitorReducer = (state: any, action: any) => {
  switch (action.type) {
    case AUTH_VISITOR_USER_SUCCESS:
      return {
        ...state,
        visitorUser: action.payload,
      };
    case VISITOR_PROFILE_IMAGE_UPDATE:
      const updateUser = { ...state.visitorUser, ...action.payload };
      return { ...state, visitorUser: updateUser };
    case AUTH_VISITOR_USER_FAILED:
      return { ...state, visitorUser: {} };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default visitorReducer;
