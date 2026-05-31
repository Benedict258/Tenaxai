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

## RunJob

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | Yes | Associated project ID |
| `module` | `market_fit`, `persona`, `opportunity`, `roadmap`, `creative`, `full_run` | Yes | Module being executed |
| `status` | `pending`, `running`, `completed`, `failed` |  | Job status |
| `progress` | number |  | Progress percentage 0-100 |
| `result_data` | object |  | JSON result from the module |
| `error_message` | string |  | Error message if failed |
| `started_at` | string |  | When the job started |
| `finished_at` | string |  | When the job completed |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/RunJob`
List RunJob records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by" (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.RunJob.list();
```

### `POST /entities/RunJob`
Create a RunJob record

```javascript
const record = await base44.entities.RunJob.create({
  // your data
});
```

### `DELETE /entities/RunJob`
Delete multiple RunJob records

```javascript
await base44.entities.RunJob.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  project_id: "Example project_id"
});
```

### `POST /entities/RunJob/bulk`
Bulk create RunJob records

```javascript
const records = await base44.entities.RunJob.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/RunJob/bulk`
Bulk update RunJob records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/RunJob/update-many`
Update many RunJob records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/RunJob/{RunJob_id}`
Get a RunJob record by ID

**Parameters:**
- `RunJob_id" (path): Record ID

```javascript
const record = await base44.entities.RunJob.get(recordId);
```

### `PUT /entities/RunJob/{RunJob_id}`
Update a RunJob record

**Parameters:**
- `RunJob_id" (path): Record ID

```javascript
const record = await base44.entities.RunJob.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/RunJob/{RunJob_id}`
Delete a RunJob record

**Parameters:**
- `RunJob_id" (path): Record ID

```javascript
await base44.entities.RunJob.delete(recordId);
```

### `PUT /entities/RunJob/{RunJob_id}/restore`
Restore a deleted RunJob record

**Parameters:**
- `RunJob_id" (path): Record ID

```javascript
const record = await base44.entities.RunJob.restore(recordId);
```
