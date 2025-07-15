export class InteractionHandler {
    constructor(canvas, renderer) {
        this.canvas = canvas;
        this.renderer = renderer;
        this.clickCallback = null;
        this.isDragging = false;
        this.lastX = 0;
        this.lastY = 0;

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('wheel', this.onWheel.bind(this));
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    onPixelClick(callback) {
        this.clickCallback = callback;
    }

    onMouseDown(event) {
        this.isDragging = true;
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        this.canvas.style.cursor = 'grabbing';
    }

    onMouseUp(event) {
        if (!this.isDragging && this.clickCallback) {
            const rect = this.canvas.getBoundingClientRect();
            const screenX = event.clientX - rect.left;
            const screenY = event.clientY - rect.top;
            const mapCoords = this.renderer.screenToMapCoordinates(screenX, screenY);
            if (mapCoords && this.renderer.mapData[mapCoords.y][mapCoords.x] === 1) {
                this.clickCallback(mapCoords);
            }
        }
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }

    onMouseMove(event) {
        if (!this.isDragging) return;
        const dx = event.clientX - this.lastX;
        const dy = event.clientY - this.lastY;
        this.renderer.camera.x += dx;
        this.renderer.camera.y += dy;
        this.renderer.drawMap();
        this.lastX = event.clientX;
        this.lastY = event.clientY;
    }

    onWheel(event) {
        event.preventDefault();
        const zoomIntensity = 0.1;
        const wheel = event.deltaY < 0 ? 1 : -1;
        const zoom = Math.exp(wheel * zoomIntensity);
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        this.renderer.camera.x = (this.renderer.camera.x - mouseX) * zoom + mouseX;
        this.renderer.camera.y = (this.renderer.camera.y - mouseY) * zoom + mouseY;
        this.renderer.camera.zoom *= zoom;
        this.renderer.drawMap();
    }

    onTouchStart(event) {
        event.preventDefault();
        this.isDragging = true;
        const touch = event.touches[0];
        this.lastX = touch.clientX;
        this.lastY = touch.clientY;
        this.canvas.style.cursor = 'grabbing';
    }

    onTouchMove(event) {
        if (!this.isDragging) return;
        event.preventDefault();
        const touch = event.touches[0];
        const dx = touch.clientX - this.lastX;
        const dy = touch.clientY - this.lastY;
        this.renderer.camera.x += dx;
        this.renderer.camera.y += dy;
        this.renderer.drawMap();
        this.lastX = touch.clientX;
        this.lastY = touch.clientY;
    }

    onTouchEnd(event) {
        if (!this.isDragging && this.clickCallback) {
            const touch = event.changedTouches[0];
            const rect = this.canvas.getBoundingClientRect();
            const screenX = touch.clientX - rect.left;
            const screenY = touch.clientY - rect.top;
            const mapCoords = this.renderer.screenToMapCoordinates(screenX, screenY);
            if (mapCoords && this.renderer.mapData[mapCoords.y][mapCoords.x] === 1) {
                this.clickCallback(mapCoords);
            }
        }
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }
}