
import React from 'react';
import { Play, Heart } from "lucide-react";

interface MusicCardProps {
  title: string;
  artist: string;
  cover: string;
  onPlay: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

const MusicCard: React.FC<MusicCardProps> = ({ 
  title, 
  artist, 
  cover, 
  onPlay,
  onLike,
  isLiked = false
}) => {
  return (
    <div className="relative group animate-fade-in">
      <div className="relative overflow-hidden rounded-xl aspect-square bg-secondary">
        <img 
          src={cover} 
          alt={`${title} by ${artist}`} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button 
          onClick={onPlay}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-90"
        >
          <Play size={20} className="text-music-dark" />
        </button>
        {onLike && (
          <button 
            onClick={onLike}
            className="absolute top-3 right-3 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart 
              size={20} 
              className={`${isLiked ? 'fill-music-magenta text-music-magenta' : 'text-white'}`} 
            />
          </button>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        <p className="text-xs text-muted-foreground truncate">{artist}</p>
      </div>
    </div>
  );
};

export default MusicCard;
