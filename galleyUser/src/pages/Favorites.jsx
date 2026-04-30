import { useEffect, useState } from 'react';
import { getAllInventory, getInventoryById } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import './Favorites.css';
import Loading from '../components/Loading';

function Favorites() {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const { favorites, toggleFavorite } = useFavorites(allItems);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await getAllInventory();
            setAllItems(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const favoriteItems = allItems.filter(item => favorites.includes(item.id));

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
            <div className="favorites-error">
                <p>Помилка: {error}</p>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <h1>Улюблені товари</h1>
                <a href="/" className="back-link">
                    ← Назад до галереї
                </a>
            </div>

            {favoriteItems.length === 0 ? (
                <div className="favorites-empty">
                    <p>У вас ще немає улюблених товарів</p>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favoriteItems.map((item) => (
                        <InventoryCard 
                            key={item.id}
                            item={item}
                            onClick={() => handleCardClick(item.id)}
                            isFavorite={true}
                            onFavoriteToggle={toggleFavorite}
                        />
                    ))}
                </div>
            )}

            <InventoryQuickView 
                item={selectedItem}
                onClose={handleCloseQuickView}
                isOpen={quickViewOpen}
            />
        </div>
    );
}

export default Favorites;