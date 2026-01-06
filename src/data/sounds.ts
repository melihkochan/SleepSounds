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

// Using local files from Sounds folder when available, otherwise Pixabay URLs
// To add a new sound: Place the MP3 file in public/Sounds/ folder and update the audioUrl below
export const sounds: SoundData[] = [
  {
    id: "rain",
    name: "Yağmur",
    icon: CloudRain,
    color: "hsl(200, 70%, 50%)",
    // Using local file from Sounds folder
    audioUrl: "/Sounds/Rain.mp3",
  },
  {
    id: "fire",
    name: "Şömine",
    icon: Flame,
    color: "hsl(25, 90%, 55%)",
    // Place Fire.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Fire.mp3",
  },
  {
    id: "birds",
    name: "Kuşlar",
    icon: Bird,
    color: "hsl(150, 60%, 45%)",
    // Place Birds.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Birds.mp3",
  },
  {
    id: "wind",
    name: "Rüzgar",
    icon: Wind,
    color: "hsl(180, 40%, 50%)",
    // Place Wind.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Wind.mp3",
  },
  {
    id: "waves",
    name: "Dalgalar",
    icon: Waves,
    color: "hsl(210, 70%, 55%)",
    // Place Waves.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Waves.mp3",
  },
  {
    id: "night",
    name: "Gece",
    icon: Moon,
    color: "hsl(280, 50%, 45%)",
    // Place Night.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Night.mp3",
  },
  {
    id: "cafe",
    name: "Kafe",
    icon: Coffee,
    color: "hsl(35, 60%, 50%)",
    // Place Cafe.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Cafe.mp3",
  },
  {
    id: "thunder",
    name: "Gök Gürültüsü",
    icon: CloudLightning,
    color: "hsl(250, 50%, 40%)",
    // Place Thunder.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Thunder.mp3",
  },
  {
    id: "forest",
    name: "Orman",
    icon: TreePine,
    color: "hsl(140, 50%, 40%)",
    // Place Forest.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Forest.mp3",
  },
  {
    id: "train",
    name: "Tren",
    icon: Train,
    color: "hsl(0, 0%, 50%)",
    // Place Train.mp3 in public/Sounds/ folder to use local file
    audioUrl: "/Sounds/Train.mp3",
  },
];
