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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Search for Movies</h1>
                    <form onSubmit={handleSubmit} className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Enter movie name"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
