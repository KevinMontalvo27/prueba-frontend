import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Buscar...", debounceMs = 500 }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [searchTerm, debounceMs, onSearch]);

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button 
                        className="clear-button"
                        onClick={handleClear}
                        type="button"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;