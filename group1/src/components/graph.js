import React, { Component } from 'react'

import $ from 'jquery'; 
import {Row,Grid,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import HighchartsMore from 'highcharts-more'
var Highcharts = require('highcharts');
HighchartsMore(Highcharts)


// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class Graph extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        valuesArray : [],
        valuesGraph : []
        };

        this.updateGraph = this.updateGraph.bind(this);
        this.refreshValues = this.refreshValues.bind(this);
        this.createGraph = this.createGraph.bind(this);

    }
  
    componentDidMount() {
      this.Graph();   
    }
  
    Graph() {
    }

    updateGraph(arrayValues) {
        this.setState( { valuesArray : arrayValues[0].values }, () => {this.refreshValues()});
      }

    //Parts that call for updateGraph are commented at App.js line 120 and scenario.js line 33 
    //Also from this file line from 138 is in comments at bottom. And none of .css is used atm

    //Was thinking something like this since atleast I don't know how to get original one to work in this version 
    //but its getting soo ¯\_(ツ)_/¯

    /*updateGraph() {
      this.setState( { valuesArray : this.props.scenariosA[0].values }, () => {this.refreshValues()});
    }*/

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

           <h1> </h1>
           
      )
    }
  }
//<Scenario updateGraphValues={this.updateGraph} updateGraphNoValues={this.refreshValues}/>
  export default Graph