// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
      const { nodes, edges } = useStore((state) => ({ nodes: state.nodes, edges: state.edges }));

      const handleSubmit = async () => {
         try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
 
      if (!response.ok) {
        alert('Error: Failed to reach the backend.');
        return;
      }
 
      const result = await response.json();
 
      alert(
        `Pipeline Analysis\n\n` +
        `Nodes:  ${result.num_nodes}\n` +
        `Edges:  ${result.num_edges}\n` +
        `Is DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗'}`
      );
    } catch (err) {
      alert('Error: Could not connect to backend. Is it running on port 8000?');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
      backgroundColor: '#1C2536',
      borderTop: '1px solid #2d3a4f',
    }}>
      <button 
        onClick={handleSubmit}
        style={{
          backgroundColor: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 32px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.03em',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4f46e5'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6366f1'}
      >
        Submit Pipeline
      </button>
    </div>
  );
};