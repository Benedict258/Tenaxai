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

## Creative

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | Yes | Associated project ID |
| `channel` | `facebook`, `instagram`, `google`, `tiktok`, `linkedin`, `youtube` | Yes | Target advertising channel |
| `format` | `text`, `image`, `video`, `carousel` |  | Creative format type |
| `headline` | string |  | Ad headline |
| `body_copy` | string |  | Main ad copy |
| `cta` | string |  | Call-to-action text |
| `predicted_performance` | `low`, `medium`, `high` |  | AI performance prediction |
| `image_prompt` | string |  | AI image generation prompt |
| `performance_rationale` | string |  | Why this creative should perform well |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/Creative`
List Creative records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.Creative.list();
```

### `POST /entities/Creative`
Create a Creative record

```javascript
const record = await base44.entities.Creative.create({
  // your data
});
```

### `DELETE /entities/Creative`
Delete multiple Creative records

```javascript
await base44.entities.Creative.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  project_id: "Example project_id"
});
```

### `POST /entities/Creative/bulk`
Bulk create Creative records

```javascript
const records = await base44.entities.Creative.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/Creative/bulk`
Bulk update Creative records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/Creative/update-many`
Update many Creative records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/Creative/{Creative_id}`
Get a Creative record by ID

**Parameters:**
- `Creative_id` (path): Record ID

```javascript
const record = await base44.entities.Creative.get(recordId);
```

### `PUT /entities/Creative/{Creative_id}`
Update a Creative record

**Parameters:**
- `Creative_id` (path): Record ID

```javascript
const record = await base44.entities.Creative.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/Creative/{Creative_id}`
Delete a Creative record

**Parameters:**
- `Creative_id` (path): Record ID

```javascript
await base44.entities.Creative.delete(recordId);
```

### `PUT /entities/Creative/{Creative_id}/restore`
Restore a deleted Creative record

**Parameters:**
- `Creative_id` (path): Record ID

```javascript
const record = await base44.entities.Creative.restore(recordId);
```
