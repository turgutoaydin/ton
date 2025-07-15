import { mapData } from './mapData.js';
import { CanvasRenderer } from './CanvasRenderer.js';
import { InteractionHandler } from './InteractionHandler.js';
import { InfoPanel } from './InfoPanel.js';

function initialize() {
    console.log("The Open Nations başlatılıyor...");

    const canvas = document.getElementById('game-canvas');
    const navButtons = document.querySelectorAll('.nav-button');
    const views = document.querySelectorAll('.view');
    const telegramUsernameElement = document.getElementById('telegram-username');

    const renderer = new CanvasRenderer(canvas, mapData);
    const infoPanel = new InfoPanel('info-panel', 'panel-overlay');
    const interactionHandler = new InteractionHandler(canvas, renderer);

    renderer.drawMap();

    // Telegram Web App Entegrasyonu
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user && user.username) {
            telegramUsernameElement.textContent = `@${user.username}`;
        } else {
            telegramUsernameElement.textContent = "Kullanıcı adı bulunamadı.";
        }

        window.Telegram.WebApp.MainButton.setText('Ulus Satın Al');
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.onClick(() => {
            window.Telegram.WebApp.showAlert('Ulus satın alma işlemi başlatıldı!');
        });

        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            infoPanel.hide();
        });
    } else {
        telegramUsernameElement.textContent = "Telegram Web App yüklenemedi.";
    }

    // TON Connect Entegrasyonu
    const tonConnectUI = new TONConnectUI({
        manifestUrl: 'https://turgutoaydin.github.io/ton/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-button'
    });

    tonConnectUI.onStatusChange(wallet => {
        console.log(wallet ? 'Cüzdan bağlandı:' : 'Cüzdan bağlantısı kesildi.', wallet);
    });

    // Harita Tıklama Etkileşimi
    interactionHandler.onPixelClick((pixel) => {
        if (pixel) {
            console.log(`Tıklanan ulus: X=${pixel.x}, Y=${pixel.y}`);
            infoPanel.setTitle(`Ulus Koordinatı: [${pixel.x}, ${pixel.y}]`);
            infoPanel.setContent(`
                Bu ulus henüz bir lidere sahip değil.<br>
                <strong>2.5 TON</strong> karşılığında yönetimi ele geçirebilirsin.
                <button id="buy彼此

System: buy-nation-button">Satın Al</button>
            `);
            infoPanel.show();
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
            }
            const buyButton = document.getElementById('buy-nation-button');
            if (buyButton) {
                buyButton.addEventListener('click', () => {
                    window.Telegram.WebApp.MainButton.click();
                });
            }
        }
    });

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetViewId = button.dataset.view;
            views.forEach(view => view.classList.remove('active'));
            navButtons.forEach(btn => btn.classList.remove('active'));
            document.getElementById(targetViewId).classList.add('active');
            button.classList.add('active');
        });
    });

    console.log("Başlatma tamamlandı. Uluslar sizi bekliyor.");
}

window.addEventListener('load', initialize);