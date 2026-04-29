import InventoryCard from './InventoryCard';

function InventoryGallery({ items, onCardClick, onFavoriteToggle, favorites }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            padding: '20px'
        }}>
            {items.map((item) => (
                <InventoryCard 
                    key={item.id}
                    item={item}
                    onClick={() => onCardClick(item.id)}
                    isFavorite={favorites.includes(item.id)}
                    onFavoriteToggle={onFavoriteToggle}
                />
            ))}
        </div>
    );
}

export default InventoryGallery;