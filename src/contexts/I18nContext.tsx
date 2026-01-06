import { createContext, useContext, useState, ReactNode } from "react";
import tr from "../locales/tr.json";
import en from "../locales/en.json";
import de from "../locales/de.json";
import fr from "../locales/fr.json";
import es from "../locales/es.json";
import it from "../locales/it.json";
import pt from "../locales/pt.json";
import ru from "../locales/ru.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";
import zh from "../locales/zh.json";

export type Language = "tr" | "en" | "de" | "fr" | "es" | "it" | "pt" | "ru" | "ja" | "ko" | "zh";

const translations: Record<Language, any> = {
  tr,
  en,
  de,
  fr,
  es,
  it,
  pt,
  ru,
  ja,
  ko,
  zh,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Tarayıcı dilini algıla ve Language tipine dönüştür
const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  const browserLang = navigator.language || (navigator as any).userLanguage || "en";
  const langCode = browserLang.split("-")[0].toLowerCase();
  
  const supportedLanguages: Language[] = ["tr", "en", "de", "fr", "es", "it", "pt", "ru", "ja", "ko", "zh"];
  
  // Tam eşleşme kontrolü
  if (supportedLanguages.includes(langCode as Language)) {
    return langCode as Language;
  }
  
  // Bölge bazlı eşleştirme
  const regionMap: Record<string, Language> = {
    "tr": "tr", // Türkiye
    "en": "en", // İngilizce konuşulan ülkeler
    "de": "de", // Almanya, Avusturya, İsviçre
    "fr": "fr", // Fransa, Belçika, İsviçre, Kanada
    "es": "es", // İspanya, Latin Amerika
    "it": "it", // İtalya
    "pt": "pt", // Portekiz, Brezilya
    "ru": "ru", // Rusya, BDT ülkeleri
    "ja": "ja", // Japonya
    "ko": "ko", // Kore
    "zh": "zh", // Çin
  };
  
  // Bölge kodunu kontrol et (örn: en-US, tr-TR)
  const fullLang = browserLang.toLowerCase();
  for (const [code, lang] of Object.entries(regionMap)) {
    if (fullLang.startsWith(code)) {
      return lang;
    }
  }
  
  return "en"; // Varsayılan
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // LocalStorage'dan kaydedilmiş dili kontrol et
    const saved = localStorage.getItem("app-language");
    if (saved && ["tr", "en", "de", "fr", "es", "it", "pt", "ru", "ja", "ko", "zh"].includes(saved)) {
      return saved as Language;
    }
    // Yoksa tarayıcı dilini algıla
    return detectBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback: İngilizce çeviriyi dene
        let enValue: any = translations.en;
        for (const enK of keys) {
          if (enValue && typeof enValue === "object" && enK in enValue) {
            enValue = enValue[enK];
          } else {
            return key; // Son çare: key'i döndür
          }
        }
        return typeof enValue === "string" ? enValue : key;
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

