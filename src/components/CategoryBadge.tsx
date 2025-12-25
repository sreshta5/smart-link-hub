import { Badge } from '@/components/ui/badge';
import { LinkCategory } from '@/types/link';
import { BookOpen, Briefcase, Award, Calendar, FileText } from 'lucide-react';

interface CategoryBadgeProps {
  category: LinkCategory;
  showIcon?: boolean;
}

const categoryConfig: Record<LinkCategory, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  exams: { label: 'Exams', icon: BookOpen },
  internships: { label: 'Internships', icon: Briefcase },
  scholarships: { label: 'Scholarships', icon: Award },
  events: { label: 'Events', icon: Calendar },
  applications: { label: 'Applications', icon: FileText },
};

export function CategoryBadge({ category, showIcon = true }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <Badge variant={category} className="gap-1">
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
}

export function getCategoryLabel(category: LinkCategory): string {
  return categoryConfig[category].label;
}
