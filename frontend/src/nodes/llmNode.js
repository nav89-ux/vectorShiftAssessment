// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    label="LLM"
    color="#a855f7"
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
      { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
      { type: 'source', position: Position.Right, id: `${id}-response` }
    ]}
    fields={[]}
  />
);