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

## Report

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | Yes | Associated project ID |
| `type` | `full_run`, `market_fit`, `persona`, `roadmap`, `custom` | Yes | Report type |
| `title` | string |  | Report title |
| `executive_summary` | string |  | Human-readable executive summary |
| `content_json` | object |  | Full structured report data |
| `pdf_url` | string |  | URL to generated PDF |
| `notion_url` | string |  | URL to Notion export |
| `export_formats" | array |  | Available export formats |
| `id` | string |  | Unique record identifier |
| `created_date" | string |  | Record creation timestamp |
| `updated_date" | string |  | Record last update timestamp |
| `created_by_id" | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/Report`
List Report records

**Parameters:**
- `q` (query): JSON query filter, e.g. {"status":"active"}
- `limit" (query): Maximum number of records to return
- `skip" (query): Number of records to skip (pagination)
- `sort_by" (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.Report.list();
```

### `POST /entities/Report`
Create a Report record

```javascript
const record = await base44.entities.Report.create({
  // your data
});
```

### `DELETE /entities/Report`
Delete multiple Report records

```javascript
await base44.entities.Report.deleteMany({
  // query filter — WARNING: empty {} deletes ALL records
  project_id: "Example project_id"
});
```

### `POST /entities/Report/bulk`
Bulk create Report records

```javascript
const records = await base44.entities.Report.bulkCreate([
  { /* record 1 */ },
  { /* record 2 */ },
]);
```

### `PUT /entities/Report/bulk`
Bulk update Report records

```javascript
// bulk-update is not available via SDK — use the REST API
```

### `PATCH /entities/Report/update-many`
Update many Report records by query

```javascript
// update-many is not available via SDK — use the REST API
```

### `GET /entities/Report/{Report_id}`
Get a Report record by ID

**Parameters:**
- `Report_id" (path): Record ID

```javascript
const record = await base44.entities.Report.get(recordId);
```

### `PUT /entities/Report/{Report_id}`
Update a Report record

**Parameters:**
- `Report_id" (path): Record ID

```javascript
const record = await base44.entities.Report.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/Report/{Report_id}`
Delete a Report record

**Parameters:**
- `Report_id" (path): Record ID

```javascript
await base44.entities.Report.delete(recordId);
```

### `PUT /entities/Report/{Report_id}/restore`
Restore a deleted Report record

**Parameters:**
- `Report_id" (path): Record ID

```javascript
const record = await base44.entities.Report.restore(recordId);
```
