import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  deadline: Date;
  onExpired?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function CountdownTimer({ deadline, onExpired }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = deadline.getTime();
      const difference = target - now;

      if (difference <= 0) {
        onExpired?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        total: difference,
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline, onExpired]);

  const getUrgencyClass = () => {
    const hoursLeft = timeLeft.days * 24 + timeLeft.hours;
    if (hoursLeft <= 24) return 'countdown-urgent';
    if (hoursLeft <= 72) return 'countdown-warning';
    return 'countdown-normal';
  };

  if (timeLeft.total <= 0) {
    return (
      <div className="flex items-center gap-1.5 text-destructive text-sm font-medium">
        <Clock className="h-3.5 w-3.5" />
        <span>Expired</span>
      </div>
    );
  }

  const formatPart = (value: number, unit: string) => (
    <span className="tabular-nums">
      {value}{unit}
    </span>
  );

  return (
    <div className={`flex items-center gap-1.5 text-sm ${getUrgencyClass()}`}>
      <Clock className="h-3.5 w-3.5" />
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && formatPart(timeLeft.days, 'd')}
        {formatPart(timeLeft.hours, 'h')}
        {formatPart(timeLeft.minutes, 'm')}
        {timeLeft.days === 0 && formatPart(timeLeft.seconds, 's')}
      </div>
    </div>
  );
}
