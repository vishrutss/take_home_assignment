import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {
    const query = useQuery().get('query');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/movies/search/?query=${query}`)
            .then(response => {
                setMovies(response.data.results);
            });
    }, [query]);

    return (
        <div>
            <h1>Search Results</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
