import { Moon, Volume2, Pause, Play } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PlayButton from "./PlayButton";

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
}: SleepModeProps) => {
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

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary/50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Content */}
        <div className="text-center max-w-2xl mx-auto space-y-8">
          {/* Moon Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Moon className="w-24 h-24 text-primary floating-animation" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-slow">
              Rahatlayın ve Uyuyun
            </h2>
            <p className="text-lg text-muted-foreground">
              Sesler çalıyor, gözlerinizi kapatın ve uykuya dalın... 🌙
            </p>
          </div>

          {/* Active Sounds */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Şu anda çalan sesler</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {activeSounds.map(({ sound }) => {
                const Icon = sound.icon;
                return (
                  <div
                    key={sound.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{ backgroundColor: `${sound.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: sound.color }} />
                    <span className="text-sm font-medium text-foreground">{sound.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Display */}
          <div className="flex items-center justify-center gap-8">
            {remainingTime !== null && (
              <div className="glass-card px-6 py-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Kalan Süre</div>
                <div className="text-3xl font-bold text-primary tabular-nums">
                  {formatTime(remainingTime)}
                </div>
              </div>
            )}
            <div className="glass-card px-6 py-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Geçen Süre</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
          <div className="glass-card px-8 py-5 flex flex-col items-center gap-4">
            <PlayButton
              isPlaying={isPlaying}
              onToggle={onPlayToggle}
              disabled={false}
              size="large"
            />
            <div className="text-sm text-muted-foreground text-center">
              {isPlaying ? "Durdurmak için tıklayın" : "Devam etmek için tıklayın"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepMode;

