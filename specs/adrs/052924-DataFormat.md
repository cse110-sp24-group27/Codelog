# Data Format

## Our jounrnal needs to store user entries in localStorage. Since it is a CRUD app, we need to read and write frequently to the data base. Deciding on a uniform data format is essential for the success of our development


## Considered Options

We need to decide on how to store projects, journal entries.
1. Store projects and jounrals in an array of objects.
   1. Each project object contains information and journal entry IDs.
   2. Each journal object contains journal content, tags, and other information.
2. Store projects in an array of objects.
   1. Each project object contains an array of journal entry objects.
   2. Each journal object contains tags, content, and other information.

## Decision Outcome

Chosen option: option 2

Because this option groups all entries of a project together, so they are easier to access and helps with turning the journal data into a Markdown file to be displayed.
