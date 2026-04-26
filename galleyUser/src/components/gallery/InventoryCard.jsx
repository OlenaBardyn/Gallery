import './InventoryCard.css';

function InventoryCard({ item, onClick }) {
    return (
        <div className="inventory-card" onClick={onClick}>
            <div className="card-image">
                <img 
                    src={item.photo_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={item.inventory_name}
                />
            </div>
            <div className="card-body">
                <h3 className="card-title">{item.inventory_name}</h3>
            </div>
        </div>
    );
}

export default InventoryCard;