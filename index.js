// declare each requirement in variables
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./generateMarkdown.js")
const axios = require("axios");

// asynch file write to be utilized after axios call has returned and inquirer prompts answered
const writeFileAsync = util.promisify(fs.writeFile);

// array of questions to be passed into promptUser() (line 55)
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your application's name?"
    },
    {
        type: "input",
        name: "description",
        message: "What specifically can your project do?"
    },
    {
        type: "input",
        name: "installation",
        message: "How will the user install your application?"
    },
    {
        type: "input",
        name: "usage",
        message: "Provide some specific examples to demonstrate how the user should operate your application."
    },
    {
        type: "input",
        name: "license",
        message: "Under whose license will your application be issued?"
    },
    {
        type: "input",
        name: "contributing",
        message: "What, if you will allow contributing, are the procedures for contributing to your application?"
    },
    {
        type: "input",
        name: "tests",
        message: "What tests have been implemented in your application?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email listed on your Github profile?"
    }
];

// function will be called in init() at line 84. Fires off the inquirer prompts
const promptUser = () => inquirer.prompt(questions);

// it was incredibly difficult to pass the data from axios call over to generateMarkdown(), so this is the workaround. Declaring the variable in universal scope allows for it to be redefined and called in the axios call and generateMarkdown()
let gitHubInfo;

// since the axios call and inquirer prompts are housed in two different functions, an async function here worked around problems with having the below prompt and the first prompt from promptUser() fire off simultaneously
async function getGitHubInfo() {
    try {
      const { username } = await inquirer.prompt({
        message: "What is your Github username?",
        name: "username"
      });
  
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );

      // redefined variable declared in universal scope. This is the url that will be used as the img src in generateMarkdown for the profile pic
      gitHubInfo = data.avatar_url;
      
    } catch (err) {

      console.log(err);

    }
}

// here again, the async function was helpful in controlling the order in which functions fired off
async function init() {
    try {
        await getGitHubInfo();

        const data = await promptUser();
        
        // data contains the object of responses from promptUser(), gitHubInfo from universal scope
        const markdown = generateMarkdown(data, gitHubInfo);

        await writeFileAsync("README.md", markdown);

        console.log("Successfully wrote to README.md");

    } catch(err) {

        console.log(err);

    }
}

init();