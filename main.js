const { default: axios } = require('axios');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter Your GitHuv Handle name: ', async function (answer)  {
   
    // api call
    const profileData = await axios.get(`https://api.github.com/users/${answer}`);
    
    console.log(profileData.data);
    
    rl.close();
});

