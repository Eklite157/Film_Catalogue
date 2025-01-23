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
    /*remember that useEffect will only run once this component is re-rendered*/

    /*We basically put a function inside useEffect function (first parameter) that will be called every time the array
    changes (second parameter). So if nothing changed, we won't run useEffect; run it one time when the component is
    rendered on screen*/


    const handleSearch= async (e) => {
    /* we add preventDefault to prevent search box from being cleared*/
    /* we can also set the updated state ourselves; having a setSearchQuery() will tell React what to show
    in the search box after input*/  
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

/* inside input, we refer to the state.
    we also define a function onChange, so that the value is not locked in searchQuery state;
    once something is submitted, state can be updated*/

/* behind the scenes, anytime we make a change to the input box, onChange function is called
and we update the state, and the state updates the page*/

/* When the search query is called, the component or anything inside the component will be automatically rendered.*/


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



/* 
.map will iterate over all the values inside Home() and for every value, it will pass it into the function
You will need a key property to this because React needs to know which property to update based on the interactions that happen
So we need to mark every single component with a unique identifier EVEN if it's not a property of the component itself.*/

export default Home