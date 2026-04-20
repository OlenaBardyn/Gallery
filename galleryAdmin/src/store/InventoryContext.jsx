import { createContext, useContext, useState, useEffect } from 'react';
import { getAllInventory } from '../services/inventoryApi';

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInventory = async () => {
        try {
            setLoading(true);
            const data = await getAllInventory();
            setInventory(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInventory();
    }, []);

    return (
        <InventoryContext.Provider value={{
            inventory,
            setInventory,
            loading,
            error,
            loadInventory
        }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory має використовуватись всередині InventoryProvider');
    }
    return context;
}