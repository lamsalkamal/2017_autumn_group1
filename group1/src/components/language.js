import React, { Component } from 'react'
import getStrings from './langString.js'
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class Language extends Component {
   
      render() {
  return (
          
          <Row className='padleft'>         
          <b>Language</b>
          <select id="languageSelect" onChange={this.props.langChange}>
              <option selected="selected"> English </option>
              <option selected="selected"> Suomi </option>
              </select> 
              <abbr title={getStrings.getLangString().LanguageDesc}>[?]</abbr>
          </Row>   
      
        );
      }
}
export default Language