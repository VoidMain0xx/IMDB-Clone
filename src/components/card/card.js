import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link
                    to={`/movie/${movie.imdbID}`} // Adjusted to use OMDb's IMDb ID
                    style={{ textDecoration: "none", color: "white" }}
                >
                    <div className="cards">
                        <img
                            className="cards__img"
                            src={movie.Poster !== "N/A" ? movie.Poster : "/default-poster.png"} // Use OMDb's Poster field, fallback to a default
                            alt={movie.Title}
                        />
                        <div className="cards__overlay">
                            <div className="card__title">{movie.Title}</div>
                            <div className="card__runtime">
                                {movie.Year}
                                <span className="card__rating">
                                    {/* OMDb does not include ratings in search results. You can fetch more details if needed. */}
                                    IMDb
                                </span>
                            </div>
                            <div className="card__description">
                                {`Type: ${movie.Type}` /* Display movie type (e.g., movie, series) */}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;
