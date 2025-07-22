'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { BookCard } from '@/components/book-card';
import { trendingBooks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Clock, 
  Heart, 
  Download, 
  BookOpen,
  Trash2,
  Play
} from 'lucide-react';

export default function LibraryPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const libraryBooks = trendingBooks.slice(0, 8);
  const likedBooks = trendingBooks.slice(2, 6);
  const downloadedBooks = trendingBooks.slice(1, 4);

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
          <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Library
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your saved books, reading history, and downloads
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search your library..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Library Tabs */}
            <Tabs defaultValue="history" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="liked" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Liked Books
                </TabsTrigger>
                <TabsTrigger value="downloads" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Downloads
                </TabsTrigger>
                <TabsTrigger value="playlists" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Playlists
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Reading History
                    </h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                      <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
                        <option>All time</option>
                        <option>Today</option>
                        <option>This week</option>
                        <option>This month</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {libraryBooks.map((book) => (
                      <div key={book.id} className="relative group">
                        <BookCard book={book} />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="outline" className="h-8 w-8 bg-white/90 backdrop-blur-sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="liked" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Liked Books ({likedBooks.length})
                    </h2>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Play All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {likedBooks.map((book) => (
                      <div key={book.id} className="relative group">
                        <BookCard book={book} />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="outline" className="h-8 w-8 bg-white/90 backdrop-blur-sm">
                            <Heart className="h-4 w-4 text-red-500 fill-current" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="downloads" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Downloaded Books ({downloadedBooks.length})
                    </h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total size: 245 MB
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {downloadedBooks.map((book) => (
                      <div key={book.id} className="relative group">
                        <BookCard book={book} />
                        <div className="absolute top-2 left-2">
                          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Downloaded
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="outline" className="h-8 w-8 bg-white/90 backdrop-blur-sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="playlists" className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Your Playlists
                    </h2>
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Create Playlist
                    </Button>
                  </div>

                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No playlists yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Create playlists to organize your favorite books
                    </p>
                    <Button>Create Your First Playlist</Button>
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