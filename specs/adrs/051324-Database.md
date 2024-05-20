# Database

## Deciding on our database options with local-first consideration

## Decision Outcome

Chosen option: **Hugo framework**

Users can make changes to their journal locally and the data will be stored in localstorage. Once they finished and saved their journal, it will be saved in a JSON file. Then we will run Hugo to convert this site into md and host it with GitHub Pages. This allows local changes to the journal withou the need of networks, but also allows other people to browse your journal online through GitHub Pages.
