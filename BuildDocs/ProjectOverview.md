# Tenaxai Project Overview

## 1. Core Concept
Tenaxai is a sophisticated, AI-driven "Launch Operating System" designed to help businesses move from idea to market scaling. It integrates market research, strategic planning, creative execution, and risk simulation into a single platform powered by a fleet of specialized AI agents.

## 2. The AI Agent Ecosystem
The heart of the project is defined in `Agents.json`. The platform utilizes a multi-agent architecture where specific tasks are routed to expert AI models:
* **Flux Growth Copilot:** The central decision-maker and router.
* **Market Analyst:** Conducts research, competitor insights, and regulatory analysis.
* **Creative Generator:** Produces multi-channel assets and messaging variations.
* **Budget Optimizer:** Handles forecasting and spend allocation.
* **Simulation Risk:** Runs "what-if" scenarios and mitigation strategies.
* **MarketMentor:** A chat-based mentor providing project-aware guidance.

## 3. Technical Architecture
* **Frontend:** A modern React application built with Vite for fast development and Tailwind CSS for responsive, utility-first styling.
* **Backend Integration:** The app uses the Base44 SDK to interact with a specialized API (`tenaxai.base44.app`).
* **Data Modeling:** The system is built around 10 core entities (Projects, Creatives, Artifacts, BMCs, etc.), each with a strictly defined schema for AI-to-UI consistency.
* **Component Pattern:** Uses a feature-based organization (Analytics, Creative, Market, Product) with a central ui library (likely based on Shadcn UI).

## 4. Key Features & Workflows
The application is structured into several high-value modules:
* **Discovery & Strategy:** Tools like MarketFinder, MarketProductFit, and the BMCBuilder (Business Model Canvas) help define the product's foundation.
* **Planning & Readiness:** The AgileTask system and PlanningReadiness module ensure the project is organized for launch.
* **Creative Execution:** The CreativeLab and CreativeMessaging pages allow users to generate and manage ad variations across social channels (Facebook, Instagram, Google, etc.).
* **Optimization:** AnalyticsForecasting and RiskSimulation provide data-backed predictions to minimize launch failures.
* **Project Management:** A central Dashboard and ProjectView provide a high-level look at all activities, "Run Jobs" (AI pipeline executions), and generated Reports.

## 5. Project Maturity
The project is well-structured and "production-ready" in terms of scaffolding. It includes:
* **Global Layouts:** A robust `Layout.jsx` with a navigation sidebar.
* **Utility Layers:** Global state management via `AuthContext` and a `VisualEditAgent` for potentially live UI adjustments.
* **Documentation:** A comprehensive `APIDOCs/` folder providing full API references for every entity in the system.

## Summary Statement
Tenaxai is more than a dashboard; it is a collaborative workspace between human users and AI agents. It streamlines the complex "Go-to-Market" process by automating the data-heavy lifting of research and content creation while providing strategic safeguards through simulation.
