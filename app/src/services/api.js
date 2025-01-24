const API_KEY="9050530579cc323585b5ebb6db69dd17"
const BASE_URL="https://api.themoviedb.org/3"


// Function to get popular movies, now supporting pagination
export const getPopularMovies = async (maxPages = 12) => {
    let allMovies = [];
    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      
      // If no movies are returned, break out of the loop
      if (data.results.length === 0) break;
      
      allMovies = [...allMovies, ...data.results];
    }
    return allMovies;
  };
  
 
  export const searchMovies = async (query, maxPages = 12) => {
    let allResults = [];
    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
      );
      const data = await response.json();
  
      
      if (data.results.length === 0) break;
  
      allResults = [...allResults, ...data.results];
    }
    return allResults;
  };
