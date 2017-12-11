import React, { Component } from 'react'

import {Row,Grid,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import getStrings from './langString.js'

class Region extends Component {
    
      render() {  
  
        const regions = this.props.regions.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
        //console.log(regions)
        const scenariosCollection = this.props.scenariosCollection.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
        console.log(scenariosCollection)
        return (
          <Col xs={12}  md={12}>
          <Row>
           
          </Row>
          <span>    
             <h4> {getStrings.getLangString().Area} </h4>
             <select id="regionId" onChange={this.props.changeRegion}>
               {regions}
             </select>   
            </span>
            <span>
            <h4>{getStrings.getLangString().Scenariocollection}</h4>
             <select id="scenarioCollectionId" onChange={this.props.changeScenarioCollectionId}>  
                {scenariosCollection}
             </select>
             </span>          
          </Col>
        );
      }
}
//<RegionLevel updateRegionLevel={this.props.handleRegionUpdate}/> 
export default Region