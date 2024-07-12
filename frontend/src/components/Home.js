import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    };

    return (
        <div>
            <h1>Movie Search</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default Home;
