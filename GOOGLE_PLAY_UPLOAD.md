# 📱 Google Play Console'a Yükleme Rehberi

## ✅ Tamamlanan Adımlar

- ✅ Android Studio'da build alındı
- ✅ APK/AAB dosyası oluşturuldu
- ✅ Signed bundle hazır

## 🚀 Google Play Console'a Yükleme

### 1. Google Play Console'a Giriş

1. [Google Play Console](https://play.google.com/console) → Giriş yapın
2. Developer hesabınızla giriş yapın (zaten hazırsınız)

### 2. Yeni App Oluşturma

1. **"Create app"** butonuna tıklayın
2. **App bilgileri:**
   - **App name:** "Sleep Sounds"
   - **Default language:** Türkçe (veya İngilizce)
   - **App or game:** App
   - **Free or paid:** Free
   - **Declarations:** Tüm kutuları işaretleyin
3. **"Create app"** tıklayın

### 3. Store Listing (Mağaza Bilgileri)

**Gerekli bilgiler:**

1. **App name:** Sleep Sounds
2. **Short description** (80 karakter):
   ```
   Huzurlu bir uyku için rahatlatıcı ortam sesleri. Yağmur, şömine, kuşlar ve daha fazlası.
   ```

3. **Full description** (4000 karakter):
   ```
   Sleep Sounds - Huzurlu bir uyku için rahatlatıcı ortam sesleri uygulaması.

   🌙 Özellikler:
   • Birden fazla sesi aynı anda karıştırma
   • Her ses için ayrı ses seviyesi kontrolü
   • Zamanlayıcı ile otomatik durdurma
   • Uyku modu ile rahatlatıcı deneyim
   • 11 dil desteği
   • Modern ve kullanıcı dostu arayüz

   🎵 Sesler:
   • Yağmur
   • Şömine
   • Kuşlar
   • Rüzgar
   • Dalgalar
   • Gece
   • Kafe
   • Gök Gürültüsü
   • Orman
   • Tren

   Uykuya dalmakta zorlanıyor musunuz? Sleep Sounds ile rahatlatıcı ortam seslerini karıştırın ve huzurlu bir uyku geçirin.
   ```

4. **App icon:** Logo dosyanızı yükleyin (512x512 px)
5. **Feature graphic:** (1024x500 px) - İsteğe bağlı ama önerilir
6. **Screenshots:**
   - **Phone:** En az 2, en fazla 8 screenshot
   - **Tablet:** (İsteğe bağlı)
   - **TV:** (İsteğe bağlı)

7. **Category:** Health & Fitness veya Lifestyle
8. **Contact details:**
   - Email: melihkochan.com
   - Website: https://melihkochan.com

### 4. Content Rating (İçerik Derecelendirme)

1. **Content rating** bölümüne gidin
2. Anketi doldurun:
   - App türü: Utility / Health
   - Şiddet içeriği: Hayır
   - Cinsel içerik: Hayır
   - Uyuşturucu: Hayır
   - vs.
3. Rating alın (genellikle "Everyone" olur)

### 5. Privacy Policy (Gizlilik Politikası)

**Gerekli!** Privacy policy URL'si eklemeniz gerekiyor.

**Seçenekler:**
1. Kendi sitenizde oluşturun: `https://melihkochan.com/privacy-policy`
2. Ücretsiz servisler:
   - [Privacy Policy Generator](https://www.privacypolicygenerator.info/)
   - [FreePrivacyPolicy](https://www.freeprivacypolicy.com/)

**Privacy Policy'de olması gerekenler:**
- Hangi veriler toplanıyor (Analytics)
- Veriler nasıl kullanılıyor
- Reklamlar (AdMob)
- Kullanıcı hakları

### 6. App Access (Uygulama Erişimi)

1. **"All functionality is available without restrictions"** seçin
2. Veya gerekirse açıklama ekleyin

### 7. Data Safety (Veri Güvenliği)

1. **Data collection** bölümüne gidin
2. **Evet, veri topluyorum** seçin
3. **Analytics** için:
   - App interactions
   - Device or other IDs
4. **Advertising** için:
   - Advertising ID
5. Verilerin nasıl kullanıldığını belirtin

### 8. Target Audience (Hedef Kitle)

1. **Target age:** 18+ veya All ages
2. **Primary audience:** Adults
3. **Content guidelines:** Uygun seçenekleri işaretleyin

### 9. App Content (Uygulama İçeriği)

1. **Export compliance:** Genellikle "No" (ses uygulaması)
2. **US Content Rating:** Anketi doldurun
3. **COVID-19 contact tracing:** No

### 10. Production Release (Yayınlama)

1. Sol menüden **"Production"** → **"Create new release"**
2. **Release name:** 1.0.0 (veya istediğiniz versiyon)
3. **Release notes:**
   ```
   İlk sürüm
   - 10 farklı rahatlatıcı ortam sesi
   - Ses karıştırma özelliği
   - Zamanlayıcı
   - Uyku modu
   - 11 dil desteği
   ```
4. **AAB dosyasını yükleyin:**
   - "Upload" butonuna tıklayın
   - Oluşturduğunuz `.aab` dosyasını seçin
   - Yükleme tamamlanana kadar bekleyin

### 11. Review ve Yayınlama

1. Tüm bölümlerin tamamlandığını kontrol edin:
   - ✅ Store listing
   - ✅ Content rating
   - ✅ Privacy policy
   - ✅ Data safety
   - ✅ Production release

2. **"Review release"** butonuna tıklayın
3. Hataları düzeltin (varsa)
4. **"Start rollout to Production"** tıklayın
5. Google incelemesi başlayacak (1-7 gün)

## ⏱️ İnceleme Süreci

- **İlk inceleme:** 1-7 gün
- **Güncellemeler:** Genellikle 1-3 gün
- **Durum:** Play Console'da takip edebilirsiniz

## 📊 Yayınlandıktan Sonra

1. **Analytics:** Firebase Console'da kullanıcı verilerini görün
2. **Reviews:** Kullanıcı yorumlarını takip edin
3. **Crashes:** Crash raporlarını kontrol edin
4. **Revenue:** AdMob gelirlerini takip edin

## 🆘 Yaygın Sorunlar

### "Privacy policy required"
- Privacy policy URL'si ekleyin

### "Content rating incomplete"
- Content rating anketini tamamlayın

### "Screenshots required"
- En az 2 screenshot ekleyin

### "Data safety form incomplete"
- Data safety formunu doldurun

## 📝 Checklist

Yayınlamadan önce kontrol edin:

- [ ] Store listing tamamlandı
- [ ] Screenshots eklendi (en az 2)
- [ ] App icon yüklendi
- [ ] Content rating alındı
- [ ] Privacy policy URL eklendi
- [ ] Data safety formu dolduruldu
- [ ] AAB dosyası yüklendi
- [ ] Release notes yazıldı
- [ ] Tüm bölümler tamamlandı

## 🎉 Başarılar!

Tüm adımları tamamladıktan sonra uygulamanız Google Play Store'da yayınlanacak!

## 📞 Sonraki Adımlar

1. İnceleme sürecini bekleyin
2. Gerekirse düzeltmeler yapın
3. Yayınlandıktan sonra kullanıcı geri bildirimlerini takip edin
4. Güncellemeler yayınlayın

