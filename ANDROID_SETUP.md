# Android Setup Guide - Sleep Sounds

Bu rehber, Sleep Sounds uygulamasını Google Play Store'a yüklemek için gereken tüm adımları içerir.

## 📋 Gereksinimler

1. **Google Play Developer Hesabı** ✅ (Hazır)
2. **Firebase Projesi** (Analytics için)
3. **AdMob Hesabı** (Reklamlar için)
4. **Android Studio** (Build için)

## 🔥 1. Firebase Kurulumu

### ⚠️ ÖNEMLİ: Web ve Android İçin İki App Gerekli!

Firebase'de **her platform için ayrı app** oluşturursunuz:
- **Web App** → React web uygulaması için (`.env` dosyasında)
- **Android App** → Native Android için (`google-services.json` dosyasında)

**📖 Detaylı açıklama için:** `FIREBASE_WEB_VS_ANDROID.md` dosyasına bakın

### Adımlar:

#### A) Web App (React için - Şu an kullanılan)

1. [Firebase Console](https://console.firebase.google.com)'a gidin
2. Yeni proje oluşturun: "Sleep Sounds" (yoksa)
3. **Web app ekleyin:**
   - "Add app" → Web ikonu (</>)
   - App nickname: "Sleep Sounds Web"
   - "Register app" tıklayın
4. Config değerlerini kopyalayın
5. `.env` dosyasına ekleyin (detaylar için `FIREBASE_SETUP_GUIDE.md`)

#### B) Android App (Native Android için - Google Play için)

1. Aynı Firebase projesinde
2. **Android app ekleyin:**
   - "Add app" → Android ikonu (🤖)
   - Package name: `com.melihkochan.sleepsounds`
   - App nickname: "Sleep Sounds Android"
   - SHA-1: (Android Studio'dan alınacak, şimdilik boş bırakabilirsiniz)
3. `google-services.json` dosyasını indirin
4. Dosyayı `android/app/` klasörüne kopyalayın (Android platform eklendikten sonra)

### Firebase Analytics'i Etkinleştirin

Her iki app için de Analytics otomatik olarak çalışır. Veriler tek dashboard'da birleşik görünür.

### Environment Variables:

`.env` dosyası oluşturun ve Firebase config değerlerini ekleyin:

**📖 Detaylı rehber için:** `FIREBASE_SETUP_GUIDE.md` dosyasına bakın

**Hızlı adımlar:**
1. Firebase Console → ⚙️ Settings → Project settings
2. "Your apps" bölümünde Web app ekleyin (yoksa)
3. Config değerlerini kopyalayın
4. Proje kök dizininde `.env` dosyası oluşturun
5. Aşağıdaki formatı kullanın:

```env
VITE_FIREBASE_API_KEY=AIzaSy... (Firebase'den alın)
VITE_FIREBASE_AUTH_DOMAIN=sleep-sounds-6f9be.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sleep-sounds-6f9be
VITE_FIREBASE_STORAGE_BUCKET=sleep-sounds-6f9be.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef...
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**⚠️ Önemli:** Firebase Console'dan aldığınız gerçek değerleri yazın!

## 📱 2. AdMob Kurulumu

### Adımlar:

1. [AdMob Console](https://apps.admob.com)'a gidin
2. Yeni app ekleyin: "Sleep Sounds"
3. Ad unit'ler oluşturun:
   - Banner Ad
   - Interstitial Ad
   - Rewarded Ad
4. Ad unit ID'lerini `.env` dosyasına ekleyin

### Environment Variables:

```env
VITE_ADMOB_APP_ID=ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
VITE_ADMOB_BANNER_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
VITE_ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
VITE_ADMOB_REWARDED_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
```

## 🛠️ 3. Capacitor Android Setup

### Adımlar:

```bash
# 1. Build web uygulaması
npm run build

# 2. Android platform ekle
npx cap add android

# 3. Android Studio'da aç
npx cap open android
```

### Android Studio'da:

1. `google-services.json` dosyasını `android/app/` klasörüne kopyalayın
2. `android/app/build.gradle` dosyasına Firebase plugin ekleyin
3. Sync Gradle Files
4. Build > Generate Signed Bundle / APK

## 📊 4. Analytics Event'leri

Uygulama şu event'leri otomatik olarak track ediyor:

- `app_open` - Uygulama açılışı
- `sound_play` - Ses çalma
- `sound_stop` - Ses durdurma
- `volume_change` - Ses seviyesi değişimi
- `timer_set` - Zamanlayıcı ayarlama
- `sleep_mode_enter` - Uyku moduna girme
- `language_change` - Dil değişimi

Firebase Console > Analytics > Events bölümünden tüm event'leri görebilirsiniz.

## 💰 5. Reklam Entegrasyonu

### Banner Reklam:

Banner reklamlar otomatik olarak gösterilecek. İsterseniz manuel olarak kontrol edebilirsiniz:

```typescript
import { showBannerAd, hideBannerAd } from "@/services/admob";

// Reklam göster
showBannerAd("your_banner_id", "bottom");

// Reklam gizle
hideBannerAd();
```

### Interstitial Reklam:

Belirli aksiyonlardan sonra gösterilebilir (örn: ses ekleme, uyku moduna girme):

```typescript
import { showInterstitialAd } from "@/services/admob";

showInterstitialAd("your_interstitial_id");
```

## 🛒 6. In-App Purchase (Gelecek)

In-app purchase için Google Play Billing API kullanılacak. Şu an için hazırlık yapıldı, implementasyon ileride eklenecek.

## 📦 7. APK/AAB Oluşturma

### Release Build:

```bash
# 1. Web build
npm run build

# 2. Capacitor sync
npx cap sync android

# 3. Android Studio'da:
# Build > Generate Signed Bundle / APK
# AAB formatını seçin (Google Play için)
```

### Signing:

1. Key store oluşturun (ilk kez)
2. Key store bilgilerini güvenli bir yerde saklayın
3. AAB dosyasını Google Play Console'a yükleyin

## 🚀 8. Google Play Console

### İlk Yükleme:

1. [Google Play Console](https://play.google.com/console)'a gidin
2. Yeni app oluşturun
3. Store listing bilgilerini doldurun:
   - App name: "Sleep Sounds"
   - Short description
   - Full description
   - Screenshots
   - Icon
   - Feature graphic
4. Content rating alın
5. Privacy policy ekleyin
6. AAB dosyasını yükleyin
7. Release'e çıkarın

## 📈 9. Monitoring

### Firebase Analytics:

- Kullanıcı sayısı
- Aktif kullanıcılar
- Event'ler
- Kullanıcı segmentasyonu
- Coğrafi dağılım

### AdMob:

- Reklam gösterimleri
- Tıklamalar
- Gelir
- eCPM

### Google Play Console:

- İndirme sayısı
- Kullanıcı yorumları
- Crash raporları
- Performans metrikleri

## 🔐 10. Güvenlik

- `.env` dosyasını `.gitignore`'a ekleyin
- API key'leri asla commit etmeyin
- Production build'lerde test ID'leri kullanmayın
- ProGuard/R8 kurallarını yapılandırın

## 📝 Notlar

- İlk yüklemede test ID'leri kullanılabilir
- Production'a geçmeden önce gerçek ID'leri ekleyin
- AdMob hesabı onaylanana kadar test reklamları gösterilir
- Analytics verileri birkaç saat içinde görünmeye başlar

## 🆘 Sorun Giderme

### Build Hataları:

```bash
# Clean build
cd android
./gradlew clean
cd ..
npx cap sync android
```

### Firebase Bağlantı Sorunları:

- `google-services.json` dosyasının doğru yerde olduğundan emin olun
- Package name'in eşleştiğini kontrol edin
- SHA-1 fingerprint'i Firebase'e eklediğinizden emin olun

### AdMob Sorunları:

- Ad unit ID'lerin doğru olduğunu kontrol edin
- Test device ID'lerini ekleyin
- AdMob hesabının aktif olduğundan emin olun

## 📞 Destek

Sorularınız için: melihkochan.com

