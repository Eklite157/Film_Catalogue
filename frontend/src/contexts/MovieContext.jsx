import {createContext, useState, useContext, useEffect} from "react"

const MovieContext=createContext()

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider =({children})=>{

    const [favorites, setFavorites] = useState([])

    useEffect(()=> {
        const storedFavs=localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites])

    /*operation to add to favorites; update state; add value to the array*/

    const addToFavorites=(movie) =>{
        setFavorites(prev => [...prev, movie])
    }

    /*operation to remove favorites*/
    const removeFromFavorites=(movieId) =>{
        setFavorites(prev=> prev.filter(movie =>movie.id !== movieId))
    }

    /*operation to check if something is a favorite*/
    const isFavorite=(movieId) => {
        return favorites.some(movie =>movie.id === movieId)
    }

    /*make the functions above accessible to the children inside provider through the value object*/

    const value={
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
} 

/* provides state to any of the components wrapped around it kind of like BrowserRouter*/
/*children is a reserved prop when you write a component; it's anything inside the component that you rendered.
Anything inside provider will be rendered as children*/ 