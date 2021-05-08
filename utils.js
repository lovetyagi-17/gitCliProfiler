const axios = require("axios");
var gitUrl = "https://api.github.com/users/"; 

async function apiCall(url) {
    try{
        return await axios.get(url);  
    } catch (error) {
        console.log(`Something Wrong With ${answer}`);
        process.exit(0);
    }
}

module.exports =  {
    apiCall,
    gitUrl
}