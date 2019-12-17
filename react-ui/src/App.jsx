import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LayerManager from '@atlaskit/layer-manager';
import rootReducer from './reducers';

import "./App.css";

const store = createStore(rootReducer);

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <LayerManager>
          <div className="App">
            <h1>My-App</h1>
          </div>
        </LayerManager>
      </Provider>
    );
  }
}

export default hot(module)(App);