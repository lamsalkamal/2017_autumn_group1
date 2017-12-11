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

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      regionsLevels : [],
      lang : true,
      regions : [],
      scenariosCollection : [],
      regionId : "1",
      scenariosA : []
    }

      this.regionLevel = this.regionLevel.bind(this);
      this.handleRegionUpdate = this.handleRegionUpdate.bind(this);
      this.change = this.change.bind(this);
      this.changeRegion = this.changeRegion.bind(this);
      this.langChange = this.langChange.bind(this);
      this.changeScenarioCollectionId = this.changeScenarioCollectionId.bind(this);
      this.updateScenarioCollectionId = this.updateScenarioCollectionId.bind(this);        
      
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
          //this.updateGraph(this.state.scenariosA)       
      })
    })
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
                  />
        <Graph 
               />
        
      </div>   
    );
  }
}
export default App;
