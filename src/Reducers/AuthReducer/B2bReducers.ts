import {
  B2B_USER_FAILED,
  B2B_USER_SUCCESS,
  B2B_PROFILE_IMAGE_UPDATE,
} from '../../Helpers/Constant';

const b2bReducer = (state: any, action: any) => {
  switch (action.type) {
    case B2B_USER_SUCCESS:
      return {
        ...state,
        b2bUser: action.payload,
      };
    case B2B_PROFILE_IMAGE_UPDATE:
      const updateUser = { ...state.b2bUser, ...action.payload };
      return { ...state, b2bUser: updateUser };
    case B2B_USER_FAILED:
      return { ...state, b2bUser: {} };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default b2bReducer;
