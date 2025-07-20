import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, ThumbsUp } from 'lucide-react';
import { Book } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
  size?: 'default' | 'small';
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="flex flex-col gap-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-1 right-1">
            <Badge variant="secondary" className="bg-black/80 text-white">
              {book.readingTime} 
            </Badge>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9 mt-1">
            <AvatarImage src={book.channelAvatar} />
            <AvatarFallback>{book.channel.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-white line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {book.channel}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{book.views} views</span>
              <span>•</span>
              <span>{formatDate(book.uploadDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Classic': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    'Ebooks': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'Interviews': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    'Literature': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'Fantasy': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    'Writing': 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}
