const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_OMDB_BASE_URL;


export const omdbApi = {
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}?s=${query}&type=movie&page=${page}&apikey=${API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al buscar películas');
    }
  },

  getMovieDetails: async (imdbID) => {
    try {
      const response = await fetch(
        `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al obtener detalles de la película');
    }
  }
};