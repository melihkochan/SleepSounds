import { Slider } from "@/components/ui/slider";
import { Volume2, X } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";

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
  const { t } = useI18n();
  if (activeSounds.length === 0) {
    return (
      <div className="glass-card p-6 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center mb-4">
            <Volume2 
              className="w-8 h-8 text-muted-foreground/40 flex-shrink-0" 
              style={{ display: "block", opacity: 1, visibility: "visible" }}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {t("common.selectSounds")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-3 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Volume2 
          className="w-4 h-4 text-primary flex-shrink-0" 
          style={{ display: "block", opacity: 1, visibility: "visible" }}
          strokeWidth={2}
          aria-hidden="true"
        />
        <h3 className="text-xs font-semibold text-foreground">{t("common.activeSounds")}</h3>
        <span className="ml-auto text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full">
          {activeSounds.length}
        </span>
      </div>
      <div className="space-y-1.5">
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
                {Icon ? (
                  <Icon 
                    className="w-3.5 h-3.5 flex-shrink-0" 
                    style={{ 
                      color: sound.color,
                      display: "block",
                      opacity: 1,
                      visibility: "visible"
                    }}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : (
                  <div 
                    className="w-3.5 h-3.5 rounded"
                    style={{ backgroundColor: sound.color }}
                  />
                )}
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
                onClick={() => onRemove(sound.id)}
                className="p-1 rounded-lg hover:bg-destructive/20 active:scale-95 transition-all flex-shrink-0"
                title={t("common.removeSound")}
              >
                <X 
                  className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0" 
                  style={{ display: "block", opacity: 1, visibility: "visible" }}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveSoundsMixer;
