import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const apiKey = process.env.REACT_APP_API_KEY;

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        // Using OMDb API to fetch data
        fetch(
            `https://www.omdbapi.com/?apikey=417a97c9&s=${type ? type : "popular"}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.Search) {
                    setMovieList(data.Search);
                } else {
                    setMovieList([]);
                }
            })
            .catch((error) => console.error("Error fetching movie data:", error));
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {movieList.length > 0 ? (
                    movieList.map((movie, index) => (
                        <Cards key={index} movie={movie} />
                    ))
                ) : (
                    <p className="no-results">No movies found</p>
                )}
            </div>
        </div>
    );
};

export default MovieList;
