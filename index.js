const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./generateMarkdown.js")
const axios = require("axios");


const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
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
];

function promptUser() {
    return inquirer.prompt(questions);
}

async function getGitHubInfo() {
    try {
      const { username } = await inquirer.prompt({
        message: "What is your Github username?",
        name: "username"
      });
  
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      await console.log(data);
    //   const gitHubInfo = await JSON.stringify(data);

      await writeFileAsync(`${username}GitHubInfo.json`, JSON.stringify(data, null, 2));
      console.log(data.avatar_url);
      
    //   await console.log(JSON.parse(gitHubInfo));
    
    } catch (err) {
      console.log(err);
    }
  }

// function writeToFile(fileName, data) {
// }

async function init() {
    try {
        const data = await getGitHubInfo();

        const peach = await promptUser();
        
        const markdown = generateMarkdown(peach, data);

        await writeFileAsync("README2.md", markdown);

        console.log("Successfully wrote to README2.md");
    } catch(err) {
        console.log(err);
    }
}

init();