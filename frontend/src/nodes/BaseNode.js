// BaseNode.js

import { Handle } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ id, data, label, handles = [], fields = [], color = '#4f46e5' }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div style={{
      width: 220,
      minHeight: 80,
      backgroundColor: '#1e2433',
      border: '1px solid #2d3a4f',
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      fontFamily: 'inherit',
    }}>
      {/* Colored header bar */}
      <div style={{
        backgroundColor: color,
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
      }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.03em' }}>
          {label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeNode(id);
          }}
          title="Delete node"
          style={{
            background: 'rgba(0,0,0,0.25)',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      {/* Fields */}
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {fields.map((field) => (
          <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {field.label}
            </span>
            {field.type === 'select' ? (
              <select
                value={data[field.name] ?? field.default}
                onChange={(e) => updateNodeField(id, field.name, e.target.value)}
                style={inputStyle}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={data[field.name] ?? field.default}
                onChange={(e) => updateNodeField(id, field.name, e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            ) : (
              <input
                type={field.type}
                value={data[field.name] ?? field.default}
                onChange={(e) => updateNodeField(id, field.name, e.target.value)}
                style={inputStyle}
              />
            )}
          </div>
        ))}
      </div>

      {/* Handles */}
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            width: 10,
            height: 10,
            backgroundColor: color,
            border: '2px solid #0f1117',
            ...h.style,
          }}
        />
      ))}
    </div>
  );
};

const inputStyle = {
  backgroundColor: '#0f1117',
  border: '1px solid #2d3a4f',
  borderRadius: 4,
  color: '#e2e8f0',
  fontSize: 12,
  padding: '4px 6px',
  width: '100%',
  outline: 'none',
};