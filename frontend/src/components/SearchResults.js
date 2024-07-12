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
        <div className="container mt-5">
            <h1 className="text-center mb-4">Search Results for "{query}"</h1>
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                className="card-img-top"
                                alt={movie.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.overview}</p>
                                <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                                    View Trailer
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
