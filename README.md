# Mortgage Calculator

## Tech Stack

`Vite, React, TypeScript, Tailwind, Node, Express`

## Installation

Run `make install` to install all dependencies

## Running the project

- Prerequisite: [Installation](#installation) section

- Run `make init` to spin up the environment

- This starts your app in development mode, rebuilding assets on file changes. By default, the app will be running on `http://localhost:4000/` and the API on: `http://localhost:8000/`

- If you don't want to use the `Makefile` or run the project in another way: [see alternatives below](#alternatives)

## Usage
- Run `make help` to list all commands available
- I am leaving some notes on: [Extra](#extra)

## Folder structure

```
│  api/
|    └─── src
|       └─── routes/
|           └─── index.ts
|           └─── mortgage.ts (the post route to make calculations lives here)
|       └─── services/
|           └─── index.ts
|           └─── mortgage.test.ts
|           └─── mortgage.ts (most calculations happens here)
|       └─── types/
|       └─── utils/
|       └─── index.ts (entrypoint for the API)
│  ui/
|    └─── src
|       └─── components/
|           └─── __tests__
|           └─── FormSelect.tsx
|           └─── Form.tsx
|           └─── FormInput.tsx
|           └─── ResultCard.tsx
|       └─── hooks/
|       └─── services/
|       └─── types/
|       └─── utils/
|       └─── App.tsx (main file for UI app)
|    └─── ...
│  docker-compose.yml
│  Makefile
│  Mortgage API.postman_collection.json
│  README.md (this file)
│  ...
```

## Alternatives
- You could also spin up the environments with the following steps:
1. On a terminal do: `cd api/`
2. Run `npm install`
3. Run `npm run dev`
4. On another terminal do: `cd ui/`
5. Repeat steps `2` and `3`

## Extra
Leaving some notes here about what part of the though process that went on during the test (notes in none specific order).

- I started with an express API, I tried to modularize everything here like it is a production application
- I based calculations on the formula provided in the PDF and tools from https://www.ratehub.ca
- I made a monorepo so is easier to share and that's why I also made a React app with Vite on the `ui` folder
- Added some simple tests in both applications so you can run them with their respective `test` commands (didn't include coverage)
- Tried to modularize the React app as well but you might encounter some things that could be improved due to time used already in this test
- Added a `docker-compose.yml` with out a Dockerfile to simple spin up of the whole environment
- Added a `Makefile` so is easier to get things running and use commands
- I didn't care for the purpose of this test to magic strings and constants but it was just to make it faster
- On the UI I made first a simple form with a submit button but I changed that afterwards to emulate better the tools on https://www.ratehub.ca
- `Form.tsx` might be a bit complex and it can be refactored after adding debouncing of API calls and AbortController but I hope you appreciate the idea behind all of that
- Used multiple techniques and not so much libraries so I could share some ideas with you folks
- Oh, I also left a postman collection in the root folder for the API, pretty simple is the POST request with some examples
- If you have any question feel free to ask!
