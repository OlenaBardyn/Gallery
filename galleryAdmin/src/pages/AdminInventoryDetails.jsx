import { useEffect, useState } from 'react';
import { getInventoryById } from '../services/inventoryApi';

function AdminInventoryDetails() {
    // Отримуємо ID з URL
    const id = window.location.pathname.split('/').pop();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInventoryById(id).then(data => {
            setItem(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div style={{ padding: '20px' }}>Завантаження...</div>;
    if (!item) return <div style={{ padding: '20px' }}>Товар не знайдено</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>{item.inventory_name}</h1>
            
            {item.photo_url && (
                <img 
                    src={item.photo_url} 
                    alt={item.inventory_name}
                    style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }}
                />
            )}
            
            <p><strong>Опис:</strong></p>
            <p>{item.description || 'Немає опису'}</p>
            
            <br />
            <a href="/admin">← Назад до списку</a>
        </div>
    );
}

export default AdminInventoryDetails;