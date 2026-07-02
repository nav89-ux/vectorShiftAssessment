// textNode.js

import { useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const MIN_WIDTH = 220;
const MIN_HEIGHT = 80;
const CHAR_WIDTH = 8;
const LINE_HEIGHT = 20;

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const removeNode = useStore((state) => state.removeNode);
  const text = data?.text ?? '{{input}}';

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const found = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      found.add(match[1]);
    }
    return [...found];
  }, [text]);

  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map((l) => l.length));
  const width = Math.max(MIN_WIDTH, longestLine * CHAR_WIDTH + 40);
  const height = Math.max(MIN_HEIGHT, lines.length * LINE_HEIGHT + 80);

  return (
    <div style={{
      width,
      minHeight: height,
      backgroundColor: '#1e2433',
      border: '1px solid #2d3a4f',
      borderRadius: 10,
      overflow: 'visible',
      position: 'relative',
      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      fontFamily: 'inherit',
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#f59e0b',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.03em' }}>
          Text
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

      {/* Text field */}
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Text
        </span>
        <textarea
          value={text}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
          style={{
            backgroundColor: '#0f1117',
            border: '1px solid #2d3a4f',
            borderRadius: 4,
            color: '#e2e8f0',
            fontSize: 12,
            padding: '4px 6px',
            width: '100%',
            outline: 'none',
            resize: 'none',
            overflow: 'hidden',
          }}
          rows={Math.max(2, lines.length)}
        />
      </div>

      {/* Variable handles on the left */}
      {variables.map((varName, index) => (
        <Handle
          key={`${id}-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${((index + 1) / (variables.length + 1)) * 100}%`,
            width: 10,
            height: 10,
            backgroundColor: '#f59e0b',
            border: '2px solid #0f1117',
          }}
        />
      ))}

      {/* Variable labels on the left, outside the node */}
      {variables.map((varName, index) => (
        <div
          key={`${id}-${varName}-label`}
          style={{
            position: 'absolute',
            left: -8,
            top: `${((index + 1) / (variables.length + 1)) * 100}%`,
            transform: 'translate(-100%, -50%)',
            fontSize: 9,
            color: '#f59e0b',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {varName}
        </div>
      ))}

      {/* Output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          width: 10,
          height: 10,
          backgroundColor: '#f59e0b',
          border: '2px solid #0f1117',
        }}
      />
    </div>
  );
};