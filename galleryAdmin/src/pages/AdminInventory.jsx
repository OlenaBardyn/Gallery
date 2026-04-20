import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';
import { deleteInventory } from '../services/inventoryApi';
import './AdminInventory.css';

function AdminInventory() {
    const { inventory, loading, error, loadInventory } = useInventory();

    const handleView = (id) => {
        alert(`Placeholder: Перегляд буде пізніше`);
    };

    const handleEdit = (id) => {
        alert(`Placeholder: Редагування буде пізніше`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити цю позицію?')) {
            try {
                await deleteInventory(id);
                await loadInventory();
                alert('Видалено успішно!');
            } catch (err) {
                alert('Помилка видалення: ' + err.message);
            }
        }
    };

    if (loading) {
        return <div className="loading-state">Завантаження...</div>;
    }

    if (error) {
        return <div className="error-state">Помилка: {error}</div>;
    }

    if (inventory.length === 0) {
        return <div className="empty-state">Немає жодної позиції в інвентарі</div>;
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Інвентар адмін-панель</h1>
            <button 
                className="create-btn"
                onClick={() => alert('Placeholder: Створення буде пізніше')}
            >
                + Створити нову позицію
            </button>
            <InventoryTable 
                inventory={inventory}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default AdminInventory;