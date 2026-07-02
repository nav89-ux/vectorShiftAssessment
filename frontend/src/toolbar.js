// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '12px 20px',
            backgroundColor: '#1C2536',
            borderBottom: '1px solid #2d3a4f',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
             }}>
            <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', marginRight: 8 }}>
                NODES
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <DraggableNode type='customInput' label='Input' color='#3b82f6' />
                <DraggableNode type='llm' label='LLM' color='#8b5cf6' />
                <DraggableNode type='customOutput' label='Output' color='#10b981' />
                <DraggableNode type='text' label='Text' color='#d97706' />
                <DraggableNode type='note' label='Note' color='#64748b' />
                <DraggableNode type='math' label='Math' color='#e11d48' />
                <DraggableNode type='filter' label='Filter' color='#0891b2' />
                <DraggableNode type='api' label='API Call' color='#ea580c' />
                <DraggableNode type='transform' label='Transform' color='#6366f1' />
            </div>
        </div>
    );
};
