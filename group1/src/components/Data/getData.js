import axios from 'axios';

function getRegionLevels()
{
    return new Promise((resolve , reject) => {
        axios.get("http://melatupa.azurewebsites.net/regionLevels")
        .then(results => {
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
    axios.get("http://melatupa.azurewebsites.net/regionLevels/" +id +"/regions")
    .then(results => {
            //console.log(results)
            const items = results.data;
            console.log(items)
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
    axios.get( "http://melatupa.azurewebsites.net/scenarioCollection/"+ collectionId +"/region/"+regionId)
    .then(results => {
        const items = results.data;
        console.log(items);
        resolve(items);
    })
    .catch(error => {
        console.log(error);
        reject();
    })
 });
 
}

export default { getRegionLevels , getRegionLevelRegions , getScenarioCollection };