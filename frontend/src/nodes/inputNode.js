// inputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={{ inputName: id.replace('customInput-', 'input_'), inputType: 'Text', ...data }}
    label="Input"
    color="#3b82f6"
    handles={[
      { type: 'source', position: Position.Right, id: `${id}-value` }
    ]}
    fields={[
      { name: 'inputName', label: 'Name', type: 'text', default: id.replace('customInput-', 'input_') },
      { name: 'inputType', label: 'Type', type: 'select', default: 'Text', options: ['Text', 'File'] }
    ]}
  />
);