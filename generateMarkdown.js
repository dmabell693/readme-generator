function generateMarkdown(data, gitHubInfo) {
  return `
# ${data.title}

${data.description}



## Table of Contents

* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)


## Installation

${data.installation}


## Usage

${data.usage}


## License

${data.license} ![GitHub](https://img.shields.io/github/license/dmabell693/readme-generator)



## Contributing

${data.contributing}


## Tests

${data.tests}


## Questions
  Questions? Please contact me here:
  ${data.email}
  And here is my face:
  ## <img src= "${gitHubInfo}"/>
`;
}

module.exports = generateMarkdown;
