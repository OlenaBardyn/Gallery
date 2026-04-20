const API_URL = 'http://localhost:3000/inventory';

// Отримати всі позиції
export async function getAllInventory() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Помилка завантаження');
    }
    return response.json();
}

// Отримати одну позицію
export async function getInventoryById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Помилка завантаження');
    }
    return response.json();
}

// Створити 
export async function createInventory(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Помилка створення');
    }
    return response.json();
}

// Оновити 
export async function updateInventory(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Помилка оновлення');
    }
    return response.json();
}

// Видалити
export async function deleteInventory(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Помилка видалення');
    }
    return response.json();
}