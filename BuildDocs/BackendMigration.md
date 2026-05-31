# Tenaxai Backend Architecture & Migration Blueprint

This document outlines the technical requirements, schemas, and architectural patterns necessary to rebuild the Tenaxai backend from scratch.

## 1. Core Architecture Pattern: The Agentic Hub
Your custom backend must act as a **Router** rather than a simple data store. It must coordinate between a persistent database (Postgres) and multiple AI agents.

- **Stack Recommendation:** Python (FastAPI) or Node.js (NestJS).
- **AI Orchestration:** LangGraph or PydanticAI (for Python) or LangChain (for Node).
- **ORM:** Prisma or SQLAlchemy to maintain strict entity schemas.

---

## 2. Entity Schemas (Database Layer)
You must replicate the following 10 entities exactly to ensure the Frontend continues to work without modification.

### Key Entities:
1.  **Project**: The root container (ID, Product Name, Category, Document Content).
2.  **User**: Profile, Industry, and Regional Preferences.
3.  **Artifact**: The "Vault" for AI outputs (Tool Key, Category, Data JSON).
4.  **Creative**: Ad headlines, body copy, and channel mapping.
5.  **ChecklistTask**: Roadmap items (Launch phases, Status).
6.  **AgileTask**: Kanban board tasks (Priority, Due Date).
7.  **BMC**: Business Model Canvas blocks (Block Key, Content).
8.  **RunJob**: Tracking for long-running AI tasks (Progress, Module).
9.  **Report**: Finalized summaries and export metadata.
10. **SavedItem**: Bookmarked snippets from chat or tools.

---

## 3. The "Agent Fleet" logic
In Base44, these are "Agents." In your backend, these will be **System Prompts + Functions**.

| Agent Name | Functionality Needed |
| :--- | :--- |
| **Growth Copilot** | Orchestrator: Receives input and decides which "Tool" to call. |
| **Market Analyst** | Web Search Tool: Must integrate with Tavily or Google Search API. |
| **Creative Generator** | Content Synthesis: specialized prompts for FB/Google/LinkedIn. |
| **Risk Simulator** | Monte Carlo Logic: Deterministic math + AI outcome prediction. |

---

## 4. API Endpoint Requirements
To keep `base44Client.js` functional with minimal changes, your API must support:

### CRUD Endpoints (`/entities/{entity_name}`)
- `GET /`: List records (supports `?sort=` and `?q=`).
- `POST /`: Create record.
- `GET /{id}`: Fetch single record.
- `PUT /{id}`: Update record.
- `DELETE /{id}`: Remove record.

### Agentic Endpoints (`/integrations/Core`)
- `POST /InvokeLLM`: The primary engine.
    - Input: `prompt`, `response_json_schema`.
    - Logic: Call OpenAI/Anthropic and **force-parse** into the requested schema.
- `POST /UploadFile`: Ingest PDFs/Docx.
- `POST /ExtractData`: Use AI to turn a raw document into a technical project schema.

---

## 5. Critical Transition Checklist
When you are ready to begin:
1.  [ ] **Schema Lockdown**: Ensure your SQL tables match the fields in `APIDOCs/`.
2.  [ ] **Prompt Engineering**: Copy the prompts I've written in the `onRun` functions in `MarketProductFit.jsx` and `ProductBuilder.jsx`—these are your "seed" prompts for the new backend.
3.  [ ] **Auth Strategy**: Implement JWT or Clerk for authentication to replace the Base44 login flow.
4.  [ ] **Client Swap**: Update `src/api/base44Client.js` to use your new URL. If you keep the function names the same, **the UI will never know the backend changed.**

---

## 6. Summary of Flow
**Frontend Request** → **Custom API** → **AI Orchestrator** → **Database Save** → **Clean JSON Response**.

By following this blueprint, you move from a third-party platform to a proprietary, high-value technical asset.
