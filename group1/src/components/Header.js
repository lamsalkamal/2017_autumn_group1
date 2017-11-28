import React, { Component } from 'react'
import './header.css';
import {Grid,Row,Col} from 'react-bootstrap'
class Header extends Component {
    render () {
        return (
            
            <Row>
            <Col sm="12" xm="12" className="header">
              <h1>{this.props.header }</h1>
            </Col>
            </Row>
            
        )
    }
}

export default Header