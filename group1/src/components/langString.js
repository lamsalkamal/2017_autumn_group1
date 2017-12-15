
let lang = true;

let strings = {};

let langStringEN = {
        Regionlevel : "Regionlevel",
        Area : "Area",
        Scenariocollection : "Scenariocollection",
        SCENARIOS : "SCENARIOS",
        PERIODS : "PERIODS",
        INDICATORS : "INDICATORS",
        ForestIndicator: "Forest Indicator",
        SendFeedback : "Send Feedback",
        Melatupa : "MELATupa service",
        LanguageDesc : "Select the language to switch the interface's language",
        ScenarioCollectionDesc : "Finally you can select one of the scenario's collections",
        RegionDesc : "Then you take one of the region",
        RegionlevelDesc : "First, select the region level"

    }
let langStringFI = {
        Regionlevel : "Aluetaso",
        Area : "Alue",
        Scenariocollection: "Skenaariokokoelma",
        SCENARIOS : "SKENAARIOT",
        PERIODS : "AJANKOHTA",
        INDICATORS : "INDIKATTOREIDEN VALINTA",
        ForestIndicator: "Metsämittari",
        SendFeedback : "Anna palautetta",
        Melatupa : "MELATupa Palvelu",
        LanguageDesc : "Select the language to switch the interface's language",
        ScenarioCollectionDesc : "Valitse skenario",
        RegionDesc : "Sitten valitse haluamsi alue",
        RegionlevelDesc : "Aluksi valitse haluamasi aluetaso"
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