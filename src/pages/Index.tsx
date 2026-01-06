import { useState, useEffect, useCallback } from "react";
import SoundCard from "@/components/SoundCard";
import PlayButton from "@/components/PlayButton";
import TimerButton from "@/components/TimerButton";
import StarField from "@/components/StarField";
import ActiveSoundsMixer from "@/components/ActiveSoundsMixer";
import useAudioManager from "@/hooks/useAudioManager";
import { sounds } from "@/data/sounds";
import { useToast } from "@/hooks/use-toast";

interface ActiveSound {
  id: string;
  volume: number;
}

const Index = () => {
  const [activeSounds, setActiveSounds] = useState<ActiveSound[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { playSound, stopSound, setVolume, pauseAll, resumeAll, stopAll } = useAudioManager();
  const { toast } = useToast();

  // Timer logic
  useEffect(() => {
    if (selectedTimer && isPlaying) {
      setRemainingTime(selectedTimer * 60);
    } else if (!selectedTimer) {
      setRemainingTime(null);
    }
  }, [selectedTimer, isPlaying]);

  useEffect(() => {
    if (remainingTime === null || !isPlaying) return;

    if (remainingTime <= 0) {
      setIsPlaying(false);
      pauseAll();
      setSelectedTimer(null);
      setRemainingTime(null);
      toast({
        title: "Zamanlayıcı Bitti",
        description: "Tüm sesler durduruldu. İyi uykular! 🌙",
      });
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, isPlaying, pauseAll, toast]);

  const handleSoundToggle = useCallback((id: string) => {
    setActiveSounds((prev) => {
      const exists = prev.find((s) => s.id === id);
      if (exists) {
        stopSound(id);
        return prev.filter((s) => s.id !== id);
      } else {
        const sound = sounds.find((s) => s.id === id);
        if (sound && isPlaying) {
          playSound(id, sound.audioUrl, 50);
        }
        return [...prev, { id, volume: 50 }];
      }
    });
  }, [isPlaying, playSound, stopSound]);

  const handleVolumeChange = useCallback((id: string, volume: number) => {
    setActiveSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, volume } : s))
    );
    setVolume(id, volume);
  }, [setVolume]);

  const handlePlayToggle = useCallback(() => {
    if (activeSounds.length === 0) {
      toast({
        title: "Ses Seçin",
        description: "Oynatmak için en az bir ses seçin.",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      pauseAll();
    } else {
      activeSounds.forEach(({ id, volume }) => {
        const sound = sounds.find((s) => s.id === id);
        if (sound) {
          playSound(id, sound.audioUrl, volume);
        }
      });
    }
    setIsPlaying(!isPlaying);
  }, [activeSounds, isPlaying, pauseAll, playSound, toast]);

  const handleTimerSelect = useCallback((minutes: number | null) => {
    setSelectedTimer(minutes);
    if (minutes === null) {
      setRemainingTime(null);
    }
  }, []);

  const handleRemoveSound = useCallback((id: string) => {
    stopSound(id);
    setActiveSounds((prev) => prev.filter((s) => s.id !== id));
  }, [stopSound]);

  const getActiveSoundsWithDetails = () => {
    return activeSounds.map((activeSound) => ({
      sound: sounds.find((s) => s.id === activeSound.id)!,
      volume: activeSound.volume,
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "var(--gradient-glow)" }}
        />
      </div>

      <div className="relative z-10 flex gap-4 px-4 py-8 pb-20 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 max-w-lg mx-auto">
          {/* Header */}
          <header className="text-center mb-8 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <img 
                src="/logo.png" 
                alt="Sleep Sounds Logo" 
                className="w-10 h-10 floating-animation"
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sleep Sounds
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Huzurlu bir uyku için ortam seslerini karıştırın
            </p>
          </header>

          {/* Sound Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {sounds.map((sound, index) => (
              <SoundCard
                key={sound.id}
                id={sound.id}
                name={sound.name}
                icon={sound.icon}
                color={sound.color}
                volume={activeSounds.find((s) => s.id === sound.id)?.volume ?? 50}
                isActive={activeSounds.some((s) => s.id === sound.id)}
                onToggle={handleSoundToggle}
                onVolumeChange={handleVolumeChange}
                delay={index * 50}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Active Sounds Mixer */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-8">
            <ActiveSoundsMixer
              activeSounds={getActiveSoundsWithDetails()}
              onVolumeChange={handleVolumeChange}
              onRemove={handleRemoveSound}
            />
          </div>
        </div>
      </div>

      {/* Mobile Active Sounds Mixer */}
      <div className="lg:hidden px-4 pb-24">
        <ActiveSoundsMixer
          activeSounds={getActiveSoundsWithDetails()}
          onVolumeChange={handleVolumeChange}
          onRemove={handleRemoveSound}
        />
      </div>

      {/* Bottom Controls - Compact */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="glass-card mx-4 mb-4 p-2 flex items-center justify-center gap-3">
          <TimerButton
            selectedTime={selectedTimer}
            onTimeSelect={handleTimerSelect}
            remainingTime={remainingTime}
          />

          <PlayButton
            isPlaying={isPlaying}
            onToggle={handlePlayToggle}
            disabled={activeSounds.length === 0}
          />

          <div className="text-center min-w-[80px]">
            <span className="text-xs text-muted-foreground">
              {activeSounds.length} ses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
