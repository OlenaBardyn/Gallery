import { useEffect, useState } from 'react';
import { getInventoryById } from '../services/inventoryApi';
import './AdminInventoryDetails.css';

function AdminInventoryDetails() {
    const id = window.location.pathname.split('/').pop();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInventoryById(id).then(data => {
            setItem(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="loading-state">Завантаження...</div>;
    if (!item) return <div className="error-state">Товар не знайдено</div>;

    return (
        <div className="details-container">
            <div className="details-card">
                {item.photo_url && (
                    <img 
                        src={item.photo_url} 
                        alt={item.inventory_name}
                        className="details-image"
                    />
                )}
                
                <div className="details-content">
                    <h1 className="details-title">{item.inventory_name}</h1>
                    
                    <div className="details-section">
                        <div className="details-section-title">Опис</div>
                        <div className="details-description">
                            {item.description || 'Немає опису'}
                        </div>
                    </div>
                    
                    <a href="/admin" className="details-back-link">
                        ← Назад до списку
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AdminInventoryDetails;