'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { BookCard } from '@/components/book-card';
import { trendingBooks } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Upload, 
  Users, 
  Eye, 
  ThumbsUp, 
  BookOpen,
  Calendar,
  Edit
} from 'lucide-react';

export default function ProfilePage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const userStats = {
    subscribers: '12.5K',
    totalViews: '1.2M',
    booksUploaded: 47,
    joinDate: 'March 2022'
  };

  const userBooks = trendingBooks.slice(0, 6);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <Sidebar 
        isDesktopOpen={isDesktopSidebarOpen}
        isMobileOpen={isMobileSidebarOpen}
        onDesktopToggle={toggleDesktopSidebar}
        onMobileToggle={toggleMobileSidebar}
      />
      <div className="flex flex-col flex-1">
        <Navbar onMenuToggle={toggleDesktopSidebar} onMobileMenuToggle={toggleMobileSidebar} />
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 pt-16 ${
            isDesktopSidebarOpen ? 'lg:ml-56' : 'lg:ml-20'
          }`}
        >
          <div className="max-w-6xl mx-auto p-6">
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
              {/* Cover Image */}
              <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white border-white/30"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Cover
                </Button>
              </div>

              {/* Profile Info */}
              <div className="p-6 -mt-16 relative">
                <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800">
                      <AvatarImage src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white dark:bg-gray-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                          John Doe
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          @johndoe • {userStats.subscribers} subscribers
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
                          Welcome to my channel! I'm passionate about sharing amazing books and literary discussions. 
                          Join me on this reading journey! 📚✨
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Customize Channel
                        </Button>
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Book
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">{userStats.subscribers}</span>
                        <span className="text-gray-600 dark:text-gray-400">subscribers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">{userStats.totalViews}</span>
                        <span className="text-gray-600 dark:text-gray-400">total views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-green-600" />
                        <span className="font-semibold">{userStats.booksUploaded}</span>
                        <span className="text-gray-600 dark:text-gray-400">books uploaded</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <span className="text-gray-600 dark:text-gray-400">Joined {userStats.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="books" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="books" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Books
                </TabsTrigger>
                <TabsTrigger value="playlists" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Playlists
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="books" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Uploaded Books ({userStats.booksUploaded})
                    </h2>
                    <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
                      <option>Latest</option>
                      <option>Most Popular</option>
                      <option>Oldest</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="playlists" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Created Playlists
                  </h2>
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No playlists created yet</p>
                    <Button className="mt-4">Create Playlist</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    About
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Welcome to my channel! I'm passionate about sharing amazing books and literary discussions. 
                        Join me on this reading journey! 📚✨
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Channel Details</h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>Joined: {userStats.joinDate}</p>
                        <p>Total views: {userStats.totalViews}</p>
                        <p>Country: United States</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Links</h3>
                      <div className="space-y-2">
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">
                          Personal Website
                        </a>
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">
                          Twitter
                        </a>
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">
                          Instagram
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}