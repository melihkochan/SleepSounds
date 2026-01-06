import { Slider } from "@/components/ui/slider";
import { Volume2, X } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Sound {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface ActiveSoundsMixerProps {
  activeSounds: Array<{ sound: Sound; volume: number }>;
  onVolumeChange: (id: string, volume: number) => void;
  onRemove: (id: string) => void;
}

const ActiveSoundsMixer = ({ activeSounds, onVolumeChange, onRemove }: ActiveSoundsMixerProps) => {
  if (activeSounds.length === 0) {
    return (
      <div className="glass-card p-6 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center mb-4">
            <Volume2 className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Ses seçmek için yukarıdaki kartlara tıklayın
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-foreground">Ses Mikseri</h3>
          <p className="text-xs text-muted-foreground">Aktif sesler</p>
        </div>
        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          {activeSounds.length}
        </span>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
        {activeSounds.map(({ sound, volume }, index) => {
          const Icon = sound.icon;
          return (
            <div 
              key={sound.id} 
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-all duration-300 group"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: "slide-up 0.4s ease-out forwards"
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ 
                  backgroundColor: `${sound.color}15`,
                  boxShadow: `0 4px 12px ${sound.color}20`
                }}
              >
                <Icon className="w-6 h-6" style={{ color: sound.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {sound.name}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground ml-2 tabular-nums">
                    {volume}%
                  </span>
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
                onClick={() => onRemove(sound.id)}
                className="p-2 rounded-lg hover:bg-destructive/20 active:scale-95 transition-all duration-200 flex-shrink-0 group/btn"
              >
                <X className="w-4 h-4 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveSoundsMixer;
