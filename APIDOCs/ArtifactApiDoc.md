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

## Artifact

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string |  | Related project ID |
| `category` | `market_fit`, `planning`, `creative`, `analytics`, `risk`, `playbook`, `post_launch` | Yes | Main workspace category |
| `tool_key` | string | Yes | Unique sub-tool identifier, e.g., stress_test |
| `title` | string | Yes | Human-friendly title |
| `data` | object | Yes | Structured output data from AI |
| `shared_with` | array |  | Emails of collaborators with access |
| `notes` | string |  | Optional notes or summary |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/Artifact`
List Artifact records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.Artifact.list();
```

### `POST /entities/Artifact`
Create a Artifact record

```javascript
const record = await base44.entities.Artifact.create({
  // your data
});
```

### `DELETE /entities/Artifact`
Delete multiple Artifact records

```javascript
await base44.entities.Artifact.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  category: "market_fit"
});
```

### `POST /entities/Artifact/bulk`
Bulk create Artifact records

```javascript
const records = await base44.entities.Artifact.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/Artifact/bulk`
Bulk update Artifact records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/Artifact/update-many`
Update many Artifact records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/Artifact/{Artifact_id}`
Get a Artifact record by ID

**Parameters:**
- `Artifact_id` (path): Record ID

```javascript
const record = await base44.entities.Artifact.get(recordId);
```

### `PUT /entities/Artifact/{Artifact_id}`
Update a Artifact record

**Parameters:**
- `Artifact_id` (path): Record ID

```javascript
const record = await base44.entities.Artifact.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/Artifact/{Artifact_id}`
Delete a Artifact record

**Parameters:**
- `Artifact_id` (path): Record ID

```javascript
await base44.entities.Artifact.delete(recordId);
```

### `PUT /entities/Artifact/{Artifact_id}/restore`
Restore a deleted Artifact record

**Parameters:**
- `Artifact_id` (path): Record ID

```javascript
const record = await base44.entities.Artifact.restore(recordId);
```
