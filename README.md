# DevHorizon 2026

DevHorizon 2026 is a static conference website built with Vite, TypeScript, and CSS, without a frontend framework. It includes a home page, a schedule, and a speakers page, along with basic interactive features for filtering sessions and saving favorites.

## Project Pages

- Home
- Schedule
- Speakers

## Features

- Conference home page
- Filterable schedule
- Speakers page
- Information about tracks, talks, and attendees
- Locally saved favorite talks
- Static conference data loaded from a JSON file

## Technologies

- Vite
- TypeScript (strict mode)
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
3. Check types (optional):

   ```bash
   npm run typecheck
   ```

## Build

```bash
npm run build
```

The build runs the TypeScript type check first, then generates the production build in the `dist` directory.

## Project Structure

```text
devhorizon/
├── public/
│   ├── data/
│   │   └── data.json
│   └── images/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── js/
│   │   └── styles/
│   └── vite-env.d.ts
├── index.html
├── schedule.html
├── speakers.html
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Available Scripts

- `npm run dev` — start the local development server
- `npm run typecheck` — run the TypeScript type check without emitting files
- `npm run build` — type check and build the production version
- `npm run preview` — preview the production build

## About

This project is a demonstration conference website showcasing the event brand, program, speakers, and structure.

## GitHub Repository

[DevHorizon on GitHub](https://kovtun-alexandr.github.io/DevHorizon/)
