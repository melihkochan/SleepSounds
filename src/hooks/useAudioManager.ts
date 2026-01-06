import { useRef, useCallback, useEffect } from "react";

interface AudioInstance {
  audio: HTMLAudioElement;
  gainNode: GainNode | null;
}

const useAudioManager = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const audioInstances = useRef<Map<string, AudioInstance>>(new Map());

  const initAudioContext = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContext.current.state === "suspended") {
      audioContext.current.resume();
    }
  }, []);

  const setVolume = useCallback((id: string, volume: number) => {
    const instance = audioInstances.current.get(id);
    if (instance) {
      if (instance.gainNode) {
        instance.gainNode.gain.value = volume / 100;
      } else {
        instance.audio.volume = volume / 100;
      }
    }
  }, []);

  const playSound = useCallback((id: string, url: string, volume: number) => {
    initAudioContext();

    // If already exists, just update volume and play if paused
    if (audioInstances.current.has(id)) {
      const instance = audioInstances.current.get(id);
      if (instance) {
        setVolume(id, volume);
        // Resume if paused
        if (instance.audio.paused) {
          instance.audio.play().catch((error) => {
            console.error(`Ses oynatılamadı (${id}):`, error);
          });
        }
      }
      return;
    }

    const audio = new Audio(url);
    audio.loop = true;
    audio.crossOrigin = "anonymous";

    // Error handling for audio loading
    audio.addEventListener("error", (e) => {
      console.error(`Ses yüklenemedi (${id}):`, e);
      audioInstances.current.delete(id);
    });

    if (audioContext.current) {
      try {
        const source = audioContext.current.createMediaElementSource(audio);
        const gainNode = audioContext.current.createGain();
        gainNode.gain.value = volume / 100;
        source.connect(gainNode);
        gainNode.connect(audioContext.current.destination);

        audioInstances.current.set(id, { audio, gainNode });
      } catch (error) {
        console.error(`Audio context hatası (${id}):`, error);
        audio.volume = volume / 100;
        audioInstances.current.set(id, { audio, gainNode: null });
      }
    } else {
      audio.volume = volume / 100;
      audioInstances.current.set(id, { audio, gainNode: null });
    }

    audio.play().catch((error) => {
      console.error(`Ses oynatılamadı (${id}):`, error);
      audioInstances.current.delete(id);
    });
  }, [initAudioContext, setVolume]);

  const stopSound = useCallback((id: string) => {
    const instance = audioInstances.current.get(id);
    if (instance) {
      instance.audio.pause();
      instance.audio.currentTime = 0;
      audioInstances.current.delete(id);
    }
  }, []);

  const stopAll = useCallback(() => {
    audioInstances.current.forEach((instance) => {
      instance.audio.pause();
      instance.audio.currentTime = 0;
    });
    audioInstances.current.clear();
  }, []);

  const pauseAll = useCallback(() => {
    audioInstances.current.forEach((instance) => {
      if (!instance.audio.paused) {
        instance.audio.pause();
      }
    });
  }, []);

  const resumeAll = useCallback(() => {
    initAudioContext();
    audioInstances.current.forEach((instance) => {
      if (instance.audio.paused) {
        instance.audio.play().catch((error) => {
          console.error("Ses oynatılamadı:", error);
        });
      }
    });
  }, [initAudioContext]);

  useEffect(() => {
    return () => {
      stopAll();
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [stopAll]);

  return {
    playSound,
    stopSound,
    setVolume,
    stopAll,
    pauseAll,
    resumeAll,
  };
};

export default useAudioManager;
