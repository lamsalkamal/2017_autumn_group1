import React, { Component } from 'react';

import './components/leftbar.css';

//import Body from './components/body.js'
//import {Row,Grid,Col ,Button } from 'react-bootstrap'
import getStrings from './components/langString.js'
import apiData from './Data/getData.js'
import Graph from './components/graph.js'
import Scenario from './components/scenario.js'
import RegionLevel from './components/regionlevel.js'
import Region from './components/region.js'
import FeedBack from './components/feedBack.js'
//import $ from 'jquery'

import HighchartsMore from 'highcharts-more'

var Highcharts = require('highcharts');
HighchartsMore(Highcharts)


// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      regionsLevels : [],
      lang : true,

      regions : [],
      scenariosCollection : [],
      regionId : "1",

      scenariosA : [],

      valuesArray : [],
      valuesGraph : []
    }

      this.regionLevel = this.regionLevel.bind(this);
      this.handleRegionUpdate = this.handleRegionUpdate.bind(this);
      this.change = this.change.bind(this);

      this.changeRegion = this.changeRegion.bind(this);
      this.langChange = this.langChange.bind(this);
      this.changeScenarioCollectionId = this.changeScenarioCollectionId.bind(this);
      
      this.updateScenarioCollectionId = this.updateScenarioCollectionId.bind(this);  
      this.onC = this.onC.bind(this);     

      this.updateGraph = this.updateGraph.bind(this);
      this.refreshValues = this.refreshValues.bind(this);
      this.createGraph = this.createGraph.bind(this);
      
    };

    //language change
    langChange()
    { //Wouldn't work with more than 2 languages, but in this case we are only using 2.
     this.setState({ lang: !this.state.lang }, function() {      
       apiData.getRegionLevels(this.state.lang).then(result => {
         this.setState( { regionsLevels : result} )
       });
       getStrings.chooseLang(this.state.lang);
     });
    }

    //---regionLevel---
    regionLevel() {
      apiData.getRegionLevels(this.state.lang).then(result => {
      this.setState( { regionsLevels : result} )
    });
    }

    componentDidMount() {
      this.regionLevel();
      getStrings.chooseLang(this.state.lang);  
    }

    handleRegionUpdate(regLevel) {    
      this.setState({regionLevel : regLevel}, function() {

        apiData.getRegionLevelRegions(this.state.regionLevel).then(result => {
          this.setState( { regions : result} )
          //Calling changeRegion without event using Value 0 to get first item from  array to show
          this.changeRegionDefault(0);
        });
     });
    }

   change(event){
      var value = event.target.value;
      this.handleRegionUpdate(value); 
   }

   //---region---
   changeRegion(event){ //Was change inside Region class had to change name changeRegion 
    var index = event.nativeEvent.target.selectedIndex;
    var scenariosArray = this.state.regions[index].scenarioCollections;
    this.setState({scenariosCollection : scenariosArray}, function() {
    });
    this.setState({regionId : event.target.value}, function() {
      //Triggering getting values from scenario collections first choice
      const scenariosCollectionDefault = this.state.scenariosCollection.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      this.changeScenarioCollectionIdDefault(scenariosCollectionDefault[0].key);
    });
   }
   //this is to use chanceRegion without event
   changeRegionDefault(defaultValue){
    var index = defaultValue;
    var scenariosArray = this.state.regions[index].scenarioCollections;
    this.setState({scenariosCollection : scenariosArray}, function() {
    });
    //getting key value for regionid
    const regionsDefault = this.state.regions.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
    this.setState({regionId : regionsDefault[defaultValue].key}, function() {
      //Triggering getting values from scenario collection first choice
      const scenariosCollectionDefault = this.state.scenariosCollection.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      this.changeScenarioCollectionIdDefault(scenariosCollectionDefault[0].key);
    });
  }

    changeScenarioCollectionId(event) {
      this.updateScenarioCollectionId(event.target.value, this.state.regionId);
   }
   //Same idea as changeRegionDefault
    changeScenarioCollectionIdDefault(defaultValue) {
     /* console.log("hi")
      console.log(defaultValue)
      console.log(this.state.regionId)*/
      this.updateScenarioCollectionId(defaultValue, this.state.regionId);
  }
  
  //---Scenario--
  //THERE IS BUG WHEN CHOOSING REGIONLEVEL: FORESTRY CENTER AND AREA: AHVENANMAA IT GIVES ERROR BEACAUSE REGIONID IS 0
  //AND I THINK THIS IS MISTAKE IN API
    updateScenarioCollectionId(scenarioCollectionId, regionId) {
      apiData.getScenarioCollection(scenarioCollectionId, regionId).then(result => {
        this.setState( { scenariosA : result }, () => {
          this.updateGraph(this.state.scenariosA)       
      })
    })
  }
  onC(e, data) {
    if (e.target.className.indexOf("labelChosen")> -1) {
      e.target.className = e.target.className.replace("labelChosen", "labelNotChosen")
    }
    else {
      e.target.className = e.target.className.replace("labelNotChosen", "labelChosen")
    }
    this.refreshValues()
  }

   //---Graph--
  updateGraph(arrayValues) {
    this.setState( { valuesArray : arrayValues[0].values }, () => {this.refreshValues()});
  }

  refreshValues() {
    var arrayResult = []

    var scenariosAccepted = []
    var periodsAccepted = []
    var indicatorsAccepted = []      

    var scenariosArray = document.getElementsByClassName('labelChosen scenarios')
    for(var i=0; i<scenariosArray.length; i++) { 
      scenariosAccepted.push(scenariosArray[i].attributes.getNamedItem("value").nodeValue)
    }
    var periodsArray = document.getElementsByClassName('labelChosen periods')
    for(var j=0; j<periodsArray.length; j++) { 
      periodsAccepted.push(periodsArray[j].attributes.getNamedItem("value").nodeValue)
    }
    var indicatorsArray = document.getElementsByClassName('labelChosen indicators')
    for(var z=0; z<indicatorsArray.length; z++) { 
      indicatorsAccepted.push(indicatorsArray[z].attributes.getNamedItem("value").nodeValue)
    }
    
    this.state.valuesArray.forEach(function(element) {
       if(scenariosAccepted.includes(element.scenarioId.toString()) && periodsAccepted.includes(element.timePeriodId.toString()) && indicatorsAccepted.includes(element.indicatorId.toString()) ) {
          arrayResult.push(element)
       }
    })

    this.setState( { valuesGraph : arrayResult }, () => {this.createGraph(1)});
  }

  createGraph(value) {

    //console.log(this.state.valuesArray)
    

    switch(value) {
        case 1 : 
                    var options = {
                      chart: {
                          renderTo: 'container',
                          polar: true
                      },
                      title: {
                        text: 'My title'
                      },
                      pane: {
                        startAngle: 0,
                        endAngle: 360
                      },
                      xAxis: {
                        min: 0,
                        max: 360
                      },                    
                      yAxis: {
                          min: 0
                      },
                      plotOptions: {
                        series: {
                            pointStart: 0
                        },
                        column: {
                            pointPadding: 0,
                            groupPadding: 0
                        }
                      },
                  };
                  options.xAxis.tickInterval = Math.round(360 / (this.state.valuesGraph.length));   
                  options.plotOptions.series.pointInterval = Math.round(360 / (this.state.valuesGraph.length));                   
                  var myChart = new Highcharts.Chart(options);
                  var valuesA = []
                  this.state.valuesGraph.forEach(function(element) {
                   valuesA.push(element.value)
                 })
                 myChart.addSeries({
                  type: 'column',
                  name: 'Column',
                  data: valuesA,
                  pointPlacement: 'between'
                 });
                 myChart.redraw();
              break;
        default:

    }
  }

  
  render() {
    return (

      <div className="App">
        <RegionLevel regionsLevels = { this.state.regionsLevels }
                     regionLevel = { this.regionLevel }
                     langChange = { this.langChange }
                     handleRegionUpdate = { this.handleRegionUpdate }
                     change = { this.change }
                     />
        <Region handleRegionUpdate = { this.handleRegionUpdate }
                regions = { this.state.regions }
                scenariosCollection = { this.state.scenariosCollection }
                regionsLevels = { this.state.regionsLevels }
                changeRegion = { this.changeRegion }
                changeScenarioCollectionId = { this.changeScenarioCollectionId }
                updateScenarioCollectionId = { this.updateScenarioCollectionId }
                />
        <Scenario scenariosA = { this.state.scenariosA }
                  updateScenarioCollectionId = { this.updateScenarioCollectionId }
                  onC = {this.onC}
                  />
        <Graph  updateGraphValues={this.updateGraph}
                createGraph = {this.createGraph}
               />
        <FeedBack/>
      </div>
      
    );
  }
}
export default App;
