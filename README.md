# Sleep Sounds 🌙

Huzurlu bir uyku için rahatlatıcı ortam seslerini karıştırın. Yağmur, şömine, kuşlar, rüzgar ve daha fazlası!

## 🎵 Özellikler

- 🎚️ Birden fazla sesi aynı anda karıştırma
- 🔊 Her ses için ayrı ses seviyesi kontrolü
- ⏱️ Zamanlayıcı ile otomatik durdurma
- 📱 Responsive tasarım (mobil ve desktop)
- 🌟 Modern ve kullanıcı dostu arayüz

## 🚀 Kurulum

```sh
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 🛠️ Teknolojiler

- **Vite** - Hızlı build tool
- **TypeScript** - Tip güvenliği
- **React** - UI framework
- **shadcn-ui** - UI bileşenleri
- **Tailwind CSS** - Styling
- **Lucide React** - İkonlar

## 📁 Proje Yapısı

```
SleepSounds/
├── public/
│   ├── Sounds/          # Ses dosyaları (MP3)
│   └── logo.png         # Logo
├── src/
│   ├── components/      # React bileşenleri
│   ├── data/           # Ses verileri
│   ├── hooks/          # Custom hooks
│   └── pages/          # Sayfalar
└── package.json
```

## 🎵 Ses Dosyaları Ekleme

1. MP3 dosyalarınızı `public/Sounds/` klasörüne ekleyin
2. `src/data/sounds.ts` dosyasında ilgili sesin `audioUrl`'ini güncelleyin:
   ```typescript
   {
     id: "rain",
     name: "Yağmur",
     audioUrl: "/Sounds/Rain.mp3",
   }
   ```

## 📝 Lisans

Bu proje açık kaynaklıdır ve ücretsiz kullanılabilir.
