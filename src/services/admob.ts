// AdMob servisi - Capacitor plugin kullanarak
// Not: Bu servis native app'te çalışacak, web'de mock olarak çalışır

let isAdMobInitialized = false;

// AdMob'u başlat
export const initAdMob = async () => {
  if (typeof window === "undefined") return;

  try {
    // Capacitor plugin'i kontrol et
    const { AdMob } = await import("@capacitor-community/admob");
    
    // AdMob App ID - Bu değeri AdMob Console'dan alacaksınız
    const appId = import.meta.env.VITE_ADMOB_APP_ID || "ca-app-pub-3940256099942544~3347511713"; // Test ID
    
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: [],
      initializeForTesting: import.meta.env.DEV,
    });

    isAdMobInitialized = true;
    console.log("AdMob initialized");
  } catch (error) {
    console.warn("AdMob not available (web environment):", error);
    isAdMobInitialized = false;
  }
};

// Banner reklam göster
export const showBannerAd = async (adUnitId: string, position: "top" | "bottom" = "bottom") => {
  if (!isAdMobInitialized) {
    console.warn("AdMob not initialized");
    return;
  }

  try {
    const { AdMob } = await import("@capacitor-community/admob");
    
    await AdMob.showBanner({
      adId: adUnitId || import.meta.env.VITE_ADMOB_BANNER_ID || "ca-app-pub-3940256099942544/6300978111", // Test ID
      adSize: "BANNER",
      position: position === "top" ? "TOP_CENTER" : "BOTTOM_CENTER",
      margin: 0,
      isTesting: import.meta.env.DEV,
    });
  } catch (error) {
    console.error("Error showing banner ad:", error);
  }
};

// Banner reklamı gizle
export const hideBannerAd = async () => {
  if (!isAdMobInitialized) return;

  try {
    const { AdMob } = await import("@capacitor-community/admob");
    await AdMob.hideBanner();
  } catch (error) {
    console.error("Error hiding banner ad:", error);
  }
};

// Interstitial (tam ekran) reklam göster
export const showInterstitialAd = async (adUnitId?: string) => {
  if (!isAdMobInitialized) {
    console.warn("AdMob not initialized");
    return;
  }

  try {
    const { AdMob } = await import("@capacitor-community/admob");
    
    await AdMob.prepareInterstitial({
      adId: adUnitId || import.meta.env.VITE_ADMOB_INTERSTITIAL_ID || "ca-app-pub-3940256099942544/1033173712", // Test ID
      isTesting: import.meta.env.DEV,
    });

    await AdMob.showInterstitial();
  } catch (error) {
    console.error("Error showing interstitial ad:", error);
  }
};

// Rewarded (ödüllü) reklam göster
export const showRewardedAd = async (adUnitId?: string): Promise<boolean> => {
  if (!isAdMobInitialized) {
    console.warn("AdMob not initialized");
    return false;
  }

  try {
    const { AdMob } = await import("@capacitor-community/admob");
    
    await AdMob.prepareRewardVideoAd({
      adId: adUnitId || import.meta.env.VITE_ADMOB_REWARDED_ID || "ca-app-pub-3940256099942544/5224354917", // Test ID
      isTesting: import.meta.env.DEV,
    });

    const result = await AdMob.showRewardVideoAd();
    return result.rewarded;
  } catch (error) {
    console.error("Error showing rewarded ad:", error);
    return false;
  }
};

export default {
  initAdMob,
  showBannerAd,
  hideBannerAd,
  showInterstitialAd,
  showRewardedAd,
};

