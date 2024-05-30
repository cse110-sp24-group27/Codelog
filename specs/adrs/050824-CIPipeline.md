# CI Pipeline

## Deciding on the components of our pipeline

## Considered Options

* Linter: Super-Linter
* Code Quality: Codeclimate, Codacy
* Documentation: JSDoc
* Testing: parallel
* End-to-End (E2E) Testing: Puppeteer


## Decision Outcome

Linter (Super-Linter): Linters are universally useful at keeping our codebase consistent and error-free.
Documentation (JSDoc): this is easy to implement and will be helpful at keeping track of code functionalities.
The other options won't be implemented for now.
We decided against parallel testing, since it is quite difficult and designing them can hinder our progress.
End-to-End (E2E) Testing (Puppeteer): Selected for its ability to automate and test our application in a browser environment, ensuring that our user interactions work as expected.