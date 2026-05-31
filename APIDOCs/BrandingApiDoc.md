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

## Branding

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_name` | string |  | Application display name |
| `logo_url` | string | Yes | Brand logo URL (used in sidebar/header) |
| `video_url` | string |  | Homepage autoplay video URL (muted) |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date` | string |  | Record last update timestamp |
| `created_by_id` | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/Branding`
List Branding records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.Branding.list();
```

### `POST /entities/Branding`
Create a Branding record

```javascript
const record = await base44.entities.Branding.create({
  // your data
});
```

### `DELETE /entities/Branding`
Delete multiple Branding records

```javascript
await base44.entities.Branding.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  logo_url: "Example logo_url"
});
```

### `POST /entities/Branding/bulk`
Bulk create Branding records

```javascript
const records = await base44.entities.Branding.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/Branding/bulk`
Bulk update Branding records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/Branding/update-many`
Update many Branding records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/Branding/{Branding_id}`
Get a Branding record by ID

**Parameters:**
- `Branding_id` (path): Record ID

```javascript
const record = await base44.entities.Branding.get(recordId);
```

### `PUT /entities/Branding/{Branding_id}`
Update a Branding record

**Parameters:**
- `Branding_id` (path): Record ID

```javascript
const record = await base44.entities.Branding.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/Branding/{Branding_id}`
Delete a Branding record

**Parameters:**
- `Branding_id` (path): Record ID

```javascript
await base44.entities.Branding.delete(recordId);
```

### `PUT /entities/Branding/{Branding_id}/restore`
Restore a deleted Branding record

**Parameters:**
- `Branding_id` (path): Record ID

```javascript
const record = await base44.entities.Branding.restore(recordId);
```
