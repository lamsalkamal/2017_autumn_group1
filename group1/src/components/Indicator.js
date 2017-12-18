import React, { Component } from 'react'

import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import getStrings from './langString.js'

class Indicator extends Component {
  
      render() {
       
       const contentIndicators = this.props.scenariosA.length>0 ? this.props.scenariosA[0].indicatorCategories : []
  
       //console.log(contentIndicators)
       const indicatorsArray = contentIndicators.map(item=>
       (item.indicators.map(indic=> <div  key={indic.id}> <label  value={indic.id}  className="labelNotChosen indicators" onClick={(e) => this.props.onC(e, indic.id)} >{indic.name}</label> </div>))
      )
  
      const indicatorCategories = contentIndicators.map(item=><h1 key={item.id}>{item.name}</h1>)
  
      Array.prototype.insert = function ( index, item ) {
        this.splice( index, 0, item );
      };
  
      var count = 0
      var numbers = 0
      indicatorsArray.forEach(function(element) {
          indicatorsArray.insert(count, indicatorCategories[numbers])
          count+=2
          numbers++
      });
    
        return (

        
          <Row>    
          
           <h4> { getStrings.getLangString().INDICATORS} 
              <abbr title={getStrings.getLangString().IndicatorDesc}>[?]</abbr> </h4>
             <ul id="indicatorId">
                {indicatorsArray}
             </ul>
             </Row>
        )
      }
}
//<Region updateScenarioCollection={this.updateScenarioCollectionId}/> 
export default Indicator