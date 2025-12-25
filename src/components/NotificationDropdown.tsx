import { Bell, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Notification } from '@/types/link';
import { formatDistanceToNow } from 'date-fns';

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationDropdown({ 
  notifications, 
  unreadCount, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium flex items-center justify-center animate-pulse-gentle">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-popover">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto py-1 px-2 text-xs text-primary"
              onClick={onMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id}
              className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${!notification.read ? 'bg-primary/5' : ''}`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex items-start justify-between w-full gap-2">
                <div className="flex items-center gap-2">
                  {!notification.read ? (
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : (
                    <Check className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification.title}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{notification.message}</p>
              <span className="text-xs text-muted-foreground pl-6">
                {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
