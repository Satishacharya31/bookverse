'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { UploadModal } from '@/components/upload-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, BookOpen, Users, TrendingUp, FileText } from 'lucide-react';

export default function UploadPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const uploadStats = [
    {
      icon: BookOpen,
      title: 'Total Books',
      value: '47',
      description: 'Books uploaded',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Total Views',
      value: '1.2M',
      description: 'Across all books',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'This Month',
      value: '156K',
      description: 'Views this month',
      color: 'text-purple-600'
    },
    {
      icon: FileText,
      title: 'Drafts',
      value: '3',
      description: 'Unpublished drafts',
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
          <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Upload Center
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Share your books with the BookTube community
              </p>
            </div>

            {/* Upload Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {uploadStats.map((stat, index) => (
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
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upload Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Quick Upload
                  </CardTitle>
                  <CardDescription>
                    Upload a new book to your channel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Drag and drop your book file here, or click to browse
                    </p>
                    <Button 
                      onClick={() => setIsUploadModalOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Choose File
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Supported formats: PDF, EPUB, TXT, DOCX (Max 50MB)
                  </p>
                </CardContent>
              </Card>

              {/* Upload Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                  <CardDescription>
                    Follow these guidelines for the best experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Quality Content</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Ensure your book is well-formatted and readable
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Accurate Metadata</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Provide correct title, author, and description
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Copyright Compliance</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Only upload content you have rights to share
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Appropriate Categories</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Choose the most relevant category and tags
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Uploads */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
                <CardDescription>
                  Your recently uploaded books
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Sample Book Title {item}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Uploaded 2 days ago • 1.2K views
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs rounded-full">
                          Published
                        </span>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  );
}