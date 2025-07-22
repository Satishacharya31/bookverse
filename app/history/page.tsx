'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { BookCard } from '@/components/book-card';
import { trendingBooks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar, 
  Trash2, 
  Clock,
  Filter,
  Eye,
  Pause
} from 'lucide-react';

export default function HistoryPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const historyBooks = trendingBooks.map((book, index) => ({
    ...book,
    watchedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
    progress: Math.floor(Math.random() * 100)
  }));

  const groupedHistory = historyBooks.reduce((groups: any, book) => {
    const date = new Date(book.watchedAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let key;
    if (date.toDateString() === today.toDateString()) {
      key = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      key = 'Yesterday';
    } else {
      key = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(book);
    return groups;
  }, {});

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
                Reading History
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Keep track of books you've read and continue where you left off
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search your history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* History Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    History & Privacy
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage how your reading activity is saved
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause History
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage History
                  </Button>
                </div>
              </div>
            </div>

            {/* History Groups */}
            <div className="space-y-8">
              {Object.entries(groupedHistory).map(([date, books]: [string, any]) => (
                <div key={date} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      {date}
                    </h2>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {books.map((book: any) => (
                      <div key={`${book.id}-${book.watchedAt}`} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                        <div className="relative w-24 h-32 flex-shrink-0">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {book.progress > 0 && (
                            <div className="absolute bottom-1 left-1 right-1 bg-black/80 rounded-full h-1">
                              <div 
                                className="bg-red-500 h-full rounded-full" 
                                style={{ width: `${book.progress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {book.author} • {book.channel}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {book.views} views
                            </span>
                            {book.progress > 0 && (
                              <span>{book.progress}% complete</span>
                            )}
                            <span>
                              {new Date(book.watchedAt).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="sm">
                            Continue Reading
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {Object.keys(groupedHistory).length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm text-center">
                <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No reading history yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start reading books to see your history here
                </p>
                <Button>
                  Explore Books
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}