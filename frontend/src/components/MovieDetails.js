import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

function MovieDetails() {
    const { id } = useParams();
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/movies/trailer/${id}/`)
            .then(response => {
                setTrailer(response.data.items[0].id.videoId);
            });
    }, [id]);

    return (
        <div>
            <h1>Movie Trailer</h1>
            {trailer ? (
                <iframe
                    title="Movie Trailer"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MovieDetails;
