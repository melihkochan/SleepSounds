import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  disabled?: boolean;
  size?: "default" | "large";
}

const PlayButton = ({ isPlaying, onToggle, disabled, size = "default" }: PlayButtonProps) => {
  const isLarge = size === "large";
  
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "relative rounded-full flex items-center justify-center transition-all duration-300",
        "bg-gradient-to-br from-primary to-accent",
        "hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        isPlaying && "shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
        isLarge ? "w-20 h-20" : "w-14 h-14"
      )}
    >
      {/* Glow ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-0 blur-xl transition-opacity duration-500",
          isPlaying && "opacity-50 pulse-slow"
        )}
      />
      
      {/* Icon */}
      <div className="relative z-10">
        {isPlaying ? (
          <Pause className={cn("text-primary-foreground", isLarge ? "w-8 h-8" : "w-6 h-6")} fill="currentColor" />
        ) : (
          <Play className={cn("text-primary-foreground", isLarge ? "w-8 h-8 ml-1" : "w-6 h-6 ml-0.5")} fill="currentColor" />
        )}
      </div>
    </button>
  );
};

export default PlayButton;
