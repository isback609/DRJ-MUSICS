
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicCard from "@/components/MusicCard";
import PlaylistCard from "@/components/PlaylistCard";
import Player from "@/components/Player";
import BottomNav from "@/components/BottomNav";

const libraryPlaylists = [
  {
    id: '1',
    name: "Workout Mix",
    description: "Energy boosting hits",
    coverImages: [
      "https://source.unsplash.com/random/300x300?workout=1",
      "https://source.unsplash.com/random/300x300?workout=2",
      "https://source.unsplash.com/random/300x300?workout=3",
      "https://source.unsplash.com/random/300x300?workout=4"
    ],
    songCount: 25
  },
  {
    id: '2',
    name: "Chill Vibes",
    description: "Relax and unwind",
    coverImages: [
      "https://source.unsplash.com/random/300x300?chill=1",
      "https://source.unsplash.com/random/300x300?chill=2",
      "https://source.unsplash.com/random/300x300?chill=3",
      "https://source.unsplash.com/random/300x300?chill=4"
    ],
    songCount: 34
  },
  {
    id: '3',
    name: "Road Trip",
    description: "Songs for your journey",
    coverImages: [
      "https://source.unsplash.com/random/300x300?travel=1",
      "https://source.unsplash.com/random/300x300?travel=2",
      "https://source.unsplash.com/random/300x300?travel=3",
      "https://source.unsplash.com/random/300x300?travel=4"
    ],
    songCount: 42
  }
];

const likedSongs = [
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
  }
];

const downloadedSongs = [
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

const Library: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  
  const handlePlaySong = (song: any) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };
  
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleNextSong = () => {
    const allSongs = [...likedSongs, ...downloadedSongs];
    const currentIndex = allSongs.findIndex(song => song.id === currentSong?.id);
    if (currentIndex > -1 && currentIndex < allSongs.length - 1) {
      setCurrentSong(allSongs[currentIndex + 1]);
    } else {
      setCurrentSong(allSongs[0]);
    }
  };
  
  const handlePreviousSong = () => {
    const allSongs = [...likedSongs, ...downloadedSongs];
    const currentIndex = allSongs.findIndex(song => song.id === currentSong?.id);
    if (currentIndex > 0) {
      setCurrentSong(allSongs[currentIndex - 1]);
    } else {
      setCurrentSong(allSongs[allSongs.length - 1]);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <header className="p-5 pt-10">
        <h1 className="text-2xl font-bold">Your Library</h1>
      </header>
      
      <Tabs defaultValue="playlists" className="w-full">
        <div className="px-5">
          <TabsList className="w-full grid grid-cols-3 bg-secondary/50 rounded-lg h-12">
            <TabsTrigger className="rounded-md" value="playlists">Playlists</TabsTrigger>
            <TabsTrigger className="rounded-md" value="liked">Liked</TabsTrigger>
            <TabsTrigger className="rounded-md" value="downloads">Downloads</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="playlists" className="mt-6 px-5 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {libraryPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                name={playlist.name}
                description={playlist.description}
                coverImages={playlist.coverImages}
                songCount={playlist.songCount}
                onPlay={() => console.log(`Playing playlist: ${playlist.name}`)}
              />
            ))}
          </div>
          
          <button className="mt-6 w-full py-3 border border-music-purple text-music-purple rounded-lg font-medium hover:bg-music-purple/10 transition-colors">
            Create New Playlist
          </button>
        </TabsContent>
        
        <TabsContent value="liked" className="mt-6 px-5 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {likedSongs.map((song) => (
              <MusicCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                cover={song.cover}
                onPlay={() => handlePlaySong(song)}
                onLike={() => console.log(`Unliked ${song.title}`)}
                isLiked={true}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="downloads" className="mt-6 px-5 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {downloadedSongs.map((song) => (
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
        </TabsContent>
      </Tabs>
      
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

export default Library;
