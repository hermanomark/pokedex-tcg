# Pokédex TCG

A modern web application for exploring Pokémon Trading Card Game cards, sets, and series. Built with React, TypeScript, and powered by the TCGdex API.

## Live Demo

Visit the live application at [https://pokedex-tcg-delta.vercel.app/](https://pokedex-tcg-delta.vercel.app/)

## Features

### Browse Cards
- Search through thousands of Pokémon trading cards
- Filter by category, type, rarity, and HP range
- Sort cards by name, HP, and release date
- View detailed card information including attacks, pricing, and legality
- High-quality card images 

### Explore Sets
- Browse complete card sets from classic to latest releases
- Search and sort sets by name and release date
- View set details including card counts and release information
- Navigate through all cards within a set

### Discover Series
- Explore different Pokémon TCG series and expansions
- View series timelines and included sets
- Access detailed information about first and last sets in each series

## Made With

- React for the frontend framework
- Vite for the build tool
- Tailwind CSS for styling and responsive design
- Shadcdn UI for ready to use components
- Framer Motion for animation
- TanStack Query (React Query) for data fetching
- React router for client side routing
- **API**: TCGdex API (https://tcgdex.dev/)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/hermanomark/pokedex-tcg.git
cd pokedex-tcg
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## API Integration

This project uses the TCGdex API to fetch Pokémon TCG data. 
- API Documentation: [https://tcgdex.dev/](https://tcgdex.dev/)
- Base URL: `https://api.tcgdex.net/v2/en`

## Contributing

Contributions are welcome. Please feel free to submit a pull request.