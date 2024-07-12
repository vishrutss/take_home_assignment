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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <h1 className="text-center mb-4">Movie Trailer</h1>
                {trailer ? (
                    <iframe
                        title="Movie Trailer"
                        width="360"
                        height="560"
                        src={`https://www.youtube.com/embed/${trailer}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default MovieDetails;
