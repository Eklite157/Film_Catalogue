import {createContext, useState, useContext, useEffect} from "react"

const MovieContext=createContext()

export const useMovieContext = () => useContext(MovieContext);


export const MovieProvider =({children})=>{

    
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    //Use local storage to save changes in browser
    useEffect(()=> {
        const storedFavs=localStorage.getItem("favorites");
        const storedWatchlist=localStorage.getItem("watchlist");

     
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
        if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
    }, []);

    
    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites])

    //MAIN OPERATIONS
    const addToFavorites=(movie) =>{
        setFavorites(prev => [...prev, movie])
    }


    const removeFromFavorites=(movieId) =>{
        setFavorites(prev=> prev.filter(movie =>movie.id !== movieId))
    }

    
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

    //make the functions above accessible to the children components inside provider through the value object

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
