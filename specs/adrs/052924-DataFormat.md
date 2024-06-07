# Data Format

## Context and Problem Statement

Our jounrnal needs to store user entries in localStorage. Since it is a CRUD app, we need to read and write frequently to the data base. Deciding on a uniform data format is essential for the success of our development


## Considered Options

We need to decide on how to store projects, journal entries.
1. Store projects and jounrals in an array of objects.
   1. Each project object contains information and journal entry IDs.
   2. Each journal object contains journal content, tags, and other information.

Example:
```JS
"projects" : [
        {
            "projectId": 1,
            "projectName": "meta-projects",
            "projectDescription": "strstrstrstrstrstrstr strstrstr",
            "privacy": "Private",
            "tags": ["HTML"],
            "journals": [3,4,5]
        },
        {      
            "projectId": 2,
            "projectName": "codelog",
            "projectDescription": "str",
            "privacy": "Public",
            "tags": ["HTML", "CSS", "JS"],
            "journals": [6,7,8]
        }
    ]


    "journals" : [
        {
            "journalId": 3,
            "parentProject": 1,
            "journalName": "journal1",
            "tags": ["tage 1", "tag 2"],
            "privacy": "Private",
            "template": "Bug Fix",
            "sections": [
                {
                    "type": "codeblock",
                    "content": "content content content content"
                },
                {
                    "type": "text",
                    "content":"content content content content",
                }
            ]
        },
        {
            "journalId": 5,
            "parentProject": 1,
            "journalName": "journal2",
            "tags": ["tage 1", "tag 2"],
            "privacy": "Public",
            "template": "Bug-fix",
           
        }
    ]
```
2. Store projects in an array of objects.
   1. Each project object contains an array of journal entry objects.
   2. Each journal object contains tags, content, and other information.

Example:
```JS
"user_projects" : [
        {
            "project_id": 1,
            "projectName": "Name of the first project here",
            "description": "Project description here",
            "privacy": "Private",
            "tags": [
                {
                    "tag_id": 30001,
                    "tag_name": "HTML",
                    "color": "red"                
                },
                {
                    "tag_id": 30002,
                    "tag_name": "CSS",
                    "color": "blue"                
                },
                {
                    "tag_id": 30003,
                    "tag_name": "JavaScript",
                    "color": "Yellow"                
                }
            ],
            "selected_project_entries": [
                {
                    "entry_id": 2001,
                    "titleName": "Entry 1 Name",
                    "description": "Project description here",
                    "tags": [
                        {
                            "tag_id": 30004,
                            "tag_name": "HTML",
                            "color": "red"                
                        },
                        {
                            "tag_id": 30005,
                            "tag_name": "CSS",
                            "color": "blue"                
                        },
                        {
                            "tag_id": 30006,
                            "tag_name": "JavaScript",
                            "color": "Yellow"                
                        }
                    ],
                    "publicity": "Private",
                    "content": [
                        {
                            "type": "header",
                            "content": "white background and bigger black font"
                        },
                        {
                            "type": "code",
                            "content": "dark gray background and light gray font"
                        },
                        {
                            "type": "text",
                            "content":"white background and black font"
                        }
                    ]
                }
            ]
        }
```

## Decision Outcome

Chosen option: option 2

Because this option groups all entries of a project together, so they are easier to access and helps with turning the journal data into a Markdown file to be displayed.
