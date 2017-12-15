import React, { Component } from 'react'
import getStrings from './langString.js'
import {Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class Language extends Component {
   
      render() {
  return (
          <Col xs={12}  md={12} >
          <span>         
          <b>Language</b>
          <select id="languageSelect" onChange={this.props.langChange}>
              <option selected="selected"> English </option>
              <option selected="selected"> Suomi </option>
              </select> 
              <abbr title={getStrings.getLangString().LanguageDesc}>[?]</abbr>
          </span>   
          </Col>
        );
      }
}
export default Language