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

        var ty = "&ty=";
        for(i = 0; i<scenariosAccepted.length; i++){
            ty = ty + scenariosAccepted[i] +",";
            if(i === scenariosAccepted.length -1){
                ty = ty.slice(0, -1);
            }
        }

        var ko = "&ko=" + this.props.regionId;

        var lk = "lk=" + this.props.scenarioId;

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
        var melaTupaURL = "http://mela2.metla.fi/mela/_tupatest15/tupa/index.php?" + lk + ko + ty + ka + mj;
        melaTupaURL = melaTupaURL.slice(0, -1);

        var la = "&la=";
        if(getStrings.lang === true){
            la = la+"fi";
        }else{
            la = la+"en";
        }

         melaTupaURL = melaTupaURL + la;
        
        return melaTupaURL;
    }

    render () {
        return (
            <div>

                <a href= { this.setURl() } target="_blank" >
                    <button>{ getStrings.getLangString().Melatupa }</button>
                </a>
                <abbr title={getStrings.getLangString().MelatupaDesc}>[?]</abbr>

            </div>
        )
    }
}

export default choiceTransfer