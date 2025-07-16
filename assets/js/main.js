/* assets/js/main.js */
'use strict';

// Bu dosya, projenin tüm 3D ve UI mantığını içerir.
// Siyah ekran sorununu çözmek için tüm kod, window.onload olayını bekler.

window.onload = () => {

    // --- Global Değişkenler ---
    let scene, camera, renderer, controls, raycaster, stars, sun, moon;
    let composer, bloomPass;
    const capitalRings = [];
    const capitalLogos = [];

    // Ziyaret modu ve yürüme kontrolleri için değişkenler
    let viewMode = 'orbit'; // 'orbit' veya 'visit'
    let lastCameraPosition = new THREE.Vector3();
    let lastControlsTarget = new THREE.Vector3();
    let transition = { active: false, progress: 0, startPos: null, endPos: null, startTarget: null, endTarget: null };
    let capitalMetaSpace; // Başkentin iç mekanı
    let worldGroup; // Dış dünya objelerini tutan grup
    let moveState = { forward: 0, back: 0, left: 0, right: 0 };
    let isMouseLookActive = false;
    let clock = new THREE.Clock();

    let weather = { state: 'clear', clouds: [], rain: null, lastChange: Date.now() };
    const pointer = new THREE.Vector2();
    const clickableObjects = [];

    const CUBE_SIZE = 10;
    const CUBE_BASE_HEIGHT = 2;
    const MAP_GRID_SIZE = 100;

    // --- DOM Elementleri ---
    const container = document.getElementById('world-container');
    const overlay = document.getElementById('overlay');
    const modals = {
        territory: document.getElementById('territoryModal'),
        info: document.getElementById('infoModal'),
        comingSoon: document.getElementById('comingSoonModal'),
    };
    let returnBtn;

    // --- ANA BAŞLATMA FONKSİYONU ---
    function init() {
        setupSceneAndCamera();
        setupRenderer();
        setupLighting();
        setupControls();
        setupPostProcessing();

        raycaster = new THREE.Raycaster();
        worldGroup = new THREE.Group();
        scene.add(worldGroup);

        createStarrySky();
        createDistantPlanet();
        generateMap();
        createWeatherSystem();
        createUiElements();

        window.addEventListener('resize', onWindowResize);
        container.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        animate();
        console.log("The Open Nations Dünyası başarıyla başlatıldı!");
    }

    // --- KURULUM MODÜLLERİ ---

    function setupSceneAndCamera() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x00001a);
        scene.fog = new THREE.Fog(0x00001a, CUBE_SIZE * 40, CUBE_SIZE * 150);

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
        camera.position.set(120, 180, 220);
    }

    function setupRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.8;
        container.appendChild(renderer.domElement);
    }

    function setupLighting() {
        const hemisphereLight = new THREE.HemisphereLight(0x6080ff, 0x303050, 1.5);
        scene.add(hemisphereLight);

        sun = new THREE.Group();
        scene.add(sun);

        const sunLight = new THREE.DirectionalLight(0xffffff, 3.0);
        sunLight.position.set(0, 250, 0);
        sunLight.castShadow = true;
        sunLight.shadow.camera.top = 180;
        sunLight.shadow.camera.bottom = -180;
        sunLight.shadow.camera.left = -180;
        sunLight.shadow.camera.right = 180;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sun.add(sunLight);

        const sunSphere = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffddaa }));
        sunSphere.position.copy(sunLight.position);
        sun.add(sunSphere);

        const moonSphere = new THREE.Mesh(new THREE.SphereGeometry(15, 32, 32), new THREE.MeshStandardMaterial({ color: 0xeeeeff, emissive: 0xddddff, emissiveIntensity: 0.1 }));
        moonSphere.position.set(0, -250, 0);
        sun.add(moonSphere);
        moon = moonSphere;
    }

    function setupControls() {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = true;
        controls.minDistance = 50;
        controls.maxDistance = 800;
        controls.maxPolarAngle = Math.PI / 2 - 0.05;
    }

    function setupPostProcessing() {
        try {
            const renderScene = new THREE.RenderPass(scene, camera);
            bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
            bloomPass.threshold = 0;
            bloomPass.strength = 0.6;
            bloomPass.radius = 0.4;
            composer = new THREE.EffectComposer(renderer);
            composer.addPass(renderScene);
            composer.addPass(bloomPass);
        } catch (e) {
            console.error("Post-processing (Bloom) efektleri başlatılamadı.", e);
            composer = null;
        }
    }

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
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true });
        stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);
    }

    function createDistantPlanet() {
        const planetGeometry = new THREE.SphereGeometry(150, 64, 64);
        const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x3366ff, emissive: 0x112244, roughness: 0.9 });
        const earth = new THREE.Mesh(planetGeometry, planetMaterial);
        earth.position.set(-1000, 200, -1200);
        scene.add(earth);
    }

    function generateMap() {
        const worldRadius = (MAP_GRID_SIZE / 2) * CUBE_SIZE + (CUBE_SIZE * 5);
        const seaGeometry = new THREE.CylinderGeometry(worldRadius, worldRadius, CUBE_BASE_HEIGHT, 128);
        const seaMaterial = new THREE.MeshLambertMaterial({ color: 0x2c3e50 });
        const seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
        seaMesh.position.y = -CUBE_BASE_HEIGHT;
        seaMesh.receiveShadow = true;
        seaMesh.userData.type = 'sea';
        worldGroup.add(seaMesh);
        clickableObjects.push(seaMesh);

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

                let color, emissiveColor, emissiveIntensity = 0;
                if (parcelData && parcelData.color) {
                    color = new THREE.Color(parcelData.color);
                    if (coordKey === "0,0") {
                        emissiveColor = color;
                        emissiveIntensity = 0.8;
                    }
                } else if (parcelData) {
                    color = new THREE.Color(parcelData.owner ? 0x4caf50 : 0x8A2BE2);
                } else {
                    color = new THREE.Color(0xaaaaaa);
                }

                const material = new THREE.MeshStandardMaterial({ color: color, roughness: 0.8, emissive: emissiveColor, emissiveIntensity: emissiveIntensity });
                const geometry = new THREE.BoxGeometry(CUBE_SIZE, height, CUBE_SIZE);
                const cube = new THREE.Mesh(geometry, material);
                cube.castShadow = true;
                cube.receiveShadow = true;
                cube.position.set(x * CUBE_SIZE, height / 2 - CUBE_BASE_HEIGHT / 2, z * CUBE_SIZE);
                cube.userData = { isSpecial: !!parcelData, data: parcelData, position: { x, y: 0, z }, type: 'land' };
                worldGroup.add(cube);
                clickableObjects.push(cube);

                if (coordKey === "0,0") {
                    createCapitalEnhancements(cube);
                }
            }
        }
        createCapitalMetaSpace();
    }

    function createCapitalEnhancements(cube) {
        const position = cube.position;
        const height = cube.geometry.parameters.height;

        const ringGeometry = new THREE.TorusGeometry(CUBE_SIZE * 0.8, 0.2, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x00FFFF });
        const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
        ring1.position.copy(position);
        ring1.position.y += height * 0.1;
        ring1.rotation.x = Math.PI / 2;
        worldGroup.add(ring1);
        capitalRings.push(ring1);
        const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
        ring2.position.copy(position);
        ring2.position.y -= height * 0.1;
        ring2.rotation.x = Math.PI / 2;
        ring2.scale.set(1.2, 1.2, 1.2);
        worldGroup.add(ring2);
        capitalRings.push(ring2);

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('assets/images/logo.png', (texture) => {
            const logoMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.5 });
            const logoGeometry = new THREE.PlaneGeometry(3, 3);
            const logoY = position.y + height / 2 + 3;
            const offset = CUBE_SIZE / 2 - 2;
            const positions = [{ x: offset, z: offset }, { x: -offset, z: offset }, { x: offset, z: -offset }, { x: -offset, z: -offset }];
            positions.forEach(pos => {
                const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
                logoMesh.position.set(pos.x, logoY, pos.z);
                logoMesh.rotation.x = -Math.PI / 2;
                worldGroup.add(logoMesh);
                capitalLogos.push(logoMesh);
            });
        });
    }

    function createCapitalMetaSpace() {
        capitalMetaSpace = new THREE.Group();
        capitalMetaSpace.visible = false;

        const wallHeight = 10 * CUBE_SIZE;
        const wallThickness = 0.5;
        const spaceWidth = 10 * CUBE_SIZE;
        const spaceDepth = 8 * CUBE_SIZE;

        const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, side: THREE.DoubleSide });

        const floorGeometry = new THREE.PlaneGeometry(spaceWidth, spaceDepth);
        const floor = new THREE.Mesh(floorGeometry, wallMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        capitalMetaSpace.add(floor);

        const wallN = new THREE.Mesh(new THREE.BoxGeometry(spaceWidth, wallHeight, wallThickness), wallMaterial);
        wallN.position.set(0, wallHeight / 2, -spaceDepth / 2);
        capitalMetaSpace.add(wallN);
        const wallS = new THREE.Mesh(new THREE.BoxGeometry(spaceWidth, wallHeight, wallThickness), wallMaterial);
        wallS.position.set(0, wallHeight / 2, spaceDepth / 2);
        capitalMetaSpace.add(wallS);
        const wallW = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, spaceDepth), wallMaterial);
        wallW.position.set(-spaceWidth / 2, wallHeight / 2, 0);
        capitalMetaSpace.add(wallW);
        const wallE = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, spaceDepth), wallMaterial);
        wallE.position.set(spaceWidth / 2, wallHeight / 2, 0);
        capitalMetaSpace.add(wallE);

        scene.add(capitalMetaSpace);
    }

    function createWeatherSystem() {
        const cloudMaterial = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(generateCloudTexture()), transparent: true, opacity: 0.6 });
        for (let i = 0; i < 30; i++) {
            const cloud = new THREE.Sprite(cloudMaterial);
            cloud.position.set(THREE.MathUtils.randFloatSpread(MAP_GRID_SIZE * CUBE_SIZE), THREE.MathUtils.randFloat(100, 150), THREE.MathUtils.randFloatSpread(MAP_GRID_SIZE * CUBE_SIZE));
            const scale = THREE.MathUtils.randFloat(40, 60);
            cloud.scale.set(scale, scale * 0.7, scale);
            cloud.visible = false;
            scene.add(cloud);
            weather.clouds.push(cloud);
        }

        const rainCount = 10000;
        const rainVertices = [];
        for (let i = 0; i < rainCount; i++) {
            rainVertices.push(THREE.MathUtils.randFloatSpread(MAP_GRID_SIZE * CUBE_SIZE), THREE.MathUtils.randFloat(0, 200), THREE.MathUtils.randFloatSpread(MAP_GRID_SIZE * CUBE_SIZE));
        }
        const rainGeometry = new THREE.BufferGeometry();
        rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rainVertices, 3));
        const rainMaterial = new THREE.PointsMaterial({ color: 0xaaaaee, size: 0.5, transparent: true, opacity: 0.5 });
        weather.rain = new THREE.Points(rainGeometry, rainMaterial);
        weather.rain.visible = false;
        scene.add(weather.rain);
    }

    function generateCloudTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        return canvas;
    }

    // --- ANİMASYON VE GÜNCELLEME DÖNGÜSÜ ---

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        updateAtmosphere();
        updateWeather();
        updateAnimations();
        updateCameraAndControls(delta);

        if (composer) {
            composer.render();
        } else {
            renderer.render(scene, camera);
        }
    }

    function updateAtmosphere() {
        const now = new Date();
        const istanbulOffset = 3 * 60;
        const localOffset = -now.getTimezoneOffset();
        const totalOffset = (istanbulOffset - localOffset) * 60 * 1000;
        const istanbulTime = new Date(now.getTime() + totalOffset);
        const totalSecondsInDay = 24 * 60 * 60;
        const currentSecond = istanbulTime.getHours() * 3600 + istanbulTime.getMinutes() * 60 + istanbulTime.getSeconds();
        const dayProgress = currentSecond / totalSecondsInDay;
        const sunAngle = dayProgress * Math.PI * 2 - Math.PI / 2;

        sun.rotation.z = sunAngle;

        const sunY = Math.sin(sunAngle);
        const dayFactor = Math.max(0, sunY);
        const dawnFactor = Math.pow(1 - Math.abs(sunY), 3);
        const dayColor = new THREE.Color("#87ceeb");
        const dawnColor = new THREE.Color("#ff8c69");
        const nightColor = new THREE.Color("#00001a");
        const cloudyColor = new THREE.Color("#cccccc");
        let skyColor = new THREE.Color().lerpColors(nightColor, dayColor, dayFactor);
        skyColor.lerp(dawnColor, dawnFactor * 0.5);
        if (weather.state === 'cloudy' || weather.state === 'rainy') {
            skyColor.lerp(cloudyColor, 0.4);
        }
        scene.background = skyColor;
        scene.fog.color = skyColor;
        stars.material.opacity = (1 - dayFactor) * (1 - (weather.state === 'cloudy' || weather.state === 'rainy' ? 0.8 : 0));
        moon.material.emissiveIntensity = (1 - dayFactor) * 0.2;
        sun.children[0].intensity = dayFactor * 2.5 + 0.2;
        sun.children[0].castShadow = sunY > 0.1;
    }

    function updateWeather() {
        if (Date.now() - weather.lastChange > 120000) {
            const states = ['clear', 'cloudy', 'rainy'];
            weather.state = states[Math.floor(Math.random() * states.length)];
            weather.lastChange = Date.now();
        }
        weather.clouds.forEach(cloud => {
            cloud.visible = (weather.state === 'cloudy' || weather.state === 'rainy');
            if (cloud.visible) {
                cloud.position.x += 0.05;
                if (cloud.position.x > (MAP_GRID_SIZE / 2) * CUBE_SIZE) {
                    cloud.position.x = -(MAP_GRID_SIZE / 2) * CUBE_SIZE;
                }
            }
        });
        weather.rain.visible = weather.state === 'rainy';
        if (weather.rain.visible) {
            const positions = weather.rain.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.5;
                if (positions[i] < 0) positions[i] = 200;
            }
            weather.rain.geometry.attributes.position.needsUpdate = true;
        }
    }

    function updateAnimations() {
        if (stars) stars.rotation.y += 0.00008;
        if (capitalRings.length > 0) {
            capitalRings[0].rotation.z += 0.01;
            capitalRings[1].rotation.z -= 0.005;
        }
        if (capitalLogos.length > 0) {
            capitalLogos.forEach(logo => { logo.rotation.z += 0.015; });
        }
    }

    function updateCameraAndControls(delta) {
        if (transition.active) {
            transition.progress = Math.min(transition.progress + 0.015, 1);
            const easeProgress = 1 - Math.pow(1 - transition.progress, 3);
            camera.position.lerpVectors(transition.startPos, transition.endPos, easeProgress);
            controls.target.lerpVectors(transition.startTarget, transition.endTarget, easeProgress);
            if (transition.progress >= 1) {
                transition.active = false;
                if (viewMode === 'orbit') controls.enabled = true;
            }
        } else if (viewMode === 'orbit') {
            const panLimit = (MAP_GRID_SIZE / 2) * CUBE_SIZE;
            controls.target.x = THREE.MathUtils.clamp(controls.target.x, -panLimit, panLimit);
            controls.target.z = THREE.MathUtils.clamp(controls.target.z, -panLimit, panLimit);
            controls.update();
        } else if (viewMode === 'visit') {
            updateVisitModeMovement(delta);
        }
    }

    function updateVisitModeMovement(delta) {
        const moveSpeed = 40 * delta;
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        if (moveState.forward) camera.position.addScaledVector(direction, moveSpeed);
        if (moveState.back) camera.position.addScaledVector(direction, -moveSpeed);
        
        const strafeDirection = direction.clone().cross(camera.up);
        if (moveState.left) camera.position.addScaledVector(strafeDirection, -moveSpeed);
        if (moveState.right) camera.position.addScaledVector(strafeDirection, moveSpeed);
    }

    // --- UI VE ETKİLEŞİM ---

    function createUiElements() {
        returnBtn = document.createElement('button');
        returnBtn.id = 'returnBtn';
        returnBtn.textContent = 'Yörüngeye Dön';
        returnBtn.style.display = 'none';
        document.body.appendChild(returnBtn);
        returnBtn.onclick = exitVisitMode;

        document.getElementById("infoIcon").addEventListener("click", () => openModal(modals.info));
        overlay.addEventListener("click", closeAllModals);
        document.getElementById("profileBtn").addEventListener("click", () => openModal(modals.comingSoon));
        document.getElementById("p2pBtn").addEventListener("click", () => openModal(modals.comingSoon));
        document.getElementById("mapBtn").addEventListener("click", () => {
            if (viewMode === 'visit') exitVisitMode();
            controls.target.set(0, 0, 0);
            camera.position.set(120, 180, 220);
        });
        window.closeAllModals = closeAllModals;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (composer) composer.setSize(window.innerWidth, window.innerHeight);
    }

    function onPointerDown(event) {
        if (viewMode === 'orbit') {
            const startX = event.clientX, startY = event.clientY;
            const onPointerUp = (upEvent) => {
                window.removeEventListener('pointerup', onPointerUp);
                if (Math.hypot(upEvent.clientX - startX, upEvent.clientY - startY) < 10) handleObjectClick(upEvent);
            };
            window.addEventListener('pointerup', onPointerUp);
        } else if (viewMode === 'visit') {
            isMouseLookActive = true;
            const onPointerUp = () => {
                isMouseLookActive = false;
                window.removeEventListener('pointerup', onPointerUp);
                container.removeEventListener('pointermove', onPointerMoveLook);
            };
            window.addEventListener('pointerup', onPointerUp);
            container.addEventListener('pointermove', onPointerMoveLook);
        }
    }

    function onPointerMoveLook(event) {
        if (!isMouseLookActive) return;
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;
        const euler = new THREE.Euler(0, 0, 0, 'YXZ');
        euler.setFromQuaternion(camera.quaternion);
        euler.y -= movementX * 0.002;
        euler.x -= movementY * 0.002;
        euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
        camera.quaternion.setFromEuler(euler);
    }

    function onKeyDown(event) {
        if (viewMode !== 'visit') return;
        switch (event.code) {
            case 'KeyW': case 'ArrowUp': moveState.forward = 1; break;
            case 'KeyS': case 'ArrowDown': moveState.back = 1; break;
            case 'KeyA': case 'ArrowLeft': moveState.left = 1; break;
            case 'KeyD': case 'ArrowRight': moveState.right = 1; break;
        }
    }

    function onKeyUp(event) {
        if (viewMode !== 'visit') return;
        switch (event.code) {
            case 'KeyW': case 'ArrowUp': moveState.forward = 0; break;
            case 'KeyS': case 'ArrowDown': moveState.back = 0; break;
            case 'KeyA': case 'ArrowLeft': moveState.left = 0; break;
            case 'KeyD': case 'ArrowRight': moveState.right = 0; break;
        }
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
                id: `TON_DEFAULT_${pos.x}_${pos.z}`, level: 1, owner: null,
                title: `Satılık Arazi (${pos.x}, ${pos.z})`,
                description: 'Geliştirilmeye açık, stratejik konumda bir parsel. Fiyat: 2.5 TON.',
                coverImage: 'assets/images/map.png', stats: null, metaWorldId: `MW_${pos.x}_${pos.z}`
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
        actionBtn.onclick = null;
        actionBtn.href = "#";
        if (pos.x === 0 && pos.z === 0) {
            actionText.textContent = 'Ziyaret Et';
            actionBtn.className = 'contact-button';
            actionBtn.onclick = (e) => { e.preventDefault(); enterVisitMode(); };
        } else if (data.owner) {
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

    function enterVisitMode() {
        closeAllModals();
        viewMode = 'visit';
        lastCameraPosition.copy(camera.position);
        lastControlsTarget.copy(controls.target);
        transition = {
            active: true, progress: 0,
            startPos: camera.position.clone(),
            endPos: new THREE.Vector3(0, 5, (8 * CUBE_SIZE / 2) - 10),
            startTarget: controls.target.clone(),
            endTarget: new THREE.Vector3(0, 5, 0)
        };
        controls.enabled = false;
        document.getElementById('bottomNav').style.display = 'none';
        
        worldGroup.visible = false;
        if (capitalMetaSpace) capitalMetaSpace.visible = true;

        returnBtn.style.display = 'block';
    }

    function exitVisitMode() {
        viewMode = 'orbit';
        transition = {
            active: true, progress: 0,
            startPos: camera.position.clone(),
            endPos: lastCameraPosition,
            startTarget: controls.target.clone(),
            endTarget: lastControlsTarget
        };

        worldGroup.visible = true;
        if (capitalMetaSpace) capitalMetaSpace.visible = false;

        returnBtn.style.display = 'none';
        document.getElementById('bottomNav').style.display = 'flex';
    }

    // --- Başlat ---
    init();

};
