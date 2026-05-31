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

## SavedItem

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | string |  | Owner user id (redundant to created_by for client filtering) |
| `project_id` | string |  | Project folder |
| `tab_name` | string |  | Source tab (e.g., Creative Lab, Insights) |
| `subtab_name` | string |  | Sub-tool within the tab |
| `title` | string | Yes | Item title |
| `content_type` | string |  | mime/category of content (e.g., text, json, chart) |
| `content_json` | object |  | Structured content blob |
| `content_text` | string |  | Readable text excerpt |
| `metadata` | object |  | Arbitrary metadata/data blob |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/SavedItem`
List SavedItem records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.SavedItem.list();
```

### `POST /entities/SavedItem`
Create a SavedItem record

```javascript
const record = await base44.entities.SavedItem.create({
  // your data
});
```

### `DELETE /entities/SavedItem`
Delete multiple SavedItem records

```javascript
await base44.entities.SavedItem.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  title: "Example title"
});
```

### `POST /entities/SavedItem/bulk`
Bulk create SavedItem records

```javascript
const records = await base44.entities.SavedItem.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/SavedItem/bulk`
Bulk update SavedItem records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/SavedItem/update-many`
Update many SavedItem records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/SavedItem/{SavedItem_id}`
Get a SavedItem record by ID

**Parameters:**
- `SavedItem_id` (path): Record ID

```javascript
const record = await base44.entities.SavedItem.get(recordId);
```

### `PUT /entities/SavedItem/{SavedItem_id}`
Update a SavedItem record

**Parameters:**
- `SavedItem_id` (path): Record ID

```javascript
const record = await base44.entities.SavedItem.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/SavedItem/{SavedItem_id}`
Delete a SavedItem record

**Parameters:**
- `SavedItem_id` (path): Record ID

```javascript
await base44.entities.SavedItem.delete(recordId);
```

### `PUT /entities/SavedItem/{SavedItem_id}/restore`
Restore a deleted SavedItem record

**Parameters:**
- `SavedItem_id" (path): Record ID

```javascript
const record = await base44.entities.SavedItem.restore(recordId);
```
