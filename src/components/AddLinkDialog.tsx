import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LinkCategory, SavedLink } from '@/types/link';
import { CalendarIcon, Link, MessageSquare, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (link: Omit<SavedLink, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editLink?: SavedLink | null;
}

type AddMode = 'select' | 'manual' | 'whatsapp';

const categories: { value: LinkCategory; label: string }[] = [
  { value: 'exams', label: 'Exams' },
  { value: 'internships', label: 'Internships' },
  { value: 'scholarships', label: 'Scholarships' },
  { value: 'events', label: 'Events' },
  { value: 'applications', label: 'Applications' },
];

export function AddLinkDialog({ open, onOpenChange, onAddLink, editLink }: AddLinkDialogProps) {
  const [mode, setMode] = useState<AddMode>(editLink ? 'manual' : 'select');
  const [title, setTitle] = useState(editLink?.title || '');
  const [url, setUrl] = useState(editLink?.url || '');
  const [category, setCategory] = useState<LinkCategory>(editLink?.category || 'exams');
  const [deadline, setDeadline] = useState<Date | undefined>(editLink?.deadline);
  const [deadlineTime, setDeadlineTime] = useState(editLink ? format(editLink.deadline, 'HH:mm') : '23:59');
  const [reminderDays, setReminderDays] = useState('1');
  const [notes, setNotes] = useState(editLink?.notes || '');
  const [whatsappText, setWhatsappText] = useState('');

  const extractLinkFromWhatsApp = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    if (matches && matches.length > 0) {
      setUrl(matches[0]);
      // Try to extract a title from the text before the URL
      const beforeUrl = text.split(matches[0])[0].trim();
      if (beforeUrl) {
        setTitle(beforeUrl.slice(0, 100));
      }
      setMode('manual');
      toast({
        title: "Link extracted!",
        description: "We've extracted the link from your WhatsApp message. Please review and complete the details.",
      });
    } else {
      toast({
        title: "No link found",
        description: "We couldn't find a valid URL in your message. Please check and try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = () => {
    if (!title || !url || !deadline) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
      return;
    }

    // Combine date and time
    const [hours, minutes] = deadlineTime.split(':').map(Number);
    const fullDeadline = new Date(deadline);
    fullDeadline.setHours(hours, minutes, 0, 0);

    // Calculate reminder time
    const reminderTime = new Date(fullDeadline);
    reminderTime.setDate(reminderTime.getDate() - parseInt(reminderDays));

    onAddLink({
      title,
      url,
      category,
      deadline: fullDeadline,
      reminderTime,
      notes: notes || undefined,
      status: 'not_applied',
    });

    // Reset form
    setMode('select');
    setTitle('');
    setUrl('');
    setCategory('exams');
    setDeadline(undefined);
    setDeadlineTime('23:59');
    setReminderDays('1');
    setNotes('');
    setWhatsappText('');
    onOpenChange(false);

    toast({
      title: editLink ? "Link updated!" : "Link added!",
      description: `"${title}" has been ${editLink ? 'updated' : 'added'} to your links.`,
    });
  };

  const handleClose = () => {
    setMode('select');
    setTitle('');
    setUrl('');
    setCategory('exams');
    setDeadline(undefined);
    setDeadlineTime('23:59');
    setReminderDays('1');
    setNotes('');
    setWhatsappText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editLink ? 'Edit Link' : 'Add New Link'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'select' 
              ? 'Choose how you want to add your link'
              : mode === 'whatsapp'
              ? 'Paste a WhatsApp message containing a link'
              : 'Fill in the details for your link'
            }
          </DialogDescription>
        </DialogHeader>

        {mode === 'select' && (
          <div className="grid gap-3 py-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start gap-3"
              onClick={() => setMode('manual')}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Link className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Add Manually</div>
                <div className="text-sm text-muted-foreground">Enter link details yourself</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start gap-3"
              onClick={() => setMode('whatsapp')}
            >
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-success" />
              </div>
              <div className="text-left">
                <div className="font-medium">Import from WhatsApp</div>
                <div className="text-sm text-muted-foreground">Paste a message to extract the link</div>
              </div>
            </Button>
          </div>
        )}

        {mode === 'whatsapp' && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Paste WhatsApp Message</Label>
              <Textarea 
                placeholder="Paste your WhatsApp message here... We'll extract the link automatically."
                value={whatsappText}
                onChange={(e) => setWhatsappText(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Your privacy is respected. This content is only processed locally.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setMode('select')} className="flex-1">
                Back
              </Button>
              <Button onClick={() => extractLinkFromWhatsApp(whatsappText)} className="flex-1">
                Extract Link
              </Button>
            </div>
          </div>
        )}

        {mode === 'manual' && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title"
                placeholder="e.g., Final Exam Registration"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <Input 
                id="url"
                type="url"
                placeholder="https://example.com/link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as LinkCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Deadline Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "MMM d, yyyy") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover" align="start">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Deadline Time</Label>
                <Input 
                  id="time"
                  type="time"
                  value={deadlineTime}
                  onChange={(e) => setDeadlineTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Remind me before</Label>
              <Select value={reminderDays} onValueChange={setReminderDays}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="1">1 day before</SelectItem>
                  <SelectItem value="2">2 days before</SelectItem>
                  <SelectItem value="3">3 days before</SelectItem>
                  <SelectItem value="7">1 week before</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea 
                id="notes"
                placeholder="Add any additional context..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => editLink ? handleClose() : setMode('select')} className="flex-1">
                {editLink ? 'Cancel' : 'Back'}
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                <Plus className="h-4 w-4" />
                {editLink ? 'Save Changes' : 'Add Link'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
