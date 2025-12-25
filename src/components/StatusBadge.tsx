import { Badge } from '@/components/ui/badge';
import { LinkStatus } from '@/types/link';
import { Check, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: LinkStatus;
}

const statusConfig: Record<LinkStatus, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  applied: { label: 'Applied', icon: Check },
  not_applied: { label: 'Not Applied', icon: Clock },
  expired: { label: 'Expired', icon: XCircle },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={status} className="gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

export function getStatusLabel(status: LinkStatus): string {
  return statusConfig[status].label;
}
