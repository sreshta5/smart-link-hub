import { SavedLink } from '@/types/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryBadge } from './CategoryBadge';
import { StatusBadge } from './StatusBadge';
import { CountdownTimer } from './CountdownTimer';
import { ExternalLink, Check, Trash2, Edit, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface LinkCardProps {
  link: SavedLink;
  onMarkApplied: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (link: SavedLink) => void;
}

export function LinkCard({ link, onMarkApplied, onDelete, onEdit }: LinkCardProps) {
  const isExpired = link.status === 'expired' || link.deadline < new Date();
  const isApplied = link.status === 'applied';

  return (
    <Card className={`card-shadow transition-all duration-300 hover:-translate-y-0.5 ${isExpired ? 'opacity-60' : ''}`}>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate text-base">
                {link.title}
              </h3>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mt-1 transition-colors"
              >
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{new URL(link.url).hostname}</span>
              </a>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => onEdit(link)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(link.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={link.category} />
            <StatusBadge status={isExpired ? 'expired' : link.status} />
          </div>

          {/* Deadline & Countdown */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(link.deadline, 'MMM d, yyyy • h:mm a')}</span>
            </div>
            {!isExpired && <CountdownTimer deadline={link.deadline} />}
          </div>

          {/* Notes */}
          {link.notes && (
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-2.5 line-clamp-2">
              {link.notes}
            </p>
          )}

          {/* Actions */}
          {!isExpired && !isApplied && (
            <Button 
              variant="success" 
              size="sm" 
              className="w-full"
              onClick={() => onMarkApplied(link.id)}
            >
              <Check className="h-4 w-4" />
              Mark as Applied
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
