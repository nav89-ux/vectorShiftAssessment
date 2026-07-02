# VectorShift Frontend Technical Assessment

A pipeline builder UI with drag-and-drop nodes, built with React + ReactFlow on the frontend and FastAPI on the backend.

## Setup

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Runs at `http://localhost:8000`

## Features

### Part 1: Node Abstraction
- `BaseNode.js` — a single reusable base component that all nodes extend via `label`, `handles`, and `fields` config props
- 4 original nodes refactored: Input, Output, LLM, Text
- 5 new nodes added: Note, Math, Filter, API Call, Transform

### Part 2: Styling
- Dark theme with `#0f1117` canvas background
- Each node type has a unique accent color applied to its header and handles
- Toolbar chips match their respective node colors
- Responsive layout using full viewport height

### Part 3: Text Node Logic
- Text node **dynamically resizes** (width + height) as the user types
- Typing `{{variableName}}` (valid JS variable name) **auto-creates a target Handle** on the left side of the node for that variable
- Duplicate variable names are deduplicated; handles are evenly spaced

### Part 4: Backend Integration
- Submit button sends `{ nodes, edges }` as JSON to `POST /pipelines/parse`
- Backend returns `{ num_nodes, num_edges, is_dag }`
- Frontend displays an alert with the results in a user-friendly format
- DAG detection uses DFS with a recursion stack (cycle detection)
