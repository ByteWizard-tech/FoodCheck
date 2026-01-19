/**
 * App Component
 * Main application component with routing setup
 */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import SearchResults from './pages/SearchResults/SearchResults';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Help from './pages/Help/Help';
import NotFound from './pages/NotFound/NotFound';

function App() {
    return (
        <div className="app">
            {/* Navigation Bar - Present on all pages */}
            <Navbar />

            {/* Main Content - Routes */}
            <main className="main-content">
                <Routes>
                    {/* Home page with search */}
                    <Route path="/" element={<Home />} />

                    {/* Search results page */}
                    <Route path="/search" element={<SearchResults />} />

                    {/* Product detail page */}
                    <Route path="/product/:id" element={<ProductDetail />} />

                    {/* Static pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/help" element={<Help />} />

                    {/* 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
