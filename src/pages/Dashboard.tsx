import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { FilterBar } from '@/components/FilterBar';
import { LinkCard } from '@/components/LinkCard';
import { AddLinkDialog } from '@/components/AddLinkDialog';
import { EmptyState } from '@/components/EmptyState';
import { useLinks } from '@/hooks/useLinks';
import { useNotifications } from '@/hooks/useNotifications';
import { LinkCategory, LinkStatus, SavedLink } from '@/types/link';
import { toast } from '@/hooks/use-toast';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const { links, addLink, updateStatus, deleteLink, getFilteredLinks } = useLinks();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [categoryFilter, setCategoryFilter] = useState<LinkCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<LinkStatus | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SavedLink | null>(null);

  const filteredLinks = getFilteredLinks(categoryFilter, statusFilter);
  const hasFilters = categoryFilter !== 'all' || statusFilter !== 'all';

  const handleMarkApplied = (id: string) => {
    updateStatus(id, 'applied');
    toast({
      title: "Status updated",
      description: "Link marked as applied.",
    });
  };

  const handleDelete = (id: string) => {
    deleteLink(id);
    toast({
      title: "Link deleted",
      description: "The link has been removed.",
    });
  };

  const handleEdit = (link: SavedLink) => {
    setEditingLink(link);
    setIsAddDialogOpen(true);
  };

  const handleAddLink = (linkData: Omit<SavedLink, 'id' | 'createdAt' | 'updatedAt'>) => {
    addLink(linkData);
    setEditingLink(null);
  };

  // Sort links: urgent first, then by deadline
  const sortedLinks = [...filteredLinks].sort((a, b) => {
    if (a.status === 'expired' && b.status !== 'expired') return 1;
    if (a.status !== 'expired' && b.status === 'expired') return -1;
    return a.deadline.getTime() - b.deadline.getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onLogout={onLogout}
      />

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Links
          </h1>
          <p className="text-muted-foreground">
            Manage your academic and career links in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Links', value: links.length, color: 'bg-primary/10 text-primary' },
            { label: 'Pending', value: links.filter(l => l.status === 'not_applied').length, color: 'bg-warning/10 text-warning' },
            { label: 'Applied', value: links.filter(l => l.status === 'applied').length, color: 'bg-success/10 text-success' },
            { label: 'Expired', value: links.filter(l => l.status === 'expired' || l.deadline < new Date()).length, color: 'bg-destructive/10 text-destructive' },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-card rounded-xl p-4 card-shadow animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color.split(' ')[1]}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <FilterBar 
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
          onAddClick={() => setIsAddDialogOpen(true)}
          linkCount={filteredLinks.length}
        />

        {/* Links Grid */}
        {sortedLinks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedLinks.map((link, index) => (
              <div 
                key={link.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LinkCard 
                  link={link}
                  onMarkApplied={handleMarkApplied}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            onAddClick={() => setIsAddDialogOpen(true)}
            hasFilters={hasFilters}
          />
        )}
      </main>

      {/* Add/Edit Link Dialog */}
      <AddLinkDialog 
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) setEditingLink(null);
        }}
        onAddLink={handleAddLink}
        editLink={editingLink}
      />
    </div>
  );
}
