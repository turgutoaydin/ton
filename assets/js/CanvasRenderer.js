export class CanvasRenderer {
    constructor(canvas, mapData) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mapData = mapData;
        this.mapWidth = mapData[0].length;
        this.mapHeight = mapData.length;
        
        this.camera = { x: 0, y: 0, zoom: 1 };
        
        this.fitToContainer();
        this.zoomToFit();
        window.addEventListener('resize', () => {
            this.fitToContainer();
            this.zoomToFit();
            this.drawMap();
        });
    }

    fitToContainer() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    zoomToFit() {
        const ratioX = this.canvas.width / this.mapWidth;
        const ratioY = this.canvas.height / this.mapHeight;
        this.camera.zoom = Math.min(ratioX, ratioY) * 0.9;
        this.camera.x = (this.canvas.width - this.mapWidth * this.camera.zoom) / 2;
        this.camera.y = (this.canvas.height - this.mapHeight * this.camera.zoom) / 2;
    }
    
drawMap() {
    console.log("Harita çiziliyor...", this.mapWidth, this.mapHeight, this.camera);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.camera.x, this.camera.y);
    this.ctx.scale(this.camera.zoom, this.camera.zoom);

    let hasDrawn = false;
    for (let y = 0; y < this.mapHeight; y++) {
        for (let x = 0; x < this.mapWidth; x++) {
            if (this.mapData[y][x] === 1) {
                this.ctx.fillStyle = '#5288c1';
                this.ctx.fillRect(x, y, 1, 1);
                hasDrawn = true;
            }
        }
    }
    if (!hasDrawn) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, 10, 10); // Debug karesi
    }
    this.ctx.restore();
}

    screenToMapCoordinates(screenX, screenY) {
        const mapX = Math.floor((screenX - this.camera.x) / this.camera.zoom);
        const mapY = Math.floor((screenY - this.camera.y) / this.camera.zoom);

        if (mapX >= 0 && mapX < this.mapWidth && mapY >= 0 && mapY < this.mapHeight) {
            return { x: mapX, y: mapY };
        }
        return null;
    }
}
