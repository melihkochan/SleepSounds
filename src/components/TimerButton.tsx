import { useState } from "react";
import { Timer, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";

interface TimerButtonProps {
  selectedTime: number | null;
  onTimeSelect: (minutes: number | null) => void;
  remainingTime: number | null;
}

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
  const { t } = useI18n();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState<string>("");

  const timerOptions = [
    { label: t("timer.options.15min"), value: 15 },
    { label: t("timer.options.30min"), value: 30 },
    { label: t("timer.options.45min"), value: 45 },
    { label: t("timer.options.1hour"), value: 60 },
    { label: t("timer.options.2hours"), value: 120 },
    { label: t("timer.off"), value: null },
  ];

  const handleCustomTime = () => {
    const minutes = parseInt(customMinutes);
    if (minutes > 0 && minutes <= 1440) { // Max 24 hours
      onTimeSelect(minutes);
      setIsCustomDialogOpen(false);
      setCustomMinutes("");
    }
  };

  return (
    <>
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
                ? `${selectedTime} ${t("timer.label").toLowerCase()}`
                : t("timer.label")}
            </span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-card border-border/50 min-w-[160px]">
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
          <DropdownMenuSeparator className="bg-border/50" />
          <DropdownMenuItem
            onClick={() => setIsCustomDialogOpen(true)}
            className="cursor-pointer hover:bg-secondary/50 focus:bg-secondary/50"
          >
            {t("timer.custom")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
        <DialogContent className="glass-card border-border/50">
          <DialogHeader>
            <DialogTitle>{t("timer.customTitle")}</DialogTitle>
            <DialogDescription>
              {t("timer.customDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="number"
              placeholder={t("timer.customPlaceholder")}
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              min="1"
              max="1440"
              className="glass-card [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
            {customMinutes && (
              <p className="text-xs text-muted-foreground mt-2">
                {parseInt(customMinutes) > 0
                  ? `${formatTime(parseInt(customMinutes) * 60)} ${t("timer.customDuration")}`
                  : t("timer.invalidDuration")}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCustomDialogOpen(false);
                setCustomMinutes("");
              }}
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleCustomTime}
              disabled={!customMinutes || parseInt(customMinutes) <= 0 || parseInt(customMinutes) > 1440}
            >
              {t("common.set")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimerButton;
