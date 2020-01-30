const inquirer = require("inquirer");
const htmlGen = require("./generateHTML");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
console.log(htmlGen.colors);

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