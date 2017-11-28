import React, { Component } from 'react';

import './leftbar.css';
import {Row,Grid,Col,Button,FormControl,FormGroup} from 'react-bootstrap'


export default class Leftbar extends Component {
    render() {
      return (


<Col xm="12" sm="3" className="leftbar">

<h3 class="leftHeadPadding"> Selecting Scenario </h3>
<h4>Regional Level</h4>
<FormGroup controlId="formControlSelect">
 <FormControl componentClass="select" placeholder="select">
     <option value=""> Select </option>
     <option value="option1"> provinces </option>
     <option value="option2"> option2 </option>
     <option value="option3"> option3 </option>
     <option value="option4"> option4 </option>
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