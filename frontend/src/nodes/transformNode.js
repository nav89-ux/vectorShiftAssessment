// transformNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Transform" color="#8b5cf6"
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-in` },
      { type: 'source', position: Position.Right, id: `${id}-out` }
    ]}
    fields={[
      { name: 'operation', label: 'Operation', type: 'select', default: 'Uppercase', options: ['Uppercase', 'Lowercase', 'Trim', 'Reverse'] }
    ]}
  />
);