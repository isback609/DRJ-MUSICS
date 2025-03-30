
import React, { useState } from 'react';
import { ChevronRight, Moon, Sun, Download, Upload, Volume2, Wifi, WifiOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import BottomNav from '@/components/BottomNav';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [highQualityStreaming, setHighQualityStreaming] = useState(true);
  const [downloadOnWifi, setDownloadOnWifi] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  
  return (
    <div className="min-h-screen pb-32">
      <header className="p-5 pt-10">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>
      
      <div className="px-5 mt-4">
        <div className="bg-secondary/30 rounded-lg overflow-hidden">
          <div className="divide-y divide-white/5">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                {darkMode ? <Moon size={20} className="text-music-purple mr-3" /> : <Sun size={20} className="text-music-accent mr-3" />}
                <span>Dark Mode</span>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode} 
                className="data-[state=checked]:bg-music-purple"
              />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                {offlineMode ? <WifiOff size={20} className="text-music-purple mr-3" /> : <Wifi size={20} className="text-music-accent mr-3" />}
                <span>Offline Mode</span>
              </div>
              <Switch 
                checked={offlineMode} 
                onCheckedChange={setOfflineMode}
                className="data-[state=checked]:bg-music-purple"
              />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 size={20} className="text-music-purple mr-3" />
                <span>High Quality Streaming</span>
              </div>
              <Switch 
                checked={highQualityStreaming} 
                onCheckedChange={setHighQualityStreaming}
                className="data-[state=checked]:bg-music-purple"
              />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Download size={20} className="text-music-purple mr-3" />
                <span>Download on Wi-Fi Only</span>
              </div>
              <Switch 
                checked={downloadOnWifi} 
                onCheckedChange={setDownloadOnWifi}
                className="data-[state=checked]:bg-music-purple"
              />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Upload size={20} className="text-music-purple mr-3" />
                <span>Autoplay</span>
              </div>
              <Switch 
                checked={autoplay} 
                onCheckedChange={setAutoplay}
                className="data-[state=checked]:bg-music-purple"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-secondary/30 rounded-lg overflow-hidden">
          <div className="divide-y divide-white/5">
            <button className="p-4 w-full flex items-center justify-between">
              <span>Sound Quality</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
            
            <button className="p-4 w-full flex items-center justify-between">
              <span>Equalizer</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
            
            <button className="p-4 w-full flex items-center justify-between">
              <span>Storage</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
            
            <button className="p-4 w-full flex items-center justify-between">
              <span>About</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm">DRJ MUGICS v1.0.0</p>
          <p className="text-muted-foreground text-xs mt-1">© 2023 DRJ MUGICS. All rights reserved.</p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Settings;
