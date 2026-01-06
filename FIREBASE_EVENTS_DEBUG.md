# 🔍 Firebase Events Debug Rehberi

## ❌ Sorun: Event'ler Firebase Console'da Görünmüyor

### 🔍 Kontrol Listesi

#### 1. Firebase Console'da Doğru App'i Seçin ⚠️ ÖNEMLİ!

Firebase Console'da URL'de şunu görüyorsunuz:
```
.../android:com.melihkochan.sleepsounds/events/...
```

Bu **Android app**! Ama siz **Web app** kullanıyorsunuz!

**Çözüm:**
1. Firebase Console → Sol üstte "Sleep Sounds" yanındaki dropdown'a tıklayın
2. **Web app**'i seçin (</> ikonu)
3. Veya URL'yi değiştirin: `android:com.melihkochan.sleepsounds` → `web:1:...` (app ID'niz)

#### 2. Browser Console'da Event'leri Kontrol Edin

Browser console'da (F12) şu mesajları görmelisiniz:
```
📊 Event tracked: sound_play {sound_id: "rain"}
📊 Event tracked: sound_stop {sound_id: "rain"}
```

Eğer görmüyorsanız:
- `⚠️ Analytics not initialized` → Firebase config sorunu
- Hiçbir mesaj yok → Event tracking çalışmıyor

#### 3. Firebase Analytics Real-time Kontrol

Firebase Console'da:
1. **Analytics** → **Events** → **Real-time** sekmesine gidin
2. Bir ses açın
3. 1-2 saniye içinde event görünmeli

**Not:** Real-time sadece son 30 dakikayı gösterir!

#### 4. Event'lerin Görünmesi İçin Bekleme Süresi

- **Real-time:** 1-2 saniye (sadece son 30 dakika)
- **Standard Events:** 24-48 saat (tam veri işleme)

Yeni event'ler hemen görünmeyebilir!

#### 5. Debug Mode Kontrolü

Browser console'da şunu çalıştırın:
```javascript
// Firebase Analytics debug modunu aç
localStorage.setItem('firebase:debug', '*');
```

Sonra sayfayı yenileyin ve event'leri tekrar deneyin.

## ✅ Doğru Kontrol Adımları

### Adım 1: Browser Console Kontrolü
1. F12 → Console
2. Bir ses açın
3. Şu mesajı görmelisiniz: `📊 Event tracked: sound_play`

### Adım 2: Firebase Console - Real-time
1. Firebase Console → Analytics → Events
2. **Real-time** sekmesine tıklayın
3. **Web app**'i seçtiğinizden emin olun (sol üstte)
4. Bir ses açın
5. 1-2 saniye içinde `sound_play` event'i görünmeli

### Adım 3: Firebase Console - Standard Events
1. **Events** sekmesine gidin (Real-time değil)
2. **Web app** seçili olduğundan emin olun
3. Tarih aralığını "Last 24 hours" yapın
4. Event'ler 24 saat içinde görünmeye başlar

## 🐛 Yaygın Sorunlar

### Sorun 1: "No data available"
**Sebep:** Yanlış app seçili (Android yerine Web)
**Çözüm:** Web app'i seçin

### Sorun 2: Console'da "Analytics not initialized"
**Sebep:** Firebase config eksik veya yanlış
**Çözüm:** `.env` dosyasını kontrol edin

### Sorun 3: Event'ler console'da görünüyor ama Firebase'de yok
**Sebep:** 
- Yanlış app seçili
- Real-time'da değilsiniz
- Henüz işlenmedi (24 saat bekle)

**Çözüm:** 
- Web app'i seçin
- Real-time sekmesine gidin
- Biraz bekleyin

## 📊 Test Event'leri

Browser console'da manuel test:
```javascript
// Firebase Analytics'i test et
import { trackSoundPlay } from './src/services/analytics';
trackSoundPlay('test_sound');
```

Console'da `📊 Event tracked: sound_play` görmelisiniz.

## 🎯 Hızlı Kontrol

1. ✅ Browser console açık mı? (F12)
2. ✅ Bir ses açın
3. ✅ Console'da `📊 Event tracked: sound_play` görünüyor mu?
4. ✅ Firebase Console → Web app seçili mi?
5. ✅ Real-time sekmesinde misiniz?
6. ✅ 1-2 saniye beklediniz mi?

Hepsi ✅ ise event'ler çalışıyor demektir!

## 📞 Hala Çalışmıyorsa

1. Browser console'daki hata mesajlarını kontrol edin
2. `.env` dosyasındaki Firebase config'i kontrol edin
3. Development server'ı yeniden başlatın
4. Browser cache'ini temizleyin

