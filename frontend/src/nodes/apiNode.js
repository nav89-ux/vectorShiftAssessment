// apiNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="API Call" color="#f97316"
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-body` },
      { type: 'source', position: Position.Right, id: `${id}-response` }
    ]}
    fields={[
      { name: 'url', label: 'URL', type: 'text', default: 'https://' },
      { name: 'method', label: 'Method', type: 'select', default: 'GET', options: ['GET', 'POST', 'PUT', 'DELETE'] }
    ]}
  />
);