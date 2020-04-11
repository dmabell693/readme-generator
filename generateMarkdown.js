function generateMarkdown(data) {
  return `
# ${data.title}

## ${data.description}

## ${data.toc}

`;
}

module.exports = generateMarkdown;
