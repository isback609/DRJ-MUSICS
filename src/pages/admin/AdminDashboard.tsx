
import React, { useState } from 'react';
import { Upload, Music, Headphones, Users, ListMusic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Upload Successful",
        description: `"${songTitle}" by ${artist} has been uploaded.`,
      });
      
      // Reset form
      setSongTitle('');
      setArtist('');
      setDescription('');
      setAudioFile(null);
      setCoverImage(null);
      setIsUploading(false);
    }, 2000);
  };

  // Stats data (mock data)
  const stats = [
    { title: "Total Songs", value: "427", icon: Music },
    { title: "Active Users", value: "8.2K", icon: Users },
    { title: "Playlists", value: "1.3K", icon: ListMusic },
    { title: "Streams Today", value: "15.7K", icon: Headphones },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" /> Upload New Music
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="songTitle" className="text-sm font-medium">Song Title</label>
                <Input
                  id="songTitle"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  placeholder="Enter song title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="artist" className="text-sm font-medium">Artist</label>
                <Input
                  id="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Enter artist name"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter song description"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="audioFile" className="text-sm font-medium">Audio File</label>
                <Input
                  id="audioFile"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Accepted formats: MP3, WAV, FLAC (Max: 20MB)
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="coverImage" className="text-sm font-medium">Cover Image</label>
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 1400 x 1400px (Max: 2MB)
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">⏳</span> Uploading...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" /> Upload Song
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
