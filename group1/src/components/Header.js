import React, { Component } from 'react'
import './header.css';
import {Grid,Row,Col} from 'react-bootstrap'
import getStrings from './langString.js'
class Header extends Component {
    render () {
        return (
            <Grid fluid id="layout-content" className="marginPage"> 
            <Row>
        <Col xs={12} md={12}  className='Header'>
          <h1>{ getStrings.getLangString().ForestIndicator} </h1>
          
          </Col>
        </Row>
        </Grid>
            
        )
    }
}

export default Header