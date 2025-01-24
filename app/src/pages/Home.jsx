import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react"
import {searchMovies, getPopularMovies} from "../services/api";
import "../css/Home.css"

function Home () {
    /* function that allows you update the state; [name of the state, function that allows you to update the state]
    and what you want the default value of the state to be*/
    const [searchQuery, setSearchQuery]=useState("");
    const [movies, setMovies]=useState([]);
    const [error, setError] =useState(null)
    const [loading, setLoading] =useState(true)

    useEffect(() => {
        const loadPopularMovies=async() =>{
            try {
                const popularMovies=await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally{
                setLoading(false)
            }
        }

        loadPopularMovies()

    }, [])


    const handleSearch= async (e) => {
    //add preventDefault to prevent search box from being cleared

        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults= await searchMovies(searchQuery)
            setMovies(searchResulst)
            setError(null)
        } catch (err){
            setError("Failed to search movies...")

        } finally {
            setLoading(false)
        }

    };

/* inside input, refer to the state:
    define a function onChange, so that the value is not locked in searchQuery state;
    once something is submitted, state can be updated*/


    return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input  
                type="text"
                placeholder="Search for movies..."
                className ="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (<div className="loading">Loading...</div>) :(
         <div className="movies-grid">
         
         {movies.map((movie) => (
             movie.title.toLowerCase().startsWith(searchQuery) &&
             <MovieCard movie={movie} key={movie.id} />
             ))}
        </div>
    )}
    </div>
    )
}




export default Home;