import {createContext, useState, useContext, useEffect} from "react"

const MovieContext=createContext()

export const useMovieContext = () => useContext(MovieContext);


export const MovieProvider =({children})=>{

    //State for favorites and watchlist; initializing both as empty arrays
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    //Using local storage; allows us to store values directly within our browser
    //Load stored favoirtes and watchlist from localStorage on initial render
    useEffect(()=> {
        const storedFavs=localStorage.getItem("favorites");
        const storedWatchlist=localStorage.getItem("watchlist");

        //if local storage is not empty, storing the favorites information as a list which is first
        //converted as a json string in local storage b/c local storage can only store strings.
        //then when it's to be readed in, it will be converted from string back into a real javascript object (json.parse)
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
        if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
    }, []);

    //this use-effect hook only runs when favorites array changes; do the reverse and stringify
    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites])

    //MAIN OPERATIONS
    //operation to add to favorites; update state; add value to the array
    //using setFavorites to update the state; take prev (previous value), then simply add newmovie to prev
    const addToFavorites=(movie) =>{
        setFavorites(prev => [...prev, movie])
    }

    //operation to remove favorites
    //only contain the movies that are not equal to the one we want to remove
    const removeFromFavorites=(movieId) =>{
        setFavorites(prev=> prev.filter(movie =>movie.id !== movieId))
    }

    /*operation to check if something is a favorite*/
    //.some checks if at least one condition is true, so will check all movie ids and if one is equal
    //then it will be true
    const isFavorite=(movieId) => {
        return favorites.some(movie =>movie.id === movieId)
    }

    const addToWatchlist=(movie) =>{
        setWatchlist(prev => [...prev, movie])
    }

    const removeFromWatchlist=(movieId) =>{
        setWatchlist(prev=> prev.filter(movie =>movie.id !== movieId))
    }


    const isInWatchlist=(movieId) => {
        return watchlist.some(movie =>movie.id === movieId)
    }

    /*make the functions above accessible to the children components inside provider through the value object*/

    const value={
        favorites,
        watchlist,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
    };

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
} 
