'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { BookCard } from '@/components/book-card';
import { trendingBooks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Users,
  BookOpen,
  Clock
} from 'lucide-react';

export default function SearchPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const searchResults = trendingBooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const channels = [
    {
      id: '1',
      name: 'Classic Literature',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subscribers: '156K',
      description: 'Exploring timeless literary masterpieces'
    },
    {
      id: '2',
      name: 'BookTube Editorial',
      avatar: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subscribers: '500K',
      description: 'Curated book reviews and recommendations'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: searchResults.length },
    { id: 'books', label: 'Books', count: searchResults.length },
    { id: 'channels', label: 'Channels', count: channels.length },
    { id: 'playlists', label: 'Playlists', count: 0 }
  ];

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
            {/* Search Header */}
            <div className="mb-8">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search books, authors, channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
              
              {searchQuery && (
                <p className="text-gray-600 dark:text-gray-400">
                  About {searchResults.length} results for "{searchQuery}"
                </p>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {filter.count}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="ml-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Search Results */}
            {searchQuery ? (
              <div className="space-y-8">
                {/* Books Results */}
                {(activeFilter === 'all' || activeFilter === 'books') && searchResults.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Books ({searchResults.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {searchResults.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Channels Results */}
                {(activeFilter === 'all' || activeFilter === 'channels') && channels.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Channels ({channels.length})
                    </h2>
                    <div className="space-y-4">
                      {channels.map((channel) => (
                        <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={channel.avatar} />
                              <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                {channel.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                {channel.subscribers} subscribers
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {channel.description}
                              </p>
                            </div>
                          </div>

                          <Button>
                            Subscribe
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {searchResults.length === 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm text-center">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try different keywords or check your spelling
                    </p>
                    <Button variant="outline">
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              /* Search Suggestions */
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Popular Searches
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['Classic Literature', 'Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Biography'].map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery(term)}
                        className="text-sm"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Trending Now
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingBooks.slice(0, 8).map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}