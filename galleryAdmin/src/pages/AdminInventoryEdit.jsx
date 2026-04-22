import { useEffect, useState } from 'react';
import { getInventoryById, updateInventory } from '../services/inventoryApi';

const DEFAULT_PHOTO_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/960px-Placeholder_view_vector.svg.png";

function AdminInventoryEdit() {
    const id = window.location.pathname.split('/').pop();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [photoUrl, setPhotoUrl] = useState(DEFAULT_PHOTO_URL);
    const [photoPreview, setPhotoPreview] = useState(DEFAULT_PHOTO_URL);
    const [isCustomPhoto, setIsCustomPhoto] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInventoryById(id).then(data => {
            setName(data.inventory_name);
            setDesc(data.description || '');
            
            // Отримуємо фото з сервера
            const existingPhoto = data.photo_url;
            
            // Перевіряємо, чи є кастомне фото (не пусте, не null, і не дорівнює DEFAULT)
            const hasCustom = existingPhoto && 
                              existingPhoto !== DEFAULT_PHOTO_URL && 
                              existingPhoto !== '';
            
            if (hasCustom) {
                setPhotoUrl(existingPhoto);
                setPhotoPreview(existingPhoto);
                setIsCustomPhoto(true);
            } else {
                setPhotoUrl(DEFAULT_PHOTO_URL);
                setPhotoPreview(DEFAULT_PHOTO_URL);
                setIsCustomPhoto(false);
            }
            
            setLoading(false);
        });
    }, [id]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setPhotoUrl(base64);
                setPhotoPreview(base64);
                setIsCustomPhoto(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePhoto = () => {
        setPhotoUrl(DEFAULT_PHOTO_URL);
        setPhotoPreview(DEFAULT_PHOTO_URL);
        setIsCustomPhoto(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateInventory(id, {
                inventory_name: name,
                description: desc,
                photo_url: photoUrl
            });
            alert('Оновлено!');
            window.location.href = '/admin';
        } catch (err) {
            alert('Помилка: ' + err.message);
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Завантаження...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Редагування</h1>
            <form onSubmit={handleSubmit}>
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
                    <label>Фото</label><br />
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ padding: '8px' }}
                    />
                    
                    <div style={{ marginTop: '10px' }}>
                        <img 
                            src={photoPreview} 
                            alt="Preview" 
                            style={{ maxWidth: '150px', borderRadius: '8px' }} 
                        />
                        <br />
                        
                        {isCustomPhoto && (
                            <button 
                                type="button"
                                onClick={handleDeletePhoto}
                                style={{ marginTop: '5px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '5px' }}
                            >
                                Видалити фото
                            </button>
                        )}
                    </div>
                </div>
                
                <div>
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Зберегти
                    </button>
                    <a href="/admin" style={{ marginLeft: '10px' }}>Скасувати</a>
                </div>
            </form>
        </div>
    );
}

export default AdminInventoryEdit;