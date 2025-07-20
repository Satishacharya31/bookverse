'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  PlaySquare, 
  Heart, 
  Clock, 
  BookOpen, 
  Library,
  TrendingUp,
  Users,
  Grid3X3,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mainLinks = [
  { icon: Home, text: 'Home', href: '/' },
  { icon: PlaySquare, text: 'Shorts', href: '/shorts' },
  { icon: Users, text: 'Subscriptions', href: '/subscriptions' },
];

const prioritizedLinks = [
  { icon: Home, text: 'Home', href: '/' },
  { icon: PlaySquare, text: 'Shorts', href: '/shorts' },
  { icon: Library, text: 'Library', href: '/library' },
];

const secondaryLinks = [
  { icon: Library, text: 'Library', href: '/library' },
  { icon: Clock, text: 'History', href: '/history' },
  { icon: BookOpen, text: 'Your books', href: '/your-books' },
  { icon: Heart, text: 'Liked books', href: '/liked-books' },
];

const subscriptionLinks = [
  {
    img: 'https://source.unsplash.com/random/200x200?sig=1',
    name: 'Author One',
    href: '/author/one',
  },
  {
    img: 'https://source.unsplash.com/random/200x200?sig=2',
    name: 'Author Two',
    href: '/author/two',
  },
];

interface SidebarProps {
  isDesktopOpen: boolean;
  isMobileOpen: boolean;
  onDesktopToggle: () => void;
  onMobileToggle: () => void;
  isReadingPage?: boolean;
}

export function Sidebar({ 
  isDesktopOpen, 
  isMobileOpen, 
  onDesktopToggle, 
  onMobileToggle,
  isReadingPage = false
}: SidebarProps) {
  const pathname = usePathname();

  const NavItem = ({
    href,
    text,
    icon: Icon,
  }: {
    href: string;
    text: string;
    icon: React.ElementType;
  }) => {
    const isSmall = !isDesktopOpen;
    if (isSmall && !isMobileOpen) {
      return (
        <Link
          href={href}
          className={cn(
            'flex flex-col items-center justify-center py-3 rounded-lg text-xs font-medium transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            pathname === href
              ? 'bg-gray-100 dark:bg-gray-800'
              : 'text-gray-600 dark:text-gray-400'
          )}
        >
          <Icon className="h-6 w-6" />
          <span className="mt-1 text-center">{text}</span>
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          'flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          pathname === href
            ? 'bg-gray-100 dark:bg-gray-800'
            : 'text-gray-600 dark:text-gray-400'
        )}
      >
        <Icon className="h-6 w-6" />
        <span className={cn((isDesktopOpen || isMobileOpen) ? 'opacity-100' : 'opacity-0', 'transition-opacity')}>
          {text}
        </span>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="p-2">
      {isDesktopOpen || isMobileOpen ? (
        <>
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
          </div>
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
          <div className="space-y-1">
            {secondaryLinks.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
          </div>
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
          <h3
            className={cn(
              'px-3 text-sm font-semibold text-gray-600 dark:text-gray-400 transition-opacity',
              (isDesktopOpen || isMobileOpen) ? 'opacity-100' : 'opacity-0'
            )}
          >
            Subscriptions
          </h3>
          <div className="space-y-1 mt-2">
            {subscriptionLinks.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <img src={sub.img} alt={sub.name} className="h-6 w-6 rounded-full" />
                <span
                  className={cn(
                    'transition-opacity',
                    (isDesktopOpen || isMobileOpen) ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {sub.name}
                </span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-1">
          {prioritizedLinks.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
        </div>
      )}
    </div>
  );

  const isHidden = isReadingPage && !isDesktopOpen;

  return (
    <>
      {/* Overlay */}
      {(isMobileOpen || (isDesktopOpen && isReadingPage)) && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={isMobileOpen ? onMobileToggle : onDesktopToggle}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 ease-in-out',
          'lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          'w-64 pt-16 overflow-y-auto'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300 ease-in-out',
          'pt-16 overflow-y-auto',
          isReadingPage 
            ? (isDesktopOpen ? 'w-56' : 'w-0 border-none')
            : (isDesktopOpen ? 'w-56' : 'w-20')
        )}
      >
        {!isHidden && sidebarContent}
      </aside>
    </>
  );
}
