import {
  AUTH_USER_FAILED,
  AUTH_USER_SUCCESS,
  USER_PROFILE_UPDATE,
} from '../../Helpers/Constant';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_PROFILE_UPDATE:
      const updateUser = { ...state.user, ...action.payload };
      return { ...state, user: updateUser };
    case AUTH_USER_FAILED:
      return { ...state, user: {} };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
