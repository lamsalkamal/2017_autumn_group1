import React, { Component } from 'react'

class Region extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          regionChosen : "1",
          regionsLevels : [],
          regions : []
        };

        this.change = this.change.bind(this);
    }
  
    componentDidMount() {
      this.Region();
    }
  
    Region() {
      fetch(`http://melatupa.azurewebsites.net/regionLevels`)
 		.then(result=>result.json())
        .then(regionsLevels=>this.setState({regionsLevels}))

        fetch(`http://melatupa.azurewebsites.net/regionLevels/${this.state.regionChosen}/regions`)
        .then(result=>result.json())
        .then(regions=>this.setState({regions}))
    }

    change(event){
        this.setState({regionChosen:event.target.value}, function() {            
            fetch(`http://melatupa.azurewebsites.net/regionLevels/${this.state.regionChosen}/regions`)
            .then(result=>result.json())
            .then(regions=>this.setState({regions}))
          });  
     }
  
    render() {
      const regionLevels = this.state.regionsLevels.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
      const regions = this.state.regions.map(item=><option key={item.id} value={item.id}>{item.name}</option>)

      return (
        <div id="layout-content" className="layout-content-wrapper">
            <select id="regionLevelId" onChange={this.change}>
                {regionLevels}
            </select>       

            <br></br> <br></br>

            <select id="regionId">
                {regions}
            </select>    
        </div>
      );
    }
  }

  export default Region