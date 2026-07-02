from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
 
class PipelineRequest(BaseModel):
    nodes: List[Any]
    edges: List[Any]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}

def check_is_dag(nodes, edges): #DFS with a recursion stack
    node_ids = {node['id'] for node in nodes}
    adjacency = {nid: [] for nid in node_ids}
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in adjacency and tgt in adjacency:
            adjacency[src].append(tgt)
 
    visited = set()
    in_stack = set()
 
    def has_cycle(node):
        visited.add(node)
        in_stack.add(node)
        for neighbor in adjacency[node]:
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in in_stack:
                return True
        in_stack.remove(node)
        return False
 
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False
 
    return True

