import './ConfirmModal.css';

function ConfirmModal({ isOpen, onConfirm, onCancel, message, title = 'Підтвердження' }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="modal-cancel-btn" onClick={onCancel}>
                        Скасувати
                    </button>
                    <button className="modal-confirm-btn" onClick={onConfirm}>
                        Підтвердити
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;