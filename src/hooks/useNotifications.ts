import { useState, useCallback } from 'react';
import { Notification } from '@/types/link';
import { mockNotifications } from '@/lib/mockData';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
  };
}
