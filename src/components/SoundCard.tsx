import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SoundCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  volume: number;
  isActive: boolean;
  onToggle: (id: string) => void;
  onVolumeChange: (id: string, volume: number) => void;
  delay?: number;
}

const SoundCard = ({
  id,
  name,
  icon: Icon,
  color,
  volume,
  isActive,
  onToggle,
  onVolumeChange,
  delay = 0,
}: SoundCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "glass-card p-4 cursor-pointer transition-all duration-300 opacity-0 animate-slide-up glow-effect",
        isActive && "sound-card-active",
        isHovered && "scale-[1.02]"
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards"
      }}
      onClick={() => onToggle(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
            isActive ? "scale-110" : "scale-100"
          )}
          style={{
            backgroundColor: isActive ? `${color}20` : "hsl(var(--secondary))",
            boxShadow: isActive ? `0 0 30px ${color}40` : "none",
          }}
        >
          <Icon
            className={cn(
              "w-8 h-8 transition-all duration-300",
              isActive && "floating-animation"
            )}
            style={{ color: isActive ? color : "hsl(var(--muted-foreground))" }}
          />
        </div>

        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isActive ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {name}
        </span>

        {isActive && (
          <div 
            className="w-full mt-2 opacity-0 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Slider
              variant="sound"
              soundColor={color}
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(values) => onVolumeChange(id, values[0])}
              className="w-full"
            />
            <span className="text-xs text-muted-foreground mt-1 block text-center">
              {volume}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoundCard;
