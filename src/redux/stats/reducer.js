import actions from './actions';

const initState = { response: null };

export default function StatsReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_STATS_SUCCESS:
        return { ...state, response: action.response }
    case actions.GET_STATS_ERROR: 
        return { error: action.error }
    default:
      return state;
  }
}
