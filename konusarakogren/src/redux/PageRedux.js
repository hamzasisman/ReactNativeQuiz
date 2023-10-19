// Initial State
const INITIAL_STATE = {
    visitedPage: 'Quiz'
  };
  
  // Selectors
  export const pageSelector = state => state.page.visitedPage;
  
  // Action Types
  export const SET_VISITED_PAGE = 'user/set_visited_page';
  
  // Action Creators
  export const setVisitedPage = page => {
    return {
      type: SET_VISITED_PAGE,
      payload: { page }
    };
  };
  
  // Reducer
  export const pageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_VISITED_PAGE:
        const newState = action.payload.page;
        return {
          visitedPage: newState
        };
      default:
        return state;
    }
  };
  