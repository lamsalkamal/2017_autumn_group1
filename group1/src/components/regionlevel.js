import React, { Component } from 'react'
import {Row,Grid,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import getStrings from './langString.js'

class RegionLevel extends Component {
   
      render() {
  
        const regionLevels = this.props.regionsLevels.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
        return (
          <Col xs={12}  md={12} >
          <span>         
          <b>Language</b>
          <select id="languageSelect" onChange={this.props.langChange}>
              <option selected="selected"> English </option>
              <option selected="selected"> Suomi </option>
              </select> 
          </span>
          <span>
          <h4>{getStrings.getLangString().Regionlevel} </h4>
              <select id="regionLevelId" onChange={this.props.change}>
              <option disabled selected="selected"> -- select an option -- </option>
                  {regionLevels}
              </select> 
            
              </span>        
          </Col>
        );
      }
}

export default RegionLevel