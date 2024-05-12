# CI Pipeline Status
![diagram](phase1.drawio.png)

## In progress
### Code Linter
[Super Linter](https://github.com/marketplace/actions/super-linter)

It automatically detects the code language and checks for code formats.
It runs on pull requests and pushes to `main` branch.

### Automated Documentation and Deployment
[JSDoc](https://github.com/marketplace/actions/jsdoc-action)

It uses comments in JS files to create a HTML documentation based on templates.

[Deploy to GitHub Pages](https://github.com/marketplace/actions/deploy-to-github-pages)

The HTML documentation will be deployed in `gh-pages` branch and published.

### Personal Reviews
`main` branch protection to request one reviewer before merging.

## Planned

### Code Quality
Deciding between Codeclimate or Codacy.

### Unit Testing
We decided against parallel testing, so unit testing will be implemented once we developed the fucntions.

### E2E Testing
Similar to unit testing, we will implement e2e once we developed some more.
