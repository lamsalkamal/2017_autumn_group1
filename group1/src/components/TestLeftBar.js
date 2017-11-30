import React, { Component } from 'react'

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
          regionLevelChosen : "1",
          regions : [],
          scenarios : []
        };

        this.handleRegionUpdate = this.handleRegionUpdate.bind(this);
        this.change = this.change.bind(this);
    }
  
    componentDidMount() {
      this.RegionLevel();
    }
  
    RegionLevel() {
        fetch(`http://melatupa.azurewebsites.net/regionLevels/${this.state.regionLevelChosen}/regions`)
        .then(result=>result.json())
        .then(regions=>this.setState({regions}))
    }

    handleRegionUpdate(filterValue) {
      this.setState({regionLevelChosen : filterValue}, function() {
        fetch(`http://melatupa.azurewebsites.net/regionLevels/${this.state.regionLevelChosen}/regions`)
        .then(result=>result.json())
        .then(regions=>this.setState({regions}))
      });
    }

    change(event){
      var index = event.nativeEvent.target.selectedIndex;
      var scenariosArray = this.state.regions[index].scenarioCollections;
      this.setState({scenarios : scenariosArray}, function() {
      });
   }
  
    render() {  

      const regions = this.state.regions.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      const scenarios = this.state.scenarios.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      return (
        <div>
            <RegionLevel updateRegionLevel={this.handleRegionUpdate}/> 
            Alue
           <select id="regionId" onChange={this.change}>
             {regions}
           </select>   
           <hr/>
           Skenaariokokoelma
           <select id="scenarioCollectionId">  
              {scenarios}
           </select>          
        </div>
      );
    }
  }
/*
  class Scenario extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        regionChosen : "",
        scenarios : []
        };

        this.handleScenarioUpdate = this.handleScenarioUpdate.bind(this);
    }
  
    componentDidMount() {
      this.Scenario();
    }
  
    Scenario() {
        fetch(`http://melatupa.azurewebsites.net/regionLevels/1/regions`)
        .then(result=>result.json())
        .then(scenarios=>this.setState({scenarios}))
    }

    handleScenarioUpdate(filterValue) {
      this.setState({regionChosen : filterValue}, function() {
        fetch(`http://melatupa.azurewebsites.net/regionLevels/1/regions`)
        .then(result=>result.json())
        .then(scenarios=>this.setState({scenarios}))
      });
    }
  
    render() {
      console.log(this.props.regionLevelChosen);
     const scenarios = this.state.scenarios.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      return (
        <div id="layout-content" className="layout-content-wrapper">
            <Region updateRegion={this.handleScenarioUpdate}/> 
            
            <select id="scenarioId">
             {scenarios}
           </select>   
                  
        </div>
      );
    }
  }
*/
  export default Region