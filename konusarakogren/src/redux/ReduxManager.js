import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { localizationReducer } from './LocalizationRedux';
import { pageReducer } from './PageRedux';
import { devToolsEnhancer } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  locale: localizationReducer,
  page: pageReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, devToolsEnhancer());
export const persistor = persistStore(store);
