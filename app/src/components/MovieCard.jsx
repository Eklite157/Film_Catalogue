import "../css/MovieCard.css"
import {useMovieContext} from "../contexts/MovieContext"

//Writing component specifically for displaying each movie, useMovieContext() is our hook. 
function MovieCard({movie}) {
    const {
        isFavorite, 
        addToFavorites,
        removeFromFavorites, 
        isInWatchlist, 
        addToWatchlist, 
        removeFromWatchlist} =useMovieContext(); 

    const favorite=isFavorite(movie.id);

    function onFavoriteClick(e){
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie)
        };
    };


    const watchlist=isInWatchlist(movie.id);

    function onWatchlistClick(e){
        e.preventDefault();
        if (watchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    //add active class to className if part of favorite so it would become red (as written in MovieCard.CSS)
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active": ""}`} onClick={onFavoriteClick}>
                    ♡
                </button>
                <button className={`watchlist-btn ${watchlist ? "active": ""}`} onClick={onWatchlistClick}>
                    ✔
                </button>
            </div>
        </div>

        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>


    </div>
}

export default MovieCard