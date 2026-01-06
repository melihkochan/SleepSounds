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

  // Timer logic - start timer when play starts or timer is selected
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
      stopAll(); // Stop all sounds completely when timer ends
      setSelectedTimer(null);
      setRemainingTime(null);
      setActiveSounds([]); // Clear active sounds list
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
  }, [remainingTime, isPlaying, stopAll, toast]);

  const handleSoundToggle = useCallback((id: string) => {
    setActiveSounds((prev) => {
      const exists = prev.find((s) => s.id === id);
      if (exists) {
        // Remove sound - stop it completely
        stopSound(id);
        return prev.filter((s) => s.id !== id);
      } else {
        // Add sound and play it immediately
        const sound = sounds.find((s) => s.id === id);
        if (sound) {
          playSound(id, sound.audioUrl, 50);
          setIsPlaying(true);
        }
        return [...prev, { id, volume: 50 }];
      }
    });
  }, [playSound, stopSound, sounds]);

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
      // Pause all sounds (but keep them in the list)
      pauseAll();
      setIsPlaying(false);
    } else {
      // Resume all paused sounds
      resumeAll();
      setIsPlaying(true);
    }
  }, [activeSounds.length, isPlaying, pauseAll, resumeAll, toast]);

  const handleTimerSelect = useCallback((minutes: number | null) => {
    setSelectedTimer(minutes);
    if (minutes === null) {
      setRemainingTime(null);
    }
  }, []);

  const handleRemoveSound = useCallback((id: string) => {
    // Stop sound completely when removed
    stopSound(id);
    setActiveSounds((prev) => {
      const newSounds = prev.filter((s) => s.id !== id);
      // If no sounds left, set playing to false
      if (newSounds.length === 0) {
        setIsPlaying(false);
      }
      return newSounds;
    });
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

      <div className="relative z-10 px-4 py-6 pb-20 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
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
          <p className="text-muted-foreground text-sm mb-3">
            Huzurlu bir uyku için ortam seslerini karıştırın
          </p>
          <a 
            href="https://melihkochan.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors inline-flex items-center gap-1"
          >
            <span>by</span>
            <span className="font-medium">melihkochan.com</span>
          </a>
        </header>

        <div className="flex gap-8">
          {/* Main Content - Sound Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {sounds.map((sound, index) => (
                <SoundCard
                  key={sound.id}
                  id={sound.id}
                  name={sound.name}
                  icon={sound.icon}
                  color={sound.color}
                  isActive={activeSounds.some((s) => s.id === sound.id)}
                  onToggle={handleSoundToggle}
                  delay={index * 50}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Active Sounds Mixer */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="sticky top-8">
              <ActiveSoundsMixer
                activeSounds={getActiveSoundsWithDetails()}
                onVolumeChange={handleVolumeChange}
                onRemove={handleRemoveSound}
              />
            </div>
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
