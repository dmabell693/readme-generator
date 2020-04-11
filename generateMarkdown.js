// const fs = require("fs");


// const readFunction = function(error, data) {
//   if (error) {
//     return console.log(error);
//   }

//   return data;

// }

// const gitHubInfo = fs.readFile("gitHubInfo.json", "utf8", readFunction);

// console.log(gitHubInfo);

function generateMarkdown(data, gitHubInfo) {
  return `
# ${data.title}

## ${data.description}

## ${data.toc}

### <img src= "${gitHubInfo}"/>
`;
}

module.exports = generateMarkdown;
