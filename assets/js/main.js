/* assets/js/main.js */
'use strict';

// --- Global Değişkenler ---
let scene, camera, renderer, controls, raycaster, stars;
const pointer = new THREE.Vector2();
const clickableObjects = [];

const CUBE_SIZE = 10;
const CUBE_BASE_HEIGHT = 2;
// YENİ: Haritayı çok daha geniş hale getirdim
const MAP_GRID_SIZE = 80;

// --- DOM Elementleri ---
const container = document.getElementById('world-container');
const overlay = document.getElementById('overlay');
const modals = {
    territory: document.getElementById('territoryModal'),
    info: document.getElementById('infoModal'),
    comingSoon: document.getElementById('comingSoonModal'),
};

// --- 3D Sahneyi Başlatma ---
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00001a);
    scene.fog = new THREE.Fog(0x00001a, CUBE_SIZE * 40, CUBE_SIZE * 120);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.set(100, 150, 180);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(-80, 100, -50);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 150;
    dirLight.shadow.camera.bottom = -150;
    dirLight.shadow.camera.left = -150;
    dirLight.shadow.camera.right = 150;
    scene.add(dirLight);

    // YENİ: Kamera Kontrolleri Geliştirildi
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true; // Sağa sola gitmeyi (pan) daha doğal hale getirir
    controls.minDistance = 50;
    controls.maxDistance = 600;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Kameranın yerin altına girmesini engeller

    raycaster = new THREE.Raycaster();

    createStarrySky();
    generateMap();

    window.addEventListener('resize', onWindowResize);
    container.addEventListener('pointerdown', onPointerDown);

    animate();
}

// --- Yıldızlı Gökyüzü Oluşturma ---
function createStarrySky() {
    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
        const x = THREE.MathUtils.randFloatSpread(3000);
        const y = THREE.MathUtils.randFloatSpread(3000);
        const z = THREE.MathUtils.randFloatSpread(3000);
        starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 });
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// --- Haritayı Oluşturma ---
function generateMap() {
    // YENİ: Oval Dünya Zemini (Disk)
    const worldRadius = (MAP_GRID_SIZE / 2) * CUBE_SIZE + (CUBE_SIZE * 5); // Haritadan biraz daha büyük
    const seaGeometry = new THREE.CylinderGeometry(worldRadius, worldRadius, CUBE_BASE_HEIGHT, 128);
    const seaMaterial = new THREE.MeshLambertMaterial({ color: 0x2c3e50 });
    const seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
    seaMesh.position.y = -CUBE_BASE_HEIGHT;
    seaMesh.userData.type = 'sea';
    scene.add(seaMesh);
    clickableObjects.push(seaMesh);

    // Kara Küplerini Oluştur
    for (let x = -MAP_GRID_SIZE / 2; x < MAP_GRID_SIZE / 2; x++) {
        for (let z = -MAP_GRID_SIZE / 2; z < MAP_GRID_SIZE / 2; z++) {
            
            let isSea = false;
            if (typeof seaRegions !== 'undefined') {
                for (const region of seaRegions) {
                    if (x >= region.from.x && x <= region.to.x && z >= region.from.z && z <= region.to.z) {
                        isSea = true;
                        break;
                    }
                }
            }
            if (isSea) continue;

            const coordKey = `${x},${z}`;
            const parcelData = specialParcels[coordKey] || null;
            const level = parcelData ? parcelData.level : 1;
            const height = Math.max(0.2, level * CUBE_BASE_HEIGHT);

            let color;
            if (parcelData && parcelData.color) {
                color = new THREE.Color(parcelData.color);
            } else if (parcelData) {
                color = new THREE.Color(parcelData.owner ? 0x4caf50 : 0x8A2BE2);
            } else {
                color = new THREE.Color(0xaaaaaa);
            }

            const geometry = new THREE.BoxGeometry(CUBE_SIZE, height, CUBE_SIZE);
            const material = new THREE.MeshStandardMaterial({ color: color, roughness: 0.8 });
            const cube = new THREE.Mesh(geometry, material);
            cube.castShadow = true;
            cube.receiveShadow = true;

            cube.position.set(x * CUBE_SIZE, height / 2 - CUBE_BASE_HEIGHT / 2, z * CUBE_SIZE);
            
            cube.userData = {
                isSpecial: !!parcelData,
                data: parcelData,
                position: { x, y: 0, z },
                type: 'land'
            };

            scene.add(cube);
            clickableObjects.push(cube);
        }
    }
}

// --- Animasyon Döngüsü ---
function animate() {
    requestAnimationFrame(animate);

    if (stars) {
        stars.rotation.y += 0.00008;
    }

    // YENİ: Kamera Sınırları (Haritadan çok uzaklaşmasını engeller)
    const panLimit = (MAP_GRID_SIZE / 2) * CUBE_SIZE;
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -panLimit, panLimit);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -panLimit, panLimit);

    controls.update();
    renderer.render(scene, camera);
}

// --- Olay Yöneticileri ---
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
    const startX = event.clientX;
    const startY = event.clientY;

    function onPointerUp(event) {
        window.removeEventListener('pointerup', onPointerUp);
        if (Math.hypot(event.clientX - startX, event.clientY - startY) < 10) { // Sürükleme toleransını arttırdım
            handleObjectClick(event);
        }
    }
    window.addEventListener('pointerup', onPointerUp);
}

function handleObjectClick(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData.type === 'sea') return;
        openTerritoryModal(clickedObject);
    }
}

// --- Modal Kontrolü ---
function openModal(modal) {
    overlay.style.display = "block";
    modal.style.display = "flex";
}

function closeAllModals() {
    overlay.style.display = "none";
    for (const key in modals) {
        if(modals[key]) modals[key].style.display = "none";
    }
}

function openTerritoryModal(cube) {
    const modal = modals.territory;
    const pos = cube.userData.position;
    let data;

    if (cube.userData.isSpecial) {
        data = cube.userData.data;
    } else {
        data = {
            id: `TON_DEFAULT_${pos.x}_${pos.z}`,
            level: 1,
            owner: null,
            title: `Satılık Arazi (${pos.x}, ${pos.z})`,
            description: 'Geliştirilmeye açık, stratejik konumda bir parsel. Fiyat: 2.5 TON.',
            coverImage: 'assets/images/map.png',
            stats: null,
            metaWorldId: `MW_${pos.x}_${pos.z}`
        };
    }

    document.getElementById('territoryTitle').textContent = data.title;
    document.getElementById('territoryDescription').textContent = data.description;
    document.getElementById('territoryImage').src = data.coverImage || 'assets/images/map.png';

    const statsContainer = document.getElementById('territoryStatsContainer');
    statsContainer.innerHTML = '';
    if (data.stats) {
        for (const [stat, value] of Object.entries(data.stats)) {
            statsContainer.innerHTML += `<div class="info-line"><span>${stat}:</span> <span>${value}</span></div>`;
        }
    }

    const actionBtn = document.getElementById('territoryActionBtn');
    const actionText = document.getElementById('territoryActionText');
    if (data.owner) {
        actionText.textContent = 'Sahiple İletişime Geç';
        actionBtn.href = `https://t.me/${data.owner.telegramId.replace('@', '')}`;
        actionBtn.className = 'contact-button';
    } else {
        actionText.textContent = 'Bu Araziyi Satın Al';
        actionBtn.href = `https://t.me/TheOpenNationsDM?start=buy_${data.id}`;
        actionBtn.className = 'buy-button';
    }

    openModal(modal);
}

// --- UI Butonları ---
document.getElementById("infoIcon").addEventListener("click", () => openModal(modals.info));
overlay.addEventListener("click", closeAllModals);
document.getElementById("profileBtn").addEventListener("click", () => openModal(modals.comingSoon));
document.getElementById("p2pBtn").addEventListener("click", () => openModal(modals.comingSoon));
document.getElementById("mapBtn").addEventListener("click", () => {
    controls.target.set(0, 0, 0);
    camera.position.set(100, 150, 180);
});

// --- Başlat ---
init();
