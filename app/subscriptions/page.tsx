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
  Bell, 
  Users, 
  BookOpen, 
  TrendingUp,
  Settings,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SubscriptionsPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const subscriptions = [
    {
      id: '1',
      name: 'Classic Literature',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subscribers: '156K',
      newBooks: 3,
      isNotificationOn: true
    },
    {
      id: '2',
      name: 'BookTube Editorial',
      avatar: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subscribers: '500K',
      newBooks: 1,
      isNotificationOn: true
    },
    {
      id: '3',
      name: 'Literary Voices',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subscribers: '89.4K',
      newBooks: 2,
      isNotificationOn: false
    },
    {
      id: '4',
      name: 'Academic Reads',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subscribers: '67.2K',
      newBooks: 0,
      isNotificationOn: true
    },
    {
      id: '5',
      name: 'Fantasy Realm',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subscribers: '203.5K',
      newBooks: 4,
      isNotificationOn: true
    }
  ];

  const latestBooks = trendingBooks.slice(0, 8);

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
                Subscriptions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with your favorite authors and channels
              </p>
            </div>

            {/* Subscription Tabs */}
            <Tabs defaultValue="latest" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="latest" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Latest
                </TabsTrigger>
                <TabsTrigger value="channels" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  All Channels ({subscriptions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-6">
                {/* Quick Access Channels */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Your Channels
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {subscriptions.slice(0, 6).map((channel) => (
                      <div key={channel.id} className="flex-shrink-0 text-center">
                        <div className="relative">
                          <Avatar className="h-16 w-16 mb-2">
                            <AvatarImage src={channel.avatar} />
                            <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          {channel.newBooks > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-6 w-6 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                              {channel.newBooks}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 max-w-[80px] truncate">
                          {channel.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Books */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Latest from Your Subscriptions
                    </h2>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {latestBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="channels" className="space-y-6">
                {/* Search */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search your subscriptions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* All Subscriptions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    All Subscriptions ({subscriptions.length})
                  </h2>

                  <div className="space-y-4">
                    {subscriptions.map((channel) => (
                      <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={channel.avatar} />
                              <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            {channel.newBooks > 0 && (
                              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                                {channel.newBooks}
                              </Badge>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {channel.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {channel.subscribers} subscribers
                              {channel.newBooks > 0 && (
                                <span className="ml-2 text-blue-600 dark:text-blue-400">
                                  • {channel.newBooks} new book{channel.newBooks > 1 ? 's' : ''}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={channel.isNotificationOn ? 'text-blue-600' : 'text-gray-400'}
                          >
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Subscribed
                          </Button>
                        </div>
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