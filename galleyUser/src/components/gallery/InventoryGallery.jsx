import InventoryCard from './InventoryCard';

function InventoryGallery({ items, onCardClick }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            padding: '20px'
        }}>
            {items.map((item) => (
                <InventoryCard 
                    key={item.id}
                    item={item}
                    onClick={() => onCardClick(item.id)}
                />
            ))}
        </div>
    );
}

export default InventoryGallery;