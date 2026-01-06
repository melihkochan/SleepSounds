# 🚀 Sleep Sounds - Android Deployment

Bu dokümantasyon, Sleep Sounds uygulamasını Google Play Store'a yüklemek için gereken tüm bilgileri içerir.

## ✅ Tamamlanan Özellikler

### 📊 Analytics (Firebase)
- ✅ Kullanıcı takibi
- ✅ Event tracking (ses çalma, durdurma, timer, vb.)
- ✅ Dil değişimi tracking
- ✅ Uyku modu tracking
- ✅ Ses seviyesi değişimi tracking

### 💰 Reklamlar (AdMob)
- ✅ Banner reklam desteği
- ✅ Interstitial (tam ekran) reklam desteği
- ✅ Rewarded (ödüllü) reklam desteği
- ✅ Test modu desteği

### 🛒 In-App Purchase (Hazır)
- ✅ Altyapı hazır
- ⏳ Implementasyon ileride eklenecek

## 📋 Kurulum Adımları

### 1. Environment Variables

`.env` dosyası oluşturun (`.env.example` dosyasını referans alın):

```bash
# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...

# AdMob
VITE_ADMOB_APP_ID=...
VITE_ADMOB_BANNER_ID=...
VITE_ADMOB_INTERSTITIAL_ID=...
VITE_ADMOB_REWARDED_ID=...
```

### 2. Firebase Setup

1. [Firebase Console](https://console.firebase.google.com) → Yeni proje
2. Android app ekle → Package: `com.melihkochan.sleepsounds`
3. `google-services.json` indir
4. Analytics'i etkinleştir

### 3. AdMob Setup

1. [AdMob Console](https://apps.admob.com) → Yeni app
2. Ad unit'ler oluştur (Banner, Interstitial, Rewarded)
3. Ad unit ID'lerini `.env`'e ekle

### 4. Android Build

```bash
# 1. Web build
npm run build

# 2. Android platform ekle (ilk kez)
npx cap add android

# 3. Sync
npx cap sync android

# 4. Android Studio'da aç
npx cap open android
```

### 5. Android Studio'da

1. `google-services.json` → `android/app/` klasörüne kopyala
2. Gradle sync
3. Build > Generate Signed Bundle / APK
4. AAB formatını seç (Google Play için)

## 📊 Tracking Edilen Event'ler

| Event | Açıklama |
|-------|----------|
| `app_open` | Uygulama açılışı |
| `sound_play` | Ses çalma (sound_id ile) |
| `sound_stop` | Ses durdurma (sound_id ile) |
| `volume_change` | Ses seviyesi değişimi |
| `timer_set` | Zamanlayıcı ayarlama (dakika ile) |
| `sleep_mode_enter` | Uyku moduna girme |
| `language_change` | Dil değişimi (language code ile) |

## 💰 Reklam Stratejisi

### Banner Reklamlar
- Alt kısımda otomatik gösterilebilir
- Manuel kontrol için: `showBannerAd()`, `hideBannerAd()`

### Interstitial Reklamlar
- Belirli aksiyonlardan sonra gösterilebilir:
  - Ses ekleme
  - Uyku moduna girme
  - Timer ayarlama

### Rewarded Reklamlar
- İleride premium özellikler için kullanılabilir
- Örnek: Ekstra ses paketleri için

## 🛒 In-App Purchase (Gelecek)

Hazırlık yapıldı, implementasyon için:
- Google Play Billing API
- Product ID'ler tanımlanacak
- Purchase flow eklenecek

## 📈 Monitoring

### Firebase Analytics
- Kullanıcı sayısı
- Aktif kullanıcılar
- Event detayları
- Coğrafi dağılım
- Cihaz bilgileri

### AdMob
- Reklam gösterimleri
- Tıklamalar (CTR)
- Gelir (eCPM)
- Kullanıcı segmentasyonu

### Google Play Console
- İndirme sayıları
- Kullanıcı yorumları
- Crash raporları
- Performans metrikleri
- Retention rate

## 🔐 Güvenlik

- ✅ `.env` dosyası `.gitignore`'da
- ✅ API key'ler environment variables'da
- ✅ Production build'lerde test ID'leri kullanılmıyor

## 📝 Notlar

1. **Test ID'leri**: Development'ta test ID'leri kullanılabilir
2. **Production**: Gerçek ID'leri eklemeden production'a geçme
3. **AdMob Onayı**: Hesap onaylanana kadar test reklamları gösterilir
4. **Analytics**: Veriler birkaç saat içinde görünmeye başlar

## 🆘 Sorun Giderme

Detaylı sorun giderme için `ANDROID_SETUP.md` dosyasına bakın.

## 📞 Destek

Sorularınız için: melihkochan.com

