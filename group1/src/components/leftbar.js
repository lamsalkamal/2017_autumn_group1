import React, { Component } from 'react'
import apiData from './Data/getData'
import getStrings from './Data/langString'

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
      <div>
        <b>Language</b>
        <select id="languageSelect" onChange={this.langChange}>
            <option selected="selected"> English </option>
            <option selected="selected"> Suomi </option>
            </select> 

        <div>
         {getStrings.getLangString().Regionlevel}
            <select id="regionLevelId" onChange={this.change}>
            <option disabled selected="selected"> -- select an option -- </option>
                {regionLevels}
            </select>         
        </div>
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
        <div>
            <RegionLevel updateRegionLevel={this.handleRegionUpdate}/> 
           {getStrings.getLangString().Area}
           <select id="regionId" onChange={this.change}>
             {regions}
           </select>   
           <hr/>
           {getStrings.getLangString().Scenariocollection}
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
        this.onC = this.onC.bind(this);
        this.findElementsByClassName = this.findElementsByClassName.bind(this)
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

    onC(e, data) {
      if (e.target.className === "labelChosen") {
          e.target.className = "labelNotChosen"
      }
      else {
        e.target.className = "labelChosen"
      }
    }

    findElementsByClassName(className) {
      console.log(document.getElementsByClassName(className));
    }
  
    render() {
     const contentScenarios = this.state.scenariosA.length>0 ? this.state.scenariosA[0].scenarios : []
     const scenarios = contentScenarios.map(item=> <div key={item.id}> <label id={item.name} value={item.id} className="labelNotChosen" onClick={(e) => this.onC(e, item.id)} >{item.description} </label> </div>)

     const contentDates = this.state.scenariosA.length>0 ? this.state.scenariosA[0].timePeriods : []
     const periods = contentDates.map(item=> <div key={item.id}> <label  id={item.yearStart} value={item.id} className="labelNotChosen" onClick={(e) => this.onC(e, item.id)}>{item.yearStart} - {item.yearEnd}  </label></div>)
  

     const contentIndicators = this.state.scenariosA.length>0 ? this.state.scenariosA[0].indicatorCategories : []
     var indicators = []

     //console.log(contentIndicators)
     const indicatorsArray = contentIndicators.map(item=>
     (item.indicators.map(indic=> <div  key={indic.id}> <label  value={indic.id}  className="labelNotChosen" onClick={(e) => this.onC(e, indic.id)} >{indic.name}</label> </div>))
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
           <ul id="indicatorId">
              {indicatorsArray}
           </ul>  

           <button onClick={() => this.findElementsByClassName("labelChosen")}> click me! </button>
                  
        </div>
      );
    }
  }

  export default Scenario