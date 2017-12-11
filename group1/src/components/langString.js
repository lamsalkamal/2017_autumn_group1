
let lang = true;

let strings = {};

let langStringEN = {
        Regionlevel : "Regionlevel",
        Area : "Area",
        Scenariocollection : "Scenariocollection",
        SCENARIOS : "SCENARIOS",
        PERIODS : "PERIODS",
        INDICATORS : "INDICATORS",
        ForestIndicator: "Forest Indicator"
    }
let langStringFI = {
        Regionlevel : "Aluetaso",
        Area : "Alue",
        Scenariocollection: "Skenaariokokoelma",
        SCENARIOS : "SKENAARIOT",
        PERIODS : "AJANKOHTA",
        INDICATORS : "INDIKATTOREIDEN VALINTA",
        ForestIndicator: "Metsämittari"
    } 


function chooseLang(langValue)
{   
    lang = langValue;
}

function getLangString()
{
    if(lang === true){
        strings = langStringFI;
        }else{
        strings = langStringEN;
        }
    
        return strings;
}

export default {chooseLang , strings , getLangString};