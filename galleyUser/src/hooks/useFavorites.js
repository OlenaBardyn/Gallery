import { useState, useEffect } from 'react';

const STORAGE_KEY = 'favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    // Додати до улюблених
    const addToFavorites = (id) => {
        setFavorites((prev) => {
            const newFavorites = [...prev, id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Видалити з улюблених
    const removeFromFavorites = (id) => {
        setFavorites((prev) => {
            const newFavorites = prev.filter(favId => favId !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Перемкнути улюблене (додати/видалити)
    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            removeFromFavorites(id);
        } else {
            addToFavorites(id);
        }
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite: (id) => favorites.includes(id)
    };
}