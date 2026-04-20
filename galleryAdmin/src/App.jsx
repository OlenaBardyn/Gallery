import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';

function App() {
    return (
        <InventoryProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AdminInventory />} />
                    <Route path="/admin" element={<AdminInventory />} />
                </Routes>
            </BrowserRouter>
        </InventoryProvider>
    );
}

export default App;