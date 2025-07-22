'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  ThumbsUp,
  BookOpen,
  Clock,
  Download,
  Share
} from 'lucide-react';

export default function AnalyticsPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const viewsData = [
    { name: 'Mon', views: 1200 },
    { name: 'Tue', views: 1900 },
    { name: 'Wed', views: 800 },
    { name: 'Thu', views: 2400 },
    { name: 'Fri', views: 1800 },
    { name: 'Sat', views: 2200 },
    { name: 'Sun', views: 1600 }
  ];

  const subscribersData = [
    { name: 'Jan', subscribers: 400 },
    { name: 'Feb', subscribers: 600 },
    { name: 'Mar', subscribers: 800 },
    { name: 'Apr', subscribers: 1200 },
    { name: 'May', subscribers: 1600 },
    { name: 'Jun', subscribers: 2000 }
  ];

  const categoryData = [
    { name: 'Fiction', value: 35, color: '#8884d8' },
    { name: 'Non-Fiction', value: 25, color: '#82ca9d' },
    { name: 'Mystery', value: 20, color: '#ffc658' },
    { name: 'Romance', value: 15, color: '#ff7c7c' },
    { name: 'Other', value: 5, color: '#8dd1e1' }
  ];

  const stats = [
    {
      title: 'Total Views',
      value: '1.2M',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      title: 'Subscribers',
      value: '12.5K',
      change: '+8.2%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Total Likes',
      value: '45.2K',
      change: '+15.3%',
      icon: ThumbsUp,
      color: 'text-purple-600'
    },
    {
      title: 'Books Uploaded',
      value: '47',
      change: '+3',
      icon: BookOpen,
      color: 'text-orange-600'
    }
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Channel Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your channel's performance and growth
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Views Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Views Over Time</CardTitle>
                    <CardDescription>
                      Daily views for the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={viewsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Subscribers Growth */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subscriber Growth</CardTitle>
                    <CardDescription>
                      Monthly subscriber growth over the past 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={subscribersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="subscribers" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                {/* Top Performing Books */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Books</CardTitle>
                    <CardDescription>
                      Your most popular books this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((rank) => (
                        <div key={rank} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                              {rank}
                            </div>
                            <div className="w-16 h-20 bg-gray-200 rounded"></div>
                            <div>
                              <h4 className="font-medium">Sample Book Title {rank}</h4>
                              <p className="text-sm text-gray-500">Published 2 weeks ago</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{(15000 - rank * 2000).toLocaleString()} views</p>
                            <p className="text-sm text-gray-500">{(500 - rank * 50)} likes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Content Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content by Category</CardTitle>
                    <CardDescription>
                      Distribution of your content across categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Demographics</CardTitle>
                    <CardDescription>
                      Learn more about your audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Top Countries</h4>
                        <div className="space-y-3">
                          {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'].map((country, index) => (
                            <div key={country} className="flex items-center justify-between">
                              <span>{country}</span>
                              <span className="text-sm text-gray-500">{(35 - index * 5)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Age Groups</h4>
                        <div className="space-y-3">
                          {['18-24', '25-34', '35-44', '45-54', '55+'].map((age, index) => (
                            <div key={age} className="flex items-center justify-between">
                              <span>{age}</span>
                              <span className="text-sm text-gray-500">{(30 - index * 3)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="revenue" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      Your earnings and monetization metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold text-green-600">$1,234</h3>
                        <p className="text-sm text-gray-500">This Month</p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-600">$12,456</h3>
                        <p className="text-sm text-gray-500">Total Earnings</p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold text-purple-600">$0.85</h3>
                        <p className="text-sm text-gray-500">RPM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}