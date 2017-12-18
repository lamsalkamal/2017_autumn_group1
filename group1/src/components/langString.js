
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
        RegionlevelDesc : "First, select the region level",
        FeedbackDesc : "Send feedback via email",
        MelatupaDesc : "Open Melatupa service with selected values",
        TimeDesc : "Choose one time Period",
        IndicatorDesc : "The maximum number of scenario–indicator combinations (chosen scenarios * chosen indicators) is 20",
        ScenarioDesc : "The maximum number of scenario–indicator combinations (chosen scenarios * chosen indicators) is 20 ",
        PolarChart : "Polar Chart",
        ManyPolarChart : "Many Polar Charts",
        BarChart : "Bar Chart",
        Table : "Table",
        PrintTable : "Print table",
        ExportPng : "Export to PNG"
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
        RegionDesc : "Sitten valitse haluamasi alue",
        RegionlevelDesc : "Aluksi valitse haluamasi aluetaso",
        FeedbackDesc : "Lähetä palautetta sähköpostin kautta ",
        MelatupaDesc : "Avaa Melatupa palvelu valituilla arvoilla",
        TimeDesc : "Valitse yksi aikaväli",
        IndicatorDesc : "Maksimi määrä skenaario-indikaattori yhdistelmiä (valitut skenaariot * valitut indikaattorit) on 20 ",
        ScenarioDesc : "Maksimi määrä skenaario-indikaattori yhdistelmiä (valitut skenaariot * valitut indikaattorit) on 20 ",
        PolarChart: "Polar-kaaviot",
        ManyPolarChart: "Monet polar-kaaviot",
        BarChart: "Pylväsdiagrammi",
        Table: "Pöytä",
        PrintTable: "Tulosta pöytä",
        ExportPng: "Vie PNG-tiedostoon"
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

export default {chooseLang , strings , getLangString , lang};