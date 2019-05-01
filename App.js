import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { composeWithDevTools } from 'redux-devtools-extension'
import Login from './containers/LoginContainer';
import museReducer from './reducers/museReducer';

const store = createStore(museReducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
});

const RootStack = createStackNavigator({
  Login
});

const Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
