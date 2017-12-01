import React, { Component } from 'react'
import apiData from './Data/getData'
import $ from 'jquery'

class RegionLevel extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          regionsLevels : []
        };

        this.change = this.change.bind(this);
    }
  
    componentDidMount() {
      this.RegionLevel();
    } 
  
    RegionLevel() {
      apiData.getRegionLevels().then(result => {
      this.setState( { regionsLevels : result} )
    });
    }

    change(event){
        var value = event.target.value;
        this.props.updateRegionLevel(value);
     }
  
    render() {
      const regionLevels = this.state.regionsLevels.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      return (
        <div>
        Aluetaso 
            <select id="regionLevelId" onChange={this.change}>
            <option disabled selected="selected"> -- select an option -- </option>
                {regionLevels}
            </select>         
        </div>
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
        }
      );
     });
    }

    change(event){
      var index = event.nativeEvent.target.selectedIndex;
      var scenariosArray = this.state.regions[index].scenarioCollections;
      this.setState({scenariosCollection : scenariosArray}, function() {
      });
      this.setState({regionId : event.target.value}, function() {
      });

      console.log("event triggered")
      //this.changeScenarioCollectionId(event)
    /*  console.log("event called")
      var event = new Event('change');
      document.getElementById("scenarioCollectionId").dispatchEvent(event);*/
   }   

    changeScenarioCollectionId(event) {
      this.props.updateScenarioCollection(event.target.value, this.state.regionId);
   }

   
    render() {  

      const regions = this.state.regions.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      const scenariosCollection = this.state.scenariosCollection.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      return (
        <div>
            <RegionLevel updateRegionLevel={this.handleRegionUpdate}/> 
            Alue
           <select id="regionId" onChange={this.change}>
             {regions}
           </select>   
           <hr/>
           Skenaariokokoelma
           <select id="scenarioCollectionId" onChange={this.changeScenarioCollectionId}>  
              {scenariosCollection}
           </select>          
        </div>
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
    }
  
    componentDidMount() {
      this.Scenario();
    }
  
    Scenario() {
    }

    updateScenarioCollectionId(scenarioCollectionId, regionId) {
        apiData.getScenarioCollection(scenarioCollectionId, regionId).then(result => {
          this.setState( { scenariosA : result } )
        })
    }
  
    render() {
      console.log(this.state.scenariosA)
     const contentScenarios = this.state.scenariosA.length>0 ? this.state.scenariosA[0].scenarios : []
     const scenarios = contentScenarios.map(item=><li key={item.id} value={item.name}>{item.description}</li>)

     const contentDates = this.state.scenariosA.length>0 ? this.state.scenariosA[0].timePeriods : []
     const periods = contentDates.map(item=><li key={item.id}>{item.yearStart} - {item.yearEnd}</li>)

     const contentIndicators = this.state.scenariosA.length>0 ? this.state.scenariosA[0].indicatorCategories : []
     console.log(contentIndicators) // HAVE TO PRINT THIS NOW
     const indicatorsCategories = contentIndicators.map(item=><li key={item.id}>{item.name}</li>)
     


      return (
        <div id="layout-content" className="layout-content-wrapper">
            <Region updateScenarioCollection={this.updateScenarioCollectionId}/> 
            <hr></hr>
            SCENARIOS
            <ul id="scenarioId" >
              {scenarios}
           </ul>   
            PERIODS
           <ul id="periodId" >
              {periods}
           </ul>  
            INDICATORS
           <ul id="IndicatorId" >
              {indicatorsCategories}
           </ul>  
                  
        </div>
      );
    }
  }

  export default Scenario