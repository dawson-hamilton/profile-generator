const inquirer = require("inquirer");
const htmlGen = require("./generateHTML");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

// const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your githHUB username?"
        },
        {
            type: "input",
            name: "color",
            message: "What is your favorite color?"
        },
    ])
        .then(function ({ username }) {
            const queryUrl = `https://api.github.com/users/${username}`;

            axios.get(queryUrl).then(function (res) {
                const results = res;
                console.log(results);
            })
        })
}

promptUser();


// function writeToFile(fileName, data) {

// }

// async function init() {
//     console.log("hi")
//     try {
//         const answers = await promptUser();

//         htmlGen.generateHTML(answers);

//         await writeFileAsync("profile.pdf", pdf);

//         console.log("Successfully wrote to profile.pdf");
//     } catch (err) {
//         console.log(err);
//     }
// }

// init();