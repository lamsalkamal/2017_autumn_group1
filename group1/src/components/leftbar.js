import React, { Component } from 'react'
//import $ from 'jquery'

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
      fetch(`http://melatupa.azurewebsites.net/regionLevels`)
 		.then(result=>result.json())
        .then(regionsLevels=>this.setState({regionsLevels}))
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
        fetch(`http://melatupa.azurewebsites.net/regionLevels/${this.state.regionLevel}/regions`)
        .then(result=>result.json())
        .then(regions=>this.setState({regions}))
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
        fetch(`http://melatupa.azurewebsites.net/scenarioCollection/${scenarioCollectionId}/region/${regionId}`)
        .then(result=>result.json())
        .then(scenariosA=>this.setState({scenariosA}))
    }
  
    render() {
     const contentScenarios = this.state.scenariosA.length>0 ? this.state.scenariosA[0].scenarios : []
     const scenarios = contentScenarios.map(item=><li key={item.id} value={item.name}>{item.description}</li>)

     const contentDates = this.state.scenariosA.length>0 ? this.state.scenariosA[0].timePeriods : []
     const periods = contentDates.map(item=><li key={item.id}>{item.yearStart} - {item.yearEnd}</li>)

     const contentIndicators = this.state.scenariosA.length>0 ? this.state.scenariosA[0].indicatorCategories : []
     var indicators = []
     const indicatorsCategories = contentIndicators.map(item=>  
     (item.indicators.map(indic=><li key={indic.id}>{item.name} - {indic.name}</li>))
    )

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