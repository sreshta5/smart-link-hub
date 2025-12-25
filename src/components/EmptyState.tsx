import { Button } from '@/components/ui/button';
import { Link, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
  hasFilters: boolean;
}

export function EmptyState({ onAddClick, hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Link className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {hasFilters ? 'No matching links' : 'No links yet'}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {hasFilters 
          ? 'Try adjusting your filters or add a new link.'
          : 'Start organizing your academic links by adding your first one.'
        }
      </p>
      <Button onClick={onAddClick} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Your First Link
      </Button>
    </div>
  );
}
