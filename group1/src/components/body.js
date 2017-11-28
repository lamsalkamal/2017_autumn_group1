import React, { Component } from 'react';

import './body.css';
import Header from './Header.js';
import {Row,Grid,Col,Button,FormControl,FormGroup} from 'react-bootstrap'
import Leftbar from './leftbar.js'

export default class Body extends Component {
    render() {
      return (
          
          <Grid fluid className="body">
          <Header header="Forest Indicator" />
              <Row>
                  <Leftbar />
                
                 
            <Col xm="12" sm="9">

            </Col>

                  </Row>
              </Grid>
        
      )
    }
}

