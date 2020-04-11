function generateMarkdown(data) {
  return `
# ${data.title}

## ${data.description}

## ${data.toc}

### ${data.avatar_url}
`;
}

module.exports = generateMarkdown;
