'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Download,
  Trash2,
  Moon,
  Sun,
  Globe,
  Lock,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function SettingsPage() {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    newBooks: true,
    comments: true,
    likes: false,
    subscriptions: true,
    recommendations: true
  });

  const toggleDesktopSidebar = () => setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Data
                </TabsTrigger>
              </TabsList>

              {/* Account Settings */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile details and channel information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button>Change Photo</Button>
                        <p className="text-sm text-gray-500 mt-1">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself..."
                        defaultValue="Welcome to my channel! I'm passionate about sharing amazing books and literary discussions."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Connected Accounts
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Books from Subscriptions</Label>
                        <p className="text-sm text-gray-500">Get notified when channels you subscribe to upload new books</p>
                      </div>
                      <Switch 
                        checked={notifications.newBooks}
                        onCheckedChange={(checked) => setNotifications({...notifications, newBooks: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Comments on Your Books</Label>
                        <p className="text-sm text-gray-500">Get notified when someone comments on your books</p>
                      </div>
                      <Switch 
                        checked={notifications.comments}
                        onCheckedChange={(checked) => setNotifications({...notifications, comments: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Likes and Reactions</Label>
                        <p className="text-sm text-gray-500">Get notified when someone likes your books or comments</p>
                      </div>
                      <Switch 
                        checked={notifications.likes}
                        onCheckedChange={(checked) => setNotifications({...notifications, likes: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Subscribers</Label>
                        <p className="text-sm text-gray-500">Get notified when someone subscribes to your channel</p>
                      </div>
                      <Switch 
                        checked={notifications.subscriptions}
                        onCheckedChange={(checked) => setNotifications({...notifications, subscriptions: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Recommendations</Label>
                        <p className="text-sm text-gray-500">Get personalized book recommendations</p>
                      </div>
                      <Switch 
                        checked={notifications.recommendations}
                        onCheckedChange={(checked) => setNotifications({...notifications, recommendations: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy */}
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control who can see your activity and content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Channel Visibility</Label>
                      <Select defaultValue="public">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="unlisted">Unlisted</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Reading History</Label>
                        <p className="text-sm text-gray-500">Allow others to see what books you've read</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Liked Books</Label>
                        <p className="text-sm text-gray-500">Allow others to see books you've liked</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Subscriptions</Label>
                        <p className="text-sm text-gray-500">Allow others to see channels you subscribe to</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance */}
              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize how BookTube looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Autoplay</Label>
                        <p className="text-sm text-gray-500">Automatically start reading the next book</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Reduced Motion</Label>
                        <p className="text-sm text-gray-500">Reduce animations and transitions</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data */}
              <TabsContent value="data" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>
                      Download or delete your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Your Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Reading History
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Search History
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Help & Support</CardTitle>
                    <CardDescription>
                      Get help or contact support
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help Center
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Community Guidelines
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
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