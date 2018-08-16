const actions = {
    GET_STATS: 'GET_STATS',
    GET_STATS_SUCCESS: 'GET_STATS_SUCCESS',
    GET_STATS_ERROR: 'GET_STATS_ERROR',
    getStats: (authToken) => ({
        type: actions.GET_STATS,
        payload: authToken
    })
  };
  export default actions;
  