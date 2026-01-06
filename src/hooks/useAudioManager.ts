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

  const playSound = useCallback((id: string, url: string, volume: number) => {
    initAudioContext();

    // If already playing, just update volume
    if (audioInstances.current.has(id)) {
      setVolume(id, volume);
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

    audio.addEventListener("loadeddata", () => {
      console.log(`Ses yüklendi: ${id}`);
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
  }, [initAudioContext]);

  const stopSound = useCallback((id: string) => {
    const instance = audioInstances.current.get(id);
    if (instance) {
      instance.audio.pause();
      instance.audio.currentTime = 0;
      audioInstances.current.delete(id);
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

  const stopAll = useCallback(() => {
    audioInstances.current.forEach((instance) => {
      instance.audio.pause();
      instance.audio.currentTime = 0;
    });
    audioInstances.current.clear();
  }, []);

  const pauseAll = useCallback(() => {
    audioInstances.current.forEach((instance) => {
      instance.audio.pause();
    });
  }, []);

  const resumeAll = useCallback(() => {
    initAudioContext();
    audioInstances.current.forEach((instance) => {
      instance.audio.play().catch(console.error);
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
