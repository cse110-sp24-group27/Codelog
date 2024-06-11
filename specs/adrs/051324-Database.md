# Database

## Deciding on our database options with local-first consideration

## Considered Options

* Local-Only
* Client-Server
* Hugo Framework
* Cloud-Based

## Decision Outcome

Chosen option: **Local Storage / Local-Only**

(06/05 rejected) **Hugo framework**

Users can make changes to their journal locally and the data will be stored in localstorage. Once they finished and saved their journal, it will be saved in a JSON file. We will publish our web app using GitHub Pages. This allows local changes to the journal without the need of networks, but also allows other people to browse your journal online through GitHub Pages.
