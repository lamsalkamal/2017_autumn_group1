import React, { Component } from 'react';

import './leftbar.css';
import {Row,Grid,Col,Button,FormControl,FormGroup} from 'react-bootstrap'
import leftbarItem from './leftbarItem1'
import apiData from './Data/getData'

export default class Leftbar extends Component {

constructor(props)
{
  super(props);

  this.state = {
    items: []
  };
 
  this.fetchData = this.fetchData.bind(this);
}

fetchData() //leftbar.js:23 Uncaught TypeError: __WEBPACK_IMPORTED_MODULE_4__Data_getData__.a.getRegionlevels is not a function
{           //works in test app but not in this?
    apiData.getRegionlevels().then(result => {
    this.setState( { items : result} );
    });
    console.log(this.state.items);    
}

componentDidMount() 
{   
    //this.fetchData();
    console.log(this.state.items); 
}

render() {
      
    return (

<Col xm="12" sm="3" className="leftbar">
<button className="btn btn-default"
                                onClick={ this.fecthData } >testButton</button>
<h3 class="leftHeadPadding"> Selecting Scenario </h3>
<h4>Regional Level</h4>
<FormGroup controlId="formControlSelect">
 <FormControl componentClass="select" placeholder="select">
      { this.state.items.map(element => <leftbarItem description={element.description}
                                                name={element.name} 
                                                order={element.order}
                                                id={element.id}
                                                key={element.id} /> )}
 </FormControl>
</FormGroup>
<h4>Area </h4>
<FormGroup controlId="formControlSelect">
 <FormControl componentClass="select" placeholder="select">
     <option value=""> Select </option>
     <option value="option1"> Northen Ostrobonia </option>
     <option value="option2"> option2 </option>
     <option value="option3"> option3 </option>
     <option value="option4"> option4 </option>
 </FormControl>
</FormGroup>
<h4>Scenario Collection </h4>
<FormGroup controlId="formControlSelect">
 <FormControl componentClass="select" placeholder="select">
     <option value=""> Select </option>
     <option value="option1"> option1 </option>
     <option value="option2"> option2 </option>
     <option value="option3"> option3 </option>
     <option value="option4"> option4 </option>
 </FormControl>
</FormGroup>
</Col>

      )
    }
}