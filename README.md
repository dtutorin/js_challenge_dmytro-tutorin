# E-Commerce Application

A simple SPA e-commerce application built with Vue 3, TypeScript, and Vite.

## Features

- Product listing with pagination
- Shopping cart functionality
- Responsive design
- Persistent cart state using localStorage

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/js_challenge_dmytro-tutorin.git
cd js_challenge_dmytro-tutorin
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The production build will be available in the `dist` directory.

## Testing

To run the tests:

```bash
npm run test
# or
yarn test
```

## Project Structure

```
src/
  ├── components/     # Vue components
  ├── stores/         # Pinia stores
  ├── services/       # API services
  ├── router/         # Vue Router configuration
  ├── i18n/           # Internationalization
  │   └── locales/    # Translation files
  ├── interfaces/     # TypeScript interfaces
  ├── App.vue         # Root component
  └── main.ts         # Application entry point
```

## Technologies Used

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Vue I18n
- Vitest
- Vue Test Utils
