# Tenaxai

Tenaxai is a high-fidelity, AI-driven **Product Launch Operating System** designed to move technical products from concept to global scale with precision. It replaces guesswork-driven marketing with agentic workflows, strategic simulations, and execution tooling.

## Table of Contents
- [Product Vision](#product-vision)
- [Agentic Fleet (Unit 01-06)](#agentic-fleet-unit-01-06)
- [Key Workspaces and Modules](#key-workspaces-and-modules)
- [Technical Stack](#technical-stack)
- [Design System: Engineering Rigor](#design-system-engineering-rigor)
- [Getting Started](#getting-started)
- [Development Roadmap](#development-roadmap)
- [Project Status](#project-status)

## Product Vision

Provide technical founders and enterprise product teams with a **Command Center** that treats product launches as rigorous systems-engineering work.

- **Objective:** Minimize launch failure through deep simulation.
- **Philosophy:** Engineering Rigor > Marketing Guesswork.
- **Core Value:** Automate research, localization, and creative execution.

## Agentic Fleet (Unit 01-06)

The **Flux Growth Copilot** orchestrates specialized units:

| Unit | Agent Name | Primary Function |
| :--- | :--- | :--- |
| **01** | **Growth Copilot** | Central orchestrator and router |
| **02** | **Market Analyst** | Geographic research and competitive discovery |
| **03** | **Creative Generator** | Ad, email, and localized copy synthesis |
| **04** | **Budget Optimizer** | ROI forecasting and spend allocation |
| **05** | **Risk Simulator** | Monte Carlo what-if threat modeling |
| **06** | **MarketMentor** | Real-time strategic consultation |

## Key Workspaces and Modules

The application includes 19 launch-lifecycle modules grouped into three domains.

### A. Discovery and Architecture
- **Product Builder:** Ingests technical docs (PDF/DOCX) and synthesizes requirements.
- **Market Explorer:** Performs region-to-city opportunity analysis.
- **BMC Builder:** Builds AI-assisted business model canvases for unit-economics validation.

### B. Validation and Intelligence
- **Market and Fit Core:** Runs stress tests, survey protocol generation, and confusion detection.
- **Persona Builder:** Creates behavioral and demographic buyer architectures.
- **Analytics and Forecasting:** Produces demand and adoption projections.

### C. Execution and Defense
- **Creative Messaging:** Generates multichannel ad variants and outreach content.
- **Risk Simulation:** Models supply chain, regulatory, and competitive threats.
- **Resources and Library:** Stores generated artifacts and saved snippets.

## Technical Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Animations:** Framer Motion
- **UI Framework:** Radix UI Primitives
- **Backend:** Base44 (headless BaaS) via `tenaxai.base44.app`
- **SDK:** `@base44/sdk`

## Design System: Engineering Rigor

- **Background:** 40px geometric blueprint grid
- **Colors:** Lime Green (`#d9f99d`) accents on Surface White (`#f7f9fb`)
- **Depth:** Glassmorphism (`glass-card`) blur layers
- **Typography:** Geist Sans + Geist Mono

## Getting Started

### Prerequisites
- Node.js (latest LTS recommended)
- npm (or yarn)

### Installation
```bash
git clone https://github.com/YOUR_USERNAME/Tenaxai.git
cd Tenaxai
npm install
```

### Run Locally
```bash
npm run dev
```

### Available Scripts
```bash
npm run dev       # Start local dev server
npm run build     # Build production bundle
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript checks via jsconfig
```

## Development Roadmap

- [x] High-fidelity UI overhaul (Engineering Rigor)
- [x] End-to-end AI integration (Units 01-06)
- [x] Geographic intelligence engine (Market Explorer)
- [x] Automated persona architecture (Persona Builder)
- [ ] Backend migration (see `BuildDocs/BackendMigration.md`)
- [ ] Real-time collaborative vaults

## Project Status

**Tenaxai Systems Architecture**  
_Status: Alpha v4.1 · Protocol: Active_
