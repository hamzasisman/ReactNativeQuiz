import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import RootNavigator from './src/navigation/RootNavigator';
import { persistor, store } from './src/redux/ReduxManager';
import Quiz from './src/ui/screens/Quiz/Quiz';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <GestureHandlerRootView>
          {/* <RootNavigator /> */}
          <Quiz />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
