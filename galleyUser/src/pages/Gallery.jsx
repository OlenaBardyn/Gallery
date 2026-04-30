import { useEffect, useState } from 'react';
import { getAllInventory, getInventoryById } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';
import Loading from '../components/Loading';
import './Gallery.css';

function Gallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const { favorites, toggleFavorite } = useFavorites(items);

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
            <div className="gallery-error">
                <p>Помилка: {error}</p>
            </div>
        );
    }

    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <h1>  Галерея інвентарю</h1>
                <a href="/favorites" className="favorites-link">
                    ❤️ Улюблені ({favorites.length})
                </a>
            </div>

            {items.length === 0 ? (
                <div className="gallery-empty">
                    <p>Галерея порожня. Немає жодного товару.</p>
                </div>
            ) : (
                <InventoryGallery 
                    items={items} 
                    onCardClick={handleCardClick}
                    onFavoriteToggle={toggleFavorite}
                    favorites={favorites}
                />
            )}

            <InventoryQuickView 
                item={selectedItem}
                onClose={handleCloseQuickView}
            />
        </div>
    );
}

export default Gallery;