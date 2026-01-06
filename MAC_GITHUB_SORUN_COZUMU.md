# Mac'te GitHub Clone Sorunu Çözümü

Cursor'da "authorize your device" sorunu yaşıyorsan, alternatif yöntemler:

## 🚀 Çözüm 1: USB ile Kopyala (En Kolay - Önerilen)

### Windows'ta:

1. **Proje klasörünü USB'ye kopyala**:
   - `C:\Users\Melih\Desktop\SleepSounds` klasörünü USB'ye kopyala
   - Veya zip'le ve USB'ye kopyala

### Mac'te:

1. **USB'yi Mac'e tak**
2. **Projeyi Desktop'a kopyala**:
   - Finder'da USB'yi aç
   - `SleepSounds` klasörünü Desktop'a sürükle
3. **Terminal'de**:

```bash
cd ~/Desktop/SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

**✅ Bu yöntem en kolay ve hızlı!**

## 🔧 Çözüm 2: Terminal'den Clone (GitHub CLI)

### Mac Terminal'de:

1. **Terminal'i aç** (Cursor değil, normal Terminal)

2. **GitHub CLI ile clone**:

```bash
# GitHub CLI kurulu mu kontrol et
gh --version

# Eğer yoksa:
brew install gh

# GitHub'a login ol
gh auth login

# Clone yap
cd ~/Desktop
gh repo clone melihkochan/SleepSounds
cd SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

## 🔑 Çözüm 3: Personal Access Token ile Clone

### Windows'ta (GitHub'da):

1. **GitHub.com** → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)**
3. **Note**: "Mac Clone"
4. **Scopes**: ✅ `repo` işaretle
5. **Generate token**
6. **Token'ı kopyala** (bir daha gösterilmez!)

### Mac Terminal'de:

```bash
cd ~/Desktop
git clone https://TOKEN@github.com/melihkochan/SleepSounds.git
cd SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

**TOKEN** yerine Windows'ta oluşturduğun token'ı yapıştır.

## 📦 Çözüm 4: GitHub Desktop (GUI)

### Mac'te:

1. **GitHub Desktop indir**: https://desktop.github.com
2. **GitHub Desktop'u aç**
3. **File** → **Clone repository**
4. **URL** sekmesi → `https://github.com/melihkochan/SleepSounds.git`
5. **Local path**: `~/Desktop`
6. **Clone** tıkla
7. **Terminal'de**:

```bash
cd ~/Desktop/SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

## ⚡ Hızlı Çözüm: USB (Önerilen)

**En kolay yöntem USB!**

### Windows'ta:
1. Proje klasörünü USB'ye kopyala
2. USB'yi Mac'e tak

### Mac'te:
1. USB'den Desktop'a kopyala
2. Terminal'de:
```bash
cd ~/Desktop/SleepSounds
npm install
npm run build
npx cap sync ios
npx cap open ios
```

## 🎯 Önerilen Yol

**USB kullan** - En hızlı ve sorunsuz yöntem!

1. Windows'ta projeyi USB'ye kopyala
2. Mac'te USB'den Desktop'a kopyala
3. Terminal'de `npm install` ve `npx cap open ios`

## ⚠️ Önemli Notlar

- **node_modules kopyalamaya gerek yok** (çok büyük)
- **Mac'te `npm install` çalıştır** (bağımlılıkları kurar)
- **.env dosyası yoksa Mac'te oluştur** (Windows'taki içeriği kopyala)

## ✅ Kontrol Listesi

- [ ] Projeyi USB'ye kopyala (Windows)
- [ ] USB'yi Mac'e tak
- [ ] Projeyi Desktop'a kopyala (Mac)
- [ ] Terminal'de `cd ~/Desktop/SleepSounds`
- [ ] `npm install` çalıştır
- [ ] `npm run build` çalıştır
- [ ] `npx cap sync ios` çalıştır
- [ ] `npx cap open ios` çalıştır
- [ ] Xcode açıldı mı kontrol et

USB en kolay! 🚀

