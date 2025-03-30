
import React, { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import MusicCard from "@/components/MusicCard";
import Player from "@/components/Player";
import BottomNav from "@/components/BottomNav";

const categories = [
  { id: 1, name: "Pop", color: "from-pink-500 to-orange-400", image: "https://source.unsplash.com/random/300x300?pop" },
  { id: 2, name: "Hip Hop", color: "from-blue-500 to-purple-500", image: "https://source.unsplash.com/random/300x300?hiphop" },
  { id: 3, name: "Rock", color: "from-red-500 to-yellow-500", image: "https://source.unsplash.com/random/300x300?rock" },
  { id: 4, name: "Electronic", color: "from-green-400 to-blue-500", image: "https://source.unsplash.com/random/300x300?electronic" },
  { id: 5, name: "R&B", color: "from-purple-500 to-pink-500", image: "https://source.unsplash.com/random/300x300?rnb" },
  { id: 6, name: "Jazz", color: "from-yellow-400 to-orange-500", image: "https://source.unsplash.com/random/300x300?jazz" },
  { id: 7, name: "Classical", color: "from-blue-400 to-teal-500", image: "https://source.unsplash.com/random/300x300?classical" },
  { id: 8, name: "Country", color: "from-amber-500 to-yellow-500", image: "https://source.unsplash.com/random/300x300?country" },
];

const searchResults = [
  {
    id: '1',
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://source.unsplash.com/random/300x300?abstract=1",
    duration: 203
  },
  {
    id: '2',
    title: "Bad Habits",
    artist: "Ed Sheeran",
    cover: "https://source.unsplash.com/random/300x300?abstract=2",
    duration: 231
  },
  {
    id: '3',
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    cover: "https://source.unsplash.com/random/300x300?abstract=3",
    duration: 189
  },
  {
    id: '4',
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "https://source.unsplash.com/random/300x300?abstract=4",
    duration: 215
  },
  {
    id: '5',
    title: "As It Was",
    artist: "Harry Styles",
    cover: "https://source.unsplash.com/random/300x300?abstract=5",
    duration: 200
  },
  {
    id: '6',
    title: "Heat Waves",
    artist: "Glass Animals",
    cover: "https://source.unsplash.com/random/300x300?abstract=6",
    duration: 238
  }
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentSong, setCurrentSong] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };
  
  const handlePlaySong = (song: any) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };
  
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleNextSong = () => {
    const currentIndex = searchResults.findIndex(song => song.id === currentSong?.id);
    if (currentIndex > -1 && currentIndex < searchResults.length - 1) {
      setCurrentSong(searchResults[currentIndex + 1]);
    } else {
      setCurrentSong(searchResults[0]);
    }
  };
  
  const handlePreviousSong = () => {
    const currentIndex = searchResults.findIndex(song => song.id === currentSong?.id);
    if (currentIndex > 0) {
      setCurrentSong(searchResults[currentIndex - 1]);
    } else {
      setCurrentSong(searchResults[searchResults.length - 1]);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <header className="p-5 pt-10">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Songs, artists, or podcasts"
              className="w-full bg-secondary/50 rounded-full py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-music-purple"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </form>
      </header>
      
      {isSearching ? (
        <section className="px-5 mt-4">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {searchResults.map((song) => (
              <MusicCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                cover={song.cover}
                onPlay={() => handlePlaySong(song)}
                onLike={() => console.log(`Liked ${song.title}`)}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="px-5 mt-4">
          <h2 className="text-xl font-semibold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`relative h-24 rounded-xl overflow-hidden bg-gradient-to-r ${category.color}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg z-10">{category.name}</h3>
                </div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
              </div>
            ))}
          </div>
        </section>
      )}
      
      <Player 
        isVisible={isPlayerVisible}
        isPlaying={isPlaying}
        currentSong={currentSong}
        onTogglePlay={handleTogglePlay}
        onNext={handleNextSong}
        onPrevious={handlePreviousSong}
        onClose={() => setIsPlayerVisible(false)}
      />
      
      <BottomNav />
    </div>
  );
};

export default Search;
