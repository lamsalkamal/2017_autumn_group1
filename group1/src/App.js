import React, { Component } from 'react';

import './components/leftbar.css';
import './App.css';

//import Body from './components/body.js'
//import {Row,Grid,Col ,Button } from 'react-bootstrap'
import getStrings from './components/langString.js'
import apiData from './Data/getData.js'
import Graph from './components/graph.js'
import Scenario from './components/scenario.js'
import RegionLevel from './components/regionlevel.js'
import Region from './components/region.js'
import FeedBack from './components/feedBack.js'
import Transfer from './components/choiceTransfer.js'
import Language from './components/language.js'
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
      scenarioId : "1",

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
      this.createGraphs = this.createGraphs.bind(this);
      
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
      this.setState( { scenarioId : event.target.value}, () => {});
      this.updateScenarioCollectionId(event.target.value, this.state.regionId);
   }
   //Same idea as changeRegionDefault
    changeScenarioCollectionIdDefault(defaultValue) {
     /* console.log("hi")
      console.log(defaultValue)
      console.log(this.state.regionId)*/
      this.setState( { scenarioId : defaultValue }, () => {});
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
      if (e.target.className.indexOf("periods")> -1) {
         this.checkPeriod(e.target,data);
      }
      else if (e.target.className.indexOf("scenarios")> -1 || e.target.className.indexOf("indicators")> -1 ) {
         this.checkScenarioIndicator(e.target,data);
       }
    }
    this.refreshValues()
  }

  checkPeriod(target, data) {
    var periodsArray = document.getElementsByClassName('periods')
    for(var j=0; j<periodsArray.length; j++) { 
      if(target !== periodsArray[j]) {
        periodsArray[j].className = periodsArray[j].className.replace("labelChosen", "labelNotChosen")
      }
    }
  }

  checkScenarioIndicator(target, data) {
    var scenariosArray = document.getElementsByClassName('labelChosen scenarios')
    var indicatorsArray = document.getElementsByClassName('labelChosen indicators')
    if(scenariosArray.length * indicatorsArray.length > 20) {
      target.className = target.className.replace("labelChosen", "labelNotChosen")
    }
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
    //console.log(scenariosAccepted)

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

    this.setState( { valuesGraph : arrayResult }, () => {this.createGraphs()});
  }

  createGraphs() {

   // console.log(this.state.valuesGraph)
   document.getElementById("container1").innerHTML = "";
   document.getElementById("container2").innerHTML = "";

   var printBut = document.getElementById("printbut");
   var exportPNG = document.getElementById("exportpng");
   document.getElementById("container3").innerHTML = "";



     //   case 1 : 
                    var options = {
                      chart: {
                          renderTo: 'container1',
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
            


    //    case 2 : 
              document.getElementById("container2").innerHTML = "container2";
              //ANOTHER GRAPH HERE
             


      //  case 3 : 
            // document.getElementById("container3").innerHTML = "";
                 var tbl;
              tbl  = document.createElement('table');
              tbl.id = "tableIdValues"
              tbl.style.width  = '500px';
              tbl.style.border = '1px solid black';

              var trFirst = tbl.insertRow();
              trFirst.style.border = '1px solid black';
              var tdFirst = trFirst.insertCell();
              tdFirst.appendChild(document.createTextNode(getStrings.getLangString().INDICATORS));
              tdFirst.style.border = '1px solid black';

              var scenariosArray = document.getElementsByClassName('labelChosen scenarios')
              for(var i=0; i<scenariosArray.length; i++) { 
                var tds = trFirst.insertCell();
                tds.style.border = '1px solid black';
                tds.className = "vertical"
                tds.appendChild(document.createTextNode(scenariosArray[i].innerHTML));
              }

              var indicatorsAccepted = []
              var indicartorsAcceptedNames = []
              var indicatorsArray = document.getElementsByClassName('labelChosen indicators')
              for(var z=0; z<indicatorsArray.length; z++) { 
                indicatorsAccepted.push(indicatorsArray[z].attributes.getNamedItem("value").nodeValue)
                //console.log(indicartorsAcceptedNames.push(indicatorsArray[z].innerHTML))
              }
            

              for(var j = 0; j < indicatorsAccepted.length; j++) {
                  var tr = tbl.insertRow();
                  tr.style.border = '1px solid black';
                  var td = tr.insertCell();
                  td.appendChild(document.createTextNode(indicartorsAcceptedNames[j]));
                  this.state.valuesGraph.forEach(function(elem) {  
                        if( parseInt(elem.indicatorId,10) === parseInt(indicatorsAccepted[j],10)) {
                          var td = tr.insertCell();
                          td.style.width  = '40px';
                          td.style.border = '1px solid black';
                          td.appendChild(document.createTextNode(elem.value));
                        }
                   });
                 // oldIndicator = element.indicatorId
              }
          
              document.getElementById("container3").appendChild(tbl);
              document.getElementById("container3").appendChild(printBut);
              document.getElementById("container3").appendChild(exportPNG);
              
              


    
  }

  
  render() {

    return (

      <div className="App">
        <Language langChange = { this.langChange }/>
        <RegionLevel regionsLevels = { this.state.regionsLevels }
                     regionLevel = { this.regionLevel }
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
                createGraphs = {this.createGraphs}
               />
       
        <FeedBack/>
        <Transfer regionId = { this.state.regionId }
                  scenarioId = { this.state.scenarioId }
                  scenariosA = { this.state.scenariosA }
                  />
      </div>
      
    );
  }
}
export default App;
