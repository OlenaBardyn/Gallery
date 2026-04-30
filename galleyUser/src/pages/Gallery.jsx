import { useEffect, useState } from 'react';
import { getAllInventory, getInventoryById } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';
import Loading from '../components/Loading';

function Gallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await getAllInventory();
            setItems(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = async (id) => {
        try {
            const item = await getInventoryById(id);
            setSelectedItem(item);
            setQuickViewOpen(true);
        } catch (err) {
            console.error('Помилка завантаження товару:', err);
        }
    };

    const handleCloseQuickView = () => {
        setQuickViewOpen(false);
        setSelectedItem(null);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
                <p>Помилка: {error}</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Галерея порожня. Немає жодного товару.</p>
            </div>
        );
    }

    return (
        <div className="gallery-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 0 20px' }}>
                <h1 className="gallery-title" style={{ margin: 0 }}>Галерея інвентарю</h1>
                <a href="/favorites" style={{ fontSize: '18px', textDecoration: 'none' }}>
                    ❤️ Улюблені ({favorites.length})
                </a>
            </div>
            <InventoryGallery 
                items={items} 
                onCardClick={handleCardClick}
                onFavoriteToggle={toggleFavorite}
                favorites={favorites}
            />
            
            <InventoryQuickView 
                item={selectedItem}
                onClose={handleCloseQuickView}
            />
        </div>
    );
}

export default Gallery;