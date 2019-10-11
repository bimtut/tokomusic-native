
import React, { Component } from 'react';
import MainNavigator from './src/public/navigators/mainNavigator'
import { Provider } from 'react-redux'
import store from './src/public/redux/store'


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}



export default App;
