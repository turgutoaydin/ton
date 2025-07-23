document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map-container');
    const map = document.getElementById('3d-map');
    const coordinatesDisplay = document.getElementById('coordinates');
    const capitalMarker = document.getElementById('capital-marker');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetViewBtn = document.getElementById('reset-view');

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX, startY;

    // Haritayı oluştur
    function renderMap() {
        map.innerHTML = '';
        
        mapData.pixels.forEach(pixel => {
            const pixelElement = document.createElement('div');
            pixelElement.className = 'pixel';
            
            // Konum ve boyut
            const size = 10 * scale;
            pixelElement.style.width = `${size}px`;
            pixelElement.style.height = `${size}px`;
            pixelElement.style.left = `${pixel.x * size}px`;
            pixelElement.style.top = `${pixel.y * size}px`;
            
            // Yükseklik (3D efekti)
            const elevation = pixel.elevation * scale;
            pixelElement.style.transform = `translateZ(${elevation}px)`;
            
            // Renk ve tip
            switch(pixel.type) {
                case 'capital':
                    pixelElement.classList.add('land');
                    break;
                case 'ocean':
                case 'sea':
                case 'lake':
                case 'river':
                    pixelElement.classList.add('water');
                    break;
                case 'mountain':
                    pixelElement.classList.add('mountain');
                    break;
                default:
                    pixelElement.classList.add('land');
            }
            
            // Gök cismi etkisi
            if (pixel.celestialInfluence) {
                const body = mapData.celestialBodies[pixel.celestialInfluence];
                pixelElement.style.boxShadow = `inset 0 0 ${5*scale}px ${body.color}`;
            }
            
            map.appendChild(pixelElement);
        });
        
        // Başkent marker'ını güncelle
        updateCapitalMarker();
        updateMapPosition();
    }

    function updateCapitalMarker() {
        const size = 15 * scale;
        capitalMarker.style.width = `${size}px`;
        capitalMarker.style.height = `${size}px`;
        capitalMarker.style.left = `${mapData.capital.x * 10 * scale - size/2 + posX}px`;
        capitalMarker.style.top = `${mapData.capital.y * 10 * scale - size/2 + posY}px`;
        capitalMarker.style.transform = `translateZ(${10 * scale}px)`;
    }

    function updateMapPosition() {
        map.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale})`;
        coordinatesDisplay.textContent = `X: ${Math.round(-posX/(10*scale))}, Y: ${Math.round(-posY/(10*scale))}`;
        updateCapitalMarker();
    }

    // Dokunmatik ve fare olayları
    mapContainer.addEventListener('mousedown', startDrag);
    mapContainer.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        startX = clientX - posX;
        startY = clientY - posY;
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        posX = clientX - startX;
        posY = clientY - startY;
        updateMapPosition();
        e.preventDefault();
    }

    function endDrag() {
        isDragging = false;
    }

    // Zoom kontrolleri
    zoomInBtn.addEventListener('click', () => {
        if (scale < 3) {
            scale += 0.2;
            renderMap();
        }
    });

    zoomOutBtn.addEventListener('click', () => {
        if (scale > 0.5) {
            scale -= 0.2;
            renderMap();
        }
    });

    resetViewBtn.addEventListener('click', () => {
        scale = 1;
        posX = mapContainer.clientWidth / 2 - (mapData.capital.x * 10 * scale);
        posY = mapContainer.clientHeight / 2 - (mapData.capital.y * 10 * scale);
        renderMap();
    });

    // Başlangıç pozisyonu (başkente odaklan)
    posX = mapContainer.clientWidth / 2 - (mapData.capital.x * 10 * scale);
    posY = mapContainer.clientHeight / 2 - (mapData.capital.y * 10 * scale);

    // İlk render
    renderMap();

    // Pencere boyutu değiştiğinde
    window.addEventListener('resize', () => {
        renderMap();
    });
});