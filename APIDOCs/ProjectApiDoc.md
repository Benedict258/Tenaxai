# API Reference

**Base URL:** `https://tenaxai.base44.app/api`

## Setup

```bash
npm install @base44/sdk
```

```javascript
import { createClient } from '@base44/sdk';

const base44 = createClient({
  appId: "68b1429bbb969dd2425fb6f7",
  headers: {
    "api_key": "80e9df8c8b4f40b38133913b387cce0a"
  }
});
```

## Project

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Project name |
| `status` | `idea`, `mvp`, `prototype`, `product_ready`, `launched`, `growth`, `scaling` |  | Lifecycle stage |
| `product_name` | string | Yes | Product being launched |
| `product_type` | `physical`, `digital` |  | Physical or Digital product |
| `category` | string |  | Product category |
| `description` | string |  | Product description |
| `document_content` | string |  | Uploaded/pasted document content (whitepaper, PRD) |
| `document_source` | `paste`, `pdf`, `docx` |  | How the document was ingested |
| `target_markets` | string |  | Comma-separated target markets |
| `target_budget` | number |  | Launch budget in USD |
| `launch_date` | string |  | Planned launch date |
| `primary_goal` | `awareness`, `leads`, `sales`, `trial` |  | Primary campaign objective |
| `price` | number |  | Planned product price |
| `currency` | string |  | Currency code (e.g., USD, EUR, GBP) |
| `signals` | string |  | Early signals: signups, traffic notes, waitlist info |
| `keywords` | array |  | AI-generated keywords |
| `competitors` | array |  | Identified competitors |
| `value_props` | array |  | Key value propositions |
| `roi_forecast` | number |  | Predicted ROI percentage |
| `top_regions` | array |  | Top market opportunities |
| `survey_kit` | array |  | AI-generated survey questions |
| `persona_fit_score` | number |  | Persona fit score 0-100 |
| `personas` | array |  | Generated personas |
| `feature_confusion` | array |  | Feature confusion detector results |
| `executive_summary` | string |  | AI-generated executive summary |
| `run_status` | `idle`, `running`, `completed`, `failed` |  | Status of Run Project pipeline |
| `run_progress` | number |  | Progress percentage of Run Project |
| `last_run_date` | string |  | Last time Run Project was executed |
| `confidence_score` | number |  | Overall confidence score for AI outputs |
| `problem` | string |  | Problem this product solves |
| `personas_input` | string |  | Buyer personas description or notes |
| `pricing_info` | string |  | Pricing or planned pricing details |
| `target_geos` | array |  | Target geographies |
| `resources_notes` | string |  | Resources/tools available |
| `competitors_input` | string |  | Optional competitor list or notes |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/Project`
List Project records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.Project.list();
```

### `POST /entities/Project`
Create a Project record

```javascript
const record = await base44.entities.Project.create({
  // your data
});
```

### `DELETE /entities/Project`
Delete multiple Project records

```javascript
await base44.entities.Project.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  name: "Example name"
});
```

### `POST /entities/Project/bulk`
Bulk create Project records

```javascript
const records = await base44.entities.Project.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/Project/bulk`
Bulk update Project records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/Project/update-many`
Update many Project records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/Project/{Project_id}`
Get a Project record by ID

**Parameters:**
- `Project_id` (path): Record ID

```javascript
const record = await base44.entities.Project.get(recordId);
```

### `PUT /entities/Project/{Project_id}`
Update a Project record

**Parameters:**
- `Project_id` (path): Record ID

```javascript
const record = await base44.entities.Project.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/Project/{Project_id}`
Delete a Project record

**Parameters:**
- `Project_id` (path): Record ID

```javascript
await base44.entities.Project.delete(recordId);
```

### `PUT /entities/Project/{Project_id}/restore`
Restore a deleted Project record

**Parameters:**
- `Project_id` (path): Record ID

```javascript
const record = await base44.entities.Project.restore(recordId);
```
