import React, { Component } from 'react'

import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import getStrings from './langString.js'

class Scenario extends Component {
    /*constructor(props) {
        super(props);
    
        this.state = {
          scenariosA : []
          };
  
          this.updateScenarioCollectionId = this.updateScenarioCollectionId.bind(this);        
          this.onC = this.onC.bind(this);
      }*/      
    
      render() {
       const contentScenarios = this.props.scenariosA.length>0 ? this.props.scenariosA[0].scenarios : []
       const scenarios = contentScenarios.map(item=> <div key={item.id}> <label id={item.shortName} value={item.id} className="labelNotChosen scenarios" onClick={(e) => this.props.onC(e, item.id)} >  {item.name}  </label>  <abbr title={item.description}> [?] </abbr> </div>)
  
       const contentDates = this.props.scenariosA.length>0 ? this.props.scenariosA[0].timePeriods : []
       const periods = contentDates.map(item=> <div key={item.id}> <label  id={item.yearStart} value={item.id} className="labelNotChosen periods" onClick={(e) => this.props.onC(e, item.id)}>{item.yearStart} - {item.yearEnd}  </label></div>)
    
  
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

        
          <Row  className="padleft">       
           <span className='paddBottom'>
             <h2 className="PageHeader">{ getStrings.getLangString().SCENARIOS} 
             <abbr title={getStrings.getLangString().ScenarioDesc}>[?]</abbr> </h2>  
              <ul id="scenarioId" >
                {scenarios}
             </ul>
             </span>
             <span>
             <h2 className="PageHeader">{ getStrings.getLangString().PERIODS} 
              <abbr title={getStrings.getLangString().TimeDesc}>[?]</abbr> </h2>
             <ul id="periodId" >
                {periods}
             </ul>
             </span> 
             </Row>
        )
      }
}
//<Region updateScenarioCollection={this.updateScenarioCollectionId}/> 
export default Scenario
