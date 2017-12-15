import React, { Component } from 'react'

import {Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import getStrings from './langString.js'

class Region extends Component {
    
      render() {  
  
        const regions = this.props.regions.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
        //console.log(regions)
        const scenariosCollection = this.props.scenariosCollection.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
        //console.log(scenariosCollection)
        return (
          <Row className='padleft'>
            
             <h4> {getStrings.getLangString().Area} </h4>
             <select id="regionId" onChange={this.props.changeRegion}>
               {regions}
             </select>   
             <abbr title={getStrings.getLangString().RegionDesc}>[?]</abbr>
            
            <h4>{getStrings.getLangString().Scenariocollection}</h4>
             <select id="scenarioCollectionId" onChange={this.props.changeScenarioCollectionId}>  
                {scenariosCollection}
             </select>
             <abbr title={getStrings.getLangString().ScenarioCollectionDesc}>[?]</abbr>
            
             </Row>
        );
      }
}
//<RegionLevel updateRegionLevel={this.props.handleRegionUpdate}/> 
export default Region