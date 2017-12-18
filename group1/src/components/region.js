import React, { Component } from 'react'

import {Row} from 'react-bootstrap'
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
            
             <h2 className="PageHeader"> {getStrings.getLangString().Area} </h2>
             <select id="regionId" onChange={this.props.changeRegion}>
               {regions}
             </select>   
             <abbr title={getStrings.getLangString().RegionDesc}>[?]</abbr>
            
             <h2 className="PageHeader">{getStrings.getLangString().Scenariocollection}</h2>
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