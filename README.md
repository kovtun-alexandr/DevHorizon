# DevHorizon 2026

DevHorizon 2026 is a static conference website built with Vite, JavaScript, and CSS, without a frontend framework. It includes a home page, a schedule, and a speakers page, along with basic interactive features for filtering sessions and saving favorites.

## Project Pages

- [Home](index.html)
- [Schedule](schedule.html)
- [Speakers](speakers.html)

## Features

- Conference home page
- Filterable schedule
- Speakers page
- Information about tracks, talks, and attendees
- Locally saved favorite talks
- Static conference data loaded from a JSON file

## Technologies

- Vite
- JavaScript ES modules
- CSS, including custom properties and modular stylesheets
- JSON for conference data

## Getting Started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the local development server:

   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

The production build is generated in the `dist` directory.

## Project Structure

```text
devhorizon/
├── public/
│   └── data/
│       └── data.json
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   ├── js/
│   │   └── styles/
│   └──
├── index.html
├── schedule.html
├── speakers.html
├── package.json
├── README.md
├── .gitignore
└── node_modules/
```

## Available Scripts

- `npm run dev` — start the local development server
- `npm run build` — build the production version
- `npm run preview` — preview the production build

## About

This project is a demonstration conference website showcasing the event brand, program, speakers, and structure.

## GitHub Repository

[DevHorizon on GitHub](https://github.com/kovtun-alexandr/DevHorizon)
