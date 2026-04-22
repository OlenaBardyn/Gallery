import { createContext, useContext, useState, useEffect } from 'react';
//createContext	створює контейнер для глобальних даних
//useContext дозволяє компонентам отримати доступ до цих даних
import { getAllInventory } from '../services/inventoryApi';

const InventoryContext = createContext(); //тут будуть зберігатись всі товари, стан завантаження та помилки

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

    useEffect(() => {    //useEffect приймає два аргументи
        loadInventory();   //Функцію, яку потрібно виконати
    }, []);    //Масив залежностей (коли виконувати цю функцію)

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
    const context = useContext(InventoryContext); // отримуємо дані з контексту
    if (!context) {
        throw new Error('useInventory має використовуватись всередині InventoryProvider');
    }
    return context;
}