import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { composeWithDevTools } from 'redux-devtools-extension'
import Login from './containers/LoginContainer';
import museReducer from './reducers/museReducer';


const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, museReducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);


const RootStack = createStackNavigator({
  Login
});
const Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator size='large'/>
    </View>
  )
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderLoading()} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
