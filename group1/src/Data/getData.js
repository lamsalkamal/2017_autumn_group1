import axios from 'axios';

var headers =  { headers: {
    'Accept-Language': 'en' }
    }

function getRegionLevels(lang)
{   
    if(lang === true){
        headers =  { headers: {
            'Accept-Language': 'fi' }
            }  
    }else {
        headers =  { headers: {
            'Accept-Language': 'en' }
            }
    }
    return new Promise((resolve , reject) => {
        axios.get("https://melatupa.azurewebsites.net/regionLevels" , headers)
        .then(results => {
            //console.log(results)
            const items = results.data;
            resolve(items);
        })
        .catch(error => {
            console.log(error);
            reject();
        })
    });
}


function getRegionLevelRegions(id)
{

  return new Promise((resolve , reject) => {
    axios.get("https://melatupa.azurewebsites.net/regionLevels/" +id +"/regions" , headers)
    .then(results => {
            //console.log(results)
            const items = results.data;
           // console.log(items)
        resolve(items);
    })
    .catch(error => {
        console.log(error);
        reject();
    })
 });
}

function getScenarioCollection(collectionId , regionId)
{

 return new Promise((resolve , reject) => {
    axios.get( "https://melatupa.azurewebsites.net/scenarioCollection/"+ collectionId +"/region/"+regionId, headers)
    .then(results => {
        const items = results.data;
       // console.log(items);
        resolve(items);
    })
    .catch(error => {
        console.log(error);
        reject();
    })
 });
 
}

export default { getRegionLevels , getRegionLevelRegions , getScenarioCollection };