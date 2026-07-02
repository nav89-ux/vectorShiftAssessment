// noteNode.js

import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Note" color="#64748b" handles={[]}
    fields={[{ name: 'note', label: 'Note', type: 'textarea', default: '' }]}
  />
);