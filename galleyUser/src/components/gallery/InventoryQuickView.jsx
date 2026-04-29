import './InventoryQuickView.css';

function InventoryQuickView({ item, onClose }) {
    if (!item) return null;

    return (
        <div className="quickview-overlay" onClick={onClose}>
            <div className="quickview-content">
                <button className="quickview-close" onClick={onClose}>×</button>
                
                <div className="quickview-image">
                    <img 
                        src={item.photo_url || 'https://via.placeholder.com/500x400?text=No+Image'} 
                        alt={item.inventory_name}
                    />
                </div>
                
                <div className="quickview-info">
                    <h2 className="quickview-title">{item.inventory_name}</h2>
                    <p className="quickview-description">{item.description || 'Немає опису'}</p>
                </div>
            </div>
        </div>
    );
}

export default InventoryQuickView;