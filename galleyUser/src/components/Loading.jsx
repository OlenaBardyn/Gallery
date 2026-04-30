function Loading() {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            gap: '12px',
            fontSize: '24px',
            color: '#f07c8f'
        }}>
            <span style={{ animation: 'bounce 1.4s infinite -0.32s' }}>●</span>
            <span style={{ animation: 'bounce 1.4s infinite -0.16s' }}>●</span>
            <span style={{ animation: 'bounce 1.4s infinite 0s' }}>●</span>
            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default Loading;