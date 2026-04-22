import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';
import { deleteInventory } from '../services/inventoryApi';
import './AdminInventory.css';


function AdminInventory() {
    const { inventory, loading, error, loadInventory } = useInventory();

    const handleView = (id) => {
        window.location.href = `/admin/details/${id}`;
    };

    const handleEdit = (id) => {
        window.location.href = `/admin/edit/${id}`;
    };

    const handleDelete = async (id) => {
        if (window.confirm('Ви впевнені?')) {
            await deleteInventory(id);
            loadInventory();
        }
    };

    if (loading) return <div className="loading-state">Завантаження...</div>;
    if (error) return <div className="error-state">Помилка: {error}</div>;

    return (
        <div className="admin-container">
            <h1 className="admin-title">Адмін-панель інвентарю</h1>
            <button className="create-btn" onClick={() => window.location.href = '/admin/create'}>
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