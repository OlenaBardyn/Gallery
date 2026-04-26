import { useEffect, useState } from 'react';
import { getAllInventory } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';

function Gallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleCardClick = (id) => {
        alert(`це буде реалізовано пізніше`);
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Завантаження...</p>
            </div>
        );
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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ padding: '20px 20px 0 20px', margin: 0 }}>Галерея</h1>
            <InventoryGallery items={items} onCardClick={handleCardClick} />
        </div>
    );
}

export default Gallery;