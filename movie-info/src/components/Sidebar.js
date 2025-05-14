import { useState, useEffect } from 'react';
import { User2, ChartBar, TrendingUp } from 'lucide-react';
import { omdbApi } from '../services/omdbApi';

const Sidebar = ({ movies }) => {
  const [detailedMovies, setDetailedMovies] = useState({});
  const [loading, setLoading] = useState(false);

  // Calcular conteo por años
  const yearCounts = movies.reduce((acc, movie) => {
    acc[movie.Year] = (acc[movie.Year] || 0) + 1;
    return acc;
  }, {});

  // Obtener detalles de las películas para extraer directores
  useEffect(() => {
    if (movies.length === 0) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      const details = {};
      
      try {
        for (const movie of movies) {
          // Solo buscar detalles si no los tenemos ya
          if (!detailedMovies[movie.imdbID]) {
            const movieDetail = await omdbApi.getMovieDetails(movie.imdbID);
            if (movieDetail.Response === 'True') {
              details[movie.imdbID] = movieDetail;
            }
          }
        }
        
        // Solo actualizar si hay nuevos detalles
        if (Object.keys(details).length > 0) {
          setDetailedMovies(prev => ({ ...prev, ...details }));
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]); // Intencionalmente omitimos detailedMovies para evitar bucle infinito

  // Calcular conteo por directores
  const directorCounts = Object.values(detailedMovies).reduce((acc, movie) => {
    if (movie && movie.Director && movie.Director !== 'N/A') {
      const directors = movie.Director.split(',').map(d => d.trim());
      directors.forEach(director => {
        acc[director] = (acc[director] || 0) + 1;
      });
    }
    return acc;
  }, {});

  if (movies.length === 0) return null;

  return (
    <aside className="w-96 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-md border-l border-slate-700/50 p-6">
      <div className="sticky top-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Cinema Analytics</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto"></div>
        </div>

        {/* Películas por Año */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <ChartBar className="w-5 h-5 mr-3 text-emerald-400" />
            Yearly Distribution
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {Object.entries(yearCounts)
              .sort(([a], [b]) => b - a)
              .map(([year, count]) => (
                <div key={year} className="group relative bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-lg p-3 hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-300 border border-slate-600/20 hover:border-emerald-400/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{year}</span>
                    <div className="flex items-center">
                      <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                        {count}
                      </span>
                      <TrendingUp className="w-4 h-4 text-emerald-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-1 bg-slate-600/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 ease-out"
                      style={{ width: `${(count / Math.max(...Object.values(yearCounts))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Películas por Director */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <User2 className="w-5 h-5 mr-3 text-emerald-400" />
            Director Statistics
          </h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="loading-animation mx-auto mb-4"></div>
              <p className="text-slate-300 text-sm">Analyzing director data...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {Object.entries(directorCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([director, count]) => (
                  <div key={director} className="group relative bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-lg p-3 hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-300 border border-slate-600/20 hover:border-emerald-400/30">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm truncate mr-3 flex-1" title={director}>
                        {director}
                      </span>
                      <div className="flex items-center">
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                          {count}
                        </span>
                        <User2 className="w-4 h-4 text-emerald-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-1 bg-slate-600/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 ease-out"
                        style={{ width: `${(count / Math.max(...Object.values(directorCounts))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;