const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./generateMarkdown.js")

const writeFileAsync = util.promisify(fs.writeFile);

// const questions = [

// ];

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is your application's name?"
        },
        {
            type: "input",
            name: "description",
            message: "What exactly can your project do?"
        },
        {
            type: "input",
            name: "toc",
            message: "What will be your README headings?"
        }
    ]);
}



// function writeToFile(fileName, data) {
// }

async function init() {
    console.log("hi");
    try {
        const data = await promptUser();
        
        const markdown = generateMarkdown(data);

        await writeFileAsync("README2.md", markdown);

        console.log("Successfully wrote to README2.md");
    } catch(err) {
        console.log(err);
    }
}

init();
