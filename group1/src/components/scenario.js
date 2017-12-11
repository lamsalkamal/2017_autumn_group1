import React, { Component } from 'react'

import {Row,Grid,Col} from 'react-bootstrap'
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
       const scenarios = contentScenarios.map(item=> <div key={item.id}> <label id={item.name} value={item.id} className="labelNotChosen scenarios" onClick={(e) => this.props.onC(e, item.id)} >{item.description} </label> </div>)
  
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
          <Grid fluid id="layout-content" className="marginPage">
          <Row>
            <Col xs={12} md={12}  className='Header'>
              <h1>{ getStrings.getLangString().ForestIndicator} </h1>
              </Col>
            </Row>
            <Row>
                <Col xs={12}  md={3}  className='left'>
               <Row>      
                         
               </Row>
                <span className='paddBottom'>
             <h4> { getStrings.getLangString().SCENARIOS} </h4>
              <ul id="scenarioId" >
                {scenarios}
             </ul>  
             </span>
             <span>
                           <h4> { getStrings.getLangString().PERIODS} </h4>
             <ul id="periodId" >
                {periods}
             </ul>
             </span>  
            </Col>
            <Col xs={12}  md={5}   className='Middle'>
              
          <div id="container"></div>
             
            </Col>
          
            <Col xs={12}  md={3}   className='Right'>
              <h4> { getStrings.getLangString().INDICATORS} </h4>
             <ul id="indicatorId">
                {indicatorsArray}
             </ul> 
             </Col> 
            </Row>
          </Grid>
        )
      }
}
//<Region updateScenarioCollection={this.updateScenarioCollectionId}/> 
export default Scenario