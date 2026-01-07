import { useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Check } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

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
        "active:scale-95",
        isActive && "sound-card-active ring-2",
        isClicked && "animate-bounce-click",
        "p-2.5 sm:p-3 md:p-4 lg:p-5"
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
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3">
        <div
          className={cn(
            "rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden",
            isActive ? "scale-110" : "scale-100",
            "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
          )}
          style={{
            backgroundColor: isActive 
              ? `${color}20` 
              : "hsl(var(--secondary)/0.5)",
            boxShadow: isActive 
              ? `0 8px 32px ${color}40, 0 0 0 2px ${color}30, inset 0 0 20px ${color}15` 
              : "0 4px 16px hsl(var(--background)/0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          {/* Gradient overlay on active */}
          {isActive && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`
              }}
            />
          )}
          
          {/* Active indicator badge */}
          {isActive && (
            <div 
              className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center z-20 animate-icon-pulse"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 12px ${color}80`
              }}
            >
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
            </div>
          )}
          
          {Icon ? (
            <Icon
              className={cn(
                "transition-all duration-300 relative z-10",
                isActive && "scale-110",
                !isActive && isHovered && "scale-105",
                "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10",
                "flex-shrink-0"
              )}
              style={{ 
                color: isActive ? color : "hsl(var(--muted-foreground))",
                filter: isActive ? `drop-shadow(0 0 12px ${color}70)` : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "block",
                opacity: 1,
                visibility: "visible"
              }}
              strokeWidth={2}
              aria-hidden="true"
            />
          ) : (
            <div 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
              style={{ backgroundColor: isActive ? color : "hsl(var(--muted-foreground))" }}
            />
          )}
        </div>

        <span
          className={cn(
            "font-semibold transition-all duration-300 text-center",
            isActive 
              ? "text-foreground" 
              : "text-muted-foreground",
            "text-[11px] sm:text-xs md:text-sm"
          )}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export default SoundCard;
