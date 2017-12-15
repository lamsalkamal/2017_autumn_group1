import React, { Component } from 'react'
import getStrings from './langString.js'

class choiceTransfer extends Component {

    constructor(props){
        super(props);
        this.state={

        }
        this.setURl = this.setURl.bind(this);
    }

    setURl(){
        
        var scenariosAccepted = [];
        var scenariosArray = document.getElementsByClassName('labelChosen scenarios')
        for(var i=0; i<scenariosArray.length; i++) { 
          scenariosAccepted.push(scenariosArray[i].attributes.getNamedItem("value").nodeValue)
        }

        var lk = "lk=";
        for(i = 0; i<scenariosAccepted.length; i++){
            lk = lk + scenariosAccepted[i];
        }

        var ko = "&ko=" + this.props.regionId;

        var ty = "&ty=" + this.props.scenarioId;

        var periodsAccepted = [];
        var periodsArray = document.getElementsByClassName('labelChosen periods')
        for(var j=0; j<periodsArray.length; j++) { 
          periodsAccepted.push(periodsArray[j].attributes.getNamedItem("value").nodeValue)
        }

        var ka = "&ka=";
        for(i = 0; i<periodsAccepted.length; i++){
            ka = ka + periodsAccepted[i];
        }
        
        var scenariosAB = this.props.scenariosA;
        var mj = "&mj=";
        for(i = 0; i<scenariosAB.length; i++){
            var iCategories = scenariosAB[i].indicatorCategories;
            for(var k = 0; k<iCategories.length; k++){
                var indi = iCategories[k].indicators;
                for(var l = 0; l<indi.length; l++){
                    var aVar = indi[l].absVar;
                    mj = mj + aVar +",";
                }
                
            }
            
        }

        //console.log(this.props.scenariosA)

        const melaTupaURL = "http://mela2.metla.fi/mela/_tupatest15/tupa/index.php?" + lk + ko + ty + ka + mj;
        
        return melaTupaURL;
    }

    render () {
        return (
            <div>

                <a href= { this.setURl() } target="_blank" >
                    <button>{ getStrings.getLangString().Melatupa }</button>
                </a>

            </div>
        )
    }
}

export default choiceTransfer