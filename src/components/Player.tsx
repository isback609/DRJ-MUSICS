
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume, Volume2, VolumeX, Heart, Repeat, Shuffle, X } from "lucide-react";

interface PlayerProps {
  isVisible: boolean;
  isPlaying: boolean;
  currentSong: {
    title: string;
    artist: string;
    cover: string;
    duration: number;
  } | null;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

const Player: React.FC<PlayerProps> = ({
  isVisible,
  isPlaying,
  currentSong,
  onTogglePlay,
  onNext,
  onPrevious,
  onClose
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Simulate progress updates when playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval as NodeJS.Timeout);
            return 0;
          }
          return prev + (100 / (currentSong.duration * 10));
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong]);

  if (!isVisible || !currentSong) return null;

  const miniPlayerClasses = `mini-player fixed bottom-16 left-0 right-0 z-40 ${isExpanded ? 'expanded' : ''} ${isVisible ? '' : 'hidden'}`;
  
  // Mini player view (collapsed state)
  if (!isExpanded) {
    return (
      <div className={`${miniPlayerClasses} bg-secondary/80 backdrop-blur-lg p-3`}>
        <div className="flex items-center justify-between" onClick={toggleExpanded}>
          <div className="flex items-center flex-1">
            <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
            >
              {isPlaying ? 
                <Pause size={20} className="text-white" /> : 
                <Play size={20} className="text-white" />
              }
            </button>
          </div>
        </div>
        
        <div className="mt-2 progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }
  
  // Full player view (expanded state)
  return (
    <div className={`${miniPlayerClasses} bg-music-dark fixed inset-0 z-50 flex flex-col`}>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <button onClick={toggleExpanded} className="p-1">
            <X size={24} />
          </button>
          <h2 className="text-lg font-semibold">Now Playing</h2>
          <div className="w-6"></div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center py-10 space-y-8">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-lg animated-bg">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center space-y-1 w-full max-w-sm">
            <div className="flex justify-center items-center">
              <h3 className="text-xl font-bold truncate">{currentSong.title}</h3>
              <button 
                onClick={toggleLike} 
                className="ml-2"
              >
                <Heart 
                  size={18} 
                  className={isLiked ? "fill-music-magenta text-music-magenta" : "text-white"} 
                />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
          </div>
          
          <div className="w-full max-w-sm space-y-2">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime((progress / 100) * currentSong.duration)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-6">
            <button className="p-2 text-muted-foreground hover:text-white transition-colors">
              <Shuffle size={20} />
            </button>
            <button 
              onClick={onPrevious}
              className="p-2 text-white hover:text-music-purple transition-colors"
            >
              <SkipBack size={24} />
            </button>
            <button 
              onClick={onTogglePlay}
              className="p-4 bg-gradient-music rounded-full text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button 
              onClick={onNext}
              className="p-2 text-white hover:text-music-purple transition-colors"
            >
              <SkipForward size={24} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-white transition-colors">
              <Repeat size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-3 w-full max-w-sm">
            <button onClick={() => setVolume(0)} className="p-1">
              {volume === 0 ? (
                <VolumeX size={16} />
              ) : volume < 50 ? (
                <Volume size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="volume-slider flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
