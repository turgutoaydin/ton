// assets/js/mapData.js

// =============================================================================
// AÇIK DENİZ BÖLGELERİ (SEA REGIONS)
// =============================================================================
// Haritada boş bırakılacak (kara küpü oluşturulmayacak) alanları tanımlar.
const seaRegions = [
  // Geniş bir nehir, haritanın bir kısmını boydan boya geçer ve bir göle bağlanır.
  { from: { x: -4, z: -20 }, to: { x: -2, z: 15 } },
  { from: { x: -10, z: 15 }, to: { x: -2, z: 20 } },

  // Haritanın sağ tarafında büyük bir okyanus alanı ve kanalı.
  { from: { x: 25, z: -20 }, to: { x: 30, z: 20 } },
  { from: { x: 20, z: -5 }, to: { x: 25, z: 5 } },

  // Bağımsız, büyük bir göl.
  { from: { x: 10, z: -18 }, to: { x: 18, z: -12 } }
];


// =============================================================================
// ÖZEL BÖLGE VERİTABANI (SPECIAL PARCELS DATABASE)
// =============================================================================
// Bu dosya, haritadaki 'varsayılan' durumdan farklı olan, ÖZEL parselleri tanımlar.
const specialParcels = {
  // Anahtar: "x,z" formatında koordinat. Değer: O parsele ait özel veri.

  // --- MERKEZ ÜS ---
  "0,0": {
    id: 'TON_CAPITAL',
    level: 10,
    owner: { telegramId: '@TheOpenNationsDM' },
    channelId: '@TheOpenNations',
    chatId: 'TheOpenNationsChat',
    title: 'The Open Nations',
    description: 'The Open Nations evreninin başkenti. Tüm gücün merkezi.',
    coverImage: 'assets/images/map.png',
    color: '#00FFFF', // Neon Siyan rengi
    stats: { Defence: 100, Economy: 100, Population: 10000, Technology: 100 },
    metaWorldId: 'MW_TheOpenNations_Capital'
  },

  // --- SON SEVİYE ANIT PARSELLER (DAĞINIK YERLEŞİM) ---
  "-15,-15": {
    id: 'BTC_MONUMENT',
    level: 10,
    owner: null,
    title: 'Bitcoin Anıtı',
    description: 'Merkeziyetsizliğin ve dijital altının sembolü.',
    color: '#F7931A', // Bitcoin Turuncusu
    stats: null,
    metaWorldId: 'MW_BTC_Monument'
  },
  "-5,12": {
    id: 'ETH_MONUMENT',
    level: 10,
    owner: null,
    title: 'Ethereum Anıtı',
    description: 'Akıllı kontratların ve merkeziyetsiz uygulamaların doğduğu yer.',
    color: '#627EEA', // Ethereum Mavisi/Mor
    stats: null,
    metaWorldId: 'MW_ETH_Monument'
  },
  "15,15": {
    id: 'SOL_MONUMENT',
    level: 10,
    owner: null,
    title: 'Solana Anıtı',
    description: 'Yüksek hız ve düşük işlem ücretlerinin simgesi.',
    color: '#9945FF', // Solana Moru
    stats: null,
    metaWorldId: 'MW_SOL_Monument'
  },
  "-15,15": {
    id: 'XRP_MONUMENT',
    level: 10,
    owner: null,
    title: 'Ripple Anıtı',
    description: 'Sınır ötesi ödemeler ve finansal köprülerin anıtı.',
    color: '#007BFF', // Ripple Mavisi
    stats: null,
    metaWorldId: 'MW_XRP_Monument'
  },
  "2,2": {
    id: 'USDT_MONUMENT',
    level: 10,
    owner: null,
    title: 'Tether Anıtı',
    description: 'Dijital dünyadaki istikrarın ve likiditenin sembolü.',
    color: '#26A17B', // Tether Yeşili
    stats: null,
    metaWorldId: 'MW_USDT_Monument'
  },
  "22,-2": {
    id: 'TON_MONUMENT',
    level: 10,
    owner: null,
    title: 'The Open Network Anıtı',
    description: 'Telegram ile entegre, ölçeklenebilir ve hızlı blockchainin simgesi.',
    color: '#0088cc', // TON Mavisi
    stats: null,
    metaWorldId: 'MW_TON_Monument'
  },
  "-25,-25": {
    id: 'ELON_MUSK',
    level: 10,
    owner: { telegramId: '@elonmusk' }, // Varsayımsal
    title: "Elon Musk's Launchpad",
    description: 'Gezegenler arası hedeflerin ve teknolojik inovasyonun merkezi.',
    color: '#36454F', // Uzay Grisi
    stats: null,
    metaWorldId: 'MW_Musk_Launchpad'
  },
  "12,-15": {
    id: 'PAVEL_DUROV',
    level: 10,
    owner: { telegramId: '@durov' },
    title: "Pavel Durov's Citadel",
    description: "Özgürlük ve gizliliğin kalesi. Telegram'ın kurucusuna adanmıştır.",
    color: '#FFFFFF', // Saf Beyaz
    stats: null,
    metaWorldId: 'MW_Durov_Citadel'
  },

  // --- SEVİYE 3 ARAZİLER ---
  "2,-2": {
    id: 'WALLET_HQ',
    level: 3,
    owner: { telegramId: '@wallet' },
    title: 'Wallet HQ',
    description: 'TON Cüzdanı operasyonlarının merkezi.',
    color: '#0088cc',
    stats: null,
    metaWorldId: 'MW_Wallet_HQ'
  },

  // --- SEVİYE 1 ARAZİLER (TREND BÖLGESİ) ---
  "15,-25": {
    id: 'NOTCOIN_VAULT',
    level: 1,
    owner: { telegramId: '@notcoin' },
    title: 'Notcoin Kasası',
    description: 'Tüm Notcoin rezervlerinin tutulduğu efsanevi arazi.',
    color: '#1c1c1c',
    stats: null,
    metaWorldId: 'MW_Notcoin_Vault'
  },
  "-15, -20": {
    id: 'HAMSTER_KOMBAT',
    level: 1,
    owner: { telegramId: '@hamster_kombat' },
    title: 'Hamster Kombat Land',
    description: 'Hamster Kombat Resmi Arazisi.',
    color: '#f48c06',
    stats: null,
    metaWorldId: 'MW_Hamster_Kombat'
  },
  "-16,-20": {
    id: 'BLUM_GARDEN',
    level: 1,
    owner: { telegramId: '@BlumCryptoBot' }, // Varsayımsal
    title: 'Blum Bahçesi',
    description: 'Blum puanlarının filizlendiği verimli topraklar.',
    color: '#91f22e', // Blum Yeşili
    stats: null,
    metaWorldId: 'MW_Blum_Garden'
  }
};
