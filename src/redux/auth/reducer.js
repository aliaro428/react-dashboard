import actions from './actions';

const initState = { idToken: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, idToken: action.token };
    case actions.LOGIN_ERROR:
      return { message: action.message };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
