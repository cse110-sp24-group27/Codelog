# CI Pipeline

## Deciding on the components of our pipeline

## Considered Options

* Linter: Super-Linter
* Code Quality: Codeclimate, Codacy
* End-to-end

## Decision Outcome

Linter (Super-Linter): Linters are universally useful at keeping our codebase consistent and error-free. We weren't too keen on automated code quality checks as it might induce more pressure. Similarly we didn't feel the need to use e2e testing, especially since we aren't too familiar with it yet.