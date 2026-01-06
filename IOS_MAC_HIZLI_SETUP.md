# iOS Hızlı Setup - Mac'te

Capacitor kullandığımız için Firebase SDK'yi manuel eklemeye **GEREK YOK**! Sadece config dosyasını ekle.

## ⚡ Hızlı Adımlar

### 1. Firebase Console'da (Next Next Geç)

Firebase Console'da şu adımları yap:

1. **Step 1: Register app** ✅ (Zaten yaptın)
   - Bundle ID: `com.melihkochan.sleepsounds`
   - App nickname: Sleep Sounds iOS

2. **Step 2: Download config file** ⭐ **ÖNEMLİ**
   - **"GoogleService-Info.plist"** dosyasını **İNDİR**
   - Bu dosyayı Mac'e kaydet (Masaüstüne veya Downloads'a)

3. **Step 3: Add Firebase SDK** ⏭️ **ATLA**
   - **Next** diyip geç
   - Capacitor plugin zaten Firebase'i handle ediyor
   - Manuel SDK eklemeye gerek yok!

4. **Step 4: Add initialization code** ⏭️ **ATLA**
   - **Next** diyip geç
   - Kod zaten hazır (`analytics.ts`)

5. **Step 5: Next steps** ⏭️ **ATLA**
   - **Finish** diyip geç

### 2. Mac'te Xcode'u Aç

```bash
# Mac'te projeyi aç
cd SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

### 3. GoogleService-Info.plist'i Xcode'a Ekle

1. Xcode açıldığında sol panelde **App** klasörüne sağ tık
2. **"Add Files to App..."** seç
3. İndirdiğin **GoogleService-Info.plist** dosyasını seç
4. ✅ **"Copy items if needed"** işaretle
5. ✅ **"Add to targets: App"** işaretle
6. **Add** tıkla

### 4. AdMob App ID Ekle (Opsiyonel - Sonra)

1. Xcode'da **Info.plist** dosyasını aç
2. **"+"** butonuna tıkla
3. **Key**: `GADApplicationIdentifier`
4. **Type**: String
5. **Value**: AdMob App ID (AdMob Console'dan al)

### 5. Build ve Test

1. Xcode'da üstteki cihaz seçiciden bir simulator seç
2. ▶️ **Run** butonuna tıkla (Cmd+R)
3. Uygulama çalışmalı!

## ✅ Özet

**Firebase Console'da:**
- ✅ Step 1: Register app (yaptın)
- ⭐ **Step 2: GoogleService-Info.plist İNDİR** (ÖNEMLİ!)
- ⏭️ Step 3-5: Next next geç (gerek yok)

**Mac'te:**
- ✅ Xcode'u aç (`npx cap open ios`)
- ✅ GoogleService-Info.plist'i Xcode'a ekle
- ✅ Build al ve test et

## 🎯 Neden Manuel SDK Gerekmiyor?

- ✅ Capacitor Firebase Analytics plugin kullanıyoruz
- ✅ Plugin zaten Firebase SDK'yi handle ediyor
- ✅ Sadece config dosyası (`GoogleService-Info.plist`) yeterli
- ✅ Kod zaten hazır (`src/services/analytics.ts`)

## 🚀 Sonraki Adımlar

1. **Test et**: Simulator'da çalıştır
2. **Gerçek cihazda test et**: iPhone'a yükle
3. **App Store Connect**: Build yükle ve yayınla

## ⚠️ Önemli Notlar

- **GoogleService-Info.plist mutlaka indirilmeli** (Step 2)
- **Xcode'a mutlaka eklenmeli** (App klasörüne)
- **Manuel SDK eklemeye gerek yok** (Capacitor plugin var)
- **Kod zaten hazır** (analytics.ts)

Firebase Console'da Step 2'de GoogleService-Info.plist'i indir, sonra Next next geç! 🚀

