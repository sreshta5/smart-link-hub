import { useState, useCallback } from 'react';
import { SavedLink, LinkCategory, LinkStatus } from '@/types/link';
import { mockLinks } from '@/lib/mockData';

export function useLinks() {
  const [links, setLinks] = useState<SavedLink[]>(mockLinks);

  const addLink = useCallback((link: Omit<SavedLink, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLink: SavedLink = {
      ...link,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLinks(prev => [newLink, ...prev]);
    return newLink;
  }, []);

  const updateLink = useCallback((id: string, updates: Partial<SavedLink>) => {
    setLinks(prev => prev.map(link => 
      link.id === id 
        ? { ...link, ...updates, updatedAt: new Date() }
        : link
    ));
  }, []);

  const deleteLink = useCallback((id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  }, []);

  const updateStatus = useCallback((id: string, status: LinkStatus) => {
    updateLink(id, { status });
  }, [updateLink]);

  const getFilteredLinks = useCallback((
    categoryFilter: LinkCategory | 'all',
    statusFilter: LinkStatus | 'all'
  ) => {
    return links.filter(link => {
      const categoryMatch = categoryFilter === 'all' || link.category === categoryFilter;
      const statusMatch = statusFilter === 'all' || link.status === statusFilter;
      return categoryMatch && statusMatch;
    });
  }, [links]);

  const getUpcomingDeadlines = useCallback(() => {
    const now = new Date();
    return links
      .filter(link => link.status !== 'expired' && link.deadline > now)
      .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
      .slice(0, 5);
  }, [links]);

  return {
    links,
    addLink,
    updateLink,
    deleteLink,
    updateStatus,
    getFilteredLinks,
    getUpcomingDeadlines,
  };
}
