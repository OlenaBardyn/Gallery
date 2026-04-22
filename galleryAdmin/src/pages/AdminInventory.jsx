import { useState } from 'react';
import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';
import { deleteInventory } from '../services/inventoryApi';
import ConfirmModal from '../components/inventory/ConfirmModal';
import './AdminInventory.css';

function AdminInventory() {
    const { inventory, loading, error, loadInventory } = useInventory();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleView = (id) => {
        window.location.href = `/admin/details/${id}`;
    };

    const handleEdit = (id) => {
        window.location.href = `/admin/edit/${id}`;
    };

    const handleDeleteClick = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        await deleteInventory(itemToDelete);
        await loadInventory();
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
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
                onDelete={handleDeleteClick}
            />
            
            <ConfirmModal 
                isOpen={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title="Видалення товару"
                message="Ви впевнені, що хочете видалити цю позицію? Цю дію не можна скасувати."
            />
        </div>
    );
}

export default AdminInventory;