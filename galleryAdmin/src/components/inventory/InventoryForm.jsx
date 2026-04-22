import { useState } from 'react';

function InventoryForm({ onSubmit, initialData = {} }) {
    const [name, setName] = useState(initialData.inventory_name || '');
    const [desc, setDesc] = useState(initialData.description || '');
    const [photoBase64, setPhotoBase64] = useState(initialData.photo_url || '');
    const [preview, setPreview] = useState(initialData.photo_url || '');

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setPhotoBase64(base64);
                setPreview(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            inventory_name: name,
            description: desc,
            photo_url: photoBase64 || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/960px-Placeholder_view_vector.svg.png"
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '15px' }}>
                <label>Назва *</label><br />
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <label>Опис</label><br />
                <textarea 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <label>Фото (виберіть файл)</label><br />
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ padding: '8px' }}
                />
                {preview && (
                    <div style={{ marginTop: '10px' }}>
                        <img src={preview} alt="Preview" style={{ maxWidth: '150px', borderRadius: '8px' }} />
                    </div>
                )}
            </div>
            
            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Зберегти
            </button>
        </form>
    );
}

export default InventoryForm;