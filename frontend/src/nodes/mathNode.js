// mathNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Math" color="#ec4899"
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '33%' } },
      { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '66%' } },
      { type: 'source', position: Position.Right, id: `${id}-result` }
    ]}
    fields={[{ name: 'operator', label: 'Op', type: 'select', default: '+', options: ['+', '-', '*', '/'] }]}
  />
);