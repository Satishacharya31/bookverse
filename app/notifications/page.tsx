'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Users,
  TrendingUp,
  Settings,
  Check,
  X
} from 'lucide-react';

export default function NotificationsPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const notifications = [
    {
      id: '1',
      type: 'new_book',
      title: 'New book from Classic Literature',
      message: 'The Secret Garden - A timeless classic has been uploaded',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      time: '2 hours ago',
      isRead: false,
      icon: BookOpen
    },
    {
      id: '2',
      type: 'like',
      title: 'Someone liked your book',
      message: 'John Doe liked "Top 10 Ebooks of 2023"',
      avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      time: '4 hours ago',
      isRead: false,
      icon: Heart
    },
    {
      id: '3',
      type: 'comment',
      title: 'New comment on your book',
      message: 'Sarah commented: "This review was so insightful!"',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      time: '6 hours ago',
      isRead: true,
      icon: MessageCircle
    },
    {
      id: '4',
      type: 'subscriber',
      title: 'New subscriber',
      message: 'BookLover123 subscribed to your channel',
      avatar: 'https://images.pexels.com/photos/1043475/pexels-photo-1043475.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      time: '1 day ago',
      isRead: true,
      icon: Users
    },
    {
      id: '5',
      type: 'trending',
      title: 'Your book is trending',
      message: '"Author Interviews: Modern Writers" is trending in Literature',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      time: '2 days ago',
      isRead: true,
      icon: TrendingUp
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new_book':
        return 'text-blue-600';
      case 'like':
        return 'text-red-600';
      case 'comment':
        return 'text-green-600';
      case 'subscriber':
        return 'text-purple-600';
      case 'trending':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
          <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Bell className="h-8 w-8" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Stay updated with your channel activity
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  All
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-6 ${
                        index !== notifications.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                      } ${
                        !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                      } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>
                            <notification.icon className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center`}>
                          <notification.icon className={`h-3 w-3 ${getNotificationColor(notification.type)}`} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  {notifications.filter(n => !n.isRead).map((notification, index, filteredArray) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-6 ${
                        index !== filteredArray.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                      } bg-blue-50 dark:bg-blue-900/10 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>
                            <notification.icon className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center`}>
                          <notification.icon className={`h-3 w-3 ${getNotificationColor(notification.type)}`} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="books" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  {notifications.filter(n => n.type === 'new_book' || n.type === 'trending').map((notification, index, filteredArray) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-6 ${
                        index !== filteredArray.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                      } ${
                        !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                      } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>
                            <notification.icon className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center`}>
                          <notification.icon className={`h-3 w-3 ${getNotificationColor(notification.type)}`} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  {notifications.filter(n => n.type === 'like' || n.type === 'comment' || n.type === 'subscriber').map((notification, index, filteredArray) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-6 ${
                        index !== filteredArray.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                      } ${
                        !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                      } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>
                            <notification.icon className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center`}>
                          <notification.icon className={`h-3 w-3 ${getNotificationColor(notification.type)}`} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Empty State */}
            {notifications.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm text-center">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No notifications yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  When you get notifications, they'll show up here
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}