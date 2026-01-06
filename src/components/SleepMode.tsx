import { Moon, Volume2, Pause, Play, X } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import PlayButton from "./PlayButton";
import { useI18n } from "@/contexts/I18nContext";

interface Sound {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface SleepModeProps {
  activeSounds: Array<{ sound: Sound; volume: number }>;
  remainingTime: number | null;
  elapsedTime: number;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onClose: () => void;
  onVolumeChange: (id: string, volume: number) => void;
  onRemoveSound: (id: string) => void;
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

const SleepMode = ({
  activeSounds,
  remainingTime,
  elapsedTime,
  isPlaying,
  onPlayToggle,
  onClose,
  onVolumeChange,
  onRemoveSound,
}: SleepModeProps) => {
  const { t } = useI18n();
  // Get primary sound for background (first active sound)
  const primarySound = activeSounds[0]?.sound;
  const primaryColor = primarySound?.color || "hsl(var(--primary))";

  // Background based on sound type
  const getBackgroundStyle = () => {
    if (!primarySound) return {};
    
    const soundId = primarySound.id;
    
    switch (soundId) {
      case "rain":
        return {
          background: `linear-gradient(180deg, hsl(200, 60%, 15%) 0%, hsl(200, 50%, 10%) 100%)`,
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(100, 150, 200, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(100, 150, 200, 0.1) 0%, transparent 50%)`,
        };
      case "fire":
        return {
          background: `linear-gradient(180deg, hsl(25, 50%, 12%) 0%, hsl(15, 40%, 8%) 100%)`,
          backgroundImage: `radial-gradient(ellipse at 50% 80%, rgba(255, 100, 50, 0.15) 0%, transparent 60%)`,
        };
      case "waves":
        return {
          background: `linear-gradient(180deg, hsl(210, 60%, 15%) 0%, hsl(200, 50%, 10%) 100%)`,
          backgroundImage: `radial-gradient(ellipse at 50% 90%, rgba(100, 150, 220, 0.1) 0%, transparent 50%)`,
        };
      case "night":
        return {
          background: `linear-gradient(180deg, hsl(280, 40%, 10%) 0%, hsl(260, 30%, 8%) 100%)`,
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(150, 100, 200, 0.1) 0%, transparent 40%),
                           radial-gradient(circle at 70% 30%, rgba(150, 100, 200, 0.1) 0%, transparent 40%)`,
        };
      case "forest":
        return {
          background: `linear-gradient(180deg, hsl(140, 40%, 12%) 0%, hsl(120, 30%, 8%) 100%)`,
          backgroundImage: `radial-gradient(ellipse at 50% 100%, rgba(50, 150, 100, 0.1) 0%, transparent 50%)`,
        };
      case "wind":
        return {
          background: `linear-gradient(180deg, hsl(180, 40%, 12%) 0%, hsl(180, 30%, 8%) 100%)`,
          backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(100, 150, 180, 0.08) 0%, transparent 60%)`,
        };
      case "birds":
        return {
          background: `linear-gradient(180deg, hsl(150, 50%, 14%) 0%, hsl(140, 40%, 10%) 100%)`,
          backgroundImage: `radial-gradient(circle at 20% 40%, rgba(100, 200, 150, 0.1) 0%, transparent 40%),
                           radial-gradient(circle at 80% 50%, rgba(100, 200, 150, 0.1) 0%, transparent 40%)`,
        };
      case "cafe":
        return {
          background: `linear-gradient(180deg, hsl(35, 40%, 12%) 0%, hsl(30, 30%, 8%) 100%)`,
          backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(200, 150, 100, 0.1) 0%, transparent 50%)`,
        };
      case "thunder":
        return {
          background: `linear-gradient(180deg, hsl(250, 40%, 10%) 0%, hsl(240, 30%, 6%) 100%)`,
          backgroundImage: `radial-gradient(ellipse at 50% 30%, rgba(150, 100, 250, 0.15) 0%, transparent 50%)`,
        };
      case "train":
        return {
          background: `linear-gradient(180deg, hsl(0, 20%, 12%) 0%, hsl(0, 15%, 8%) 100%)`,
          backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(150, 150, 150, 0.1) 0%, transparent 50%)`,
        };
      default:
        return {
          background: `linear-gradient(180deg, hsl(260, 40%, 12%) 0%, hsl(260, 30%, 8%) 100%)`,
        };
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 backdrop-blur-2xl animate-in fade-in duration-500"
      style={getBackgroundStyle()}
    >
      {/* Subtle star field - minimal */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col px-4 py-8">
        {/* Close button - top right only */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary/50 z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start text-center max-w-2xl mx-auto space-y-4 overflow-y-auto py-2 pt-4">
          {/* Moon Icon - Smaller */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Moon className="w-16 h-16 md:w-20 md:h-20 text-primary floating-animation" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5 mb-2">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-slow">
              {t("sleepMode.title")}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t("sleepMode.subtitle")}
            </p>
          </div>

          {/* Active Sounds with Volume Controls */}
          <div className="glass-card p-3 w-full mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-semibold text-foreground">{t("common.activeSounds")}</h3>
              <span className="ml-auto text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full">
                {activeSounds.length}
              </span>
            </div>
            <div className="space-y-1.5 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {activeSounds.map(({ sound, volume }) => {
                const Icon = sound.icon;
                return (
                  <div
                    key={sound.id}
                    className="flex items-center gap-1.5 p-1.5 rounded-lg transition-all"
                    style={{ 
                      backgroundColor: `${sound.color}15`,
                      border: `1px solid ${sound.color}20`
                    }}
                  >
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${sound.color}25` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: sound.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-semibold text-foreground truncate">{sound.name}</span>
                        <span className="text-xs font-bold text-muted-foreground tabular-nums ml-1">{volume}%</span>
                      </div>
                      <Slider
                        variant="sound"
                        soundColor={sound.color}
                        value={[volume]}
                        max={100}
                        step={1}
                        onValueChange={(values: number[]) => onVolumeChange(sound.id, values[0])}
                        className="w-full"
                      />
                    </div>
                    <button
                      onClick={() => onRemoveSound(sound.id)}
                      className="p-1 rounded-lg hover:bg-destructive/20 active:scale-95 transition-all flex-shrink-0"
                      title={t("common.removeSound")}
                    >
                      <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive transition-colors" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Controls - Modern Compact Design */}
        <div className="fixed bottom-3 left-0 right-0 flex justify-center px-4 z-30">
          <div className="glass-card px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4 w-full max-w-lg">
            {/* Timer - Left Side */}
            {remainingTime !== null ? (
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate">
                    {t("sleepMode.remainingTime")}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-primary tabular-nums">
                    {formatTime(remainingTime)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1" />
            )}
            
            {/* Play Button - Center */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <PlayButton
                isPlaying={isPlaying}
                onToggle={onPlayToggle}
                disabled={false}
                size="default"
              />
              <div className="text-[10px] text-muted-foreground text-center whitespace-nowrap">
                {isPlaying ? t("common.stop") : t("common.start")}
              </div>
            </div>
            
            {/* Status - Right Side */}
            <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
              <div className="text-right">
                <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground">
                  {isPlaying ? t("common.playing") : t("common.paused")}
                </div>
                <div className="text-xs sm:text-sm font-bold text-primary tabular-nums">
                  {formatTime(elapsedTime)}
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepMode;

