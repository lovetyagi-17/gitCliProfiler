const { default: axios } = require('axios');
const readline = require('readline');
const Table = require('cli-table');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter Your GitHuv Handle name: ', async function (answer)  {
   
    // Api Call
    try{
        var profileData = await axios.get(`https://api.github.com/users/${answer}`);  
    } catch (error) {
        console.log(`Something Wrong With ${answer}`);
    }

    const { name, location, followers, following, company } = profileData.data
    
    const profileTable = new Table();
    const orgTable = new Table({
        head: ["Organization", "Description"],
    });

    profileTable.push(
        { Name : name || ""},
        { Company : company || ""},
        { Location : location || ""},
        { Followers : followers || ""},
        { Following : following || ""}
    );


    try{
        var orgData = await axios.get(`https://api.github.com/users/${answer}/orgs`);  
    } catch (error) {
        console.log(`Something Wrong With ${answer}`);
    }

    orgData.data.forEach((org) => {
        // console.log(org);
        orgTable.push([org.login, org.description.slice(0, 40) + '.....'])
    });

     // UserProfile Data
     console.log(profileTable.toString());
     console.log(orgTable.toString());
    
    rl.close();
});

