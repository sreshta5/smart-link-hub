import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationDropdown } from './NotificationDropdown';
import { Notification } from '@/types/link';

interface NavbarProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onLogout: () => void;
}

export function Navbar({ 
  notifications, 
  unreadCount, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onLogout 
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <Link className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">
            Smart<span className="gradient-text">Link</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <NotificationDropdown 
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={onMarkAsRead}
            onMarkAllAsRead={onMarkAllAsRead}
          />
          <Button variant="ghost" size="sm" onClick={onLogout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
