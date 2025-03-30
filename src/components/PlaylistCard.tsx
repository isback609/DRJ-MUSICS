
import React from 'react';
import { Play } from "lucide-react";

interface PlaylistCardProps {
  name: string;
  description: string;
  coverImages: string[];
  songCount: number;
  onPlay: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ 
  name, 
  description, 
  coverImages, 
  songCount,
  onPlay 
}) => {
  return (
    <div className="relative group animate-fade-in">
      <div className="relative overflow-hidden rounded-xl h-40 bg-secondary">
        <div className="grid grid-cols-2 gap-0.5 w-full h-full">
          {coverImages.slice(0, 4).map((cover, index) => (
            <div key={index} className="overflow-hidden">
              <img 
                src={cover} 
                alt={`Playlist cover ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button 
          onClick={onPlay}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-90"
        >
          <Play size={20} className="text-music-dark" />
        </button>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <p className="text-xs text-muted-foreground truncate">{description} • {songCount} songs</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
