import React, { Component} from "react";
import {hot} from "react-hot-loader";
import LayerManager from '@atlaskit/layer-manager';

import "./App.css";

class App extends Component{
  render(){
    return(
      <LayerManager>
        <div className="App">
          <h1>My-App</h1>
        </div>
      </LayerManager>
    );
  }
}

export default hot(module)(App);