import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/ReduxManager';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Quiz from './src/ui/screens/Quiz/Quiz';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <GestureHandlerRootView>
          {/* <Quiz /> */}
          <RootNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
