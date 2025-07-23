// Harita verileri
const mapData = {
    size: 100,
    pixels: [],
    celestialBodies: {
        earth: { x: 20, y: 20, radius: 15, color: '#3a7a1a' },
        mars: { x: 70, y: 30, radius: 12, color: '#c1440e' },
        sun: { x: 50, y: 80, radius: 20, color: '#ffcc00' },
        moon: { x: 30, y: 60, radius: 8, color: '#dddddd' }
    },
    capital: { x: 0, y: 0 },
    waterBodies: [
        { x: 10, y: 10, width: 30, height: 20, type: 'ocean' },
        { x: 60, y: 15, width: 20, height: 15, type: 'sea' },
        { x: 40, y: 50, width: 15, height: 25, type: 'lake' },
        { x: 20, y: 70, width: 50, height: 5, type: 'river' }
    ],
    mountains: [
        { x: 45, y: 25, height: 3 },
        { x: 50, y: 30, height: 5 },
        { x: 55, y: 25, height: 4 },
        { x: 60, y: 40, height: 6 }
    ]
};

// Harita piksellerini oluştur
function generateMapData() {
    for (let y = 0; y < mapData.size; y++) {
        for (let x = 0; x < mapData.size; x++) {
            let pixel = {
                x: x,
                y: y,
                type: 'land',
                elevation: 0,
                celestialInfluence: null
            };

            // Gök cisimlerinin etkisi
            for (const [body, data] of Object.entries(mapData.celestialBodies)) {
                const distance = Math.sqrt(Math.pow(x - data.x, 2) + Math.pow(y - data.y, 2));
                if (distance < data.radius) {
                    pixel.celestialInfluence = body;
                    pixel.elevation = Math.round((1 - distance / data.radius) * 5);
                }
            }

            // Başkent
            if (x === mapData.capital.x && y === mapData.capital.y) {
                pixel.type = 'capital';
                pixel.elevation = 10;
            }

            // Su kaynakları
            for (const water of mapData.waterBodies) {
                if (x >= water.x && x < water.x + water.width &&
                    y >= water.y && y < water.y + water.height) {
                    pixel.type = water.type;
                    pixel.elevation = -1;
                }
            }

            // Dağlar
            for (const mountain of mapData.mountains) {
                if (x === mountain.x && y === mountain.y) {
                    pixel.type = 'mountain';
                    pixel.elevation = mountain.height;
                }
            }

            mapData.pixels.push(pixel);
        }
    }
}

generateMapData();