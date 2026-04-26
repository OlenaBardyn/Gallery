const API_URL = 'http://localhost:3000/inventory';

// Отримати всі товари
export async function getAllInventory() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Помилка завантаження даних');
    }
    return response.json();
}

// Отримати один товар за ID
export async function getInventoryById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Помилка завантаження товару');
    }
    return response.json();
}