# Projeyi Mac'e Aktarma Rehberi

Windows'taki projeyi Mac'e aktarmak için birkaç yöntem:

## 🚀 Yöntem 1: Git (Önerilen - En Kolay)

### Windows'ta (Şimdi):

1. **GitHub'a push et** (eğer repo yoksa oluştur):

```bash
# Git repo var mı kontrol et
git status

# Eğer Git repo yoksa:
git init
git add .
git commit -m "iOS için hazırlık"

# GitHub'da yeni repo oluştur (github.com)
# Sonra:
git remote add origin https://github.com/KULLANICI_ADI/SleepSounds.git
git branch -M main
git push -u origin main
```

### Mac'te (Kardeşinin Mac'inde):

```bash
# Projeyi klonla
git clone https://github.com/KULLANICI_ADI/SleepSounds.git
cd SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

## 📦 Yöntem 2: USB / Harici Disk

### Windows'ta:

1. **Projeyi zip'le**:
   - Proje klasörüne sağ tık → **Send to** → **Compressed (zipped) folder**
   - Veya manuel olarak zip'le

2. **USB'ye kopyala**:
   - Zip dosyasını USB'ye kopyala
   - Veya tüm proje klasörünü kopyala

### Mac'te:

1. **USB'yi Mac'e tak**
2. **Projeyi Mac'e kopyala** (Desktop veya Documents)
3. **Zip'i aç** (eğer zip'lediysen)
4. **Terminal'de**:

```bash
cd ~/Desktop/SleepSounds  # veya kopyaladığın yer
npm install
npm run build
npx cap sync ios
npx cap open ios
```

## ☁️ Yöntem 3: Cloud Storage (Google Drive, Dropbox, OneDrive)

### Windows'ta:

1. **Projeyi zip'le** (node_modules hariç - çok büyük):
   - `node_modules` klasörünü sil (sonra `npm install` ile tekrar kurulur)
   - Projeyi zip'le
   - Google Drive / Dropbox / OneDrive'a yükle

### Mac'te:

1. **Cloud storage'dan indir**
2. **Zip'i aç**
3. **Terminal'de**:

```bash
cd ~/Downloads/SleepSounds  # veya indirdiğin yer
npm install  # node_modules'ü tekrar kur
npm run build
npx cap sync ios
npx cap open ios
```

## 🔗 Yöntem 4: Network Share (Aynı WiFi)

### Windows'ta:

1. **Proje klasörünü paylaş**:
   - Proje klasörüne sağ tık → **Properties** → **Sharing** → **Share**
   - Kullanıcı ekle ve izin ver

2. **IP adresini öğren**:
   ```powershell
   ipconfig
   ```
   - IPv4 Address'i not et (örn: 192.168.1.100)

### Mac'te:

1. **Finder'da**:
   - **Go** → **Connect to Server** (Cmd+K)
   - `smb://192.168.1.100` yaz (Windows IP'si)
   - Bağlan
   - Proje klasörünü Mac'e kopyala

2. **Terminal'de**:

```bash
cd ~/Desktop/SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

## ⚡ Hızlı Yöntem: USB (En Pratik)

### Adımlar:

1. **Windows'ta**:
   - Proje klasörünü USB'ye kopyala
   - Veya zip'le ve USB'ye kopyala

2. **Mac'te**:
   - USB'yi tak
   - Projeyi Desktop'a kopyala
   - Terminal aç:
   ```bash
   cd ~/Desktop/SleepSounds
   npm install
   npm run build
   npx cap sync ios
   npx cap open ios
   ```

## ⚠️ Önemli Notlar

### node_modules Klasörü

- **node_modules çok büyük** (100+ MB)
- **USB/Cloud'a kopyalamadan önce sil**:
  ```bash
  # Windows'ta
  rmdir /s /q node_modules
  ```
- **Mac'te tekrar kur**:
  ```bash
  npm install
  ```

### .env Dosyası

- **.env dosyası Git'e eklenmez** (.gitignore'da)
- **Mac'te manuel oluştur**:
  ```bash
  # Mac'te .env dosyası oluştur
  # Windows'taki .env içeriğini kopyala
  ```

### iOS Klasörü

- **iOS klasörü zaten var** (Windows'ta oluşturuldu)
- **Mac'te sadece sync et**:
  ```bash
  npx cap sync ios
  ```

## ✅ Mac'te İlk Kurulum

Projeyi Mac'e kopyaladıktan sonra:

```bash
# 1. Proje klasörüne git
cd ~/Desktop/SleepSounds  # veya kopyaladığın yer

# 2. Bağımlılıkları kur
npm install

# 3. Build al
npm run build

# 4. iOS'a sync et
npx cap sync ios

# 5. Xcode'u aç
npx cap open ios
```

## 🎯 Önerilen Yöntem

**USB kullan** (en hızlı ve kolay):

1. Windows'ta projeyi USB'ye kopyala
2. Mac'te USB'den Desktop'a kopyala
3. Terminal'de `npm install` ve `npx cap open ios`

## 📝 Kontrol Listesi

- [ ] Projeyi Mac'e kopyala (USB/Cloud/Git)
- [ ] Mac'te `npm install` çalıştır
- [ ] Mac'te `npm run build` çalıştır
- [ ] Mac'te `npx cap sync ios` çalıştır
- [ ] Mac'te `npx cap open ios` çalıştır
- [ ] Xcode açıldı mı kontrol et
- [ ] GoogleService-Info.plist'i Xcode'a ekle

Hangi yöntemi kullanacaksın? USB en pratik! 🚀

