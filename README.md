<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Open Nations - README</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.7;
            background-color: #11111a;
            color: #e0e0e0;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            background-color: #1a1a26;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        header {
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 30px;
            margin-bottom: 30px;
        }

        header img {
            width: 120px;
            height: 120px;
            border-radius: 20px;
            box-shadow: 0 5px 25px rgba(0, 255, 255, 0.2);
        }

        h1 {
            font-size: 2.5em;
            color: #ffffff;
            font-weight: 700;
            margin: 20px 0 10px 0;
        }

        header p {
            font-size: 1.1em;
            color: #a0a0b0;
            max-width: 600px;
            margin: 0 auto;
        }

        section {
            margin-bottom: 40px;
        }

        h2 {
            font-size: 1.8em;
            color: #00FFFF; /* Neon Siyan */
            border-bottom: 2px solid #00FFFF;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-weight: 700;
        }

        ul {
            list-style: none;
            padding-left: 0;
        }

        li {
            background-color: rgba(0, 0, 0, 0.2);
            border-left: 4px solid #00FFFF;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 0 8px 8px 0;
        }

        li strong {
            color: #ffffff;
            font-weight: 500;
        }

        pre {
            background-color: #0d0d12;
            color: #e0e0e0;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.95em;
        }

        code {
            font-family: 'Courier New', Courier, monospace;
        }

        .code-comment {
            color: #6a9955; /* Yorumlar için yeşil */
        }

        .code-key {
            color: #9cdcfe; /* Anahtarlar için mavi */
        }

        .code-string {
            color: #ce9178; /* String'ler için turuncu */
        }

        .code-number {
            color: #b5cea8; /* Sayılar için açık yeşil */
        }

        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #a0a0b0;
        }

        a {
            color: #29b6f6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <div class="container">
        <header>
            <img src="assets/images/logo.png" alt="The Open Nations Logosu">
            <h1>The Open Nations - Yeni Bir Gezegenin Doğuşu</h1>
            <p>
                <strong>TON Evreninin derinliklerinde, keşfedilmeyi bekleyen yeni bir dijital gezegen...</strong>
                <br>
                Bu, sadece bir proje değil; merkeziyetsiz bir geleceğin temelleri üzerine inşa edilen, yaşayan, nefes alan bir dünyanın başlangıcıdır.
            </p>
        </header>

        <section>
            <h2>📖 Hikaye: Keşif Çağrısı</h2>
            <p>
                TON (The Open Network) galaksisinin bilinmeyen bir köşesinde, yeni bir gezegenin sinyalleri alındı. Üzerinde yükselen neon ışıklı bir başkent, devasa anıtlar ve keşfedilmemiş topraklardan oluşan bu dünya, dijital öncüler için yeni bir başlangıç vaat ediyor. Burası, her bir kara parçasının gerçek dijital mülkiyete dönüşebileceği, toplulukların kendi kaderlerini çizebileceği ve yeni bir medeniyetin inşa edilebileceği <strong>The Open Nations</strong> gezegeni.
            </p>
            <p>
                Bu, o gezegene yapılan ilk test yayınıdır. Henüz ham, henüz vahşi... Ama potansiyeli sınırsız. Seni, bu yeni dünyanın kurucularından biri olmaya davet ediyoruz.
            </p>
        </section>

        <section>
            <h2>✨ Gezegenin Özellikleri</h2>
            <ul>
                <li><strong>Canlı Atmosfer:</strong> İstanbul saatine göre işleyen <strong>gerçek zamanlı gündüz-gece döngüsü</strong>. Güneşin doğuşunu izleyin, akşamın kızıllığında gezinin ve geceleri parlayan ayı ve yıldızları seyredin.</li>
                <li><strong>Dinamik Hava Durumu:</strong> Periyodik olarak değişen hava koşulları. Bazen gökyüzü bulutlarla kaplanacak, bazen de sakin bir yağmur toprağı ıslatacak.</li>
                <li><strong>Etkileşimli 3D Dünya:</strong> Three.js ile oluşturulmuş, fare ve dokunmatik hareketlerle tamamen kontrol edilebilen bir 3D evren.</li>
                <li><strong>Keşfedilebilir Coğrafya:</strong> <code>mapData.js</code> üzerinden yönetilen, içinde nehirlerin, göllerin ve okyanusların bulunduğu geniş ve dağınık bir harita.</li>
                <li><strong>İkonik Anıtlar:</strong> <code>BTC</code>, <code>ETH</code>, <code>TON</code>, <code>Pavel Durov</code> ve <code>Elon Musk</code> gibi dijital ve teknolojik dünyanın ikonlarına adanmış devasa anıtları keşfedin.</li>
                <li><strong>Yaşayan Başkent:</strong> Evrenin merkezi olan "The Open Nations" küpü, neon ışıkları, etrafında dönen enerji halkaları ve köşelerindeki logolarıyla diğer tüm arazilerden ayrışır.</li>
                <li><strong>Metaverse Deneyimi:</strong> Başkente sadece bakmakla kalmayın! <strong>"Ziyaret Et"</strong> butonuyla küpün içine girin, etrafı duvarlarla çevrili özel meta alanında <strong>W, A, S, D</strong> tuşlarıyla yürüyün ve bu yeni dünyanın bir parçası olun.</li>
            </ul>
        </section>

        <section>
            <h2>🔮 Gelecek Vizyonu: Bu Sadece Başlangıç</h2>
            <p>Bu test yayını, çok daha büyük bir vizyonun ilk adımıdır. Gelecekte gezegenimize eklenmesi planlanan özellikler:</p>
            <ul>
                <li><strong>Gerçek Ekonomi:</strong> Arazilerin kaynak (enerji, mineral, gıda) üretmesi ve bu kaynakların ticaretinin yapılması.</li>
                <li><strong>İnşa ve Geliştirme:</strong> Seviye atlayan arazilerin üzerine savunma kuleleri, pazar yerleri, teknoloji merkezleri gibi özel yapılar inşa etme.</li>
                <li><strong>Uluslar ve İttifaklar:</strong> Kullanıcıların bir araya gelerek kendi uluslarını kurması, bayraklarını dalgalandırması ve diğer uluslarla diplomatik veya ticari ilişkiler kurması.</li>
                <li><strong>Tam Blockchain Entegrasyonu:</strong> Her bir kara parselinin TON ağı üzerinde bir <strong>NFT</strong>'ye dönüştürülmesi, böylece kullanıcıların arazilerine <strong>gerçek anlamda sahip olmaları</strong> ve onları cüzdanları üzerinden alıp satabilmeleri.</li>
            </ul>
        </section>

        <section>
            <h2>📂 Dosya Yapısı</h2>
            <p>Proje, gelecekteki geliştirmeleri kolaylaştırmak için temiz ve modüler bir yapıya sahiptir. Ancak mevcut stabil versiyon, "siyah ekran" sorunlarını ortadan kaldırmak için tüm mantığı tek bir <code>main.js</code> dosyasında birleştirmiştir.</p>
            <pre><code>.
├── index.html              <span class="code-comment"># Ana HTML dosyası</span>
├── assets/
│   ├── css/
│   │   └── styles.css      <span class="code-comment"># Tüm görsel stiller</span>
│   ├── js/
│   │   ├── main.js         <span class="code-comment"># Projenin tüm mantığını içeren ana dosya</span>
│   │   └── mapData.js      <span class="code-comment"># Gezegenin veri tabanı (Özelleştirme buradan yapılır)</span>
│   └── images/
│       ├── logo.png
│       └── map.png
</code></pre>
        </section>

        <section>
            <h2>🔧 Nasıl Özelleştirilir?</h2>
            <p>Gezegeninize yeni bir hayat vermek çok kolay! Yeni bir anıt veya özel bölge eklemek için ana koda dokunmanıza gerek yok. Sadece <code>assets/js/mapData.js</code> dosyasını açın ve <code>specialParcels</code> objesine yeni bir giriş yapın.</p>
            <pre><code><span class="code-comment">// "x,z" koordinatını anahtar olarak kullanın</span>
<span class="code-string">"20,20"</span>: {
  <span class="code-key">id</span>: <span class="code-string">'YENI_ARAZI'</span>,
  <span class="code-key">level</span>: <span class="code-number">5</span>,
  <span class="code-key">owner</span>: { <span class="code-key">telegramId</span>: <span class="code-string">'@kullanici_adi'</span> },
  <span class="code-key">title</span>: <span class="code-string">'Yeni Keşif'</span>,
  <span class="code-key">description</span>: <span class="code-string">'Haritanın uzak köşelerinde yeni keşfedilmiş bir bölge.'</span>,
  <span class="code-key">color</span>: <span class="code-string">'#FF1493'</span>, <span class="code-comment">// Parlak pembe</span>
  <span class="code-key">stats</span>: { <span class="code-key">Defence</span>: <span class="code-number">10</span>, <span class="code-key">Economy</span>: <span class="code-number">5</span>, <span class="code-key">Population</span>: <span class="code-number">20</span> },
  <span class="code-key">metaWorldId</span>: <span class="code-string">'MW_NewDiscovery'</span>
}
</code></pre>
        </section>

        <section>
            <h2>📜 Lisans</h2>
            <p>Bu proje, <a href="LICENSE" target="_blank">MIT Lisansı</a> altında lisanslanmıştır. Detaylar için <code>LICENSE</code> dosyasına bakabilirsiniz.</p>
        </section>

        <footer>
            <p>Bu yeni dünyanın şekillenmesine yardım ettiğiniz için teşekkürler. Gelecek, sizin ellerinizde.</p>
        </footer>
    </div>

</body>
</html>
