const readline = require('readline');
const Table = require('cli-table');
const { apiCall, gitUrl } = require('./utils')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter Your GitHuv Handle name: ', async function (answer)  {
    // try{
    //     var profileData = await axios.get(`https://api.github.com/users/${answer}`);  
    // } catch (error) {
    //     console.log(`Something Wrong With ${answer}`);
    // }
    // Profile Api Call
    var profileData = await apiCall( gitUrl + `${answer}`);  

    // The data you want to display out of profileData.data
    const { name, location, followers, following, company } = profileData.data
    
    const profileTable = new Table();   // To show Progile Data.
    const orgTable = new Table({
        head: ["Organization", "Description"],         // To show Organization Data.
    });

    profileTable.push(
        { Name : name || ""},
        { Company : company || ""},
        { Location : location || ""},
        { Followers : followers || ""},
        { Following : following || ""}
    );


    // Org API Call.
    var orgData = await apiCall(gitUrl + `${answer}/orgs`); 

    // To show User's Orgname & description in Proper way.
    orgData.data.forEach((org) => {
        // console.log(org);
        orgTable.push([org.login, org.description.slice(0, 50) + '.....'])
    });

     // UserProfile Data
     console.log(profileTable.toString());
     console.log(orgTable.toString());
    
     // To Close
    rl.close();
});

