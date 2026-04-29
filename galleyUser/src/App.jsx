import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;