import { createInventory } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

function AdminInventoryCreate() {
    const handleSubmit = async (data) => {
        try {
            await createInventory(data);
            alert('Створено!');
            window.location.href = '/admin';
        } catch (err) {
            alert('Помилка: ' + err.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Створення позиції</h1>
            <InventoryForm onSubmit={handleSubmit} />
            <br />
            <a href="/admin">← Назад</a>
        </div>
    );
}

export default AdminInventoryCreate;