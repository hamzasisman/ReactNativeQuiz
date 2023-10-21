// Initial State
const INITIAL_STATE = {
    language: 'tr'
  };
  
  // Selectors
  export const localizationSelector = state => state.locale.language;
  
  // Action Types
  export const CHANGE_LOCALE = 'localization/change_locale';
  
  // Action Creators
  export const setLocalization = language => {
    return {
      type: CHANGE_LOCALE,
      payload: { language }
    };
  };
  
  export const localizationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        let newLanguage = action.payload.language;
        return {
          language: newLanguage
        };
      default:
        return state;
    }
  };
  