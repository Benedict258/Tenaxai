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

## User

### Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `admin`, `user` |  | The role of the user in the app |
| `email` | string | Yes | The email of the user |
| `full_name` | string | Yes | The full name of the user |
| `business_type` | string | Yes | Type of business (e.g., SaaS, ecommerce, marketplace) |
| `industry` | string | Yes | Primary industry |
| `preferred_regions` | array | Yes | Regions of interest |
| `favorite_channels` | array | Yes | Preferred marketing channels |
| `brand_voice` | string | Yes | Brand voice style (e.g., professional, playful, luxury) |
| `id` | string |  | Unique record identifier |
| `created_date" | string |  | Record creation timestamp |
| `updated_date" | string |  | Record last update timestamp |
| `created_by_id" | string |  | ID of the user who created the record |

### Endpoints

### `GET /entities/User`
List User records

**Parameters:**
- `q" (query): JSON query filter, e.g. {"status":"active"}
- `limit" (query): Maximum number of records to return
- `skip" (query): Number of records to skip (pagination)
- `sort_by" (query): Field name to sort by. Prefix with '-' for descending order, e.g. -created_date

```javascript
const records = await base44.entities.User.list();
```

### `POST /entities/User`
Create a User record

```javascript
const record = await base44.entities.User.create({
  // your data
});
```

### `GET /entities/User/{User_id}`
Get a User record by ID

**Parameters:**
- `User_id" (path): Record ID

```javascript
const record = await base44.entities.User.get(recordId);
```

### `PUT /entities/User/{User_id}`
Update a User record

**Parameters:**
- `User_id" (path): Record ID

```javascript
const record = await base44.entities.User.update(recordId, {
  // fields to update
});
```

### `DELETE /entities/User/{User_id}`
Delete a User record

**Parameters:**
- `User_id" (path): Record ID

```javascript
await base44.entities.User.delete(recordId);
```
