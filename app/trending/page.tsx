'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { BookCard } from '@/components/book-card';
import { trendingBooks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Clock, 
  Globe,
  BookOpen,
  Users,
  Filter
} from 'lucide-react';

export default function TrendingPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const categories = [
    { id: 'all', label: 'All Categories', count: trendingBooks.length },
    { id: 'fiction', label: 'Fiction', count: 12 },
    { id: 'non-fiction', label: 'Non-Fiction', count: 8 },
    { id: 'mystery', label: 'Mystery', count: 6 },
    { id: 'romance', label: 'Romance', count: 10 },
    { id: 'sci-fi', label: 'Sci-Fi', count: 7 },
    { id: 'fantasy', label: 'Fantasy', count: 9 }
  ];

  const timeRanges = [
    { id: 'now', label: 'Now', icon: TrendingUp },
    { id: 'today', label: 'Today', icon: Clock },
    { id: 'week', label: 'This Week', icon: Clock },
    { id: 'month', label: 'This Month', icon: Clock }
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
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-red-500" />
                Trending
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover what's popular on BookTube right now
              </p>
            </div>

            {/* Time Range Tabs */}
            <Tabs defaultValue="now" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                {timeRanges.map((range) => (
                  <TabsTrigger key={range.id} value={range.id} className="flex items-center gap-2">
                    <range.icon className="h-4 w-4" />
                    {range.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Button variant="outline" size="sm" className="mb-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="mb-2"
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              <TabsContent value="now" className="space-y-8">
                {/* Top Trending */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                    Trending Now
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingBooks.slice(0, 8).map((book, index) => (
                      <div key={book.id} className="relative">
                        <div className="absolute -top-2 -left-2 z-10">
                          <Badge className="bg-red-500 text-white">
                            #{index + 1}
                          </Badge>
                        </div>
                        <BookCard book={book} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending by Category */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Trending in Fiction
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingBooks.slice(2, 6).map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>

                {/* Rising Stars */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    Rising Stars
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingBooks.slice(1, 5).map((book) => (
                      <div key={book.id} className="relative">
                        <div className="absolute top-2 left-2 z-10">
                          <Badge className="bg-green-500 text-white">
                            Rising
                          </Badge>
                        </div>
                        <BookCard book={book} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="today" className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Today's Top Books
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingBooks.map((book, index) => (
                      <div key={book.id} className="relative">
                        <div className="absolute -top-2 -left-2 z-10">
                          <Badge className="bg-blue-500 text-white">
                            #{index + 1}
                          </Badge>
                        </div>
                        <BookCard book={book} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="week" className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    This Week's Trending
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...trendingBooks].reverse().map((book, index) => (
                      <div key={book.id} className="relative">
                        <div className="absolute -top-2 -left-2 z-10">
                          <Badge className="bg-purple-500 text-white">
                            #{index + 1}
                          </Badge>
                        </div>
                        <BookCard book={book} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="month" className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Monthly Trending
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingBooks.slice().sort(() => Math.random() - 0.5).map((book, index) => (
                      <div key={book.id} className="relative">
                        <div className="absolute -top-2 -left-2 z-10">
                          <Badge className="bg-orange-500 text-white">
                            #{index + 1}
                          </Badge>
                        </div>
                        <BookCard book={book} />
                      </div>
                    ))}
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