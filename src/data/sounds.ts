import {
  CloudRain,
  Flame,
  Bird,
  Wind,
  Waves,
  Moon,
  Coffee,
  CloudLightning,
  TreePine,
  Train,
  LucideIcon,
} from "lucide-react";

export interface SoundData {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  audioUrl: string;
}

// Base sound data without names (names come from i18n)
const baseSounds = [
  {
    id: "rain",
    icon: CloudRain,
    color: "hsl(200, 70%, 50%)",
    audioUrl: "/Sounds/Rain.mp3",
  },
  {
    id: "fire",
    icon: Flame,
    color: "hsl(25, 90%, 55%)",
    audioUrl: "/Sounds/Fire.mp3",
  },
  {
    id: "birds",
    icon: Bird,
    color: "hsl(150, 60%, 45%)",
    audioUrl: "/Sounds/Birds.mp3",
  },
  {
    id: "wind",
    icon: Wind,
    color: "hsl(180, 40%, 50%)",
    audioUrl: "/Sounds/Wind.mp3",
  },
  {
    id: "waves",
    icon: Waves,
    color: "hsl(210, 70%, 55%)",
    audioUrl: "/Sounds/Waves.mp3",
  },
  {
    id: "night",
    icon: Moon,
    color: "hsl(280, 50%, 45%)",
    audioUrl: "/Sounds/Night.mp3",
  },
  {
    id: "cafe",
    icon: Coffee,
    color: "hsl(35, 60%, 50%)",
    audioUrl: "/Sounds/Cafe.mp3",
  },
  {
    id: "thunder",
    icon: CloudLightning,
    color: "hsl(250, 50%, 40%)",
    audioUrl: "/Sounds/Thunder.mp3",
  },
  {
    id: "forest",
    icon: TreePine,
    color: "hsl(140, 50%, 40%)",
    audioUrl: "/Sounds/Forest.mp3",
  },
  {
    id: "train",
    icon: Train,
    color: "hsl(0, 0%, 50%)",
    audioUrl: "/Sounds/Train.mp3",
  },
];

// Hook to get sounds with translated names
export const useSounds = () => {
  // This will be used in components that have access to i18n
  // For now, return base sounds - names will be added in components
  return baseSounds;
};

// Export function to get sounds with translations
export const getSounds = (t: (key: string) => string): SoundData[] => {
  return baseSounds.map((sound) => ({
    ...sound,
    name: t(`sounds.${sound.id}`),
  }));
};
