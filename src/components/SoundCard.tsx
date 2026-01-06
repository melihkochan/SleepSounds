import { useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SoundCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  isActive: boolean;
  onToggle: (id: string) => void;
  delay?: number;
}

const SoundCard = ({
  id,
  name,
  icon: Icon,
  color,
  isActive,
  onToggle,
  delay = 0,
}: SoundCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onToggle(id);
  };

  return (
    <div
      className={cn(
        "glass-card cursor-pointer transition-all duration-300 ease-out opacity-0 animate-slide-up",
        "hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/10",
        isActive && "sound-card-active ring-2",
        isClicked && "animate-bounce-click",
        "p-3 sm:p-4 lg:p-5"
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        ...(isActive && { "--tw-ring-color": color } as React.CSSProperties)
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <div
          className={cn(
            "rounded-3xl flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden",
            isActive ? "scale-105" : "scale-100",
            "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
          )}
          style={{
            backgroundColor: isActive 
              ? `${color}15` 
              : "hsl(var(--secondary)/0.5)",
            boxShadow: isActive 
              ? `0 8px 32px ${color}30, 0 0 0 1px ${color}20` 
              : "0 4px 16px hsl(var(--background)/0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          {/* Gradient overlay on active */}
          {isActive && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`
              }}
            />
          )}
          
          <Icon
            className={cn(
              "transition-all duration-300 relative z-10",
              isActive && "animate-icon-pulse",
              !isActive && isHovered && "scale-110",
              "w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            )}
            style={{ 
              color: isActive ? color : "hsl(var(--muted-foreground))",
              filter: isActive ? `drop-shadow(0 0 8px ${color}60)` : "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          />
        </div>

        <span
          className={cn(
            "font-semibold transition-all duration-300 text-center",
            isActive 
              ? "text-foreground" 
              : "text-muted-foreground",
            "text-xs sm:text-sm"
          )}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export default SoundCard;
