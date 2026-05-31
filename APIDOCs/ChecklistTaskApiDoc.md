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

## ChecklistTask

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | Yes | Related project |
| `phase` | `pre_launch`, `launch`, `post_launch` |  | Roadmap phase |
| `title` | string | Yes | Task title |
| `status` | `todo`, `done` |  | Completion status |
| `due_date` | string |  | Optional due date |
| `notes` | string |  | Extra notes |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/ChecklistTask`
List ChecklistTask records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.ChecklistTask.list();
```

### `POST /entities/ChecklistTask`
Create a ChecklistTask record

```javascript
const record = await base44.entities.ChecklistTask.create({
  // your data
});
```

### `DELETE /entities/ChecklistTask`
Delete multiple ChecklistTask records

```javascript
await base44.entities.ChecklistTask.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  project_id: "Example project_id"
});
```

### `POST /entities/ChecklistTask/bulk`
Bulk create ChecklistTask records

```javascript
const records = await base44.entities.ChecklistTask.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/ChecklistTask/bulk`
Bulk update ChecklistTask records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/ChecklistTask/update-many`
Update many ChecklistTask records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/ChecklistTask/{ChecklistTask_id}`
Get a ChecklistTask record by ID

**Parameters:**
- `ChecklistTask_id` (path): Record ID

```javascript
const record = await base44.entities.ChecklistTask.get(recordId);
```

### `PUT /entities/ChecklistTask/{ChecklistTask_id}`
Update a ChecklistTask record

**Parameters:**
- `ChecklistTask_id` (path): Record ID

```javascript
const record = await base44.entities.ChecklistTask.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/ChecklistTask/{ChecklistTask_id}`
Delete a ChecklistTask record

**Parameters:**
- `ChecklistTask_id` (path): Record ID

```javascript
await base44.entities.ChecklistTask.delete(recordId);
```

### `PUT /entities/ChecklistTask/{ChecklistTask_id}/restore`
Restore a deleted ChecklistTask record

**Parameters:**
- `ChecklistTask_id` (path): Record ID

```javascript
const record = await base44.entities.ChecklistTask.restore(recordId);
```
