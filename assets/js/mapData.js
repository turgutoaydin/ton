// assets/js/mapData.js

// =============================================================================
// AÇIK DENİZ BÖLGELERİ (SEA REGIONS)
// =============================================================================
// Haritada boş bırakılacak (kara küpü oluşturulmayacak) alanları tanımlar.
// Bu bölgeler satın alınamaz açık denizleri, gölleri veya nehirleri temsil eder.

const seaRegions = [
  // 1. Geniş bir nehir, haritanın bir kısmını boydan boya geçer.
  { from: { x: -4, z: -20 }, to: { x: -2, z: 15 } },
  // 2. Bu nehir, bir göle bağlanır.
  { from: { x: -10, z: 15 }, to: { x: -2, z: 20 } },

  // 3. Haritanın sağ tarafında büyük bir okyanus alanı.
  { from: { x: 25, z: -20 }, to: { x: 30, z: 20 } },
  // 4. Bu okyanusa bağlanan daha dar bir kanal/deniz.
  { from: { x: 20, z: -5 }, to: { x: 25, z: 5 } },

  // 5. Bağımsız, büyük bir göl.
  { from: { x: 10, z: -18 }, to: { x: 18, z: -12 } }
];


// =============================================================================
// ÖZEL BÖLGE VERİTABANI (SPECIAL PARCELS DATABASE)
// =============================================================================
// Bu dosya, haritadaki 'varsayılan' durumdan farklı olan, ÖZEL parselleri tanımlar.
// YENİ: 'color' özelliği eklendi. Bu özellik yoksa, main.js varsayılan rengi kullanır.
// YENİ: 'level: 0.1' gibi düşük seviyeler, henüz gelişmemiş düz arazileri temsil eder.

const specialParcels = {
  // Anahtar: "x,z" formatında koordinat. Değer: O parsele ait özel veri.

  "0,0": {
    id: 'TON_CAPITAL',
    level: 4,
    owner: { telegramId: '@TheOpenNationsDM' },
    title: 'Başkent',
    description: 'The Open Nations projesinin başkenti ve yönetim merkezi.',
    coverImage: 'assets/images/map.png',
    color: '#FFD700', // Altın rengi
    stats: { Defence: 25, Economy: 40, Population: 1200 },
    metaWorldId: 'MW_Capital'
  },
  "1,0": {
    id: 'TON_OFFICIAL',
    level: 2,
    owner: { telegramId: '@TheOpenNationsDM' },
    title: 'The Open Nations',
    description: 'The Open Nations Resmi Arazisi.',
    coverImage: 'assets/images/map.png',
    color: '#29b6f6', // Açık mavi
    stats: { Defence: 5, Economy: 15, Population: 150 },
    metaWorldId: 'MW_TON_Official'
  },
  "-5,10": {
    id: 'HAMSTER_KOMBAT',
    level: 0.1, // Neredeyse düz, gelişmemiş arazi
    owner: { telegramId: '@hamster_kombat' },
    title: 'Hamster Kombat Land',
    description: 'Hamster Kombat Resmi Arazisi.',
    coverImage: 'assets/images/map.png',
    color: '#f48c06', // Turuncu
    stats: null,
    metaWorldId: 'MW_Hamster_Kombat'
  },
  "8,8": {
    id: 'PAVEL_DUROV',
    level: 0.1,
    owner: { telegramId: '@durov' },
    title: "Pavel Durov's Retreat",
    description: "Telegram'ın kurucusuna ayrılmış özel ve sakin bir arazi.",
    coverImage: 'assets/images/map.png',
    color: '#FFFFFF', // Beyaz
    stats: null,
    metaWorldId: 'MW_Durov_Retreat'
  },
  "8,9": {
    id: 'WALLET_HQ',
    level: 0.1,
    owner: { telegramId: '@wallet' },
    title: 'Wallet HQ',
    description: 'TON Cüzdanı operasyonlarının merkezi.',
    coverImage: 'assets/images/map.png',
    color: '#0088cc', // Wallet mavisi
    stats: null,
    metaWorldId: 'MW_Wallet_HQ'
  },
  "8,10": {
    id: 'NOTCOIN_VAULT',
    level: 0.1,
    owner: { telegramId: '@notcoin' },
    title: 'Notcoin Kasası',
    description: 'Tüm Notcoin rezervlerinin tutulduğu efsanevi arazi.',
    coverImage: 'assets/images/map.png',
    color: '#1c1c1c', // Siyah
    stats: null,
    metaWorldId: 'MW_Notcoin_Vault'
  }
};
