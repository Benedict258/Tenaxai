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

## AgileTask

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string |  | Related project |
| `title` | string | Yes | Task title |
| `status` | `todo`, `in_progress`, `done` |  | Kanban status |
| `priority` | `low`, `medium`, `high` |  | Priority |
| `due_date` | string |  | Due date |
| `notes` | string |  | Details / subtasks |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/AgileTask`
List AgileTask records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.AgileTask.list();
```

### `POST /entities/AgileTask`
Create a AgileTask record

```javascript
const record = await base44.entities.AgileTask.create({
  // your data
});
```

### `DELETE /entities/AgileTask`
Delete multiple AgileTask records

```javascript
await base44.entities.AgileTask.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  title: "Example title"
});
```

### `POST /entities/AgileTask/bulk`
Bulk create AgileTask records

```javascript
const records = await base44.entities.AgileTask.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/AgileTask/bulk`
Bulk update AgileTask records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/AgileTask/update-many`
Update many AgileTask records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/AgileTask/{AgileTask_id}`
Get a AgileTask record by ID

**Parameters:**
- `AgileTask_id` (path): Record ID

```javascript
const record = await base44.entities.AgileTask.get(recordId);
```

### `PUT /entities/AgileTask/{AgileTask_id}`
Update a AgileTask record

**Parameters:**
- `AgileTask_id` (path): Record ID

```javascript
const record = await base44.entities.AgileTask.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/AgileTask/{AgileTask_id}`
Delete a AgileTask record

**Parameters:**
- `AgileTask_id` (path): Record ID

```javascript
await base44.entities.AgileTask.delete(recordId);
```

### `PUT /entities/AgileTask/{AgileTask_id}/restore`
Restore a deleted AgileTask record

**Parameters:**
- `AgileTask_id` (path): Record ID

```javascript
const record = await base44.entities.AgileTask.restore(recordId);
```
