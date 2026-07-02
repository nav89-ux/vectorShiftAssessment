// filterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Filter" color="#14b8a6"
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-in` },
      { type: 'source', position: Position.Right, id: `${id}-out` }
    ]}
    fields={[{ name: 'condition', label: 'Condition', type: 'text', default: '' }]}
  />
);