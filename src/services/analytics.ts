import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, logEvent, setUserProperties } from "firebase/analytics";

// Firebase config - Bu değerleri Firebase Console'dan alacaksınız
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID",
};

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

// Firebase'i başlat
export const initAnalytics = () => {
  if (typeof window === "undefined") return;

  try {
    // Platform kontrolü - Android'de native plugin kullan
    let isNative = false;
    try {
      const { Capacitor } = require('@capacitor/core');
      isNative = Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios';
    } catch {
      // Capacitor yoksa web platform
    }
    
    if (isNative) {
      // Native platform - Capacitor Firebase Analytics plugin kullan
      // google-services.json dosyası yeterli, native tarafı otomatik başlatır
      console.log("📱 Native platform - Firebase initialized by Capacitor plugin");
      return;
    }

    // Web platform - Firebase SDK kullan
    // Config kontrolü
    if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === "YOUR_API_KEY") {
      console.warn("⚠️ Firebase config bulunamadı! .env dosyasını oluşturup Firebase config değerlerini ekleyin.");
      console.warn("📖 Detaylı rehber: FIREBASE_SETUP_GUIDE.md");
      return;
    }

    // Eğer zaten başlatılmışsa tekrar başlatma
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    // Analytics'i başlat
    if (typeof window !== "undefined" && !analytics) {
      analytics = getAnalytics(app);
      console.log("✅ Firebase Analytics initialized");
    }
  } catch (error) {
    // Hata olsa bile uygulama çalışmaya devam etsin
    console.warn("⚠️ Firebase Analytics initialization warning:", error);
  }
};

// Event loglama
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (!analytics) {
    console.warn("⚠️ Analytics not initialized - event not tracked:", eventName);
    return;
  }

  try {
    logEvent(analytics, eventName, params);
    console.log(`📊 Event tracked: ${eventName}`, params || {});
  } catch (error) {
    console.error("❌ Error tracking event:", error);
  }
};

// Kullanıcı özelliklerini ayarla
export const setUserProperty = (propertyName: string, value: string) => {
  if (!analytics) {
    console.warn("Analytics not initialized");
    return;
  }

  try {
    setUserProperties(analytics, {
      [propertyName]: value,
    });
  } catch (error) {
    console.error("Error setting user property:", error);
  }
};

// Özel event'ler
export const trackSoundPlay = (soundId: string) => {
  trackEvent("sound_play", { sound_id: soundId });
};

export const trackSoundStop = (soundId: string) => {
  trackEvent("sound_stop", { sound_id: soundId });
};

export const trackTimerSet = (minutes: number) => {
  trackEvent("timer_set", { minutes });
};

export const trackSleepModeEnter = () => {
  trackEvent("sleep_mode_enter");
};

export const trackLanguageChange = (language: string) => {
  trackEvent("language_change", { language });
};

export const trackAppOpen = () => {
  trackEvent("app_open");
};

export const trackVolumeChange = (soundId: string, volume: number) => {
  trackEvent("volume_change", { sound_id: soundId, volume });
};

export default {
  initAnalytics,
  trackEvent,
  setUserProperty,
  trackSoundPlay,
  trackSoundStop,
  trackTimerSet,
  trackSleepModeEnter,
  trackLanguageChange,
  trackAppOpen,
  trackVolumeChange,
};

