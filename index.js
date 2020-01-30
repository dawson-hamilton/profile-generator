const inquirer = require("inquirer");
const htmlGen = require("./generateHTML");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const pdf = require('html-pdf')
const writeToFileAsync = util.promisify(fs.writeFile);

async function init() {
    try {
        let name = await fullName();
        let { username } = await getName();
        let color = await getColor();
        let githubReturn = await gitHubCall(username);
        let userStars = await getGithubStarred(username);
        let userProfile = githubReturn.data
        let bioBio = await userProfile.bio.split(".");
        let profileBio = bioBio[0];
        let profile = {
            picture: userProfile.avatar_url,
            blog: userProfile.blog,
            location: userProfile.location,
            github: userProfile.html_url,
            bio: profileBio,
            followers: userProfile.followers,
            following: userProfile.following,
            repos: userProfile.public_repos
        }
        let starred = userStars.data.length;
        let newHtml = htmlGen(color, profile, starred, name)
        let options = { format: 'A4' };
        await writeToFileAsync(`${username}.html`, newHtml)
        var html = await fs.readFileSync(`./${username}.html`, 'utf8')
        pdf.create(html, options).toFile(`./${username}.pdf`, function (err, res) {
            if (err) return console.log(err);
            console.log(res);
        });
        console.log("Success!")
    } catch (err) {
        console.log(err)
    }
}

function promptUser() {
    function getName() {
        let username = inquirer
            .prompt({
                type: "input",
                message: "What is your GITHUB username?",
                name: "username"
            })
        return username
    }
    function getColor() {
        let color = inquirer
            .prompt({
                type: "input",
                message: "What is your favorite color?",
                name: "color",
                choices: ["green", "pink", "red", "blue"]
            })
        return color
    }
}