# 🔧 Android Uygulama Crash Sorunu - Çözüm

## ❌ Sorun: "Sleep Sounds keeps stopping"

Uygulama açılıyor ama hemen crash ediyor. Bu genellikle başlatma hatasıdır.

## 🔍 Adım 1: Logcat'te Hataları Kontrol Et

1. Android Studio'da **alt kısımdaki Logcat** sekmesini açın
2. **Filter** kısmına `Sleep Sounds` veya `FATAL` yazın
3. **Kırmızı hataları** okuyun

### Yaygın Hatalar:

#### Hata 1: Firebase Config Hatası
```
java.lang.IllegalStateException: Default FirebaseApp is not initialized
```
**Çözüm:** `google-services.json` dosyası eksik veya yanlış

#### Hata 2: Missing File
```
java.io.FileNotFoundException: /android_asset/public/index.html
```
**Çözüm:** Web assets sync edilmemiş

#### Hata 3: Network Security
```
java.net.UnknownHostException
```
**Çözüm:** Internet permission veya network security config

## 🔧 Adım 2: google-services.json Kontrolü

1. `android/app/google-services.json` dosyası var mı?
2. Firebase Console'dan **Android app** için indirdiniz mi?
3. Dosya doğru konumda mı? (`android/app/` klasöründe)

**Kontrol:**
```bash
# Terminal'de
ls android/app/google-services.json
```

Eğer yoksa:
1. Firebase Console → Project settings
2. Android app seçin
3. `google-services.json` indirin
4. `android/app/` klasörüne kopyalayın

## 🔧 Adım 3: Web Assets Sync

Web build'i sync edin:

```bash
npm run build
npx cap sync android
```

## 🔧 Adım 4: Firebase Analytics'i Devre Dışı Bırak (Test)

Geçici olarak Firebase'i devre dışı bırakıp test edin:

`src/services/analytics.ts` dosyasında:

```typescript
export const initAnalytics = () => {
  if (typeof window === "undefined") return;
  
  // Geçici olarak devre dışı
  console.log("⚠️ Analytics disabled for testing");
  return;
  
  // ... geri kalan kod
};
```

Eğer bu şekilde çalışırsa, sorun Firebase config'de.

## 🔧 Adım 5: AndroidManifest Permissions

`android/app/src/main/AndroidManifest.xml` dosyasında şunlar olmalı:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## 🔧 Adım 6: Clean Build

1. **Build** → **Clean Project**
2. **Build** → **Rebuild Project**
3. **File** → **Invalidate Caches** → **Invalidate and Restart**

## 📋 Hızlı Kontrol Listesi

- [ ] Logcat'te hata mesajını okudunuz
- [ ] `google-services.json` dosyası var
- [ ] `npm run build` yaptınız
- [ ] `npx cap sync android` yaptınız
- [ ] Internet permission var
- [ ] Clean build yaptınız

## 🆘 Logcat'te Ne Görüyorsunuz?

Logcat'teki **kırmızı hata mesajını** paylaşın, ona göre çözüm sunabilirim.

En yaygın hatalar:
1. Firebase config eksik
2. Web assets sync edilmemiş
3. Missing permission
4. Network security config

