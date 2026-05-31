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

## App Agent

### `GET /apps/68b1429bbb969dd2425fb6f7/agents/conversations`
List conversations

**Parameters:**
- `limit` (query): Maximum number of conversations to return
- `skip` (query): Number of conversations to skip (pagination)
- `sort_by` (query): Field name to sort by. Prefix with '-' for descending order

```javascript
const conversations = await base44.agents.getConversations();
```

### `POST /apps/68b1429bbb969dd2425fb6f7/agents/conversations`
Create a conversation

```javascript
const conversation = await base44.agents.createConversation({
  agent_name: "flux_growth_copilot"
});
```

### `GET /apps/68b1429bbb969dd2425fb6f7/agents/conversations/{conversation_id}`
Get a conversation

**Parameters:**
- `conversation_id` (path): Conversation ID

```javascript
const conversation = await base44.agents.getConversation(conversationId);
```

### `POST /apps/68b1429bbb969dd2425fb6f7/agents/conversations/{conversation_id}/messages`
Send a message

**Parameters:**
- `conversation_id` (path): Conversation ID

```javascript
const response = await base44.agents.addMessage(
  conversation,
  { role: "user", content: "Hello, how can you help me?" }
);
```
