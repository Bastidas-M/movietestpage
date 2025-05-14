import { Calendar, Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/1e293b/64748b?text=No+Image';

  return (
    <div className="group relative bg-gradient-to-b from-slate-700/50 to-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-600/30 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/0 via-emerald-400/0 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      
      <div className="relative">
        <div className="aspect-w-3 aspect-h-4 overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.Title}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-emerald-400 mr-1" />
              <span className="text-xs text-emerald-400">Enhanced Edition</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
        <h3 className="font-bold text-white text-sm mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-300 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-emerald-400" />
            <span>{movie.Year}</span>
          </div>
          <div className="flex items-center">
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs capitalize font-medium border border-emerald-500/30">
              {movie.Type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;