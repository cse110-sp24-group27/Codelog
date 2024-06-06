# CI Pipeline

## Deciding on the components of our pipeline

## Considered Options

* Linter: Super-Linter
* Code Quality: We chose Codacy as our method to check code quality and test coverage
  * Codeclimate was not chosen
* Documentation: JSDoc
* Testing: parallel
* End-to-End (E2E) Testing:
  * Puppeteer to operate the browser and Jest to perform the tests
  * Playwright was not chosen
  * Selenium was not chosen
  * Cypress was not chosen


## Decision Outcome

Linter (Super-Linter): Linters are universally useful at keeping our codebase consistent and error-free.
Documentation (JSDoc): this is easy to implement and will be helpful at keeping track of code functionalities.
Code Quality: We chose Codacy as our method to check code quality and test coverage because it seemed to have a better looking UI and was offered for free.
The other options won't be implemented for now.
We decided against parallel testing, since it is quite difficult and designing them can hinder our progress.
End-to-End (E2E) Testing (Puppeteer): Selected for its ability to automate and test our application in a browser environment, ensuring that our user interactions work as expected. Additionally, the team is already familiar with Puppeteer from its use in Lab 6, making it a practical choice.
