import { useState } from 'react';
import './InventoryCard.css';

function InventoryCard({ item, onClick, isFavorite, onFavoriteToggle }) {
    return (
        <div className="inventory-card">
            <div className="card-image" onClick={onClick}>
                <img 
                    src={item.photo_url || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={item.inventory_name}
                />
            </div>
            <div className="card-body">
                <h3 className="card-title">{item.inventory_name}</h3>
                <button 
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                        onFavoriteToggle(item.id);
                    }}
                >
                    {isFavorite ? '𖹭.ᐟ' : '⁠♡'}
                </button>
            </div>
        </div>
    );
}

export default InventoryCard;