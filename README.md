<p align="center"><img src="assets/images/logo.png" alt="The Open Nations Logosu" width="150"></p><h1 align="center">The Open Nations - Yeni Bir Gezegenin Doğuşu</h1><p align="center"><strong>TON Evreninin derinliklerinde, keşfedilmeyi bekleyen yeni bir dijital gezegen...</strong><br>Bu, sadece bir proje değil; merkeziyetsiz bir geleceğin temelleri üzerine inşa edilen, yaşayan, nefes alan bir dünyanın başlangıcıdır.</p>📖 Hikaye: Keşif ÇağrısıTON (The Open Network) galaksisinin bilinmeyen bir köşesinde, yeni bir gezegenin sinyalleri alındı. Üzerinde yükselen neon ışıklı bir başkent, devasa anıtlar ve keşfedilmemiş topraklardan oluşan bu dünya, dijital öncüler için yeni bir başlangıç vaat ediyor. Burası, her bir kara parçasının gerçek dijital mülkiyete dönüşebileceği, toplulukların kendi kaderlerini çizebileceği ve yeni bir medeniyetin inşa edilebileceği The Open Nations gezegeni.Bu, o gezegene yapılan ilk test yayınıdır. Henüz ham, henüz vahşi... Ama potansiyeli sınırsız. Seni, bu yeni dünyanın kurucularından biri olmaya davet ediyoruz.✨ Gezegenin ÖzellikleriBu yeni dünya, en son teknolojilerle hayat buldu ve yaşayan bir atmosfer sunuyor:Canlı Atmosfer: İstanbul saatine göre işleyen gerçek zamanlı gündüz-gece döngüsü. Güneşin doğuşunu izleyin, akşamın kızıllığında gezinin ve geceleri parlayan ayı ve yıldızları seyredin.Dinamik Hava Durumu: Periyodik olarak değişen hava koşulları. Bazen gökyüzü bulutlarla kaplanacak, bazen de sakin bir yağmur toprağı ıslatacak.Etkileşimli 3D Dünya: Three.js ile oluşturulmuş, fare ve dokunmatik hareketlerle tamamen kontrol edilebilen bir 3D evren.Keşfedilebilir Coğrafya: mapData.js üzerinden yönetilen, içinde nehirlerin, göllerin ve okyanusların bulunduğu geniş ve dağınık bir harita.İkonik Anıtlar: BTC, ETH, TON, Pavel Durov ve Elon Musk gibi dijital ve teknolojik dünyanın ikonlarına adanmış devasa anıtları keşfedin.Yaşayan Başkent: Evrenin merkezi olan "The Open Nations" küpü, neon ışıkları, etrafında dönen enerji halkaları ve köşelerindeki logolarıyla diğer tüm arazilerden ayrışır.Metaverse Deneyimi: Başkente sadece bakmakla kalmayın! "Ziyaret Et" butonuyla küpün içine girin, etrafı duvarlarla çevrili özel meta alanında W, A, S, D tuşlarıyla yürüyün ve bu yeni dünyanın bir parçası olun.🔮 Gelecek Vizyonu: Bu Sadece BaşlangıçBu test yayını, çok daha büyük bir vizyonun ilk adımıdır. Gelecekte gezegenimize eklenmesi planlanan özellikler:Gerçek Ekonomi: Arazilerin kaynak (enerji, mineral, gıda) üretmesi ve bu kaynakların ticaretinin yapılması.İnşa ve Geliştirme: Seviye atlayan arazilerin üzerine savunma kuleleri, pazar yerleri, teknoloji merkezleri gibi özel yapılar inşa etme.Uluslar ve İttifaklar: Kullanıcıların bir araya gelerek kendi uluslarını kurması, bayraklarını dalgalandırması ve diğer uluslarla diplomatik veya ticari ilişkiler kurması.Tam Blockchain Entegrasyonu: Her bir kara parselinin TON ağı üzerinde bir NFT'ye dönüştürülmesi, böylece kullanıcıların arazilerine gerçek anlamda sahip olmaları ve onları cüzdanları üzerinden alıp satabilmeleri.📂 Dosya YapısıProje, gelecekteki geliştirmeleri kolaylaştırmak için temiz ve modüler bir yapıya sahiptir. Ancak mevcut stabil versiyon, "siyah ekran" sorunlarını ortadan kaldırmak için tüm mantığı tek bir main.js dosyasında birleştirmiştir..
├── index.html              # Ana HTML dosyası
├── assets/
│   ├── css/
│   │   └── styles.css      # Tüm görsel stiller
│   ├── js/
│   │   ├── main.js         # Projenin tüm mantığını içeren ana dosya
│   │   └── mapData.js      # Gezegenin veri tabanı (Özelleştirme buradan yapılır)
│   └── images/
│       ├── logo.png
│       └── map.png
🔧 Nasıl Özelleştirilir?Gezegeninize yeni bir hayat vermek çok kolay! Yeni bir anıt veya özel bölge eklemek için ana koda dokunmanıza gerek yok. Sadece assets/js/mapData.js dosyasını açın ve specialParcels objesine yeni bir giriş yapın.Örnek:  // "x,z" koordinatını anahtar olarak kullanın
  "20,20": {
    id: 'YENI_ARAZI',
    level: 5,
    owner: { telegramId: '@kullanici_adi' },
    title: 'Yeni Keşif',
    description: 'Haritanın uzak köşelerinde yeni keşfedilmiş bir bölge.',
    color: '#FF1493', // Parlak pembe
    stats: { Defence: 10, Economy: 5, Population: 20 },
    metaWorldId: 'MW_NewDiscovery'
  }
📜 LisansBu proje, MIT Lisansı altında lisanslanmıştır. Detaylar için LICENSE dosyasına bakabilirsiniz.<p align="center"><strong>
