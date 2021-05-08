const { default: axios } = require('axios');
const readline = require('readline');
const Table = require('cli-table');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter Your GitHuv Handle name: ', async function (answer)  {
   
    // Api Call
    const profileData = await axios.get(`https://api.github.com/users/${answer}`);  
    // console.log(profileData.data);

    const { name, location, followers, following, company } = profileData.data
    // console.log(name, location, followers, following, company);

    const profileTable = new Table();

    profileTable.push(
        { Name : name || ""},
        { Company : company || ""},
        { Location : location || ""},
        { Followers : followers || ""},
        { Following : following || ""}
    );

    console.log(profileTable.toString());

    
    rl.close();
});

