import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, logEvent, setUserProperties, isSupported } from "firebase/analytics";

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
let isNativePlatform = false;
let nativeAnalytics: any = null;

// Firebase'i başlat
export const initAnalytics = async () => {
  if (typeof window === "undefined") return;

  try {
    // Platform kontrolü - iOS'ta Firebase kullanma
    try {
      const { Capacitor } = await import('@capacitor/core');
      const platform = Capacitor.getPlatform();
      
      // iOS'ta Firebase kullanma - tamamen devre dışı
      if (platform === 'ios') {
        console.log("📱 iOS platform - Firebase Analytics devre dışı");
        isNativePlatform = true;
        return; // iOS'ta hiçbir şey yapma
      }
      
      isNativePlatform = platform === 'android';
      
      if (isNativePlatform) {
        // Android'de native plugin kullan (ileride)
        console.log("📱 Android platform - Firebase Analytics (native plugin)");
        // Şimdilik web SDK kullan
      }
    } catch {
      // Capacitor yoksa web platform
    }

    // Web platform - Firebase SDK kullan
    // Config kontrolü
    if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === "YOUR_API_KEY") {
      console.warn("⚠️ Firebase config bulunamadı! .env dosyasını oluşturup Firebase config değerlerini ekleyin.");
      return;
    }

    // Analytics desteğini kontrol et
    const analyticsSupported = await isSupported();
    if (!analyticsSupported) {
      console.warn("⚠️ Firebase Analytics bu tarayıcıda desteklenmiyor");
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
      console.log("✅ Firebase Analytics initialized (Web)");
      console.log("📊 Measurement ID:", import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);
      console.log("🌐 Web App ID:", import.meta.env.VITE_FIREBASE_APP_ID);
      console.log("🔍 Event'leri görmek için: Firebase Console → Analytics → Events → Real-time (Web app seçili olmalı!)");
    }
  } catch (error) {
    // Hata olsa bile uygulama çalışmaya devam etsin
    console.error("❌ Firebase Analytics initialization error:", error);
  }
};

// Event loglama
export const trackEvent = async (eventName: string, params?: Record<string, any>) => {
  try {
    // iOS kontrolü - iOS'ta hiçbir şey yapma
    try {
      const { Capacitor } = await import('@capacitor/core');
      if (Capacitor.getPlatform() === 'ios') {
        // iOS'ta event tracking yapma
        return;
      }
    } catch {
      // Capacitor yoksa devam et
    }

    // Web platform - Firebase SDK kullan
    if (!analytics) {
      console.warn("⚠️ Analytics not initialized - event not tracked:", eventName);
      return;
    }

    // Event parametrelerini Firebase formatına çevir
    const firebaseParams: Record<string, any> = {};
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        // Firebase sadece string, number, boolean kabul eder
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          firebaseParams[key] = value;
        } else {
          firebaseParams[key] = String(value);
        }
      });
    }

    logEvent(analytics, eventName, firebaseParams);
    console.log(`📊 [Web] Event tracked: ${eventName}`, firebaseParams);
    console.log(`🔍 Firebase Console'da görmek için: Analytics → Events → Real-time (Web app seçili olmalı!)`);
  } catch (error) {
    console.error("❌ Error tracking event:", error);
  }
};

// Kullanıcı özelliklerini ayarla
export const setUserProperty = async (propertyName: string, value: string) => {
  try {
    // iOS kontrolü - iOS'ta hiçbir şey yapma
    try {
      const { Capacitor } = await import('@capacitor/core');
      if (Capacitor.getPlatform() === 'ios') {
        return;
      }
    } catch {
      // Capacitor yoksa devam et
    }

    // Web platform
    if (!analytics) {
      console.warn("Analytics not initialized");
      return;
    }

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

