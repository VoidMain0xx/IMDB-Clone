import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const apiKey = "417a97c9";
console.log(apiKey); // Log to verify the API key

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=417a97c9&s=popular`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch data from OMDb API.");
            }
            return res.json();
        })
        .then((data) => setPopularMovies(data.Search || []))
        .catch((error) => {
            console.error("Error fetching data:", error);
            console.error("API Response:", error.response);
        });    
    }, [apiKey]);

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {popularMovies.map((movie) => (
                        <Link
                            key={movie.imdbID}  // Use unique key
                            style={{ textDecoration: "none", color: "white" }}
                            to={`/movie/${movie.imdbID}`}
                        >
                            <div className="posterImage">
                                <img
                                    src={movie.Poster !== "N/A" ? movie.Poster : "/default-poster.png"}
                                    alt={movie.Title}
                                />
                            </div>
                            <div className="posterImage__overlay">
                                <div className="posterImage__title">{movie.Title}</div>
                                <div className="posterImage__runtime">
                                    {movie.Year}
                                    <span className="posterImage__rating">
                                        IMDb
                                    </span>
                                </div>
                                <div className="posterImage__description">
                                    {movie.Type}
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
                <MovieList />
            </div>
        </>
    );
};

export default Home;
