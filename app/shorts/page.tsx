'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  ThumbsUp, 
  ThumbsDown, 
  Share, 
  MessageCircle,
  BookOpen,
  Volume2,
  VolumeX,
  MoreVertical
} from 'lucide-react';

export default function ShortsPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentShort, setCurrentShort] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const shorts = [
    {
      id: '1',
      title: 'Quick Book Review: The Secret Garden',
      author: 'Sarah BookLover',
      avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      views: '12K',
      likes: 847,
      comments: 23,
      duration: '0:45'
    },
    {
      id: '2',
      title: '5 Must-Read Fantasy Books',
      author: 'Fantasy Realm',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      views: '8.5K',
      likes: 623,
      comments: 45,
      duration: '0:58'
    },
    {
      id: '3',
      title: 'Book vs Movie: Which is Better?',
      author: 'Literary Voices',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      views: '15.2K',
      likes: 1205,
      comments: 89,
      duration: '1:12'
    }
  ];

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar 
        isDesktopOpen={isDesktopSidebarOpen}
        isMobileOpen={isMobileSidebarOpen}
        onDesktopToggle={toggleDesktopSidebar}
        onMobileToggle={toggleMobileSidebar}
      />
      <div className="flex flex-col flex-1">
        <Navbar onMenuToggle={toggleDesktopSidebar} onMobileMenuToggle={toggleMobileSidebar} />
        <main
          className={`flex-1 transition-all duration-300 pt-16 ${
            isDesktopSidebarOpen ? 'lg:ml-56' : 'lg:ml-20'
          }`}
        >
          <div className="h-full flex items-center justify-center relative">
            {/* Shorts Player */}
            <div className="relative w-full max-w-sm h-full bg-gray-900 rounded-lg overflow-hidden">
              {/* Video/Content Area */}
              <div className="relative h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                <img
                  src={shorts[currentShort].thumbnail}
                  alt={shorts[currentShort].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-16 w-16 bg-black/30 hover:bg-black/50 text-white rounded-full"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/80 text-white">
                    {shorts[currentShort].duration}
                  </Badge>
                </div>

                {/* Volume Control */}
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-10 w-10 bg-black/30 hover:bg-black/50 text-white rounded-full"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                </div>

                {/* Content Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={shorts[currentShort].avatar} />
                      <AvatarFallback>{shorts[currentShort].author.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {shorts[currentShort].title}
                      </h3>
                      <p className="text-xs text-gray-300">
                        {shorts[currentShort].author} • {shorts[currentShort].views} views
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute right-4 bottom-20 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full"
                >
                  <ThumbsUp className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs">{shorts[currentShort].likes}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full"
                >
                  <ThumbsDown className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full"
                >
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs">{shorts[currentShort].comments}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full"
                >
                  <Share className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full"
                >
                  <BookOpen className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {shorts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentShort(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentShort ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Swipe Instructions */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-8 bg-white/30"></div>
                <span className="text-xs">Swipe up</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}