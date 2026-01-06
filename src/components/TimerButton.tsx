import { useState } from "react";
import { Timer, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TimerButtonProps {
  selectedTime: number | null;
  onTimeSelect: (minutes: number | null) => void;
  remainingTime: number | null;
}

const timerOptions = [
  { label: "15 dakika", value: 15 },
  { label: "30 dakika", value: 30 },
  { label: "45 dakika", value: 45 },
  { label: "1 saat", value: 60 },
  { label: "2 saat", value: 120 },
  { label: "Kapalı", value: null },
];

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const TimerButton = ({ selectedTime, onTimeSelect, remainingTime }: TimerButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "glass-card border-border/50 hover:bg-secondary/50 gap-1.5 px-3 py-1.5 h-auto text-xs",
            selectedTime && "ring-1 ring-primary/30"
          )}
        >
          <Timer className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs">
            {remainingTime !== null
              ? formatTime(remainingTime)
              : selectedTime
              ? `${selectedTime} dk`
              : "Zamanlayıcı"}
          </span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-card border-border/50 min-w-[140px]">
        {timerOptions.map((option) => (
          <DropdownMenuItem
            key={option.label}
            onClick={() => onTimeSelect(option.value)}
            className={cn(
              "cursor-pointer hover:bg-secondary/50 focus:bg-secondary/50",
              selectedTime === option.value && "text-primary"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimerButton;
