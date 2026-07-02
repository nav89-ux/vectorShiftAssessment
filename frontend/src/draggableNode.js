// draggableNode.js

export const DraggableNode = ({ type, label, color = '#4f46e5' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        padding: '6px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        backgroundColor: '#1e2433',
        border: `1px solid ${color}40`,
        borderLeft: `3px solid ${color}`,
        transition: 'all 0.15s ease',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${color}15`;
        e.currentTarget.style.borderColor = `${color}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1e2433';
        e.currentTarget.style.borderColor = `${color}40`;
      }}
      draggable
    >
      <span style={{ color, fontSize: 12, fontWeight: 600 }}>{label}</span>
    </div>
  );
};