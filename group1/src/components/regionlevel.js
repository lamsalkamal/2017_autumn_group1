import React, { Component } from 'react'
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import getStrings from './langString.js'

class RegionLevel extends Component {
   
      render() {

        const regionLevels = this.props.regionsLevels.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
        return (
           
             <Row className='padleft'>
             <h4>{getStrings.getLangString().Regionlevel} </h4>
              <select id="regionLevelId" onChange={this.props.change}>
              <option disabled selected="selected"> -- select an option -- </option>
                  {regionLevels}
              </select> 
              <abbr title={getStrings.getLangString().RegionlevelDesc}>[?]</abbr>
              </Row> 
              
        );
      }
}

export default RegionLevel