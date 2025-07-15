The Open Nations
The Open Nations, TON blockchain tabanlı bir Telegram Mini App projesidir. Kullanıcılar, bir harita üzerinde ulusları seçebilir, satın alabilir ve P2P pazar yerinde takas edebilir. Bu proje, test yayını aşamasında olup Telegram Web App ve TON Connect entegrasyonlarını içerir.
Özellikler

Harita Görünümü: Piksellerden oluşan bir dünya haritasında ulusları seçme ve detaylarını görüntüleme.
P2P Pazar Yeri: Ulus takası için planlanan bir özellik (şu an "Çok Yakında!" aşamasında).
Profil Sayfası: Telegram kullanıcı adını görüntüleme ve sahip olunan ulusların listelenmesi.
TON Connect: TON cüzdan bağlantısı için temel entegrasyon.
Telegram Mini App: Telegram üzerinden erişilebilir, mobil uyumlu arayüz.

Kurulum ve Test Yayını
Gereksinimler

Node.js (yerel geliştirme için, isteğe bağlı)
Git
GitHub hesabı
Telegram hesabı ve @BotFather ile bot oluşturma erişimi

Adım Adım Kurulum

Repoyu Klonlayın:
git clone https://github.com/turgutoaydin/ton.git
cd ton


Dosyaları Güncelleyin:

Proje dosyalarını (index.html, assets/css/styles.css, assets/js/*.js, tonconnect-manifest.json) bu repodan alın.
assets/images/logo.png dosyasını ekleyin (örneğin, bir TON logosu).


GitHub'a Yükleyin:
git add .
git commit -m "Telegram Mini App test yayını"
git push origin main


GitHub Pages ile Deploy Edin:

GitHub'da Settings > Pages sekmesine gidin.
"Source" kısmını "Deploy from a branch" olarak ayarlayın.
Branch olarak main seçin ve dizin olarak / (root) seçin.
"Save" tıklayın. GitHub Pages URL'niz (örn. https://turgutoaydin.github.io/ton) kısa sürede aktif olacak.


Telegram Botunu Oluşturun:

Telegram'da @BotFather ile konuşun.
/newbot komutunu kullanarak bir bot oluşturun (örn. @TheOpenNationsBot).
/setdomain ile GitHub Pages URL'nizi ekleyin (örn. https://turgutoaydin.github.io/ton).
/setwebapp ile Mini App'i etkinleştirin.
Test bağlantısını alın (örn. t.me/TheOpenNationsBot/app).


Test Edin:

Telegram'da test bağlantısını açın.
Haritanın göründüğünü, kullanıcı adının profilde göründüğünü ve TON Connect butonunun çalıştığını kontrol edin.



Kullanılan Teknolojiler

HTML/CSS/JavaScript: Frontend için temel web teknolojileri.
Canvas API: Harita çizimi için.
Telegram Web App SDK: Telegram Mini App entegrasyonu.
TON Connect UI: TON cüzdan bağlantısı.
GitHub Pages: Test yayını için hosting.

Notlar

Bu bir test yayınıdır. Üretim ortamında kendi domaininizi ve güvenli bir manifest dosyası kullanmalısınız.
assets/js/mapData.js dosyasını büyük harita verinizle güncelleyin.
Hatalar için tarayıcı konsolunu (F12) kontrol edin.

Lisans
Bu proje test amaçlıdır ve henüz bir lisans altında dağıtılmamaktadır.
