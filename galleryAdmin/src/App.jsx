import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
    return (
        <InventoryProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AdminInventory />} />
                    <Route path="/admin" element={<AdminInventory />} />
                    <Route path="/admin/create" element={<AdminInventoryCreate />} />
                    <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
                </Routes>
            </BrowserRouter>
        </InventoryProvider>
    );
}

export default App;