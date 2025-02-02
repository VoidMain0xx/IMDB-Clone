import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const { id } = useParams();

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, []);

    const getData = () => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=417a97c9`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data from OMDb API.");
                }
                return res.json();
            })
            .then((data) => setMovie(data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img
                    className="movie__backdrop"
                    src={currentMovieDetail ? currentMovieDetail.Poster : ""}
                    alt={currentMovieDetail ? currentMovieDetail.Title : ""}
                />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={currentMovieDetail ? currentMovieDetail.Poster : ""}
                            alt={currentMovieDetail ? currentMovieDetail.Title : ""}
                        />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">
                            {currentMovieDetail ? currentMovieDetail.Title : ""}
                        </div>
                        <div className="movie__tagline">
                            {currentMovieDetail ? currentMovieDetail.Genre : ""}
                        </div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.imdbRating : ""}{" "}
                            <i className="fas fa-star" />
                            <span className="movie__voteCount">
                                {currentMovieDetail ? `(${currentMovieDetail.imdbVotes} votes)` : ""}
                            </span>
                        </div>
                        <div className="movie__runtime">
                            {currentMovieDetail ? currentMovieDetail.Runtime : ""}
                        </div>
                        <div className="movie__releaseDate">
                            {currentMovieDetail ? "Release date: " + currentMovieDetail.Released : ""}
                        </div>
                        <div className="movie__genres">
                            {currentMovieDetail &&
                                currentMovieDetail.Genre &&
                                currentMovieDetail.Genre.split(", ").map((genre, index) => (
                                    <span key={index} className="movie__genre">
                                        {genre}
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.Plot : ""}</div>
                    </div>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {currentMovieDetail && currentMovieDetail.Website && (
                    <a href={currentMovieDetail.Website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <p>
                            <span className="movie__homeButton movie__Button">
                                Homepage <i className="newTab fas fa-external-link-alt"></i>
                            </span>
                        </p>
                    </a>
                )}
                {currentMovieDetail && currentMovieDetail.imdbID && (
                    <a
                        href={`https://www.imdb.com/title/${currentMovieDetail.imdbID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        <p>
                            <span className="movie__imdbButton movie__Button">
                                IMDb <i className="newTab fas fa-external-link-alt"></i>
                            </span>
                        </p>
                    </a>
                )}
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {currentMovieDetail &&
                    currentMovieDetail.Production &&
                    currentMovieDetail.Production.split(", ").map((company, index) => (
                        <span key={index} className="productionCompanyImage">
                            <img className="movie__productionComapany" src={company.logo} alt={company.name} />
                            <span>{company.name}</span>
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default Movie;
