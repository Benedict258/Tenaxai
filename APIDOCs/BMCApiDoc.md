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

## BMC

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | Yes | Related project |
| `user_id` | string |  | Owner user id |
| `block_key` | `customer_segments`, `value_props`, `channels`, `customer_relationships`, `revenue_streams`, `key_resources`, `key_activities`, `key_partnerships`, `cost_structure` | Yes | BMC block key |
| `content` | string | Yes | Saved content for this block (markdown/plain) |
| `id` | string |  | Unique record identifier |
| `created_date` | string |  | Record creation timestamp |
| `updated_date" | string |  | Record last update timestamp |
| `created_by_id" | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/BMC`
List BMC records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit` (query): Maximum number of records to return
- `skip` (query): Number of records to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.BMC.list();
```

### `POST /entities/BMC`
Create a BMC record

```javascript
const record = await base44.entities.BMC.create({
  // your data
});
```

### `DELETE /entities/BMC`
Delete multiple BMC records

```javascript
await base44.entities.BMC.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  project_id: "Example project_id"
});
```

### `POST /entities/BMC/bulk`
Bulk create BMC records

```javascript
const records = await base44.entities.BMC.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/BMC/bulk`
Bulk update BMC records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/BMC/update-many`
Update many BMC records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/BMC/{BMC_id}`
Get a BMC record by ID

**Parameters:**
- `BMC_id` (path): Record ID

```javascript
const record = await base44.entities.BMC.get(recordId);
```

### `PUT /entities/BMC/{BMC_id}`
Update a BMC record

**Parameters:**
- `BMC_id` (path): Record ID

```javascript
const record = await base44.entities.BMC.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/BMC/{BMC_id}`
Delete a BMC record

**Parameters:**
- `BMC_id` (path): Record ID

```javascript
await base44.entities.BMC.delete(recordId);
```

### `PUT /entities/BMC/{BMC_id}/restore`
Restore a deleted BMC record

**Parameters:**
- `BMC_id` (path): Record ID

```javascript
const record = await base44.entities.BMC.restore(recordId);
```
