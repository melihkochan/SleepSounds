import { useState, useEffect, useCallback } from "react";
import { Moon, Volume2, Square, Play } from "lucide-react";
import SoundCard from "@/components/SoundCard";
import PlayButton from "@/components/PlayButton";
import TimerButton from "@/components/TimerButton";
import StarField from "@/components/StarField";
import ActiveSoundsMixer from "@/components/ActiveSoundsMixer";
import SleepMode from "@/components/SleepMode";
import LanguageSelector from "@/components/LanguageSelector";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import useAudioManager from "@/hooks/useAudioManager";
import { getSounds, type SoundData } from "@/data/sounds";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/I18nContext";
import { trackSoundPlay, trackSoundStop, trackTimerSet, trackSleepModeEnter, trackLanguageChange, trackVolumeChange } from "@/services/analytics";

interface ActiveSound {
  id: string;
  volume: number;
}

const Index = () => {
  const [activeSounds, setActiveSounds] = useState<ActiveSound[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Geçen süre (saniye)
  const [playStartTime, setPlayStartTime] = useState<number | null>(null); // Oynatma başlangıç zamanı
  const [showSleepMode, setShowSleepMode] = useState(false);
  const [masterVolume, setMasterVolume] = useState<number>(100); // Master volume (0-100)
  const { playSound, stopSound, setVolume, setMasterVolume: setMasterVolumeAudio, pauseAll, resumeAll, stopAll } = useAudioManager();
  const { toast } = useToast();
  const { t } = useI18n();
  const sounds = getSounds(t);

  // Timer logic - start timer when play starts or timer is selected
  useEffect(() => {
    if (selectedTimer && isPlaying) {
      setRemainingTime(selectedTimer * 60);
    } else if (!selectedTimer) {
      setRemainingTime(null);
    }
  }, [selectedTimer, isPlaying]);

  // Elapsed time tracking
  useEffect(() => {
    if (!isPlaying || activeSounds.length === 0) return;

    const interval = setInterval(() => {
      if (playStartTime !== null) {
        const elapsed = Math.floor((Date.now() - playStartTime) / 1000);
        setElapsedTime(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, activeSounds.length, playStartTime]);

  useEffect(() => {
    if (remainingTime === null || !isPlaying) return;

    if (remainingTime <= 0) {
      setIsPlaying(false);
      stopAll(); // Stop all sounds completely when timer ends
      setSelectedTimer(null);
      setRemainingTime(null);
      setActiveSounds([]); // Clear active sounds list
      setElapsedTime(0);
      setPlayStartTime(null);
      toast({
        title: t("toasts.timerEnded.title"),
        description: t("toasts.timerEnded.description"),
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
        trackSoundStop(id); // Analytics tracking
        const newSounds = prev.filter((s) => s.id !== id);
        // If no sounds left, reset elapsed time and close sleep mode
        if (newSounds.length === 0) {
          setElapsedTime(0);
          setPlayStartTime(null);
          setIsPlaying(false);
          setShowSleepMode(false);
        }
        return newSounds;
      } else {
        // Add sound and play it immediately
        const sound = sounds.find((s: SoundData) => s.id === id);
        if (sound) {
          playSound(id, sound.audioUrl, 50);
          setIsPlaying(true);
          trackSoundPlay(id); // Analytics tracking
          // Start elapsed time if this is the first sound
          if (prev.length === 0) {
            setPlayStartTime(Date.now());
            setElapsedTime(0);
          }
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
    trackVolumeChange(id, volume); // Analytics tracking
  }, [setVolume]);

  const handlePlayToggle = useCallback(() => {
    if (activeSounds.length === 0) {
      toast({
        title: t("toasts.selectSound.title"),
        description: t("toasts.selectSound.description"),
        variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      // Pause all sounds (but keep them in the list)
      pauseAll();
      setIsPlaying(false);
      // If in sleep mode, close it and return to main screen
      if (showSleepMode) {
        setShowSleepMode(false);
      }
    } else {
      // Resume all paused sounds
      resumeAll();
      setIsPlaying(true);
      // Resume elapsed time tracking
      if (playStartTime === null) {
        setPlayStartTime(Date.now() - elapsedTime * 1000);
      }
    }
  }, [activeSounds.length, isPlaying, pauseAll, resumeAll, toast, playStartTime, elapsedTime, showSleepMode]);

  const handleTimerSelect = useCallback((minutes: number | null) => {
    setSelectedTimer(minutes);
    if (minutes === null) {
      setRemainingTime(null);
    } else {
      trackTimerSet(minutes); // Analytics tracking
    }
  }, []);

  const handleEnterSleepMode = useCallback(() => {
    if (activeSounds.length === 0) {
      toast({
        title: t("toasts.selectSoundForSleepMode.title"),
        description: t("toasts.selectSoundForSleepMode.description"),
        variant: "destructive",
      });
      return;
    }
    if (!isPlaying) {
      // Start playing if not already playing
      resumeAll();
      setIsPlaying(true);
      if (playStartTime === null) {
        setPlayStartTime(Date.now());
        setElapsedTime(0);
      }
    }
    setShowSleepMode(true);
    trackSleepModeEnter(); // Analytics tracking
  }, [activeSounds.length, isPlaying, resumeAll, playStartTime, toast]);

  const handleRemoveSound = useCallback((id: string) => {
    // Stop sound completely when removed
    stopSound(id);
    setActiveSounds((prev) => {
      const newSounds = prev.filter((s) => s.id !== id);
      // If no sounds left, reset everything and close sleep mode
      if (newSounds.length === 0) {
        setIsPlaying(false);
        setElapsedTime(0);
        setPlayStartTime(null);
        setShowSleepMode(false);
      }
      return newSounds;
    });
  }, [stopSound]);

  const handleMasterVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    setMasterVolume(newVolume);
    setMasterVolumeAudio(newVolume);
  }, [setMasterVolumeAudio]);

  const handleStopAll = useCallback(() => {
    if (isPlaying) {
      // Durdur
      pauseAll();
      setIsPlaying(false);
      if (showSleepMode) {
        setShowSleepMode(false);
      }
      toast({
        title: t("toasts.allSoundsStopped.title"),
        description: t("toasts.allSoundsStopped.description"),
      });
    } else {
      // Başlat
      if (activeSounds.length === 0) {
        toast({
          title: t("toasts.selectSound.title"),
          description: t("toasts.selectSound.description"),
          variant: "destructive",
        });
        return;
      }
      resumeAll();
      setIsPlaying(true);
      if (playStartTime === null) {
        setPlayStartTime(Date.now() - elapsedTime * 1000);
      }
      toast({
        title: t("toasts.allSoundsStarted.title"),
        description: t("toasts.allSoundsStarted.description"),
      });
    }
  }, [isPlaying, pauseAll, resumeAll, activeSounds.length, showSleepMode, playStartTime, elapsedTime, toast]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getActiveSoundsWithDetails = () => {
    return activeSounds.map((activeSound) => ({
      sound: sounds.find((s: SoundData) => s.id === activeSound.id)!,
      volume: activeSound.volume,
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sleep Mode Overlay */}
      {showSleepMode && activeSounds.length > 0 && (
        <SleepMode
          activeSounds={getActiveSoundsWithDetails()}
          remainingTime={remainingTime}
          elapsedTime={elapsedTime}
          isPlaying={isPlaying}
          onPlayToggle={handlePlayToggle}
          onClose={() => setShowSleepMode(false)}
          onVolumeChange={handleVolumeChange}
          onRemoveSound={handleRemoveSound}
        />
      )}
      <StarField />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "var(--gradient-glow)" }}
        />
      </div>

      <div className="relative z-10 px-4 py-4 sm:py-6 pb-64 sm:pb-20 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("app.title")}
            </h1>
            <LanguageSelector />
          </div>
          <p className="text-muted-foreground text-sm mb-3">
            {t("app.subtitle")}
          </p>
          <a 
            href="https://melihkochan.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors inline-flex items-center gap-1"
          >
            <span>{t("app.by")}</span>
            <span className="font-medium">{t("app.author")}</span>
          </a>
        </header>

        {/* Elapsed Time Display */}
        {isPlaying && activeSounds.length > 0 && (
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="glass-card px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center justify-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="text-xs text-muted-foreground font-medium">{t("common.elapsedTime")}</span>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums">
                  {formatTime(elapsedTime)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Active Sounds Mixer - Above Sound Grid */}
        <div className="lg:hidden mb-4">
          <ActiveSoundsMixer
            activeSounds={getActiveSoundsWithDetails()}
            onVolumeChange={handleVolumeChange}
            onRemove={handleRemoveSound}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Main Content - Sound Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 max-w-4xl mx-auto">
              {sounds.map((sound: SoundData, index: number) => (
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
      </div>

      {/* Bottom Controls - Enhanced */}
      {!showSleepMode && (
        <div className="fixed bottom-0 left-0 right-0 z-20 safe-area-inset-bottom">
          <div className="glass-card mx-2 sm:mx-4 mb-2 sm:mb-4 p-2 sm:p-3">
            {/* Main Controls Row */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <TimerButton
                selectedTime={selectedTimer}
                onTimeSelect={handleTimerSelect}
                remainingTime={remainingTime}
              />

              {activeSounds.length > 0 && !showSleepMode ? (
                <>
                  <button
                    onClick={handleEnterSleepMode}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-primary to-accent hover:scale-105 active:scale-95 shadow-[0_0_20px_hsl(var(--primary)/0.4)] group"
                    title={t("common.enterSleepMode")}
                  >
                    <Moon className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={handleStopAll}
                    className={cn(
                      "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group",
                      isPlaying
                        ? "bg-destructive/20 hover:bg-destructive/30 border border-destructive/30 hover:border-destructive/50"
                        : "bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50"
                    )}
                    title={isPlaying ? t("common.stopAll") : t("common.startAll")}
                  >
                    {isPlaying ? (
                      <Square className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="currentColor" />
                    )}
                  </button>
                </>
              ) : (
                <PlayButton
                  isPlaying={isPlaying}
                  onToggle={handlePlayToggle}
                  disabled={activeSounds.length === 0}
                />
              )}

              <div className="text-center min-w-[80px]">
                <span className="text-xs text-muted-foreground">
                  {activeSounds.length} {activeSounds.length === 1 ? t("common.sound") : t("common.sounds")}
                </span>
              </div>
            </div>

            {/* Master Volume Row */}
            {activeSounds.length > 0 && (
              <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-[80px] sm:min-w-[100px]">
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">{t("common.masterVolume")}</span>
                </div>
                <Slider
                  value={[masterVolume]}
                  max={100}
                  step={1}
                  onValueChange={handleMasterVolumeChange}
                  className="flex-1"
                />
                <div className="min-w-[40px] sm:min-w-[45px] text-right">
                  <span className="text-xs font-bold text-primary tabular-nums">
                    {masterVolume}%
                  </span>
                </div>
              </div>
            )}

            {/* Active Sounds Preview - Mobile Only */}
            {activeSounds.length > 0 && (
              <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-1 sm:px-2 mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-border/30">
                <span className="text-xs text-muted-foreground font-medium min-w-[50px] sm:min-w-[60px]">{t("common.active")}</span>
                <div className="flex items-center gap-1 sm:gap-1.5 flex-1 overflow-x-auto scrollbar-hide">
                  {getActiveSoundsWithDetails().map(({ sound }) => {
                    const Icon = sound.icon;
                    return (
                      <div
                        key={sound.id}
                        className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${sound.color}15` }}
                      >
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: sound.color }} />
                        <span className="text-xs font-medium text-foreground">{sound.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
