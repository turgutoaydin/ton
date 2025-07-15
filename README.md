# The Open Nations - 3D Dünya Projesi

![The Open Nations Logosu](assets/images/logo.png)

Bu proje, Three.js kullanılarak oluşturulmuş, etkileşimli ve dinamik bir 3D dünya haritasıdır. Kullanıcılar, sanal bir dünya üzerinde parselleri keşfedebilir, satın alabilir ve geliştirebilirler. Projenin temel amacı, ölçeklenebilir ve kolayca yönetilebilir bir sanal evren altyapısı oluşturmaktır.

---

## ✨ Temel Özellikler

* **Etkileşimli 3D Harita:** Three.js ile oluşturulmuş, fare ve dokunmatik hareketlerle (yakınlaştırma, döndürme, kaydırma) tamamen kontrol edilebilen bir 3D dünya.
* **Dinamik Arazi Yüksekliği:** Arazilerin `level` (seviye) değerine göre küp yükseklikleri dinamik olarak değişir, bu da haritaya görsel bir hiyerarşi katar.
* **Veri Odaklı Tasarım:** Haritadaki tüm özel araziler ve coğrafi şekiller (denizler, göller) `mapData.js` dosyasından yönetilir. Ana koda dokunmadan haritayı özelleştirmek mümkündür.
* **Dinamik Renklendirme:** `mapData.js` üzerinden her özel parsele benzersiz bir renk atanabilir.
* **Atmosferik Görseller:** Gece temasını andıran bir arka plan ve hareketli yıldız tarlası ile zenginleştirilmiş bir görsel deneyim.
* **Oval Dünya Zemini:** Standart kare bir zemin yerine, daha estetik ve "dünya" hissi veren oval bir disk zemin kullanılmıştır.
* **Performans Optimizasyonu:** Milyonlarca parseli listelemek yerine, sadece "özel" parselleri veri dosyasında tutarak ve varsayılan boş arazileri anlık olarak üreterek maksimum performans ve hızlı yükleme süreleri sağlanır.

---

## 📂 Dosya Yapısı

Proje, kodun daha temiz ve yönetilebilir olması için aşağıdaki dosya yapısını kullanır:

.├── index.html              # Ana HTML dosyası, sayfanın iskeleti├── assets/│   ├── css/│   │   └── styles.css      # Tüm görsel stiller│   ├── js/│   │   ├── main.js         # Ana oyun mantığı, 3D motoru ve etkileşimler│   │   └── mapData.js      # Haritadaki özel araziler ve deniz bölgeleri verisi│   └── images/│       ├── logo.png        # Proje logosu│       └── map.png         # Varsayılan parsel kapak resmi
---

## 🚀 Nasıl Çalıştırılır?

Projeyi yerel ortamınızda çalıştırmak için herhangi bir sunucuya ihtiyacınız yoktur.

1.  Proje dosyalarını bilgisayarınıza indirin.
2.  `index.html` dosyasına çift tıklayarak favori web tarayıcınızda açın.

---

## 🔧 Nasıl Özelleştirilir?

Projenin en güçlü yanı, `assets/js/mapData.js` dosyası üzerinden kolayca özelleştirilebilmesidir.

### Yeni Bir Özel Arazi Ekleme

1.  `assets/js/mapData.js` dosyasını açın.
2.  `specialParcels` objesinin içine yeni bir giriş ekleyin. Anahtar, arazinin `x,z` koordinatı olmalıdır.

    ```javascript
    // Örnek yeni arazi
    "15,15": {
      id: 'TON_NEW_LAND',
      level: 2, // Küpün yüksekliği (2 kat)
      owner: { telegramId: '@yeni_kullanici' },
      title: 'Yeni Keşfedilen Vaha',
      description: 'Çölün ortasında bir yaşam kaynağı.',
      coverImage: 'assets/images/vaha.png', // Özel kapak resmi (opsiyonel)
      color: '#32CD32', // Parlak yeşil renk
      stats: { Defence: 10, Economy: 5, Population: 20 },
      metaWorldId: 'MW_Oasis'
    }
    ```

### Yeni Bir Deniz veya Göl Alanı Ekleme

1.  `assets/js/mapData.js` dosyasını açın.
2.  `seaRegions` dizisinin içine yeni bir obje ekleyin. Bu obje, boş bırakılacak dikdörtgen alanın başlangıç (`from`) ve bitiş (`to`) koordinatlarını içermelidir.

    ```javascript
    // Örnek yeni göl
    { from: { x: -15, z: -15 }, to: { x: -10, z: -10 } }
    ```
Bu işlemden sonra sayfayı yenilediğinizde, `-15,-15` ile `-10,-10` koordinatları arasındaki alanda kara küpleri oluşmayacak ve bu bölge deniz olarak görünecektir.

---

## 💻 Kullanılan Teknolojiler

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **Three.js:** 3D grafikleri oluşturmak ve yönetmek için kullanılan ana kütüphane.

