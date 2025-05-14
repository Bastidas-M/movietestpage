import { Search, Zap } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="flex-1 max-w-lg ml-8">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-300 transition-colors" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search the universe of cinema..."
          className="w-full pl-12 pr-12 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:bg-slate-800/80 transition-all duration-300 outline-none"
        />
        <Zap className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 via-transparent to-emerald-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">Press Enter to search</p>
    </div>
  );
};

export default SearchBar;