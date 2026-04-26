# Luna Music

A modern music discovery web app focused on fast browsing, curated charts, artist exploration, and seamless audio previews.

## Overview

Luna Music is a full-stack music experience built for discovering tracks, exploring artists, browsing charts, and playing short audio previews in a clean and responsive interface.

The application uses a React frontend and a serverless backend to provide a secure and maintainable architecture. The client communicates only with an internal API, while external music provider integrations and environment secrets are handled server-side.

## Features

- Discover songs by genre
- Browse global top charts
- Explore top artists
- Search songs and artists
- View song details
- View artist details
- Discover music by country
- Play audio previews with a built-in music player
- Graceful fallbacks when optional provider data is unavailable

## Architecture

Luna Music is designed as a single-repository full-stack application.

### Frontend

- React
- Vite
- Zustand
- Tailwind CSS

### Backend

- Netlify Functions
- Internal REST API
- Provider abstraction layer for music data and geo-based discovery

### Deployment

- Netlify
- Frontend and backend deployed from the same repository

## How It Works

The frontend does not communicate directly with third-party music providers.

Instead, it consumes an internal API exposed by the backend. This approach provides several benefits:

- secure handling of API keys and secrets
- provider abstraction and easier future migrations
- normalized and stable response formats for the UI
- better control over fallbacks and error handling

Optional data such as lyrics, related songs, or automatic country detection may vary depending on provider support, but the application is designed to keep the main experience stable and usable.

## Project Structure

```txt
luna_music/
  netlify/
    functions/
  public/
  src/
  README.md
  netlify.toml
  package.json
  vite.config.ts
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/ManuelP22/luna_music.git
cd luna_music
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a local environment file based on the variables required by the backend and frontend.

Example:

```bash
cp .env.example .env
```

The exact variables depend on the music provider and geo service configured for the project.

Typical categories include:

- frontend public variables
- backend provider credentials
- geo lookup configuration
- environment-specific base URLs

Do not commit real credentials to the repository.

### Run Locally

Start the development environment:

```bash
npm run dev
```

If the project is configured to run serverless functions locally as part of development, use the corresponding Netlify local workflow provided in the project scripts.

## Available Scripts

Typical scripts include:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
```

## Deployment

Luna Music is designed to be deployed on Netlify from a single repository.

This setup includes:

- static frontend deployment
- serverless backend through Netlify Functions
- environment variable management in Netlify
- unified CI/CD flow from one codebase

## Design Goals

- clean and responsive experience
- provider-agnostic backend architecture
- secure secret management
- maintainable client state
- resilient behavior when optional data is missing

## Roadmap

Future improvements may include:

- richer recommendations
- expanded lyrics coverage
- improved country-based discovery
- stronger test coverage
- performance and caching optimizations

## License

This project is licensed under the MIT License unless stated otherwise in the repository.

## Author

Manuel Perez

## Acknowledgments

Luna Music is inspired by modern music discovery experiences and built with a focus on simplicity, maintainability, and long-term evolution.
