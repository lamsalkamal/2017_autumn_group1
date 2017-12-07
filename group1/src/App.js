import React, { Component } from 'react';

import './components/leftbar.css';

//import Body from './components/body.js'
//import {Row,Grid,Col ,Button } from 'react-bootstrap'
import Graph from './components/leftbar.js'

class App extends Component {
  render(
  ) {
    return (

      <div className="App">
        <Graph/>
        
         

       
      </div>   
    );
  }
}

export default App;
