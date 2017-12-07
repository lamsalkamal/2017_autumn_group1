import React, { Component } from 'react'
import apiData from './Data/getData'
import getStrings from './Data/langString'
import {Row,Grid,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'; 

var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class RegionLevel extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          regionsLevels : [],
          lang : true
        };

        this.change = this.change.bind(this);
        this.langChange = this.langChange.bind(this);
    }
    

    componentDidMount() {
      this.RegionLevel();
      getStrings.chooseLang(this.state.lang);
    } 
  
    RegionLevel() {
      apiData.getRegionLevels(this.state.lang).then(result => {
      this.setState( { regionsLevels : result} )
    });
    }

    change(event){
        var value = event.target.value;
        this.props.updateRegionLevel(value);
     }
     
     langChange()
     { //Wouldn't work with more than 2 languages, but in this case we are only using 2.
      this.setState({ lang: !this.state.lang }, function() {      
        apiData.getRegionLevels(this.state.lang).then(result => {
          this.setState( { regionsLevels : result} )
        });
        getStrings.chooseLang(this.state.lang);
      });
     }

    render() {

      const regionLevels = this.state.regionsLevels.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      return (
        <Col xs={12}  md={12} >
        <span>         
        <b>Language</b>
        <select id="languageSelect" onChange={this.langChange}>
            <option selected="selected"> English </option>
            <option selected="selected"> Suomi </option>
            </select> 
        </span>
        <span>
        <h4>{getStrings.getLangString().Regionlevel} </h4>
            <select id="regionLevelId" onChange={this.change}>
            <option disabled selected="selected"> -- select an option -- </option>
                {regionLevels}
            </select> 
          
            </span>        
        </Col>
      );
    }
  }

class Region extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          regionLevel : "1",
          regions : [],
          scenariosCollection : [],
          regionId : "1"
        };

        this.handleRegionUpdate = this.handleRegionUpdate.bind(this);
        this.change = this.change.bind(this);
        this.changeScenarioCollectionId = this.changeScenarioCollectionId.bind(this);
    }
  
    componentDidMount() {
      this.RegionLevel();
    }
  
    RegionLevel() {
      /*
        fetch(`http://melatupa.azurewebsites.net/regionLevels/${this.state.regionLevel}/regions`)
        .then(result=>result.json())
        .then(regions=>this.setState({regions}))*/
    }

    handleRegionUpdate(regLevel) {      
      this.setState({regionLevel : regLevel}, function() {

        apiData.getRegionLevelRegions(this.state.regionLevel).then(result => {
          this.setState( { regions : result} )
        });
     });
    }

    change(event){
      var index = event.nativeEvent.target.selectedIndex;
      var scenariosArray = this.state.regions[index].scenarioCollections;
      this.setState({scenariosCollection : scenariosArray}, function() {
      });
      this.setState({regionId : event.target.value}, function() {
      });
   }   

    changeScenarioCollectionId(event) {
      this.props.updateScenarioCollection(event.target.value, this.state.regionId);
   }

   
    render() {  

      const regions = this.state.regions.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      const scenariosCollection = this.state.scenariosCollection.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      
      return (
        <Col xs={12}  md={12}>
        <Row>
            <RegionLevel updateRegionLevel={this.handleRegionUpdate}/> 
        </Row>
        <span>    
           <h4> {getStrings.getLangString().Area} </h4>
           <select id="regionId" onChange={this.change}>
             {regions}
           </select>   
          </span>
          <span>
          <h4>{getStrings.getLangString().Scenariocollection}</h4>
           <select id="scenarioCollectionId" onChange={this.changeScenarioCollectionId}>  
              {scenariosCollection}
           </select>
           </span>          
        </Col>
      );
    }
  }

  class Scenario extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        scenariosA : []
        };

        this.updateScenarioCollectionId = this.updateScenarioCollectionId.bind(this);        
        this.onC = this.onC.bind(this);
    }
  
    componentDidMount() {
      this.Scenario();   
    }
  
    Scenario() {
    }

    updateScenarioCollectionId(scenarioCollectionId, regionId) {
        apiData.getScenarioCollection(scenarioCollectionId, regionId).then(result => {
          this.setState( { scenariosA : result }, () => {
            this.props.updateGraphValues(this.state.scenariosA)
        })
      })
    }

    onC(e, data) {
      if (e.target.className === "labelChosen") {
          e.target.className = "labelNotChosen"
      }
      else {
        e.target.className = "labelChosen"
      }
    }
  
    render() {
     const contentScenarios = this.state.scenariosA.length>0 ? this.state.scenariosA[0].scenarios : []
     const scenarios = contentScenarios.map(item=> <div key={item.id}> <label id={item.name} value={item.id} className="labelNotChosen, scenarios" onClick={(e) => this.onC(e, item.id)} >{item.description} </label> </div>)

     const contentDates = this.state.scenariosA.length>0 ? this.state.scenariosA[0].timePeriods : []
     const periods = contentDates.map(item=> <div key={item.id}> <label  id={item.yearStart} value={item.id} className="labelNotChosen, periods" onClick={(e) => this.onC(e, item.id)}>{item.yearStart} - {item.yearEnd}  </label></div>)
  

     const contentIndicators = this.state.scenariosA.length>0 ? this.state.scenariosA[0].indicatorCategories : []

     //console.log(contentIndicators)
     const indicatorsArray = contentIndicators.map(item=>
     (item.indicators.map(indic=> <div  key={indic.id}> <label  value={indic.id}  className="labelNotChosen, indicators" onClick={(e) => this.onC(e, indic.id)} >{indic.name}</label> </div>))
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
            <h1> Forest Indicator </h1>
            </Col>
          </Row>
          <Row>
              <Col xs={12}  md={3}  className='left'>
             <Row>      
            <Region updateScenarioCollection={this.updateScenarioCollectionId}/>            
             </Row>
              <span className='paddBottom'>
           <h4> Scenarios </h4>
            <ul id="scenarioId" >
              {scenarios}
           </ul>  
           </span>
           <span>
                         <h4> Periods </h4>
           <ul id="periodId" >
              {periods}
           </ul>
           </span>  
          </Col>
          <Col xs={12}  md={5}   className='Middle'>
            
        <div id="container" Middle col-md-5 col-xs-12></div>
           
          </Col>
        
          <Col xs={12}  md={3}   className='Right'>
            <h4> Indicators </h4>
           <ul id="indicatorId">
              {indicatorsArray}
           </ul> 
           </Col> 
          </Row>
        </Grid>
      )
    }
  }

  class Graph extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        valuesGraph : []
        };

        this.updateGraph = this.updateGraph.bind(this);
        this.refreshGraph = this.refreshGraph.bind(this);

    }
  
    componentDidMount() {
      this.Graph();   
    }
  
    Graph() {
    }

    updateGraph(arrayValues) {
      this.setState( { valuesGraph : arrayValues[0].values }, () => {this.refreshGraph()});
    }

    refreshGraph() {
      //console.log(this.state.valuesGraph)
      var arrayResult = []

      var scenariosAccepted = []
      var periodsAccepted = []
      var indicatorsAccepted = []      

      var scenariosArray = document.getElementsByClassName('scenarios')
      var periodsArray = document.getElementsByClassName('periods')
      var indicatorsArray = document.getElementsByClassName('indicators')

      
      console.log(arrayResult)
    }

    render() {
      $(function () { 
        var myChart = Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    });
  
      return (


           <Scenario updateGraphValues={this.updateGraph}/>
           
      )
    }
  }

  export default Graph