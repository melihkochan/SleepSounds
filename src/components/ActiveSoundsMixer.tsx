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
          <Volume2 className="w-12 h-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">
            Ses seçmek için yukarıdaki kartlara tıklayın
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Ses Mikseri</h3>
        <span className="ml-auto text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
          {activeSounds.length}
        </span>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {activeSounds.map(({ sound, volume }) => {
          const Icon = sound.icon;
          return (
            <div key={sound.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${sound.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: sound.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground truncate">
                    {sound.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2 font-medium">
                    {volume}%
                  </span>
                </div>
                <Slider
                  variant="sound"
                  soundColor={sound.color}
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(values) => onVolumeChange(sound.id, values[0])}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => onRemove(sound.id)}
                className="p-1.5 rounded-full hover:bg-destructive/20 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveSoundsMixer;
