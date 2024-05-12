# CI Pipeline

## Deciding on the components of our pipeline

## Considered Options

* Linter: Super-Linter
* Code Quality: Codeclimate, Codacy
* Documentation: JSDoc
* Testing: parallel

## Decision Outcome

Linter (Super-Linter): Linters are universally useful at keeping our codebase consistent and error-free.
Documentation (JSDoc): this is easy to implement and will be helpful at keeping track of code functionalities.
The other options won't be implemented for now.
We decided against parallel testing, since it is quite difficult and designing them can hinder our progress.