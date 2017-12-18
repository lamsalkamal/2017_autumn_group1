import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import getStrings from './langString.js'


class Graph extends Component {

      show(evt, graph){
              var i, tabcontent;
              tabcontent = document.getElementsByClassName("tabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                  tabcontent[i].style.display = "none";
              }
              document.getElementById(evt).style.display = "block"
              
             // var str = evt
             // this.props.createGraph(parseInt(graph))
         
      }

      printData(){
         var divToPrint=document.getElementById("tableIdValues");
         if(divToPrint !== null) {
            var newWin= window.open("");
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
         }
      }

      exportPNG() {
        if(document.getElementById("tableIdValues") !== null) {
          html2canvas(document.querySelector("#tableIdValues")).then(canvas => {
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");            
            window.location.href=image;
          });
       }
      }

      render() {


      return (
      <div>
          <div>
          <button onClick={this.show.bind(this, 'container1', '1')}>{getStrings.getLangString().PolarChart}</button>
          <button onClick={this.show.bind(this, 'container2', '2')}>{getStrings.getLangString().ManyPolarChart}</button>
          <button onClick={this.show.bind(this, 'container3', '3')}>{getStrings.getLangString().BarChart}</button>
          <button onClick={this.show.bind(this, 'container4', '4')}>{getStrings.getLangString().Table}</button>
        </div>

          <div id="container1" className="tabcontent">  </div>  
          <div id="container2" className="tabcontent"  style={{display: 'None'}}>  </div>  
          <div id="container3" className="tabcontent"  style={{display: 'None'}}>  </div>  
          <div id="container4" className="tabcontent"  style={{display: 'None'}}> 

          <button id="printbut" onClick={this.printData.bind(this)}> {getStrings.getLangString().PrintTable} </button>
          <button id="exportpng" onClick={this.exportPNG.bind(this)}>{getStrings.getLangString().ExportPng}</button>
            
          
          
          </div>  
      </div> 
           
      )
    }
  }
//<Scenario updateGraphValues={this.updateGraph} updateGraphNoValues={this.refreshValues}/>
  export default Graph