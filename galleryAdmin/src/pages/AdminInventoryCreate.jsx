import { useState } from 'react';
import InventoryForm from '../components/inventory/InventoryForm';
import { createInventory } from '../services/inventoryApi';
import ConfirmModal from '../components/inventory/ConfirmModal';
import './AdminInventoryCreate.css';

function AdminInventoryCreate() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (data) => {
        try {
            await createInventory(data);
            setShowSuccessModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleConfirmSuccess = () => {
        setShowSuccessModal(false);
        window.location.href = '/admin';
    };

    return (
        <div className="create-container">
            <div className="create-card">
                <h1 className="create-title">Створення нової позиції</h1>
                <InventoryForm onSubmit={handleSubmit} />
                <a href="/admin" className="create-back-link">← Назад до списку</a>
                
                {error && (
                    <div className="error-message">
                        Помилка: {error}
                    </div>
                )}
            </div>
            
            <ConfirmModal 
                isOpen={showSuccessModal}
                onConfirm={handleConfirmSuccess}
                onCancel={() => setShowSuccessModal(false)}
                title="Успішно!"
                message="Позицію успішно створено!"
            />
        </div>
    );
}

export default AdminInventoryCreate;