# 🔥 Firebase Config Değerlerini Alma Rehberi

Bu rehber, Firebase Console'dan config değerlerini nasıl alacağınızı gösterir.

## 📍 Adım 1: Firebase Console'da Proje Ayarlarına Git

1. [Firebase Console](https://console.firebase.google.com)'a gidin
2. **"Sleep Sounds"** projenizi seçin (zaten açıksa bu adımı atlayın)
3. Sol üstteki **⚙️ (Settings) ikonu**na tıklayın
4. **"Project settings"** seçeneğine tıklayın

## 📱 Adım 2: Android App Ekle (Henüz Eklenmediyse)

1. **"Project settings"** sayfasında aşağı kaydırın
2. **"Your apps"** bölümünde **"Add app"** butonuna tıklayın
3. **Android ikonu** (🤖) seçin
4. Şu bilgileri girin:
   - **Android package name**: `com.melihkochan.sleepsounds`
   - **App nickname (optional)**: `Sleep Sounds`
   - **Debug signing certificate SHA-1** (şimdilik boş bırakabilirsiniz, sonra ekleyebilirsiniz)
5. **"Register app"** butonuna tıklayın

## 📥 Adım 3: Config Değerlerini Bul

Android app'i ekledikten sonra, Firebase size bir config dosyası gösterecek. İki yöntem var:

### Yöntem 1: google-services.json Dosyası (Android için)
- Bu dosyayı indirin (ileride Android Studio'da kullanacaksınız)
- Dosya: `android/app/google-services.json` konumuna kopyalanacak

### Yöntem 2: Web Config (React için)
1. **"Project settings"** sayfasında
2. Aşağı kaydırın ve **"Your apps"** bölümünde
3. Eğer Web app yoksa, **"Add app"** → **Web (</>)** ikonuna tıklayın
4. App nickname: `Sleep Sounds Web`
5. **"Register app"** tıklayın

## 🔑 Adım 4: Config Değerlerini Kopyala

Web app'i ekledikten sonra, Firebase size şu şekilde bir config gösterecek:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "sleep-sounds-6f9be.firebaseapp.com",
  projectId: "sleep-sounds-6f9be",
  storageBucket: "sleep-sounds-6f9be.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
```

## 📝 Adım 5: .env Dosyası Oluştur

Projenizin **kök dizininde** (package.json'un olduğu yerde) `.env` dosyası oluşturun:

### Windows'ta:
1. Proje klasöründe sağ tık → **Yeni** → **Metin Belgesi**
2. Dosya adını `.env` yapın (uzantısız)
3. İçine şunu yapıştırın:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=sleep-sounds-6f9be.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sleep-sounds-6f9be
VITE_FIREBASE_STORAGE_BUCKET=sleep-sounds-6f9be.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# AdMob Configuration (Şimdilik test ID'leri kullanabilirsiniz)
VITE_ADMOB_APP_ID=ca-app-pub-3940256099942544~3347511713
VITE_ADMOB_BANNER_ID=ca-app-pub-3940256099942544/6300978111
VITE_ADMOB_INTERSTITIAL_ID=ca-app-pub-3940256099942544/1033173712
VITE_ADMOB_REWARDED_ID=ca-app-pub-3940256099942544/5224354917
```

### Önemli Notlar:
- Firebase'den aldığınız **gerçek değerleri** yukarıdaki örneklerin yerine yazın
- `VITE_` öneki **mutlaka** olmalı (Vite için gerekli)
- Dosya adı tam olarak `.env` olmalı (başında nokta var, uzantı yok)

## 🔍 Adım 6: Measurement ID'yi Bul

Eğer `measurementId` görmüyorsanız:

1. Firebase Console → **Analytics** → **Events**
2. Veya **Project settings** → **General** sekmesi
3. Aşağıda **"Your apps"** bölümünde web app'inizin yanında **"Config"** butonuna tıklayın
4. Orada `measurementId` göreceksiniz

## ✅ Adım 7: Doğrulama

`.env` dosyasını oluşturduktan sonra:

1. Development server'ı yeniden başlatın:
   ```bash
   npm run dev
   ```

2. Browser console'da hata olmamalı
3. Firebase Analytics çalışıyorsa, Firebase Console'da event'ler görünmeye başlar

## 📸 Görsel Rehber

Firebase Console'da config değerlerini bulmak için:

1. **⚙️ Settings** → **Project settings**
2. **General** sekmesi
3. Aşağı kaydır → **"Your apps"** bölümü
4. Web app'inizi seçin
5. **"Config"** butonuna tıklayın
6. Orada tüm değerleri göreceksiniz

## 🆘 Sorun Giderme

### .env dosyası çalışmıyor:
- Dosya adının tam olarak `.env` olduğundan emin olun
- `VITE_` önekini kontrol edin
- Development server'ı yeniden başlatın

### Config değerleri bulamıyorum:
- Web app eklediğinizden emin olun (Android app yeterli değil)
- Project settings → General sekmesine bakın

### Measurement ID yok:
- Analytics'i etkinleştirmeniz gerekebilir
- Firebase Console → Analytics → Get started

## 📞 Yardım

Sorun yaşarsanız, Firebase Console'dan aldığınız config değerlerini (API key'ler hariç) paylaşabilirsiniz.

