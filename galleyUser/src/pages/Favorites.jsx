import { useEffect, useState } from 'react';
import { getAllInventory } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import './Favorites.css';

function Favorites() {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    if (loading) {
        return (
            <div className="favorites-loading">
                <p>Завантаження...</p>
            </div>
        );
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
                <a href="/" className="back-link">← Перейти до галереї</a>
            </div>

            {favoriteItems.length === 0 ? (
                <div className="favorites-empty" >
                    <p>У вас ще немає улюблених товарів</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '24px',
                    padding: '40px'
                }}>
                    {favoriteItems.map((item) => (
                        <InventoryCard 
                            key={item.id}
                            item={item}
                            onClick={() => window.location.href = '/'}
                            isFavorite={true}
                            onFavoriteToggle={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;