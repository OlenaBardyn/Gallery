import './InventoryTable.css';

function InventoryTable({ inventory, onView, onEdit, onDelete }) {
    return (
        <div className="inventory-table-container">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Фото</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.id}>
                            <td>{item.inventory_name}</td>
                            <td>
                                {item.description?.length > 40 
                                    ? item.description.substring(0, 40) + '...' 
                                    : item.description}
                            </td>
                            <td className="photo-cell">
                                <img 
                                    src={item.photo_url} 
                                    alt={item.inventory_name}
                                    className="inventory-image"
                                />
                            </td>
                            <td className="actions-cell">
                                <button className="view-btn" onClick={() => onView(item.id)}>👁 Переглянути</button>
                                <button className="edit-btn" onClick={() => onEdit(item.id)}>✏ Редагувати</button>
                                <button className="delete-btn" onClick={() => onDelete(item.id)}>🗑 Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;