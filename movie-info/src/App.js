import { useState, useEffect, useCallback } from 'react';
import { Film, Sparkles } from 'lucide-react';
import { omdbApi } from './services/omdbApi';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Marvel');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = useCallback(async (query = searchTerm) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await omdbApi.searchMovies(query);
      
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No se encontraron resultados');
        setMovies([]);
      }
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  // Cargar películas al montar el componente
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchMovies();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orbs"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="relative">
                <Film className="w-10 h-10 text-emerald-500" />
                <Sparkles className="w-5 h-5 text-emerald-300 absolute -top-1 -right-1" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">Movies Test Bastidas</h1>
                <p className="text-emerald-400 text-sm">Discover Cinema Excellence</p>
              </div>
            </div>
            
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Contenido Principal */}
        <main className="flex-1 min-h-screen">
          <div className="p-6">
            {/* Estados de carga y error */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="flex items-center">
                  <div className="loading-animation mr-4"></div>
                  <span className="text-xl text-white/90">Searching the galaxy of films...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 max-w-md mx-auto backdrop-blur-sm">
                  <p className="text-red-400 text-xl font-medium">{error}</p>
                  <p className="text-red-300 text-sm mt-2">Try with another search term</p>
                </div>
              </div>
            )}

            {/* Lista de películas */}
            {!loading && !error && movies.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Results for "{searchTerm}"
                  </h2>
                  <div className="flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 mr-4"></div>
                    <p className="text-emerald-400 text-lg">{movies.length} cinematic gems discovered</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                  ))}
                </div>
              </>
            )}

            {/* Estado vacío */}
            {!loading && !error && movies.length === 0 && searchTerm && (
              <div className="text-center py-20">
                <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-8 max-w-md mx-auto backdrop-blur-sm">
                  <Film className="w-20 h-20 text-emerald-400 mx-auto mb-6 opacity-50" />
                  <p className="text-white text-xl mb-2">No films found in this dimension</p>
                  <p className="text-slate-400 text-sm">Try exploring with different keywords</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <Sidebar movies={movies} />
      </div>
    </div>
  );
}

export default App;