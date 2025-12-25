import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LinkCategory, LinkStatus } from '@/types/link';
import { Filter, Plus } from 'lucide-react';

interface FilterBarProps {
  categoryFilter: LinkCategory | 'all';
  statusFilter: LinkStatus | 'all';
  onCategoryChange: (category: LinkCategory | 'all') => void;
  onStatusChange: (status: LinkStatus | 'all') => void;
  onAddClick: () => void;
  linkCount: number;
}

export function FilterBar({
  categoryFilter,
  statusFilter,
  onCategoryChange,
  onStatusChange,
  onAddClick,
  linkCount,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={categoryFilter} onValueChange={(v) => onCategoryChange(v as LinkCategory | 'all')}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="exams">Exams</SelectItem>
            <SelectItem value="internships">Internships</SelectItem>
            <SelectItem value="scholarships">Scholarships</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="applications">Applications</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as LinkStatus | 'all')}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="not_applied">Not Applied</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground ml-2">
          {linkCount} link{linkCount !== 1 ? 's' : ''}
        </span>
      </div>
      <Button onClick={onAddClick} className="gap-2">
        <Plus className="h-4 w-4" />
        Add New Link
      </Button>
    </div>
  );
}
