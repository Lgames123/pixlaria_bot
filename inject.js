/**
 * Pixlaria Automation Suite - Main Injected Controller
 * Runs directly in page context with full access to `window.app`.
 * Upgraded with Human-Like Timing Distributions, Perception Latency & Natural Behaviors.
 */
(function initPixlariaBot() {
  const host = (window.location && window.location.hostname || '').toLowerCase();
  if (host !== 'pixlaria.com' && !host.endsWith('.pixlaria.com')) return;

  if (window.__pixlariaBotInjected) return;
  window.__pixlariaBotInjected = true;

  console.log('%c[Pixlaria Bot]%c Loading Humanized Automation Suite...', 'color: #f6c531; font-weight: bold;', 'color: inherit;');

  // Live proxy to window.app that safely resolves at runtime without throwing ReferenceError
  const app = new Proxy({}, {
    get(_, prop) {
      return typeof window !== 'undefined' && window.app ? window.app[prop] : undefined;
    },
    set(_, prop, val) {
      if (typeof window !== 'undefined' && window.app) {
        window.app[prop] = val;
      }
      return true;
    },
    has(_, prop) {
      return typeof window !== 'undefined' && window.app ? prop in window.app : false;
    }
  });

  // --- Gaussian Random Distribution (Box-Muller) for Realistic Reaction Curves ---
  function gaussian(mean, stdDev) {
    let u1 = Math.random();
    let u2 = Math.random();
    while (u1 === 0) u1 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return Math.max(Math.round(mean * 0.35), Math.round(z0 * stdDev + mean));
  }

  // --- Soft Skills & Resource Registry ---
  const SKILL_DATA = {
    woodcutting: {
      name: 'Woodcutting',
      skillKey: 'woodcutting',
      toolKind: 'axe',
      toolName: 'Axe',
      tools: [
        { id: 'bronze_axe', name: 'Bronze Axe', level: 1 },
        { id: 'iron_axe', name: 'Iron Axe', level: 5 },
        { id: 'steel_axe', name: 'Steel Axe', level: 15 },
        { id: 'silver_axe', name: 'Silver Axe', level: 30 },
        { id: 'gold_axe', name: 'Gold Axe', level: 40 }
      ],
      resources: [
        { id: 'tree', name: 'Normal Tree (Logs)', level: 1, action: 'Chop' },
        { id: 'oak', name: 'Oak Tree (Oak logs)', level: 15, action: 'Chop' },
        { id: 'pine', name: 'Snow Pine (Logs)', level: 20, action: 'Chop' },
        { id: 'willow', name: 'Willow Tree (Willow logs)', level: 30, action: 'Chop' },
        { id: 'maple', name: 'Maple Tree (Maple logs)', level: 45, action: 'Chop' },
        { id: 'yew', name: 'Yew Tree (Yew logs)', level: 60, action: 'Chop' }
      ]
    },
    mining: {
      name: 'Mining',
      skillKey: 'mining',
      toolKind: 'pickaxe',
      toolName: 'Pickaxe',
      tools: [
        { id: 'bronze_pickaxe', name: 'Bronze Pickaxe', level: 1 },
        { id: 'iron_pickaxe', name: 'Iron Pickaxe', level: 5 },
        { id: 'steel_pickaxe', name: 'Steel Pickaxe', level: 15 },
        { id: 'silver_pickaxe', name: 'Silver Pickaxe', level: 30 },
        { id: 'gold_pickaxe', name: 'Gold Pickaxe', level: 40 }
      ],
      resources: [
        { id: 'rock_copper', name: 'Copper Rock (Copper ore)', level: 1, action: 'Mine' },
        { id: 'rock_tin', name: 'Tin Rock (Tin ore)', level: 1, action: 'Mine' },
        { id: 'rock_iron', name: 'Iron Rock (Iron ore)', level: 15, action: 'Mine' },
        { id: 'rock_coal', name: 'Coal Rock (Coal)', level: 30, action: 'Mine' },
        { id: 'rock_silver', name: 'Silver Rock (Silver ore)', level: 50, action: 'Mine' },
        { id: 'rock_gold', name: 'Gold Rock (Gold ore)', level: 65, action: 'Mine' }
      ]
    },
    fishing: {
      name: 'Fishing',
      skillKey: 'fishing',
      toolKind: 'fishing_tool',
      toolName: 'Fishing Tackle',
      tools: [
        { id: 'small_fishing_net', name: 'Small Fishing Net', level: 1, tool: 'net' },
        { id: 'fishing_rod', name: 'Fishing Rod', level: 20, tool: 'rod' },
        { id: 'harpoon', name: 'Harpoon', level: 35, tool: 'harpoon' },
        { id: 'sea_rod', name: 'Sea Rod', level: 40, tool: 'searod' }
      ],
      resources: [
        { id: 'fish_net', name: 'Net Spot (Shrimp Lv1 / Anchovy Lv15)', level: 1, action: 'Net', tool: 'net' },
        { id: 'fish_rod', name: 'Rod Spot (Trout Lv20 / Salmon Lv30)', level: 20, action: 'Lure', tool: 'rod' },
        { id: 'fish_harpoon', name: 'Harpoon Spot (Tuna Lv35 / Swordfish Lv50)', level: 35, action: 'Harpoon', tool: 'harpoon' },
        { id: 'fish_deep', name: 'Deep-Sea Shoal (Sea rod)', level: 40, action: 'Fish', tool: 'searod' },
        { id: 'fish_reef', name: 'Reef Spot (Rod - Wrasse / Snapper)', level: 45, action: 'Lure', tool: 'rod' },
        { id: 'fish_ice', name: 'Ice Hole (Rod - Ice Char)', level: 55, action: 'Jig', tool: 'rod' },
        { id: 'fish_exotic', name: 'Exotic Ocean Shoal (Sea rod)', level: 60, action: 'Fish', tool: 'searod' },
        { id: 'fish_glow', name: 'Glowing Pool (Net - Glowfin)', level: 70, action: 'Net', tool: 'net' },
        { id: 'fish_lagoon', name: 'Lagoon Spot (Harpoon - Arapaima)', level: 75, action: 'Harpoon', tool: 'harpoon' }
      ]
    },
    cooking: {
      name: 'Cooking',
      skillKey: 'cooking',
      toolKind: 'station',
      toolName: 'Range / Fire',
      stations: ['range', 'fire', 'campfire'],
      resources: [
        { id: 'raw_shrimp', name: 'Cook Shrimp', level: 1, raw: 'raw_shrimp' },
        { id: 'raw_anchovies', name: 'Cook Anchovies', level: 1, raw: 'raw_anchovies' },
        { id: 'raw_meat', name: 'Cook Raw Meat', level: 1, raw: 'raw_meat' },
        { id: 'raw_trout', name: 'Cook Trout', level: 15, raw: 'raw_trout' },
        { id: 'raw_salmon', name: 'Cook Salmon', level: 25, raw: 'raw_salmon' },
        { id: 'raw_tuna', name: 'Cook Tuna', level: 30, raw: 'raw_tuna' },
        { id: 'raw_sea_bream', name: 'Cook Sea Bream', level: 35, raw: 'raw_sea_bream' },
        { id: 'raw_mackerel', name: 'Cook Mackerel', level: 40, raw: 'raw_mackerel' },
        { id: 'raw_coral_wrasse', name: 'Cook Coral Wrasse', level: 40, raw: 'raw_coral_wrasse' },
        { id: 'raw_swordfish', name: 'Cook Swordfish', level: 45, raw: 'raw_swordfish' },
        { id: 'raw_ice_char', name: 'Cook Ice Char', level: 48, raw: 'raw_ice_char' },
        { id: 'raw_sunstripe_snapper', name: 'Cook Sunstripe Snapper', level: 52, raw: 'raw_sunstripe_snapper' },
        { id: 'raw_great_pike', name: 'Cook Great Pike', level: 57, raw: 'raw_great_pike' },
        { id: 'raw_glowfin', name: 'Cook Glowfin', level: 62, raw: 'raw_glowfin' },
        { id: 'raw_arapaima', name: 'Cook Arapaima', level: 67, raw: 'raw_arapaima' },
        { id: 'raw_shark', name: 'Cook Shark', level: 77, raw: 'raw_shark' }
      ]
    },
    smithing: {
      name: 'Smithing & Smelting',
      skillKey: 'smithing',
      toolKind: 'hammer_or_none',
      toolName: 'Hammer (for Anvil)',
      stations: ['furnace', 'anvil'],
      tools: [
        { id: 'hammer', name: 'Hammer', level: 1 }
      ],
      resources: [
        { id: 'bronze_bar', name: 'Smelt Bronze Bar (Copper + Tin)', level: 1, station: 'furnace', ores: ['copper_ore', 'tin_ore'] },
        { id: 'iron_bar', name: 'Smelt Iron Bar (Iron Ore)', level: 15, station: 'furnace', ores: ['iron_ore'] },
        { id: 'steel_bar', name: 'Smelt Steel Bar (Iron + 2 Coal)', level: 30, station: 'furnace', ores: ['iron_ore', 'coal'] },
        { id: 'silver_bar', name: 'Smelt Silver Bar (Silver + 2 Coal)', level: 50, station: 'furnace', ores: ['silver_ore', 'coal'] },
        { id: 'gold_bar', name: 'Smelt Gold Bar (Gold + 3 Coal)', level: 65, station: 'furnace', ores: ['gold_ore', 'coal'] },
        { id: 'anvil_all', name: 'Forge at Anvil (All Available Bars in Bag)', level: 1, station: 'anvil', reqHammer: true }
      ]
    },
    firemaking: {
      name: 'Firemaking',
      skillKey: 'firemaking',
      toolKind: 'tinderbox',
      toolName: 'Tinderbox',
      tools: [
        { id: 'tinderbox', name: 'Tinderbox', level: 1 }
      ],
      resources: [
        { id: 'logs', name: 'Logs', level: 1, xp: 40, item: 'logs' },
        { id: 'oak_logs', name: 'Oak logs', level: 15, xp: 60, item: 'oak_logs' },
        { id: 'willow_logs', name: 'Willow logs', level: 30, xp: 90, item: 'willow_logs' },
        { id: 'maple_logs', name: 'Maple logs', level: 45, xp: 135, item: 'maple_logs' },
        { id: 'yew_logs', name: 'Yew logs', level: 60, xp: 202.5, item: 'yew_logs' }
      ]
    }
  };

  // --- Known Edible Item Registry (Fish, Meats, Dishes, Brews, Potions) ---
  const KNOWN_FOODS = new Map([
    ['shrimp', 9], ['anchovies', 11], ['trout', 18], ['salmon', 24], ['tuna', 31],
    ['swordfish', 44], ['sea_bream', 37], ['mackerel', 42], ['blue_marlin', 53],
    ['great_halibut', 61], ['golden_sunfish', 70], ['sea_serpent', 84],
    ['ice_char', 48], ['great_pike', 57], ['glowfin', 62], ['arapaima', 66],
    ['shark', 75], ['coral_wrasse', 42], ['sunstripe_snapper', 53],
    ['cooked_meat', 12], ['apple', 5], ['berries', 4], ['bread', 10],
    ['stew', 35], ['carrot_soup', 14], ['meatballs', 28], ['bone_broth', 15],
    ['mushroom_skewer', 20], ['baked_apple', 16], ['berry_toast', 18],
    ['apple_pie', 32], ['cloudberry_pie', 48], ['honey_cake', 40], ['pear_crumble', 55],
    ['health_potion', 50], ['minor_health_potion', 25], ['greater_health_potion', 100],
    ['glowcap_brew', 40], ['frostcap_brew', 50]
  ]);

  // --- Static Interactable & Resource Node Registry (Fixed World Objects & NPCs) ---
  const STATIC_TYPE_REGISTRY = {
    // Trees (Woodcutting)
    tree: { name: 'Normal Tree', category: 'woodcutting', skill: 'woodcutting', action: 'Chop' },
    oak: { name: 'Oak Tree', category: 'woodcutting', skill: 'woodcutting', action: 'Chop' },
    pine: { name: 'Snow Pine', category: 'woodcutting', skill: 'woodcutting', action: 'Chop' },
    willow: { name: 'Willow Tree', category: 'woodcutting', skill: 'woodcutting', action: 'Chop' },
    maple: { name: 'Maple Tree', category: 'woodcutting', skill: 'woodcutting', action: 'Chop' },
    yew: { name: 'Yew Tree', category: 'woodcutting', skill: 'woodcutting', action: 'Chop' },

    // Rocks (Mining)
    rock_copper: { name: 'Copper Rock', category: 'mining', skill: 'mining', action: 'Mine' },
    rock_tin: { name: 'Tin Rock', category: 'mining', skill: 'mining', action: 'Mine' },
    rock_iron: { name: 'Iron Rock', category: 'mining', skill: 'mining', action: 'Mine' },
    rock_coal: { name: 'Coal Rock', category: 'mining', skill: 'mining', action: 'Mine' },
    rock_silver: { name: 'Silver Rock', category: 'mining', skill: 'mining', action: 'Mine' },
    rock_gold: { name: 'Gold Rock', category: 'mining', skill: 'mining', action: 'Mine' },

    // Fishing Spots
    fish_net: { name: 'Net Spot', category: 'fishing', skill: 'fishing', action: 'Net' },
    fish_rod: { name: 'Rod Spot', category: 'fishing', skill: 'fishing', action: 'Lure' },
    fish_harpoon: { name: 'Harpoon Spot', category: 'fishing', skill: 'fishing', action: 'Harpoon' },
    fish_deep: { name: 'Deep-Sea Shoal', category: 'fishing', skill: 'fishing', action: 'Fish' },
    fish_reef: { name: 'Reef Spot', category: 'fishing', skill: 'fishing', action: 'Lure' },
    fish_ice: { name: 'Ice Hole', category: 'fishing', skill: 'fishing', action: 'Jig' },
    fish_glow: { name: 'Glowing Pool', category: 'fishing', skill: 'fishing', action: 'Net' },
    fish_lagoon: { name: 'Lagoon Spot', category: 'fishing', skill: 'fishing', action: 'Harpoon' },

    // Foraging & Plants
    berry_bush: { name: 'Berry Bush', category: 'foraging', skill: 'foraging', action: 'Pick' },
    hazel_bush: { name: 'Hazel Bush', category: 'foraging', skill: 'foraging', action: 'Pick' },
    guava_bush: { name: 'Guava Bush', category: 'foraging', skill: 'foraging', action: 'Pick' },

    // Crafting Stations
    furnace: { name: 'Furnace', category: 'station', skill: 'smithing', action: 'Smelt' },
    anvil: { name: 'Anvil', category: 'station', skill: 'smithing', action: 'Smith' },
    range: { name: 'Cooking Range', category: 'station', skill: 'cooking', action: 'Cook' },
    fire: { name: 'Fire', category: 'station', skill: 'cooking', action: 'Cook' },
    campfire: { name: 'Campfire', category: 'station', skill: 'cooking', action: 'Cook' },

    // Fixed Interactive Utilities & Fixtures
    bank: { name: 'Bank Booth', category: 'utility', action: 'Bank' },
    well: { name: 'Well', category: 'utility', action: 'Use' },
    waystone: { name: 'Waystone', category: 'utility', action: 'Interact' },
    cider_press: { name: 'Cider Press', category: 'utility', action: 'Use' },
    armchair: { name: 'Armchair', category: 'utility', action: 'Sit' },
    bench: { name: 'Bench', category: 'utility', action: 'Sit' },
    market_stall: { name: 'Town Market', category: 'utility', action: 'Browse' }
  };

  // Official respawn timings from Pixlaria tiles.js (in ms)
  const RESOURCE_RESPAWN_MS = {
    // Mining (copper/tin ~8-10s, iron ~13-16s, coal ~26-30s, silver ~90s, gold ~140s)
    rock_copper: 10000,
    rock_tin: 10000,
    rock_iron: 15000,
    rock_coal: 30000,
    rock_silver: 95000,
    rock_gold: 145000,
    // Woodcutting (normal 24s, oak 40s, willow 50s, pine 50s, maple 70s, yew 114s)
    tree: 26000,
    oak: 42000,
    willow: 52000,
    pine: 52000,
    maple: 72000,
    yew: 120000,
    // Fishing (spots take 90s - 180s to refill with fish)
    fish_net: 95000,
    fish_rod: 125000,
    fish_harpoon: 155000,
    fish_reef: 155000,
    fish_exotic: 155000,
    fish_deep: 185000,
    fish_ice: 125000,
    fish_glow: 155000,
    fish_lagoon: 155000
  };

  // Attempt dynamic import of game's items definitions into window.ITEMS
  import('/shared/items.js').then(m => {
    if (m && m.ITEMS) window.ITEMS = m.ITEMS;
  }).catch(() => {});

  // --- 1. Bot State & Configuration ---
  const Bot = {
    running: false,
    combatLoopActive: false,
    autoLootActive: false,
    autoEatActive: true,
    skillingLoopActive: false, // Soft skill automation toggle
    cavebotActive: false,      // Waypoint cavebotting toggle
    humanMode: true, // Humanized behaviors enabled
    resourceMemory: new Map(), // key (type@x,y) -> static node metadata
    telemetry: {
      startedAt: Date.now(),
      resetAt: Date.now(),
      initialGold: null,
      initialCharXp: null,
      initialSkills: {},
      lootGathered: 0,
      lastInvItemCount: null
    },

    config: {
      profile: 'natural',       // 'natural' | 'gamer' | 'stealth'
      eatThreshold: 0.5,        // Eat when HP <= 50%
      targetMonsterType: 'any', // Monster type filter (e.g. 'wolf', 'hoglet', 'any')
      customTargetName: '',     // Freeform text filter
      combatRange: 8,           // Max distance to acquire targets
      castSpells: true,         // Cast abilities during combat
      selectedSpell: 'kira',    // Default spell: Strike
      minManaPercent: 0.25,     // Don't cast if mana is lower than 25%
      spellCooldownMs: 2000,    // Base cooldown
      maxLootDistance: 8,       // Tiles
      lootBlacklist: ['bones', 'burnt_shrimp', 'burnt_meat'],
      lootWhitelist: [],
      // Auto Haste
      autoHaste: false,         // Recast Haste (venti) every 40s
      // Cavebot Waypoint System
      waypoints: [],            // Array of { x, y } coordinates
      // Resource Memory System
      recordResources: true,    // Record static nodes and NPCs automatically
      useResourceMemory: true,  // Path to remembered static nodes when out of immediate view
      // Skilling Configuration
      skillingSkill: 'woodcutting',   // 'woodcutting' | 'mining' | 'fishing' | 'cooking' | 'smithing' | 'firemaking'
      skillingTarget: 'any_highest', // 'any_highest' or resource ID
      skillingRadius: 20,            // Search radius in tiles
      skillingAutoDrop: false,       // Drop gathered items if bag full
      firemakingBatch: true,         // true = light 5x in a line, false = light 1x single
      // Wilderness Supply Box & Old Chest Radar
      boxRadar: true,                // Tactical Box Radar toggle (snaplines & brackets)
      boxRadarWildOnly: true,        // Focus on wilderness boxes (exclude player claim furniture obj.b)
      boxRadarTargetChests: true,    // Target Old Chests (caches) and wilderness chests
      boxRadarHideInteracted: true,  // Automatically hide boxes/chests already opened/interacted
      boxRadarSnaplines: true,       // Draw glowing snaplines from player to box
      boxRadarMaxDistance: 35,       // Radar detection radius in tiles
      // Human-Like Anti-Inactivity / Anti-AFK Engine
      antiInactivity: true,          // Master anti-disconnect toggle
      antiInactivityCamera: true,    // Natural subtle camera glances / yaw micro-nudges
      antiInactivityAutoStay: true,  // Auto-respond to server idle warning banner
      antiInactivityFidget: true     // Subtle idle micro-fidgets when inactive
    },

    runtime: {
      lastEatTime: 0,
      lastSpellTime: 0,
      nextSpellJitter: 0,
      lastHasteCast: 0,
      activeTargetId: null,
      combatEngagedAt: 0,
      lastTargetKilledAt: 0,
      lastPerceptionTime: 0,
      lastMeasuredDelay: 0,
      isWalking: false,
      isLooting: false,
      tickTimer: null,
      // Resource Memory Runtime
      lastResourceScan: 0,
      resourceSaveTimer: null,
      // Cavebot Runtime
      currentWaypointIdx: 0,
      cavebotStatus: 'Idle',
      // Skilling Runtime & Depletion Engine
      activeSkillingObjId: null,
      approachingObjId: null,       // Node currently in pathing approach
      approachingCoord: null,       // { x, y } of target in approach
      lastSkillingAttemptTime: 0,
      skillingActionStatus: 'Idle',
      skillingReengageAttempts: 0,  // Watchdog re-engagement attempt counter
      depletedNodes: new Map(),     // obj.id -> expiryTimestamp
      depletedCoords: new Map(),    // "x,y" -> expiryTimestamp
      unreachableNodes: new Map(),  // obj.id or "x,y" -> expiryTimestamp ("I can't reach that")
      lastVisitedNodes: new Map(),  // obj.id -> timestamp (anti-ping-pong rotation)
      lastVisitedCoords: new Map(), // "x,y" -> timestamp (anti-ping-pong rotation)
      skippedMonkeyTrees: new Map(), // treeId -> expiryTimestamp (protects axe from failed shoo)
      gatheringSince: 0,
      lastGatherStrokeAt: 0,
      activeActionKind: null,
      // Fishing State Engine
      lastFishingCastAt: 0,
      lastFishingBiteAt: 0,
      lastFishingCatchAt: 0,
      isFishingWaiting: false,
      isFishingReeling: false,
      lastCookingAttemptTime: 0,
      lastSmithingAttemptTime: 0,
      lastLightingAttemptTime: 0,
      recentlyLitFires: new Map(),   // "x,y" -> expiryTimestamp
      netHookInstalled: false,
      // Anti-Inactivity Runtime
      lastActivityPulseTime: 0,
      nextActivityPulseDelay: 55000,
      lastCameraFidgetTime: 0,
      nextCameraFidgetDelay: 105000,
      lastPositionFidgetTime: 0,
      nextPositionFidgetDelay: 185000,
      // Box & Chest Radar Runtime
      radarAnimationLoopActive: false,
      radarCanvas: null,
      radarCtx: null,
      nearbyBoxes: [],
      interactedBoxes: new Map(),    // key ("id" or "x,y") -> timestamp
      ignoredEntities: new Set()     // entityId -> true
    },

    // --- Dynamic Human Timing Generators ---
    getDelay(kind) {
      if (!this.humanMode) return 50; // Machine speed if human mode is turned off

      const p = this.config.profile;
      let delay = 300;

      switch (kind) {
        case 'perception': // Noticing newly spawned target or drop
          delay = p === 'gamer' ? gaussian(220, 45) : p === 'stealth' ? gaussian(550, 110) : gaussian(360, 75);
          break;
        case 'aim': // Cursor travel / hover hesitation before clicking
          delay = p === 'gamer' ? gaussian(150, 35) : p === 'stealth' ? gaussian(380, 80) : gaussian(240, 50);
          break;
        case 'spell': // Spell cadence jitter around cooldown
          delay = p === 'gamer' ? gaussian(160, 40) : p === 'stealth' ? gaussian(450, 90) : gaussian(280, 60);
          break;
        case 'loot_react': // Reaction delay after monster drops loot
          delay = p === 'gamer' ? gaussian(260, 50) : p === 'stealth' ? gaussian(650, 120) : gaussian(420, 80);
          break;
        case 'pickup': // Physical pick up action
          delay = p === 'gamer' ? gaussian(140, 30) : p === 'stealth' ? gaussian(350, 70) : gaussian(220, 45);
          break;
        case 'eat_reaction': // Reaction time noticing health dropped
          delay = p === 'gamer' ? gaussian(200, 40) : p === 'stealth' ? gaussian(520, 100) : gaussian(320, 65);
          break;
        case 'item_click': // Between inventory/bank item clicks
          delay = p === 'gamer' ? gaussian(170, 35) : p === 'stealth' ? gaussian(420, 80) : gaussian(260, 55);
          break;
        case 'tick': // Base master loop heartbeat
          delay = p === 'gamer' ? gaussian(280, 50) : p === 'stealth' ? gaussian(580, 90) : gaussian(390, 70);
          break;
        default:
          delay = gaussian(250, 50);
      }

      this.runtime.lastMeasuredDelay = delay;
      this.updateDelayIndicator(delay);
      return delay;
    },

    sleep(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    
    isReady() {
      const a = window.app;
      const ready = Boolean(a && a.net && a.entities && a.entities.me && a.stats);
      if (ready && !this.runtime.netHookInstalled) {
        this.installNetHook();
      }
      return ready;
    },

    log(msg) {
      console.log(`%c[Pixlaria Bot]%c ${msg}`, 'color: #f6c531; font-weight: bold;', 'color: #e5e7eb;');
    },

    updateDelayIndicator(ms) {
      const el = document.getElementById('pix-human-delay');
      if (el) el.textContent = `${ms} ms`;
    },

    // --- Session Telemetry & Progression Subsystem ---
    resetTelemetry() {
      const now = Date.now();
      this.telemetry.resetAt = now;
      this.telemetry.startedAt = now;
      this.telemetry.lootGathered = 0;
      this.telemetry.initialGold = this.getCurrentGold();
      this.telemetry.initialCharXp = Number(app.stats?.exp ?? 0);
      this.telemetry.initialSkills = app.skills ? { ...app.skills } : {};
      this.telemetry.lastInvItemCount = this.getInvItemCount();
      this.log('Session Telemetry has been reset.');
      this.updateTelemetryUI();
    },

    getCurrentGold() {
      try {
        if (typeof app.gold === 'number') return app.gold;
        if (typeof app.ui?.carried === 'function') return app.ui.carried('coins');
        return (app.inv || []).reduce((sum, s) => sum + (s?.item === 'coins' ? (s.count || 1) : 0), 0);
      } catch (e) {
        return 0;
      }
    },

    getInvItemCount() {
      try {
        return (app.inv || []).reduce((sum, s) => sum + (s && s.item !== 'coins' ? (s.count || 1) : 0), 0);
      } catch (e) {
        return 0;
      }
    },

    updateTelemetry() {
      const t = this.telemetry;

      // Initialize baselines if first arrival
      if (t.initialGold === null) {
        const curGold = this.getCurrentGold();
        if (curGold !== null && curGold !== undefined) t.initialGold = curGold;
      }
      if (t.initialCharXp === null && app.stats?.exp !== undefined) {
        t.initialCharXp = Number(app.stats.exp);
      }
      if (Object.keys(t.initialSkills).length === 0 && app.skills) {
        t.initialSkills = { ...app.skills };
      }

      const currentInv = this.getInvItemCount();
      if (t.lastInvItemCount === null) {
        t.lastInvItemCount = currentInv;
      } else {
        // Only track gains when not withdrawing from bank or purchasing from shop
        const inBankOrShop = Boolean(app.ui?.bankOpen || app.ui?.shopOpen);
        if (!inBankOrShop && currentInv > t.lastInvItemCount) {
          t.lootGathered += (currentInv - t.lastInvItemCount);
        }
        t.lastInvItemCount = currentInv;
      }
    },

    getTelemetryStats() {
      const t = this.telemetry;
      const elapsedMs = Math.max(0, Date.now() - t.resetAt);
      const totalSec = Math.floor(elapsedMs / 1000);
      const hours = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;
      const elapsedFormatted = [
        String(hours).padStart(2, '0'),
        String(mins).padStart(2, '0'),
        String(secs).padStart(2, '0')
      ].join(':');

      const currentGold = this.getCurrentGold();
      const goldGained = Math.max(0, currentGold - (t.initialGold ?? currentGold));

      const currentCharXp = Number(app.stats?.exp || 0);
      const xpGained = Math.max(0, currentCharXp - (t.initialCharXp ?? currentCharXp));

      let totalSkillXpGained = 0;
      const skillDeltas = {};
      if (app.skills) {
        for (const [skill, val] of Object.entries(app.skills)) {
          const base = t.initialSkills[skill] ?? val;
          const delta = Math.max(0, (val || 0) - base);
          if (delta > 0) {
            skillDeltas[skill] = delta;
            totalSkillXpGained += delta;
          }
        }
      }

      return {
        elapsedFormatted,
        lootGathered: t.lootGathered,
        goldGained,
        xpGained,
        totalSkillXpGained,
        skillDeltas
      };
    },

    updateTelemetryUI() {
      const timeEl = document.getElementById('pix-telem-time');
      const lootEl = document.getElementById('pix-telem-loot');
      const goldEl = document.getElementById('pix-telem-gold');
      const xpEl = document.getElementById('pix-telem-xp');
      const skillXpEl = document.getElementById('pix-telem-skillxp');
      const breakdownEl = document.getElementById('pix-telem-skill-breakdown');

      if (!timeEl) return;

      const data = this.getTelemetryStats();
      timeEl.textContent = data.elapsedFormatted;
      if (lootEl) lootEl.textContent = `${data.lootGathered.toLocaleString()} items`;
      if (goldEl) goldEl.textContent = `+${data.goldGained.toLocaleString()} GC`;
      if (xpEl) xpEl.textContent = `+${data.xpGained.toLocaleString()} XP`;
      if (skillXpEl) skillXpEl.textContent = `+${data.totalSkillXpGained.toLocaleString()} XP`;

      if (breakdownEl) {
        const skillsList = Object.entries(data.skillDeltas);
        if (skillsList.length === 0) {
          breakdownEl.innerHTML = '<span style="color:#6b7280;">No skill XP gained yet</span>';
        } else {
          const icons = {
            woodcutting: '🪓',
            mining: '⛏️',
            fishing: '🎣',
            cooking: '🍳',
            smithing: '🔨',
            firemaking: '🔥',
            foraging: '🌿',
            magic: '🔮'
          };
          breakdownEl.innerHTML = skillsList.map(([k, d]) => {
            const icon = icons[k] || '⭐';
            const name = k.charAt(0).toUpperCase() + k.slice(1);
            return `<span style="background:rgba(52,211,153,0.12); padding:1px 5px; border-radius:4px; border:1px solid rgba(52,211,153,0.25); color:#a7f3d0;">${icon} ${name}: +${d.toLocaleString()}</span>`;
          }).join('');
        }
      }
    },

    // --- Server Event & Message Bus Listener ---
    installNetHook() {
      if (this.runtime.netHookInstalled || typeof app === 'undefined' || !app.net) return;

      // 1. Intercept Network Packets
      const origDispatch = app.net.dispatch.bind(app.net);
      app.net.dispatch = (m) => {
        try {
          this.handleServerPacket(m);
        } catch (err) {
          console.error('[Pixlaria Bot] Error in server packet listener:', err);
        }
        return origDispatch(m);
      };

      // 2. Intercept UI Chat / Notice Messages
      if (app.ui && !app.ui._pixOrigAddMsg) {
        app.ui._pixOrigAddMsg = app.ui.addMessage.bind(app.ui);
        app.ui.addMessage = (text, kind, ...rest) => {
          try {
            this.handleChatMessage(text, kind);
          } catch (err) {}
          return app.ui._pixOrigAddMsg(text, kind, ...rest);
        };
      }

      this.runtime.netHookInstalled = true;
      this.log('Attached game event hooks: watching server replies & node depletion.');
    },

    handleServerPacket(m) {
      if (!m || !m.t) return;

      // Chat / System Message
      if (m.t === 'msg' && m.text) {
        this.handleChatMessage(m.text, m.kind);
      }

      // Animation & Workdone
      if (m.t === 'anim') {
        if (m.a === 'workdone') {
          this.confirmNodeDepleted(this.runtime.activeSkillingObjId, m.text || 'Server workdone signal');
        } else if (['swing', 'gather', 'catch', 'seacast', 'seabite', 'seacatch'].includes(m.a)) {
          if (m.id === app.myId) {
            this.runtime.lastGatherStrokeAt = Date.now();
            this.runtime.skillingReengageAttempts = 0; // reset retry counter on confirmed stroke
            if (m.a === 'seacast') {
              this.runtime.lastFishingCastAt = Date.now();
              this.runtime.isFishingWaiting = true;
              this.runtime.isFishingReeling = false;
              this.runtime.skillingActionStatus = 'Sea rod cast: settled back in boat, waiting for bite...';
              this.log('Sea rod cast animation received: settled back in boat, waiting.');
            } else if (m.a === 'seabite') {
              this.runtime.lastFishingBiteAt = Date.now();
              this.runtime.isFishingReeling = true;
              this.runtime.isFishingWaiting = false;
              this.runtime.skillingActionStatus = `Fish biting! Reeling in ${m.item || 'catch'}...`;
              this.log(`Sea bite: fighting and reeling in ${m.item || 'fish'}!`);
            } else if (m.a === 'seacatch' || m.a === 'catch') {
              this.runtime.lastFishingCatchAt = Date.now();
              this.runtime.isFishingWaiting = false;
              this.runtime.isFishingReeling = false;
              this.runtime.skillingActionStatus = `Caught ${m.item || 'fish'}!`;
              this.log(`Fish landed: ${m.n || 1}x ${m.item || 'fish'}!`);
            }
          }
        }
      }

      // Server Inactivity / Idle Warning
      if (m.t === 'idle' && m.remaining !== null && m.remaining > 0) {
        this.handleServerIdleWarning(m);
      }

      // World Object updates
      if (m.t === 'obj') {
        if (m.depleted) {
          const liveObj = app.world?.objects?.get(m.id)?.obj || app.world?.objects?.get(m.id);
          this.confirmNodeDepleted(m.id, 'Server obj depleted packet', null, liveObj?.x, liveObj?.y);
        } else if (m.depleted === false) {
          this.runtime.depletedNodes.delete(m.id);
          this.runtime.unreachableNodes.delete(m.id);
          const liveObj = app.world?.objects?.get(m.id)?.obj || app.world?.objects?.get(m.id);
          if (liveObj && typeof liveObj.x === 'number' && typeof liveObj.y === 'number') {
            const coordKey = `${Math.round(liveObj.x)},${Math.round(liveObj.y)}`;
            this.runtime.depletedCoords.delete(coordKey);
            this.runtime.unreachableNodes.delete(coordKey);
          }
        }
        if (m.mk === 0 || m.mk === false || m.shoo) {
          this.runtime.skippedMonkeyTrees.delete(m.id);
        }
      }

      // Firemaking Ignite & Tinder Strikes
      if (m.t === 'kindle' && typeof m.x === 'number' && typeof m.y === 'number') {
        this.runtime.recentlyLitFires.set(`${m.x},${m.y}`, Date.now() + 75000);
        this.runtime.lastLightingAttemptTime = Date.now();
      } else if (m.t === 'tinder') {
        this.runtime.lastLightingAttemptTime = Date.now();
      }
    },

    handleChatMessage(text, kind) {
      if (!text || typeof text !== 'string') return;
      const lower = text.toLowerCase();

      // Firemaking placement / road / environmental restriction notices
      if (
        lower.includes("can't light a fire") ||
        lower.includes("cannot light a fire") ||
        lower.includes("not enough oxygen") ||
        lower.includes("underground") ||
        lower.includes("clear outdoor tile") ||
        lower.includes("cannot be lit") ||
        lower.includes("road")
      ) {
        const me = app.entities?.me;
        if (me) {
          const coordKey = `${Math.round(me.x)},${Math.round(me.y)}`;
          this.runtime.recentlyLitFires.set(coordKey, Date.now() + 75000);
        }
        this.runtime.skillingActionStatus = `Cannot light here: "${text.trim()}". Seeking clear ground...`;
      }

      // 1. Fishing casting / settling in boat notices
      if (
        lower.includes('cast the heavy line') ||
        lower.includes('settle back in the boat') ||
        lower.includes('cast your line') ||
        lower.includes('cast out your net')
      ) {
        this.runtime.lastGatherStrokeAt = Date.now();
        this.runtime.lastFishingCastAt = Date.now();
        this.runtime.isFishingWaiting = true;
        this.runtime.isFishingReeling = false;
        this.runtime.skillingReengageAttempts = 0;
        this.runtime.skillingActionStatus = 'Line cast: waiting for bite...';
        this.log(`Fishing cast confirmed: "${text.trim()}". Waiting.`);
      }

      // Fishing catch notices in chat
      if (
        lower.includes('you catch') ||
        lower.includes('you caught') ||
        lower.includes('you land a') ||
        lower.includes('pull in')
      ) {
        this.runtime.lastGatherStrokeAt = Date.now();
        this.runtime.lastFishingCatchAt = Date.now();
        this.runtime.isFishingWaiting = false;
        this.runtime.isFishingReeling = false;
        this.runtime.skillingReengageAttempts = 0;
      }

      // 2. Unreachable phrases in game chat / server notices ("I can't reach that")
      const isUnreachableNotice = (
        lower.includes('reach that') ||
        lower.includes("can't reach") ||
        lower.includes('cant reach') ||
        lower.includes('cannot reach') ||
        lower.includes('out of reach') ||
        lower.includes('too far away') ||
        lower.includes('no clear path') ||
        lower.includes('path is blocked') ||
        lower.includes('cannot get there') ||
        lower.includes("can't get there")
      );

      if (isUnreachableNotice) {
        const targetId = this.runtime.activeSkillingObjId || this.runtime.approachingObjId;
        const coord = this.runtime.approachingCoord;
        const cooldown = Date.now() + 75000; // 75 seconds unreachable blacklist

        if (targetId) {
          this.runtime.unreachableNodes.set(targetId, cooldown);
        }
        if (coord && typeof coord.x === 'number' && typeof coord.y === 'number') {
          const coordKey = `${Math.round(coord.x)},${Math.round(coord.y)}`;
          this.runtime.unreachableNodes.set(coordKey, cooldown);
        }

        this.log(`Unreachable notice received: "${text.trim()}". Blacklisting target for 75s and advancing to next.`);
        this.runtime.activeSkillingObjId = null;
        this.runtime.approachingObjId = null;
        this.runtime.approachingCoord = null;
        this.runtime.gatheringSince = 0;
        this.runtime.lastGatherStrokeAt = 0;
        this.runtime.activeActionKind = null;
        this.runtime.skillingActionStatus = `Target unreachable ("${text.trim()}"). Moving to next...`;

        // Halt any stuck walk command
        try {
          app.net.send({ t: 'stop' });
        } catch (_) {}
        return;
      }

      // 3. Depletion phrases in game chat / server notices
      const isDepletedNotice = (
        lower.includes('no ore left') ||
        lower.includes('try another rock') ||
        lower.includes('ore is mined out') ||
        lower.includes('tree is spent') ||
        lower.includes('tree stump') ||
        lower.includes('what is left of a tree') ||
        lower.includes('picked bare') ||
        lower.includes('fish have scattered') ||
        lower.includes('shoal has scattered') ||
        lower.includes('shoal scattered') ||
        lower.includes('shoal is depleted') ||
        lower.includes('shoal has moved') ||
        lower.includes('gone quiet') ||
        lower.includes('no fish bite') ||
        lower.includes('nothing left here') ||
        lower.includes('node is depleted')
      );

      if (isDepletedNotice) {
        this.confirmNodeDepleted(this.runtime.activeSkillingObjId || this.runtime.approachingObjId, text.trim());
      }
    },

    getNodeRespawnDuration(objType, skillKey) {
      if (objType && RESOURCE_RESPAWN_MS[objType]) {
        return RESOURCE_RESPAWN_MS[objType] + 3000;
      }
      if (skillKey === 'fishing') return 130000;
      if (skillKey === 'woodcutting') return 45000;
      if (skillKey === 'mining') return 20000;
      return 35000;
    },

    confirmNodeDepleted(nodeId, reason, explicitDuration = null, coordX = null, coordY = null) {
      const targetId = nodeId || this.runtime.activeSkillingObjId || this.runtime.approachingObjId;
      const skillKey = this.config.skillingSkill;

      // Find object details if available in world
      let objType = null;
      let x = coordX;
      let y = coordY;
      if (targetId && app.world?.objects?.has(targetId)) {
        const live = app.world.objects.get(targetId)?.obj || app.world.objects.get(targetId);
        if (live) {
          objType = live.type;
          if (x == null) x = live.x;
          if (y == null) y = live.y;
        }
      }

      const duration = explicitDuration || this.getNodeRespawnDuration(objType, skillKey);
      const expiry = Date.now() + duration;

      if (targetId) {
        this.runtime.depletedNodes.set(targetId, expiry);
        this.runtime.lastVisitedNodes.set(targetId, Date.now());
      }

      if (x != null && y != null) {
        const coordKey = `${Math.round(x)},${Math.round(y)}`;
        this.runtime.depletedCoords.set(coordKey, expiry);
        this.runtime.lastVisitedCoords.set(coordKey, Date.now());
      }

      if (this.runtime.activeSkillingObjId === targetId || this.runtime.approachingObjId === targetId || !nodeId) {
        this.log(`Node depleted confirmed: "${reason}" (cooldown ${(duration / 1000).toFixed(0)}s). Moving to next resource.`);
        this.runtime.activeSkillingObjId = null;
        this.runtime.approachingObjId = null;
        this.runtime.approachingCoord = null;
        this.runtime.gatheringSince = 0;
        this.runtime.lastGatherStrokeAt = 0;
        this.runtime.activeActionKind = null;
        this.runtime.skillingActionStatus = `Node depleted (${reason}). Searching next...`;
      }
    },

    isGatheringActive() {
      if (!this.isReady()) return false;
      const me = app.entities?.me;
      if (!me) return false;

      const skillKey = this.config.skillingSkill;

      // --- Fishing Special Handling (Cast & Wait Model) ---
      if (skillKey === 'fishing') {
        const timeSinceCast = Date.now() - (this.runtime.lastFishingCastAt || 0);
        const timeSinceCatch = Date.now() - (this.runtime.lastFishingCatchAt || 0);
        const timeSinceAttempt = Date.now() - (this.runtime.lastSkillingAttemptTime || 0);

        // 1. Engine model action flag says fishing
        if (me.action === 'fish') return true;

        // 2. Sea fishing model state attached to local entity
        if (me.sea && (!me.sea.land || (performance.now() - me.sea.land.start < 2500))) return true;

        // 3. Actively fighting/reeling a bite
        if (this.runtime.isFishingReeling && (Date.now() - (this.runtime.lastFishingBiteAt || 0) < 12000)) return true;

        // 4. Waiting for bite after cast (sea fishing bites can take up to 35s)
        if (this.runtime.isFishingWaiting && timeSinceCast < 35000 && (this.runtime.lastFishingCatchAt < this.runtime.lastFishingCastAt || timeSinceCatch > timeSinceCast)) {
          return true;
        }

        // 5. Catch landing animation grace window (allow 1.5s for fish to leap into boat/bag)
        if (this.runtime.lastFishingCatchAt && timeSinceCatch < 1500) return true;

        // 6. Initial interaction grace window after dispatching cast packet
        if (this.runtime.activeSkillingObjId && timeSinceAttempt < 2500) return true;

        return false;
      }

      // --- Gathering Skills (Mining, Woodcutting - Stroke Model) ---
      // 1. Engine model action flag
      const act = me.action; // 'mine', 'chop', 'smith', 'cook'
      const isKnownAct = act && ['mine', 'chop', 'smith', 'cook'].includes(act);

      // 2. Engine workAt descriptor - ONLY valid if workAt.k matches active action!
      // In Pixlaria engine, e.workAt is kept indefinitely between strokes; checking it without act leads to false positives.
      const isWorkAtMatching = Boolean(me.workAt && isKnownAct && me.workAt.k === act);

      // 3. Engine stroke animation timer
      const isStrokeActive = Boolean(me.stroke && performance.now() < me.stroke.until);

      // 4. Recent gather stroke timestamp (within 3200ms)
      // Server mining strokes land every 1.8s. If > 3200ms passed without a stroke animation, the player is not actively gathering.
      const hasRecentStroke = Boolean(this.runtime.lastGatherStrokeAt && (Date.now() - this.runtime.lastGatherStrokeAt < 3200));

      // 5. Initial interaction grace window: if packet was dispatched within last 2000ms
      const isInitialGrace = Boolean(this.runtime.activeSkillingObjId && (Date.now() - this.runtime.lastSkillingAttemptTime < 2000));

      // If in initial grace window after clicking, wait for server response
      if (isInitialGrace) return true;

      // If active stroke animation or recent stroke confirmed
      if (isStrokeActive || hasRecentStroke) return true;

      // If engine reports active action AND workAt matches AND recent stroke occurred
      if (isKnownAct && isWorkAtMatching && hasRecentStroke) return true;

      return false;
    },

    // --- 2. Survival & Auto-Eat with Perception Delay ---
    async checkEmergencyEat() {
      if (!this.autoEatActive || !this.isReady()) return false;
      const hp = app.stats.hp || 0;
      const maxHp = app.stats.mhp || 1;
      const ratio = hp / maxHp;

      // Add a slight human variance (±2%) so eating isn't a razor-sharp math trigger
      const dynamicThreshold = this.humanMode
        ? Math.min(0.95, this.config.eatThreshold + (Math.random() * 0.04 - 0.02))
        : this.config.eatThreshold;

      if (ratio > dynamicThreshold) return false;

      // Check game engine bite cooldown (from foodbar)
      const now = performance.now();
      const eatCooldown = app.ui?.cooling?.eat;
      if (eatCooldown && now < eatCooldown.until) {
        return false; // Still on game bite cooldown
      }

      if (Date.now() - this.runtime.lastEatTime < 1600) {
        return false;
      }

      const inv = app.inv || [];
      let bestSlot = -1;
      let bestItem = null;
      let bestHeal = -1;

      for (let i = 0; i < inv.length; i++) {
        const slot = inv[i];
        if (!slot || !slot.item) continue;
        const id = slot.item;

        // Skip raw resources, burnt food, bones, and non-consumables
        if (id.startsWith('raw_') || id.startsWith('burnt_') || id === 'bones') continue;

        let heal = 0;
        let isFood = false;

        // 1. Check window.ITEMS if available
        if (window.ITEMS && window.ITEMS[id]) {
          const itemDef = window.ITEMS[id];
          if (itemDef.heal > 0) {
            heal = itemDef.heal;
            isFood = true;
          } else if (itemDef.sip || itemDef.icon === 'potion') {
            heal = 25;
            isFood = true;
          }
        }

        // 2. Check KNOWN_FOODS table
        if (!isFood && KNOWN_FOODS.has(id)) {
          heal = KNOWN_FOODS.get(id);
          isFood = true;
        }

        // 3. Check client app.ui.slotDefault
        if (!isFood && app.ui?.slotDefault) {
          try {
            if (app.ui.slotDefault(slot) === 'eat') {
              heal = 12;
              isFood = true;
            }
          } catch (_) {}
        }

        if (isFood && heal > bestHeal) {
          bestHeal = heal;
          bestSlot = i;
          bestItem = id;
        }
      }

      if (bestSlot >= 0 && bestItem) {
        // Human reaction delay before reaching for food hotkey
        await this.sleep(this.getDelay('eat_reaction'));
        this.log(`Emergency Eat: HP at ${Math.round(ratio * 100)}% (${hp}/${maxHp}). Consuming ${bestItem} from slot ${bestSlot} (+${bestHeal} HP)`);
        
        // Critical: Send both slot AND item matching Pixlaria game client
        app.net.send({ t: 'inv', slot: bestSlot, action: 'eat', item: bestItem });
        this.runtime.lastEatTime = Date.now();

        // Trigger client cooldown visual if available
        if (app.ui?.startCooldown) {
          app.ui.startCooldown('eat', 1800);
        }
        return true;
      }

      return false;
    },

    // --- 3. Looting Subsystem with Natural Reaction Times ---
    canClaimLoot(protection) {
      if (!protection) return true;
      if (protection.ob) return false;
      const now = app.net.serverNow ? app.net.serverNow() : Date.now();
      if (protection.until && now >= protection.until) return true;
      if (protection.yours === true) return true;
      if (protection.owner && protection.owner.toLowerCase() === (app.name || '').toLowerCase()) return true;
      return false;
    },

    getEligibleLootPiles() {
      if (!this.isReady() || !app.entities.ground) return [];
      const me = app.entities.me;
      const piles = [];
      const freeSlots = (app.inv || []).filter(s => !s).length;
      if (freeSlots === 0) return [];

      for (const [key, pile] of app.entities.ground) {
        const dist = Math.hypot(pile.x - me.x, pile.y - me.y);
        if (dist > this.config.maxLootDistance) continue;

        const validItems = pile.items.filter(([id, count, prot]) => {
          if (!this.canClaimLoot(prot)) return false;
          if (this.config.lootBlacklist.includes(id)) return false;
          if (this.config.lootWhitelist.length > 0 && !this.config.lootWhitelist.includes(id)) return false;
          return true;
        });

        if (validItems.length > 0) {
          piles.push({ pile, dist, count: validItems.length });
        }
      }

      return piles.sort((a, b) => a.dist - b.dist);
    },

    async executeLootCycle() {
      if (!this.autoLootActive || this.runtime.isLooting || !this.isReady()) return false;
      const piles = this.getEligibleLootPiles();
      if (piles.length === 0) return false;

      // If a monster just died, simulate human reaction latency observing the drop pop
      if (Date.now() - this.runtime.lastTargetKilledAt < 1200) {
        await this.sleep(this.getDelay('loot_react'));
      }

      this.runtime.isLooting = true;
      try {
        const { pile, dist } = piles[0];
        const me = app.entities.me;

        // Step onto or adjacent to pile if needed
        if (Math.max(Math.abs(me.x - pile.x), Math.abs(me.y - pile.y)) > 1) {
          app.net.send({ t: 'walk', x: pile.x, y: pile.y, cancelAttack: true });
          // Wait naturally for arrival based on tile distance
          await this.sleep(Math.min(2200, Math.max(700, Math.round(dist * 340) + this.getDelay('aim'))));
        }

        // Brief human click hesitation on the loot pile
        await this.sleep(this.getDelay('pickup'));

        // Take pile
        app.net.send({ t: 'take', x: pile.x, y: pile.y, all: true });
        await this.sleep(this.getDelay('aim'));
        return true;
      } finally {
        this.runtime.isLooting = false;
      }
    },

    // --- 4. Combat Subsystem with Aiming & Natural Hesitation ---
    getAvailableMonsters() {
      if (!this.isReady() || !app.entities.entities) return [];
      const me = app.entities.me;
      const monsters = [];

      for (const [id, entity] of app.entities.entities) {
        if (entity.kind !== 'monster') continue;
        if (entity.hp <= 0 || entity.dying) continue;

        const typeMatch = this.config.targetMonsterType === 'any' ||
                          entity.monsterType === this.config.targetMonsterType;
        
        const nameMatch = !this.config.customTargetName ||
                          entity.name.toLowerCase().includes(this.config.customTargetName.toLowerCase());

        if (!typeMatch || !nameMatch) continue;

        const dist = Math.hypot(entity.x - me.x, entity.y - me.y);
        if (dist <= this.config.combatRange) {
          monsters.push({ entity, dist });
        }
      }

      return monsters.sort((a, b) => a.dist - b.dist);
    },

    async tryCastCombatSpell(tid = null) {
      if (!this.config.castSpells || !this.config.selectedSpell || !this.isReady()) return false;
      const targetId = tid || app.stats.target;
      if (!targetId) return false;

      const now = Date.now();
      const manaRatio = (app.stats.mana || 0) / Math.max(1, app.stats.mmana || 1);
      const requiredCooldown = this.config.spellCooldownMs + (this.runtime.nextSpellJitter || 0);

      if (now - this.runtime.lastSpellTime > requiredCooldown && manaRatio >= this.config.minManaPercent) {
        app.net.send({ t: 'cast', id: this.config.selectedSpell, tid: targetId });
        this.runtime.lastSpellTime = now;
        this.runtime.nextSpellJitter = this.getDelay('spell');
        return true;
      }
      return false;
    },

    async executeCombatCycle() {
      if ((!this.combatLoopActive && !this.cavebotActive) || this.runtime.isLooting || !this.isReady()) return false;
      const me = app.entities.me;

      // 1. Check active locked target
      const currentTargetId = app.stats.target;
      if (currentTargetId) {
        const target = app.entities.entities.get(currentTargetId);
        if (target && target.hp > 0 && !target.dying) {
          if (this.config.castSpells) {
            await this.tryCastCombatSpell(currentTargetId);
          }
          return true; // Actively in combat
        } else {
          // Target just died
          this.runtime.lastTargetKilledAt = Date.now();
        }
      }

      // 2. Target Acquisition with Perception Delay
      const candidates = this.getAvailableMonsters();
      if (candidates.length === 0) return false;

      // Human perception latency before selecting a new target
      if (Date.now() - this.runtime.lastPerceptionTime > 1500) {
        await this.sleep(this.getDelay('perception'));
        this.runtime.lastPerceptionTime = Date.now();
      }

      const { entity: targetMonster, dist } = candidates[0];

      // Path towards target if not in range
      if (dist > 1.5) {
        app.net.send({ t: 'walk', x: targetMonster.x, y: targetMonster.y });
        // Realistic step transit
        await this.sleep(Math.min(2000, Math.max(600, Math.round(dist * 300))));
      }

      // Mouse travel & aim hesitation before clicking Attack
      await this.sleep(this.getDelay('aim'));

      this.log(`Engaging ${targetMonster.name} (Lv ${targetMonster.level}) at dist ${dist.toFixed(1)}t`);
      app.net.send({ t: 'attack', id: targetMonster.id });
      this.runtime.activeTargetId = targetMonster.id;
      this.runtime.combatEngagedAt = Date.now();
      this.runtime.nextSpellJitter = this.getDelay('spell');
      await this.sleep(this.getDelay('aim'));
      return true;
    },

    // --- 5. Soft Skills Automation Engine ---
    getSkillLevel(skillKey) {
      if (!this.isReady()) return 1;
      const xp = app.skills?.[skillKey] || 0;
      if (typeof window.skillLevelForXp === 'function') {
        try { return window.skillLevelForXp(skillKey, xp); } catch (_) {}
      }
      let points = 0;
      let level = 1;
      for (let l = 1; l < 99; l++) {
        points += Math.floor(l + 300 * Math.pow(2, l / 7));
        const req = Math.floor(points / 4);
        if (xp >= req) level = l + 1;
        else break;
      }
      return level;
    },

    checkToolStatus(skillKey, specificTargetId = null) {
      const def = SKILL_DATA[skillKey];
      if (!def) return { ok: true, status: 'READY', message: 'No tool required' };
      const currentLevel = this.getSkillLevel(skillKey);

      // Collect all tool items across all 4 storage locations
      const allFound = [];

      // 1. Tool Belt
      if (app.belt) {
        for (const [k, id] of Object.entries(app.belt)) {
          if (id) allFound.push({ id, location: 'Belt' });
        }
      }
      // 2. Equipped
      if (app.eq) {
        for (const [slot, piece] of Object.entries(app.eq)) {
          if (piece?.item) allFound.push({ id: piece.item, location: 'Equipped' });
        }
      }
      // 3. Inventory Bag
      if (app.inv) {
        for (const slot of app.inv) {
          if (slot?.item) allFound.push({ id: slot.item, count: slot.count, location: 'Bag' });
        }
      }
      // 4. Stash / Bank Items
      if (app.ui?.bankItems && Array.isArray(app.ui.bankItems)) {
        for (const entry of app.ui.bankItems) {
          const id = typeof entry === 'string' ? entry : entry?.item;
          if (id) allFound.push({ id, location: 'Bank / Stash' });
        }
      }

      // Check tool logic depending on skill
      if (skillKey === 'woodcutting' || skillKey === 'mining') {
        const matches = [];
        for (const item of allFound) {
          const toolDef = def.tools.find(t => t.id === item.id);
          if (toolDef) {
            matches.push({
              ...toolDef,
              location: item.location,
              usable: toolDef.level <= currentLevel
            });
          }
        }

        const usableCarried = matches.filter(m => m.usable && m.location !== 'Bank / Stash')
                                     .sort((a, b) => b.level - a.level);
        const usableInBank = matches.filter(m => m.usable && m.location === 'Bank / Stash')
                                    .sort((a, b) => b.level - a.level);
        const locked = matches.filter(m => !m.usable).sort((a, b) => a.level - b.level);

        if (usableCarried.length > 0) {
          const best = usableCarried[0];
          return {
            ok: true,
            status: 'READY',
            tool: best,
            currentLevel,
            message: `Active: ${best.name} (${best.location}, req Lv ${best.level})`
          };
        } else if (usableInBank.length > 0) {
          const bestBank = usableInBank[0];
          return {
            ok: false,
            status: 'IN_BANK',
            tool: bestBank,
            currentLevel,
            message: `Found ${bestBank.name} in Bank/Stash! Withdraw to use.`
          };
        } else if (locked.length > 0) {
          const lowestLocked = locked[0];
          return {
            ok: false,
            status: 'LEVEL_TOO_LOW',
            tool: lowestLocked,
            currentLevel,
            message: `Found ${lowestLocked.name} (${lowestLocked.location}), but requires Lv ${lowestLocked.level} (You are Lv ${currentLevel}).`
          };
        } else {
          return {
            ok: false,
            status: 'MISSING',
            currentLevel,
            message: `No ${def.toolName} found! Need at least Bronze ${def.tools[0].name} (Lv 1).`
          };
        }
      } else if (skillKey === 'fishing') {
        const carriedTools = new Set();
        const bankTools = new Set();
        for (const item of allFound) {
          const fTool = def.tools.find(t => t.id === item.id);
          if (fTool) {
            if (item.location === 'Bank / Stash') bankTools.add(fTool.tool);
            else carriedTools.add(fTool.tool);
          }
        }

        let neededTool = null;
        if (specificTargetId && specificTargetId !== 'any_highest') {
          const res = def.resources.find(r => r.id === specificTargetId);
          if (res) neededTool = res.tool;
        }

        if (neededTool) {
          const toolDef = def.tools.find(t => t.tool === neededTool);
          if (carriedTools.has(neededTool)) {
            return { ok: true, status: 'READY', currentLevel, message: `Tool Ready: ${toolDef?.name || neededTool}` };
          } else if (bankTools.has(neededTool)) {
            return { ok: false, status: 'IN_BANK', currentLevel, message: `${toolDef?.name || neededTool} is stored in Bank/Stash!` };
          } else {
            return { ok: false, status: 'MISSING', currentLevel, message: `Need ${toolDef?.name || neededTool} (Lv ${toolDef?.level || 1})` };
          }
        } else {
          if (carriedTools.size > 0) {
            return { ok: true, status: 'READY', currentLevel, message: `Carrying: ${Array.from(carriedTools).join(', ')}` };
          } else if (bankTools.size > 0) {
            return { ok: false, status: 'IN_BANK', currentLevel, message: `Fishing tools are in Bank/Stash (${Array.from(bankTools).join(', ')})!` };
          } else {
            return { ok: false, status: 'MISSING', currentLevel, message: 'No fishing gear found (Net, Rod, Harpoon)' };
          }
        }
      } else if (skillKey === 'smithing') {
        const hasHammerCarried = allFound.some(i => i.id === 'hammer' && i.location !== 'Bank / Stash');
        const hasHammerInBank = allFound.some(i => i.id === 'hammer' && i.location === 'Bank / Stash');
        return {
          ok: true,
          hasHammer: hasHammerCarried,
          hasHammerInBank,
          status: hasHammerCarried ? 'READY' : (hasHammerInBank ? 'IN_BANK' : 'MISSING_HAMMER'),
          currentLevel,
          message: hasHammerCarried ? 'Hammer Ready (Anvil OK)' : (hasHammerInBank ? 'Hammer in Bank (Furnace only)' : 'No Hammer (Furnace only)')
        };
      } else if (skillKey === 'firemaking') {
        const hasTinderboxCarried = allFound.some(i => i.id === 'tinderbox' && i.location !== 'Bank / Stash');
        const hasTinderboxInBank = allFound.some(i => i.id === 'tinderbox' && i.location === 'Bank / Stash');
        if (hasTinderboxCarried) {
          return {
            ok: true,
            status: 'READY',
            currentLevel,
            message: 'Tinderbox Ready (in belt/bag)'
          };
        } else if (hasTinderboxInBank) {
          return {
            ok: false,
            status: 'IN_BANK',
            currentLevel,
            message: 'Tinderbox is stored in Bank/Stash! Withdraw to use.'
          };
        } else {
          return {
            ok: false,
            status: 'MISSING',
            currentLevel,
            message: 'Need Tinderbox in bag or tool belt'
          };
        }
      }

      return { ok: true, status: 'READY', currentLevel, message: 'Ready' };
    },

    getHighestAvailableResource(skillKey) {
      const def = SKILL_DATA[skillKey];
      if (!def) return null;
      const currentLevel = this.getSkillLevel(skillKey);

      if (skillKey === 'fishing') {
        const available = def.resources
          .filter(r => r.level <= currentLevel)
          .filter(r => {
            const toolDef = def.tools.find(t => t.tool === r.tool);
            if (!toolDef) return true;
            const carried = (app.belt && Object.values(app.belt).includes(toolDef.id)) ||
                            (app.inv && app.inv.some(s => s?.item === toolDef.id)) ||
                            (app.eq && Object.values(app.eq).some(p => p?.item === toolDef.id));
            return carried;
          })
          .sort((a, b) => b.level - a.level);
        return available[0] || def.resources[0];
      }

      if (skillKey === 'cooking') {
        const inv = app.inv || [];
        const bagRawItems = new Set(inv.filter(s => s && s.item && s.item.startsWith('raw_')).map(s => s.item));
        const available = def.resources
          .filter(r => r.level <= currentLevel && bagRawItems.has(r.id))
          .sort((a, b) => b.level - a.level);
        return available[0] || def.resources[0];
      }

      if (skillKey === 'smithing') {
        const inv = app.inv || [];
        const bagItems = new Set(inv.filter(s => s && s.item).map(s => s.item));
        const toolDiag = this.checkToolStatus('smithing');
        const hasBars = Array.from(bagItems).some(id => id.endsWith('_bar'));
        if (toolDiag.hasHammer && hasBars) {
          return def.resources.find(r => r.id === 'anvil_all') || def.resources[0];
        }
        const smeltable = def.resources
          .filter(r => r.station === 'furnace' && r.level <= currentLevel)
          .sort((a, b) => b.level - a.level);
        return smeltable[0] || def.resources[0];
      }

      if (skillKey === 'firemaking') {
        const inv = app.inv || [];
        const bagLogItems = new Set(inv.filter(s => s && s.item && (s.item.endsWith('_logs') || s.item === 'logs')).map(s => s.item));
        const available = def.resources
          .filter(r => r.level <= currentLevel && bagLogItems.has(r.id))
          .sort((a, b) => b.level - a.level);
        return available[0] || def.resources.filter(r => r.level <= currentLevel).sort((a, b) => b.level - a.level)[0] || def.resources[0];
      }

      const unlocked = def.resources
        .filter(r => r.level <= currentLevel)
        .sort((a, b) => b.level - a.level);
      return unlocked[0] || def.resources[0];
    },

    findNearestWorldObject(typeOrTypes, maxRadius) {
      if (!this.isReady() || !app.world?.objects) return null;
      const me = app.entities.me;
      const types = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];
      const now = Date.now();
      const skillKey = this.config.skillingSkill;
      let bestObj = null;
      let bestScore = Infinity;

      for (const [id, entry] of app.world.objects) {
        const obj = entry.obj || entry;
        if (!obj || !types.includes(obj.type)) continue;

        // Skip definitely depleted / felled / dead nodes
        if (obj.depleted || obj.fe || (obj.lf !== undefined && obj.lf <= 0)) {
          continue;
        }

        const coordKey = `${Math.round(obj.x)},${Math.round(obj.y)}`;

        // Check unreachable blacklist ("I can't reach that")
        if (this.runtime.unreachableNodes.has(obj.id)) {
          if (now < this.runtime.unreachableNodes.get(obj.id)) continue;
          else this.runtime.unreachableNodes.delete(obj.id);
        }
        if (this.runtime.unreachableNodes.has(coordKey)) {
          if (now < this.runtime.unreachableNodes.get(coordKey)) continue;
          else this.runtime.unreachableNodes.delete(coordKey);
        }

        // Check depletion cooldown (both by ID and by Coordinate)
        if (this.runtime.depletedNodes.has(obj.id)) {
          if (now < this.runtime.depletedNodes.get(obj.id)) {
            // If live object explicitly reports depleted === false and not felled, server has refreshed it!
            if (obj.depleted === false && !obj.fe) {
              this.runtime.depletedNodes.delete(obj.id);
              this.runtime.depletedCoords.delete(coordKey);
            } else {
              continue;
            }
          } else {
            this.runtime.depletedNodes.delete(obj.id);
          }
        }
        if (this.runtime.depletedCoords.has(coordKey)) {
          if (now < this.runtime.depletedCoords.get(coordKey)) {
            if (obj.depleted === false && !obj.fe) {
              this.runtime.depletedCoords.delete(coordKey);
            } else {
              continue;
            }
          } else {
            this.runtime.depletedCoords.delete(coordKey);
          }
        }

        // Skip trees where monkey shooing failed or was rejected
        if (this.runtime.skippedMonkeyTrees.has(obj.id)) {
          if (now < this.runtime.skippedMonkeyTrees.get(obj.id)) continue;
          else this.runtime.skippedMonkeyTrees.delete(obj.id);
        }

        const dist = Math.hypot(obj.x - me.x, obj.y - me.y);
        if (dist > maxRadius) continue;

        // Anti-ping-pong recency penalty: avoid bouncing between 2 depleted/recovering nodes
        let penalty = 0;
        const lastVisit = Math.max(
          this.runtime.lastVisitedNodes.get(obj.id) || 0,
          this.runtime.lastVisitedCoords.get(coordKey) || 0
        );
        const timeSinceVisit = now - lastVisit;

        if (skillKey === 'fishing') {
          // Fishing spots take 90s-185s to respawn; heavily penalize recently visited spots within 140s
          if (timeSinceVisit < 140000) {
            penalty += Math.max(0, (140000 - timeSinceVisit) / 4000); // Up to +35t bias
          }
        } else if (skillKey === 'woodcutting') {
          if (timeSinceVisit < 45000) {
            penalty += Math.max(0, (45000 - timeSinceVisit) / 4000); // Up to +11t bias
          }
        } else if (skillKey === 'mining') {
          if (timeSinceVisit < 20000) {
            penalty += Math.max(0, (20000 - timeSinceVisit) / 3500); // Up to +5.7t bias
          }
        }

        // Clean trees preferred over trees with a monkey (+2.5t bias)
        const monkeyBias = obj.mk ? 2.5 : 0;
        const effectiveDist = dist + penalty + monkeyBias;

        if (effectiveDist < bestScore) {
          bestScore = effectiveDist;
          bestObj = obj;
        }
      }
      return bestObj ? { obj: bestObj, dist: Math.hypot(bestObj.x - me.x, bestObj.y - me.y) } : null;
    },

    findNearestStation(stationTypes, maxRadius = 30) {
      return this.findNearestWorldObject(stationTypes, maxRadius);
    },

    isTileWalkable(x, y) {
      if (!window.app || !app.world) return true;
      const rx = Math.round(x);
      const ry = Math.round(y);
      // Native engine walkability check handles chunks, terrain, bridge/dock tiles over water, and solid objects
      if (typeof app.world.walkable === 'function') {
        if (!app.world.walkable(rx, ry)) return false;
      }
      // Avoid stepping into tiles occupied by NPCs
      if (typeof app.world.npcAt === 'function' && app.world.npcAt(rx, ry)) {
        return false;
      }
      return true;
    },

    isTileValidForFire(x, y) {
      if (!window.app || !app.world) return true;
      const rx = Math.round(x);
      const ry = Math.round(y);

      // 1. Walkability check
      if (typeof app.world.walkable === 'function' && !app.world.walkable(rx, ry)) {
        return false;
      }

      // 2. Tile Type check:
      // Strictly prevent lighting on roads, wooden floors, caves/underground, walls, water, deep water
      // T.STONE = 4 (stone road / paved street), T.WOOD = 6 (wooden floor), T.CAVE = 7 (cave floor - underground),
      // T.WALL = 5, T.WATER = 3, T.DEEP = 8.
      if (typeof app.world.tile === 'function') {
        const t = app.world.tile(rx, ry);
        if ([3, 4, 5, 6, 7, 8].includes(t) || t < 0) {
          return false;
        }
      }

      // 3. Tile Object check:
      if (typeof app.world.objectAt === 'function' && app.world.objectAt(rx, ry)) {
        return false;
      }
      if (typeof app.world.objectAtTile === 'function' && app.world.objectAtTile(rx, ry)) {
        return false;
      }

      // 4. Live world objects collision check (fires, campfires, solid objects)
      if (app.world.objects) {
        for (const [id, entry] of app.world.objects) {
          const obj = entry?.obj || entry;
          if (!obj) continue;
          if (Math.round(obj.x) === rx && Math.round(obj.y) === ry) {
            return false;
          }
        }
      }

      // 5. NPC check
      if (typeof app.world.npcAt === 'function' && app.world.npcAt(rx, ry)) {
        return false;
      }

      // 6. Recently lit fires by bot (cooldown so we step away from burning fires)
      const key = `${rx},${ry}`;
      if (this.runtime.recentlyLitFires.has(key)) {
        if (Date.now() < this.runtime.recentlyLitFires.get(key)) {
          return false;
        } else {
          this.runtime.recentlyLitFires.delete(key);
        }
      }

      return true;
    },

    findNearestFiremakingTile(maxRadius = 15) {
      const me = app.entities?.me;
      if (!me) return null;
      const px = Math.round(me.x);
      const py = Math.round(me.y);

      // If current spot is already valid, return current position
      if (this.isTileValidForFire(px, py)) {
        return { x: px, y: py, dist: 0 };
      }

      // Search in expanding concentric rings
      for (let r = 1; r <= maxRadius; r++) {
        const candidates = [];
        for (let dx = -r; dx <= r; dx++) {
          for (let dy = -r; dy <= r; dy++) {
            if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
            const tx = px + dx;
            const ty = py + dy;
            if (this.isTileValidForFire(tx, ty)) {
              candidates.push({ x: tx, y: ty, dist: Math.hypot(dx, dy) });
            }
          }
        }
        if (candidates.length > 0) {
          candidates.sort((a, b) => a.dist - b.dist);
          return candidates[0];
        }
      }

      return null;
    },

    getMaxActionReach(skillKey) {
      // Fishing allows adjacent shore/dock (1t) or casting up to 2 tiles out into water
      if (skillKey === 'fishing') return 2;
      // Mining, Woodcutting, Cooking stations require standing on an adjacent tile (1t)
      return 1;
    },

    isTileSailable(x, y) {
      if (!window.app || !app.world) return true;
      const rx = Math.round(x);
      const ry = Math.round(y);
      if (typeof app.world.objectAt === 'function') {
        const o = app.world.objectAt(rx, ry);
        if (o && o.solid) return false;
      }
      return true;
    },

    isPlayerInRange(obj, skillKey) {
      const me = app.entities?.me;
      if (!me || !obj) return false;
      const px = Math.round(me.x);
      const py = Math.round(me.y);
      const ox = Math.round(obj.x);
      const oy = Math.round(obj.y);

      const dx = Math.abs(px - ox);
      const dy = Math.abs(py - oy);
      const chebyshev = Math.max(dx, dy);

      if (skillKey === 'fishing') {
        const isSea = (obj.type && (obj.type === 'fish_deep' || obj.type === 'fish_exotic')) || Boolean(me.boat);
        if (isSea) {
          // From a boat, sea rod casts into shoals up to 2.5 tiles away
          return chebyshev <= 2 && Math.hypot(px - ox, py - oy) <= 2.6;
        }
        // Player is adjacent to the fishing spot on shore or dock
        if (chebyshev <= 1) return true;
        // Or within 2 tiles on a valid walkable tile (e.g. casting from dock/shore across 1 water tile)
        if (chebyshev <= 2 && this.isTileWalkable(px, py) && Math.hypot(px - ox, py - oy) <= 2.3) {
          return true;
        }
        return false;
      }

      // Gathering and stations strictly require adjacent tile (Chebyshev <= 1)
      return chebyshev <= 1;
    },

    findBestInteractionTile(targetX, targetY, skillKey) {
      const me = app.entities?.me;
      const tx = Math.round(targetX);
      const ty = Math.round(targetY);
      const px = me ? Math.round(me.x) : tx;
      const py = me ? Math.round(me.y) : ty;
      const isSea = skillKey === 'fishing' && (Boolean(me?.boat) || this.config.skillingTarget === 'fish_deep' || this.config.skillingTarget === 'fish_exotic');

      // 1. Ring 1 (Adjacent tiles - Chebyshev 1):
      // 8 neighbor tiles around the target (N, S, E, W, NE, NW, SE, SW)
      const ring1 = [
        { x: tx, y: ty - 1 },
        { x: tx, y: ty + 1 },
        { x: tx - 1, y: ty },
        { x: tx + 1, y: ty },
        { x: tx - 1, y: ty - 1 },
        { x: tx + 1, y: ty - 1 },
        { x: tx - 1, y: ty + 1 },
        { x: tx + 1, y: ty + 1 }
      ];

      let bestRing1 = null;
      let minRing1Dist = Infinity;

      for (const t of ring1) {
        const isValid = isSea ? this.isTileSailable(t.x, t.y) : this.isTileWalkable(t.x, t.y);
        if (isValid) {
          // If player is already on this tile, distance is 0 -> immediately chosen
          const distToPlayer = Math.hypot(t.x - px, t.y - py);
          if (distToPlayer < minRing1Dist) {
            minRing1Dist = distToPlayer;
            bestRing1 = t;
          }
        }
      }

      if (bestRing1) {
        return { tile: bestRing1, reach: 1 };
      }

      // If skill strictly requires adjacent tiles (woodcutting, mining), no further reach is allowed
      if (skillKey !== 'fishing') {
        return null;
      }

      // 2. Ring 2 (Chebyshev 2) - Allowed for fishing if ring 1 is completely occupied/blocked
      let bestRing2 = null;
      let minRing2Dist = Infinity;

      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) continue;
          const rx = tx + dx;
          const ry = ty + dy;
          const isValid = isSea ? this.isTileSailable(rx, ry) : this.isTileWalkable(rx, ry);
          if (isValid) {
            const distToPlayer = Math.hypot(rx - px, ry - py);
            if (distToPlayer < minRing2Dist) {
              minRing2Dist = distToPlayer;
              bestRing2 = { x: rx, y: ry };
            }
          }
        }
      }

      if (bestRing2) {
        return { tile: bestRing2, reach: 2 };
      }

      // Completely out of reach
      return null;
    },

    findGridPath(startX, startY, goalX, goalY, maxRange = 40) {
      const sx = Math.round(startX);
      const sy = Math.round(startY);
      const gx = Math.round(goalX);
      const gy = Math.round(goalY);

      if (sx === gx && sy === gy) return [{ x: gx, y: gy }];

      const queue = [{ x: sx, y: sy, path: [] }];
      const visited = new Set();
      visited.add(`${sx},${sy}`);

      const dirs = [
        [0, -1], [0, 1], [-1, 0], [1, 0],
        [-1, -1], [1, -1], [-1, 1], [1, 1]
      ];

      while (queue.length > 0) {
        const curr = queue.shift();
        if (curr.path.length >= maxRange) break;

        for (const [dx, dy] of dirs) {
          const nx = curr.x + dx;
          const ny = curr.y + dy;
          const key = `${nx},${ny}`;

          if (visited.has(key)) continue;

          // Prevent diagonal movement clipping through corner obstacles
          if (dx !== 0 && dy !== 0) {
            if (!this.isTileWalkable(curr.x + dx, curr.y) || !this.isTileWalkable(curr.x, curr.y + dy)) {
              continue;
            }
          }

          if (nx === gx && ny === gy) {
            return [...curr.path, { x: nx, y: ny }];
          }

          if (this.isTileWalkable(nx, ny)) {
            visited.add(key);
            queue.push({ x: nx, y: ny, path: [...curr.path, { x: nx, y: ny }] });
          }
        }
      }

      return null;
    },

    async executeSkillingCycle() {
      if (!this.skillingLoopActive || this.runtime.isLooting || !this.isReady()) return false;
      const skillKey = this.config.skillingSkill;
      const def = SKILL_DATA[skillKey];
      if (!def) return false;

      const me = app.entities.me;
      const inv = app.inv || [];
      const freeSlots = inv.filter(s => !s).length;

      // 1. Inventory Full Handling
      if (freeSlots === 0) {
        if (this.config.skillingAutoDrop) {
          const dropItem = inv.find(s => s && s.item && (s.item.endsWith('_logs') || s.item === 'logs' || s.item.endsWith('_ore') || s.item === 'coal' || s.item.startsWith('raw_')));
          if (dropItem) {
            const slotIdx = inv.indexOf(dropItem);
            this.log(`Bag full: Auto-dropping ${dropItem.item}`);
            await this.sleep(this.getDelay('item_click'));
            app.net.send({ t: 'inv', slot: slotIdx, action: 'drop' });
            return true;
          }
        }
        this.runtime.skillingActionStatus = 'Bag Full! Please bank or empty items.';
        return false;
      }

      // 2. Resolve Target Resource
      let targetRes = null;
      if (this.config.skillingTarget === 'any_highest') {
        targetRes = this.getHighestAvailableResource(skillKey);
      } else {
        targetRes = def.resources.find(r => r.id === this.config.skillingTarget) || def.resources[0];
      }

      if (!targetRes) {
        this.runtime.skillingActionStatus = 'No valid target resource selected.';
        return false;
      }

      // 3. Tool Verification
      const toolDiag = this.checkToolStatus(skillKey, targetRes.id);
      if (!toolDiag.ok) {
        this.runtime.skillingActionStatus = toolDiag.message;
        return false;
      }

      // 4. Execution by Skill Type
      if (skillKey === 'woodcutting' || skillKey === 'mining' || skillKey === 'fishing') {
        // --- Gathering Skills (Single-Click Continuous Striking) ---
        if (this.runtime.activeSkillingObjId) {
          const entry = app.world.objects.get(this.runtime.activeSkillingObjId);
          const obj = entry?.obj || entry;
          const isNodeDepleted = !obj || obj.depleted || obj.fe || (obj.lf !== undefined && obj.lf <= 0) || (this.runtime.depletedNodes.get(this.runtime.activeSkillingObjId) > Date.now());

          if (isNodeDepleted) {
            this.confirmNodeDepleted(this.runtime.activeSkillingObjId, 'Node depleted flag', null, obj?.x, obj?.y);
            await this.sleep(this.getDelay('perception'));
            return true;
          }

          const dist = Math.hypot(obj.x - me.x, obj.y - me.y);

          // 1. Far away (> 2.5 tiles): Smooth continuous walk directly towards target
          if (dist > 2.5) {
            this.runtime.approachingObjId = obj.id;
            this.runtime.approachingCoord = { x: obj.x, y: obj.y };
            this.runtime.skillingActionStatus = `Walking to ${targetRes.name} (${dist.toFixed(1)}t)...`;
            app.net.send({ t: 'walk', x: Math.round(obj.x), y: Math.round(obj.y), cancelAttack: true });
            await this.sleep(Math.min(1800, Math.max(500, Math.round(dist * 200))));
            return true;
          }

          // 2. Near target (dist <= 2.5 tiles): Validate live node state on arrival
          const liveEntry = app.world?.objects?.get(obj.id);
          const liveObj = liveEntry?.obj || liveEntry;
          if (!liveObj || liveObj.depleted || liveObj.fe || (liveObj.lf !== undefined && liveObj.lf <= 0)) {
            this.log(`Arrived at ${targetRes.name} #${obj.id} at (${obj.x}, ${obj.y}), but node is depleted/inactive. Advancing to next.`);
            this.confirmNodeDepleted(obj.id, 'Depleted upon arrival', null, obj.x, obj.y);
            this.runtime.activeSkillingObjId = null;
            this.runtime.approachingObjId = null;
            this.runtime.approachingCoord = null;
            await this.sleep(this.getDelay('perception'));
            return true;
          }

          // 3. Check if player is in range to execute action
          const inRange = this.isPlayerInRange(obj, skillKey);

          if (!inRange) {
            // Fine-tune position: find adjacent shore/dock tile right beside the spot
            const bestInfo = this.findBestInteractionTile(obj.x, obj.y, skillKey);
            if (!bestInfo) {
              this.log(`Target ${targetRes.name} #${obj.id} at (${obj.x}, ${obj.y}) is out of reach on arrival. Advancing to next.`);
              this.runtime.unreachableNodes.set(obj.id, Date.now() + 75000);
              this.runtime.unreachableNodes.set(`${Math.round(obj.x)},${Math.round(obj.y)}`, Date.now() + 75000);
              this.runtime.activeSkillingObjId = null;
              this.runtime.approachingObjId = null;
              this.runtime.approachingCoord = null;
              return true;
            }

            const dest = bestInfo.tile;
            const px = Math.round(me.x);
            const py = Math.round(me.y);
            if (px !== dest.x || py !== dest.y) {
              this.runtime.approachingObjId = obj.id;
              this.runtime.approachingCoord = { x: obj.x, y: obj.y };
              const stepDist = Math.hypot(dest.x - me.x, dest.y - me.y);
              this.runtime.skillingActionStatus = `Stepping to ${targetRes.name} (${stepDist.toFixed(1)}t)...`;
              app.net.send({ t: 'walk', x: dest.x, y: dest.y, cancelAttack: true });
              await this.sleep(Math.min(1000, Math.max(300, Math.round(stepDist * 260))));
              return true;
            }
          }


          // Player is adjacent to the target node
          const now = Date.now();
          const gatheringActive = this.isGatheringActive();
          const timeSinceStroke = now - (this.runtime.lastGatherStrokeAt || 0);
          const timeSinceAttempt = now - (this.runtime.lastSkillingAttemptTime || 0);

          // Check if gathering / fishing process is actively underway: DO NOT SEND CLICKS!
          if (gatheringActive) {
            this.runtime.approachingObjId = null;
            this.runtime.approachingCoord = null;
            this.runtime.skillingReengageAttempts = 0;
            if (skillKey === 'fishing') {
              if (this.runtime.isFishingReeling) {
                this.runtime.skillingActionStatus = `Active: Reeling in fish at ${targetRes.name}...`;
              } else {
                this.runtime.skillingActionStatus = `Active: Fishing ${targetRes.name} (Waiting for bite...)`;
              }
            } else {
              this.runtime.skillingActionStatus = `Active: ${targetRes.action}ing ${targetRes.name} (In progress...)`;
            }
            return true;
          }

          // Anti-Stall Watchdog:
          // If 3 re-attempts have occurred with ZERO response, the node is depleted or unresponsive.
          const maxWaitBeforeDeplete = skillKey === 'fishing' ? 5000 : 3000;
          if (this.runtime.skillingReengageAttempts >= 3 && timeSinceAttempt > maxWaitBeforeDeplete) {
            this.log(`Node ${targetRes.name} #${obj.id} at (${obj.x}, ${obj.y}) is unresponsive after 3 attempts (${timeSinceAttempt}ms). Blacklisting for 25s and rotating to next.`);
            this.confirmNodeDepleted(obj.id, 'Unresponsive node watchdog', 25000, obj.x, obj.y);
            this.runtime.activeSkillingObjId = null;
            this.runtime.approachingObjId = null;
            this.runtime.approachingCoord = null;
            this.runtime.skillingReengageAttempts = 0;
            this.runtime.skillingActionStatus = `Node unresponsive. Rotating to next...`;
            await this.sleep(this.getDelay('perception'));
            return true;
          }

          // If not currently gathering and enough cooldown has passed since the last attempt, send ONE re-engagement stroke/cast
          const reengageCooldown = skillKey === 'fishing' ? 3500 : 2500;
          if (timeSinceAttempt > reengageCooldown) {
            // Verify monkey hasn't jumped into branches before re-stroke (woodcutting)
            if (skillKey === 'woodcutting') {
              const liveObj = app.world?.objects?.get(obj.id)?.obj || obj;
              if (liveObj.mk) {
                this.log(`Monkey detected in branches of ${targetRes.name} #${obj.id} before re-stroke. Shooing first...`);
                this.runtime.skillingActionStatus = `Shooing monkey from ${targetRes.name}...`;
                await this.sleep(this.getDelay('aim'));
                app.net.send({ t: 'object', id: obj.id, action: 'Shoo' });
                await this.sleep(this.humanMode ? gaussian(750, 100) : 550);

                const recheck = app.world?.objects?.get(obj.id)?.obj || obj;
                if (recheck.mk) {
                  this.log(`Shooing monkey failed or was not possible on ${targetRes.name} #${obj.id}. Skipping tree to protect axe.`);
                  this.runtime.skippedMonkeyTrees.set(obj.id, Date.now() + 45000);
                  this.runtime.activeSkillingObjId = null;
                  this.runtime.approachingObjId = null;
                  this.runtime.approachingCoord = null;
                  this.runtime.skillingActionStatus = `Skipping tree with monkey (protected axe).`;
                  return true;
                }
              }
            }

            this.runtime.skillingReengageAttempts = (this.runtime.skillingReengageAttempts || 0) + 1;
            await this.sleep(this.getDelay('aim'));
            this.log(`Re-engaging ${targetRes.action} on ${targetRes.name} at (${obj.x}, ${obj.y}) [Attempt #${this.runtime.skillingReengageAttempts}]`);
            app.net.send({ t: 'object', id: obj.id, action: targetRes.action });
            this.runtime.lastSkillingAttemptTime = Date.now();
            this.runtime.gatheringSince = Date.now();
            if (skillKey === 'fishing') {
              this.runtime.lastFishingCastAt = Date.now();
              this.runtime.isFishingWaiting = true;
              this.runtime.isFishingReeling = false;
            }
            this.runtime.lastVisitedNodes.set(obj.id, Date.now());
            this.runtime.lastVisitedCoords.set(`${Math.round(obj.x)},${Math.round(obj.y)}`, Date.now());
            this.runtime.skillingActionStatus = skillKey === 'fishing' ? `Cast line: waiting for bite at ${targetRes.name}...` : `Active: ${targetRes.action}ing ${targetRes.name}`;
            await this.sleep(this.getDelay('aim'));
            return true;
          }

          return true;
        }

        // No active node target -> Find nearest available, non-depleted node
        const match = this.findNearestWorldObject(targetRes.id, this.config.skillingRadius);
        if (!match) {
          // If enabled, fall back to long-range remembered resource locations from static memory
          if (this.config.useResourceMemory) {
            const memMatch = this.getNearestRememberedResource(targetRes.id);
            if (memMatch) {
              const memNode = memMatch.resource;
              const walkDist = Math.hypot(memNode.x - me.x, memNode.y - me.y);

              // If player already reached the remembered spot (walkDist <= 2.5) but no live node spawned there:
              if (walkDist <= 2.5) {
                this.log(`Remembered ${targetRes.name} at (${memNode.x}, ${memNode.y}) is depleted/empty upon arrival. Cooling down.`);
                this.confirmNodeDepleted(memNode.id, 'Remembered node empty at coordinate', null, memNode.x, memNode.y);
                this.runtime.skillingActionStatus = `Remembered ${targetRes.name} empty at coordinate. Checking next...`;
                return true;
              }

              this.runtime.approachingObjId = memNode.id || null;
              this.runtime.approachingCoord = { x: memNode.x, y: memNode.y };
              this.runtime.skillingActionStatus = `Navigating to remembered ${targetRes.name} (${walkDist.toFixed(1)}t away)...`;
              app.net.send({ t: 'walk', x: Math.round(memNode.x), y: Math.round(memNode.y), cancelAttack: true });
              await this.sleep(Math.min(2000, Math.max(600, Math.round(walkDist * 200))));
              return true;
            }
          }
          this.runtime.skillingActionStatus = `No active ${targetRes.name} in range (recovering...)`;
          return false;
        }

        const { obj, dist } = match;

        // 1. Far away (> 2.5 tiles): Smooth continuous walk directly towards object coordinates
        if (dist > 2.5) {
          this.runtime.approachingObjId = obj.id;
          this.runtime.approachingCoord = { x: obj.x, y: obj.y };
          this.runtime.skillingActionStatus = `Walking to ${targetRes.name} (${dist.toFixed(1)}t)...`;
          app.net.send({ t: 'walk', x: Math.round(obj.x), y: Math.round(obj.y), cancelAttack: true });
          await this.sleep(Math.min(2000, Math.max(600, Math.round(dist * 200))));
          return true;
        }

        // 2. Near target (dist <= 2.5 tiles): Validate live node state on arrival
        const liveEntry = app.world?.objects?.get(obj.id);
        const liveObj = liveEntry?.obj || liveEntry;
        if (!liveObj || liveObj.depleted || liveObj.fe || (liveObj.lf !== undefined && liveObj.lf <= 0)) {
          this.log(`Target ${targetRes.name} #${obj.id} at (${obj.x}, ${obj.y}) is depleted/inactive upon arrival. Advancing to next.`);
          this.confirmNodeDepleted(obj.id, 'Depleted upon arrival', null, obj.x, obj.y);
          this.runtime.activeSkillingObjId = null;
          this.runtime.approachingObjId = null;
          this.runtime.approachingCoord = null;
          await this.sleep(this.getDelay('perception'));
          return true;
        }

        // 3. Check if player is in range to execute action
        const inRange = this.isPlayerInRange(obj, skillKey);

        if (!inRange) {
          // Fine-tune position: find adjacent shore/dock tile right beside the spot
          const bestInfo = this.findBestInteractionTile(obj.x, obj.y, skillKey);
          if (!bestInfo) {
            this.log(`Target ${targetRes.name} #${obj.id} at (${obj.x}, ${obj.y}) is out of reach on arrival. Advancing to next.`);
            this.runtime.unreachableNodes.set(obj.id, Date.now() + 75000);
            this.runtime.unreachableNodes.set(`${Math.round(obj.x)},${Math.round(obj.y)}`, Date.now() + 75000);
            return true;
          }

          const dest = bestInfo.tile;
          const px = Math.round(me.x);
          const py = Math.round(me.y);
          if (px !== dest.x || py !== dest.y) {
            this.runtime.approachingObjId = obj.id;
            this.runtime.approachingCoord = { x: obj.x, y: obj.y };
            const stepDist = Math.hypot(dest.x - me.x, dest.y - me.y);
            this.runtime.skillingActionStatus = `Stepping to ${targetRes.name} perimeter (${stepDist.toFixed(1)}t)...`;
            app.net.send({ t: 'walk', x: dest.x, y: dest.y, cancelAttack: true });
            await this.sleep(Math.min(1000, Math.max(300, Math.round(stepDist * 260))));
            return true;
          }
        }


        // Within range: check for monkey on target tree before initial chop
        if (skillKey === 'woodcutting') {
          if (liveObj.mk) {
            this.log(`Monkey detected in branches of ${targetRes.name} #${obj.id} at (${obj.x}, ${obj.y}). Shooing away first...`);
            this.runtime.skillingActionStatus = `Shooing monkey from ${targetRes.name}...`;

            await this.sleep(this.getDelay('aim'));
            app.net.send({ t: 'object', id: obj.id, action: 'Shoo' });

            // Await server update and flight animation
            await this.sleep(this.humanMode ? gaussian(750, 100) : 550);

            const recheck = app.world?.objects?.get(obj.id)?.obj || obj;
            if (recheck.mk) {
              // Shooing failed or not possible -> Skip this tree to prevent losing the axe!
              this.log(`Shooing monkey failed or was not possible on ${targetRes.name} #${obj.id}. Skipping tree to protect axe.`);
              this.runtime.skippedMonkeyTrees.set(obj.id, Date.now() + 45000);
              this.runtime.activeSkillingObjId = null;
              this.runtime.approachingObjId = null;
              this.runtime.approachingCoord = null;
              this.runtime.skillingActionStatus = `Skipping tree with monkey (protected axe).`;
              await this.sleep(this.getDelay('perception'));
              return true;
            } else {
              this.log(`Monkey successfully shooed away from ${targetRes.name} #${obj.id}. Starting chop.`);
            }
          }
        }

        // Within range and safe: EXACTLY ONE CLICK initiates the continuous gathering loop
        await this.sleep(this.getDelay('aim'));
        this.log(`Starting ${targetRes.action} on ${targetRes.name} at (${obj.x}, ${obj.y})`);
        app.net.send({ t: 'object', id: obj.id, action: targetRes.action });
        this.runtime.activeSkillingObjId = obj.id;
        this.runtime.approachingObjId = null;
        this.runtime.approachingCoord = null;
        this.runtime.lastVisitedNodes.set(obj.id, Date.now());
        this.runtime.lastVisitedCoords.set(`${Math.round(obj.x)},${Math.round(obj.y)}`, Date.now());
        this.runtime.lastSkillingAttemptTime = Date.now();
        this.runtime.gatheringSince = Date.now();
        this.runtime.activeActionKind = targetRes.action.toLowerCase();
        if (skillKey === 'fishing') {
          this.runtime.lastFishingCastAt = Date.now();
          this.runtime.isFishingWaiting = true;
          this.runtime.isFishingReeling = false;
          this.runtime.skillingActionStatus = `Cast rod: waiting for bite at ${targetRes.name}...`;
        } else {
          this.runtime.skillingActionStatus = `Active: ${targetRes.action}ing ${targetRes.name}`;
        }
        await this.sleep(this.getDelay('aim'));
        return true;

      } else if (skillKey === 'cooking') {
        // --- Cooking Skill ---
        const rawSlot = inv.find(s => s && s.item && (targetRes.id === 'any_highest' ? s.item.startsWith('raw_') : s.item === targetRes.id));
        if (!rawSlot) {
          this.runtime.skillingActionStatus = 'No raw food in bag to cook.';
          return false;
        }

        // If batch cooking is currently underway, wait quietly without clicking
        if (me.action === 'cook' || (this.runtime.lastCookingAttemptTime && Date.now() - this.runtime.lastCookingAttemptTime < 3200)) {
          this.runtime.skillingActionStatus = `Cooking batch in progress...`;
          return true;
        }

        let stationMatch = this.findNearestStation(['range', 'fire', 'campfire'], 30);
        if (!stationMatch && this.config.useResourceMemory) {
          const memMatch = this.getNearestRememberedResource(['range', 'fire', 'campfire']);
          if (memMatch) {
            const station = memMatch.resource;
            const walkDist = Math.hypot(station.x - me.x, station.y - me.y);
            this.runtime.skillingActionStatus = `Navigating to remembered ${station.name} (${walkDist.toFixed(1)}t)...`;
            app.net.send({ t: 'walk', x: station.x, y: station.y, cancelAttack: true });
            await this.sleep(Math.min(2000, Math.max(600, Math.round(walkDist * 280))));
            return true;
          }
        }
        if (!stationMatch) {
          this.runtime.skillingActionStatus = 'No cooking range or fire within 30 tiles.';
          return false;
        }

        const { obj: station, dist } = stationMatch;
        if (dist > 1.5) {
          this.runtime.skillingActionStatus = `Walking to ${station.type} (${dist.toFixed(1)}t)...`;
          app.net.send({ t: 'walk', x: station.x, y: station.y, cancelAttack: true });
          await this.sleep(Math.min(2000, Math.max(600, Math.round(dist * 280))));
          return true;
        }

        await this.sleep(this.getDelay('aim'));
        app.net.send({ t: 'object', id: station.id, action: 'Cook' });
        await this.sleep(this.getDelay('item_click'));
        app.net.send({ t: 'make', kind: 'cook', id: rawSlot.item, n: rawSlot.count || 1 });
        this.runtime.lastCookingAttemptTime = Date.now();
        this.runtime.skillingActionStatus = `Cooking ${rawSlot.item} (×${rawSlot.count || 1})...`;
        await this.sleep(this.getDelay('perception'));
        return true;

      } else if (skillKey === 'smithing') {
        // --- Smithing / Smelting ---
        const isAnvil = targetRes.station === 'anvil';
        const stationType = isAnvil ? 'anvil' : 'furnace';
        const stationAction = isAnvil ? 'Smith' : 'Smelt';

        if (isAnvil && !toolDiag.hasHammer) {
          this.runtime.skillingActionStatus = 'Need Hammer in bag/belt/eq to forge at Anvil.';
          return false;
        }

        // If forging or smelting is already in progress, wait quietly without clicking
        if (me.action === 'smith' || (this.runtime.lastSmithingAttemptTime && Date.now() - this.runtime.lastSmithingAttemptTime < 3400)) {
          this.runtime.skillingActionStatus = `${isAnvil ? 'Forging' : 'Smelting'} in progress...`;
          return true;
        }

        let stationMatch = this.findNearestStation(stationType, 30);
        if (!stationMatch && this.config.useResourceMemory) {
          const memMatch = this.getNearestRememberedResource(stationType);
          if (memMatch) {
            const station = memMatch.resource;
            const walkDist = Math.hypot(station.x - me.x, station.y - me.y);
            this.runtime.skillingActionStatus = `Navigating to remembered ${station.name} (${walkDist.toFixed(1)}t)...`;
            app.net.send({ t: 'walk', x: station.x, y: station.y, cancelAttack: true });
            await this.sleep(Math.min(2000, Math.max(600, Math.round(walkDist * 280))));
            return true;
          }
        }
        if (!stationMatch) {
          this.runtime.skillingActionStatus = `No ${stationType} within 30 tiles.`;
          return false;
        }

        const { obj: station, dist } = stationMatch;
        if (dist > 1.5) {
          this.runtime.skillingActionStatus = `Walking to ${stationType} (${dist.toFixed(1)}t)...`;
          app.net.send({ t: 'walk', x: station.x, y: station.y, cancelAttack: true });
          await this.sleep(Math.min(2000, Math.max(600, Math.round(dist * 280))));
          return true;
        }

        await this.sleep(this.getDelay('aim'));
        app.net.send({ t: 'object', id: station.id, action: stationAction });
        await this.sleep(this.getDelay('item_click'));

        if (isAnvil) {
          app.net.send({ t: 'make', kind: 'smith', id: '@all' });
          this.runtime.skillingActionStatus = 'Forging bars at Anvil (@all)...';
        } else {
          app.net.send({ t: 'make', kind: 'smith', id: targetRes.id, n: 10 });
          this.runtime.skillingActionStatus = `Smelting ${targetRes.name}...`;
        }
        this.runtime.lastSmithingAttemptTime = Date.now();
        await this.sleep(this.getDelay('perception'));
        return true;

      } else if (skillKey === 'firemaking') {
        // --- Firemaking Skill ---
        // 1. Tool verification (Tinderbox)
        if (!toolDiag.ok) {
          this.runtime.skillingActionStatus = toolDiag.message;
          return false;
        }

        // 2. Locate target logs in inventory
        const inv = app.inv || [];
        const currentLevel = this.getSkillLevel('firemaking');
        let logSlotIdx = -1;
        let logSlot = null;

        if (this.config.skillingTarget === 'any_highest') {
          // Look for any logs player has level to burn, preferring highest level
          for (const r of def.resources.filter(r => r.level <= currentLevel).sort((a, b) => b.level - a.level)) {
            const idx = inv.findIndex(s => s && s.item === r.id);
            if (idx !== -1) {
              logSlotIdx = idx;
              logSlot = inv[idx];
              targetRes = r;
              break;
            }
          }
        } else {
          logSlotIdx = inv.findIndex(s => s && s.item === targetRes.id);
          if (logSlotIdx !== -1) logSlot = inv[logSlotIdx];
        }

        // 3. Check if logs are present in bag
        if (!logSlot || logSlotIdx === -1) {
          this.runtime.skillingActionStatus = `No ${targetRes.name || 'logs'} in bag to burn! Please withdraw or chop logs.`;
          return false;
        }

        // 4. Check if player is currently in the middle of lighting
        const now = Date.now();
        const isCurrentlyLighting = me.action === 'light' || (this.runtime.lastLightingAttemptTime && now - this.runtime.lastLightingAttemptTime < 3200);
        if (isCurrentlyLighting) {
          this.runtime.skillingActionStatus = `Lighting in progress... (${targetRes.name})`;
          return true;
        }

        // 5. Validate current ground tile (free spot, not a road, no fire/objects)
        const px = Math.round(me.x);
        const py = Math.round(me.y);
        const isCurrentSpotValid = this.isTileValidForFire(px, py);

        if (!isCurrentSpotValid) {
          const freeSpot = this.findNearestFiremakingTile(this.config.skillingRadius || 15);
          if (!freeSpot) {
            this.runtime.skillingActionStatus = 'No clear ground spot found (roads/obstacles blocking). Move to open ground.';
            return false;
          }

          const walkDist = Math.hypot(freeSpot.x - me.x, freeSpot.y - me.y);
          this.runtime.skillingActionStatus = `Moving off road/obstacle to clear ground (${walkDist.toFixed(1)}t)...`;
          app.net.send({ t: 'walk', x: freeSpot.x, y: freeSpot.y, cancelAttack: true });
          await this.sleep(Math.min(1800, Math.max(450, Math.round(walkDist * 250))));
          return true;
        }

        // 6. Standing on valid clear ground: Initiate lighting!
        await this.sleep(this.getDelay('aim'));

        const useLine = this.config.firemakingBatch !== false && (logSlot.count > 1);
        const batchCount = useLine ? Math.min(5, logSlot.count) : 1;

        if (useLine && batchCount > 1) {
          this.log(`Lighting line of ${batchCount}× ${targetRes.name} from slot #${logSlotIdx} at (${px}, ${py})`);
          app.net.send({ t: 'inv', slot: logSlotIdx, action: 'light', count: batchCount });
          this.runtime.skillingActionStatus = `Lighting ${batchCount}× ${targetRes.name} in a line...`;
        } else {
          this.log(`Lighting ${targetRes.name} from slot #${logSlotIdx} at (${px}, ${py})`);
          app.net.send({ t: 'inv', slot: logSlotIdx, action: 'light' });
          this.runtime.skillingActionStatus = `Lighting ${targetRes.name}...`;
        }

        this.runtime.lastLightingAttemptTime = Date.now();
        // Record current tile as recently lit so we step to a new tile after
        this.runtime.recentlyLitFires.set(`${px},${py}`, Date.now() + 75000);
        await this.sleep(this.getDelay('perception'));
        return true;
      }

      return false;
    },

    startSkilling(skillKey) {
      if (skillKey) this.config.skillingSkill = skillKey;
      this.skillingLoopActive = true;
      if (!this.running) {
        this.running = true;
        this.scheduleNextTick();
      }
      this.log(`Skilling Started: ${this.config.skillingSkill.toUpperCase()}`);
      this.updateUIState();
    },

    stopSkilling() {
      this.skillingLoopActive = false;
      this.runtime.activeSkillingObjId = null;
      this.runtime.gatheringSince = 0;
      this.runtime.lastGatherStrokeAt = 0;
      this.runtime.activeActionKind = null;
      this.runtime.lastFishingCastAt = 0;
      this.runtime.lastFishingBiteAt = 0;
      this.runtime.lastFishingCatchAt = 0;
      this.runtime.isFishingWaiting = false;
      this.runtime.isFishingReeling = false;
      this.runtime.skillingActionStatus = 'Stopped';
      this.log(`Skilling Stopped.`);
      this.updateUIState();
    },

    toggleSkilling() {
      if (this.skillingLoopActive) this.stopSkilling();
      else this.startSkilling();
    },

    // --- 5. Auto-Haste Buff System (40s Cooldown) ---
    async checkAutoHaste() {
      if (!this.config.autoHaste || !this.isReady()) return false;
      const now = Date.now();
      if (now - this.runtime.lastHasteCast < 40000) return false;
      const currentMana = (app.stats && app.stats.mana) != null ? app.stats.mana : 0;
      if (currentMana < 30) return false;

      this.log('Auto-Haste: Casting Venti (Haste speed buff)');
      app.net.send({ t: 'cast', id: 'venti' });
      this.runtime.lastHasteCast = now;
      return true;
    },

    // --- 6. Cavebotting Waypoint Navigation Subsystem ---
    saveWaypointsToStorage() {
      try {
        localStorage.setItem('pix_cavebot_waypoints', JSON.stringify(this.config.waypoints || []));
      } catch (e) {}
    },

    addCurrentWaypoint() {
      if (!this.isReady()) return;
      const me = app.entities?.me;
      if (!me) return;
      const x = Math.round(me.x);
      const y = Math.round(me.y);
      this.addWaypoint(x, y);
    },

    addWaypoint(x, y) {
      const wx = Number(x);
      const wy = Number(y);
      if (isNaN(wx) || isNaN(wy)) return;
      if (!this.config.waypoints) this.config.waypoints = [];
      this.config.waypoints.push({ x: wx, y: wy });
      this.saveWaypointsToStorage();
      this.renderWaypointList();
      this.log(`Added Waypoint #${this.config.waypoints.length}: (${wx}, ${wy})`);
    },

    removeWaypoint(idx) {
      if (!this.config.waypoints || idx < 0 || idx >= this.config.waypoints.length) return;
      this.config.waypoints.splice(idx, 1);
      if (this.runtime.currentWaypointIdx >= this.config.waypoints.length) {
        this.runtime.currentWaypointIdx = Math.max(0, this.config.waypoints.length - 1);
      }
      this.saveWaypointsToStorage();
      this.renderWaypointList();
    },

    moveWaypoint(idx, dir) {
      const wps = this.config.waypoints;
      if (!wps) return;
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= wps.length) return;
      const temp = wps[idx];
      wps[idx] = wps[targetIdx];
      wps[targetIdx] = temp;
      if (this.runtime.currentWaypointIdx === idx) {
        this.runtime.currentWaypointIdx = targetIdx;
      } else if (this.runtime.currentWaypointIdx === targetIdx) {
        this.runtime.currentWaypointIdx = idx;
      }
      this.saveWaypointsToStorage();
      this.renderWaypointList();
    },

    clearWaypoints() {
      this.config.waypoints = [];
      this.runtime.currentWaypointIdx = 0;
      this.saveWaypointsToStorage();
      this.renderWaypointList();
      this.log('Cleared all waypoints.');
    },

    saveWaypointsToFile() {
      const wps = this.config.waypoints || [];
      if (wps.length === 0) {
        alert('No waypoints to save. Capture or add waypoints first.');
        return;
      }
      const payload = JSON.stringify({
        format: 'pixlaria_waypoints_v1',
        createdAt: new Date().toISOString(),
        count: wps.length,
        waypoints: wps
      }, null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `waypoints_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.log(`Exported ${wps.length} waypoints to file.`);
    },

    async loadWaypointsFromFile(file) {
      if (!file) return;
      try {
        const text = await file.text();
        let loaded = [];
        try {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) loaded = parsed;
          else if (parsed && Array.isArray(parsed.waypoints)) loaded = parsed.waypoints;
        } catch (e) {
          const lines = text.split(/\r?\n/);
          for (const line of lines) {
            const parts = line.trim().split(/[\s,]+/);
            if (parts.length >= 2) {
              const x = parseInt(parts[0], 10);
              const y = parseInt(parts[1], 10);
              if (!isNaN(x) && !isNaN(y)) loaded.push({ x, y });
            }
          }
        }
        const valid = loaded.filter(wp => typeof wp.x === 'number' && typeof wp.y === 'number' && !isNaN(wp.x) && !isNaN(wp.y))
          .map(wp => ({ x: Math.round(wp.x), y: Math.round(wp.y) }));
        if (valid.length > 0) {
          this.config.waypoints = valid;
          this.runtime.currentWaypointIdx = 0;
          this.saveWaypointsToStorage();
          this.renderWaypointList();
          this.log(`Loaded ${valid.length} waypoints from file.`);
        } else {
          alert('Could not find valid coordinates in the uploaded file.');
        }
      } catch (err) {
        this.log(`Error reading waypoints file: ${err.message}`);
      }
    },

    renderWaypointList() {
      const container = document.getElementById('pix-waypoint-list');
      const countEl = document.getElementById('pix-waypoint-count');
      const wps = this.config.waypoints || [];
      if (countEl) countEl.textContent = `${wps.length} points`;
      if (!container) return;

      if (wps.length === 0) {
        container.innerHTML = '<div style="padding:10px;text-align:center;color:#9ca3af;">No waypoints saved. Walk to a spot and click "Capture Current Pos".</div>';
        return;
      }

      container.innerHTML = wps.map((wp, idx) => {
        const isCurrent = (idx === this.runtime.currentWaypointIdx && this.cavebotActive);
        return `
          <div class="pix-list-item ${isCurrent ? 'pix-active-wp' : ''}">
            <div>
              <div class="pix-item-title">
                <span style="color:#f6c531; font-weight:700;">#${idx + 1}</span>
                <span>(${wp.x}, ${wp.y})</span>
                ${isCurrent ? '<small style="color:#34d399; margin-left:4px;">● NEXT TARGET</small>' : ''}
              </div>
            </div>
            <div class="pix-item-actions">
              <button class="pix-btn pix-btn-sm" onclick="PixlariaBot.walkTo(${wp.x}, ${wp.y})">Walk</button>
              <button class="pix-btn pix-btn-sm" onclick="PixlariaBot.moveWaypoint(${idx}, -1)" title="Move Up">▲</button>
              <button class="pix-btn pix-btn-sm" onclick="PixlariaBot.moveWaypoint(${idx}, 1)" title="Move Down">▼</button>
              <button class="pix-btn pix-btn-sm pix-btn-red" onclick="PixlariaBot.removeWaypoint(${idx})" title="Remove">✕</button>
            </div>
          </div>
        `;
      }).join('');
    },

    startCavebot() {
      this.cavebotActive = true;
      if (!this.running) {
        this.running = true;
        this.scheduleNextTick();
      }
      this.log('Cavebot Started. Following waypoint loop with combat priority.');
      this.updateUIState();
      this.renderWaypointList();
    },

    stopCavebot() {
      this.cavebotActive = false;
      this.runtime.cavebotStatus = 'Stopped';
      this.log('Cavebot Stopped.');
      this.updateUIState();
      this.renderWaypointList();
    },

    toggleCavebot(forcedState) {
      const next = forcedState != null ? Boolean(forcedState) : !this.cavebotActive;
      if (next) this.startCavebot();
      else this.stopCavebot();
    },

    async executeCavebotCycle() {
      if (!this.cavebotActive || this.runtime.isLooting || !this.isReady()) return false;
      const me = app.entities?.me;
      if (!me) return false;

      // 1. Check if an enemy is detected near the player or active combat target is alive
      const currentTargetId = app.stats.target;
      let activeTarget = null;
      if (currentTargetId) {
        const t = app.entities.entities.get(currentTargetId);
        if (t && t.hp > 0 && !t.dying) {
          activeTarget = t;
        }
      }

      const nearbyMonsters = this.getAvailableMonsters();
      const hasEnemyNear = Boolean(activeTarget || nearbyMonsters.length > 0);

      if (hasEnemyNear) {
        // STOP PATHING IMMEDIATELY & ENTER COMBAT!
        this.runtime.cavebotStatus = activeTarget
          ? `Combat Active: Fighting ${activeTarget.name} (HP: ${activeTarget.hp})`
          : `Enemy Detected: Engaging ${nearbyMonsters[0].entity.name} (${nearbyMonsters[0].dist.toFixed(1)}t)`;

        // Execute combat cycle
        await this.executeCombatCycle();
        return true; // We halted pathing to prioritize combat
      }

      // 2. No reachable enemies around -> Resume / Continue Waypoint Pathing
      const wps = this.config.waypoints || [];
      if (wps.length === 0) {
        this.runtime.cavebotStatus = 'No waypoints saved. Add waypoints to begin loop.';
        return false;
      }

      if (this.runtime.currentWaypointIdx >= wps.length) {
        this.runtime.currentWaypointIdx = 0;
      }

      const targetWp = wps[this.runtime.currentWaypointIdx];
      if (!targetWp) {
        this.runtime.currentWaypointIdx = 0;
        return false;
      }

      const dist = Math.hypot(targetWp.x - me.x, targetWp.y - me.y);

      // If waypoint is reached (within 1.5 tiles or adjacent)
      if (dist <= 1.5 || (Math.abs(targetWp.x - me.x) <= 1 && Math.abs(targetWp.y - me.y) <= 1)) {
        const completedIdx = this.runtime.currentWaypointIdx;
        this.runtime.currentWaypointIdx = (this.runtime.currentWaypointIdx + 1) % wps.length;
        this.runtime.cavebotStatus = `Reached WP #${completedIdx + 1} (${targetWp.x}, ${targetWp.y}) -> Next: #${this.runtime.currentWaypointIdx + 1}`;
        this.renderWaypointList();
        await this.sleep(this.humanMode ? gaussian(280, 50) : 100);
        return true;
      }

      // Path towards target waypoint
      this.runtime.cavebotStatus = `Pathing to WP #${this.runtime.currentWaypointIdx + 1} (${targetWp.x}, ${targetWp.y}) [${dist.toFixed(1)}t]`;
      app.net.send({ t: 'walk', x: targetWp.x, y: targetWp.y, cancelAttack: true });
      await this.sleep(Math.min(1800, Math.max(500, Math.round(dist * 260) + this.getDelay('aim'))));
      return true;
    },

    // --- Resource Acquisition & Memory Subsystem ---
    scanNearbyStaticResources() {
      if (!this.config.recordResources || !this.isReady()) return 0;
      const now = Date.now();
      if (now - this.runtime.lastResourceScan < 1000) return 0;
      this.runtime.lastResourceScan = now;

      let newCount = 0;

      // 1. Scan Static World Objects (Trees, Rocks, Fishing Spots, Stations, Interactive Utilities)
      if (app.world && app.world.objects) {
        for (const [id, entry] of app.world.objects) {
          const obj = entry?.obj || entry;
          if (!obj || !obj.type || typeof obj.x !== 'number' || typeof obj.y !== 'number') continue;

          // Check if object type exists in static registry
          const reg = STATIC_TYPE_REGISTRY[obj.type];
          if (!reg) continue;

          const rx = Math.round(obj.x);
          const ry = Math.round(obj.y);
          const key = `${obj.type}@${rx},${ry}`;

          if (this.resourceMemory.has(key)) {
            // Already recorded: refresh lastSeen and keep fresh live id
            const existing = this.resourceMemory.get(key);
            existing.lastSeen = now;
            existing.id = obj.id;
          } else {
            // New discovered static node
            this.resourceMemory.set(key, {
              key,
              id: obj.id,
              type: obj.type,
              name: reg.name || obj.type,
              category: reg.category || 'resource',
              skill: reg.skill || null,
              action: reg.action || 'Interact',
              x: rx,
              y: ry,
              firstSeen: now,
              lastSeen: now
            });
            newCount++;
          }
        }
      }

      // 2. Scan Static NPCs & Vendors
      if (app.entities && app.entities.entities) {
        for (const [id, entity] of app.entities.entities) {
          if (!entity || entity.kind !== 'npc' || typeof entity.x !== 'number' || typeof entity.y !== 'number') continue;

          const rx = Math.round(entity.x);
          const ry = Math.round(entity.y);
          const rawName = (entity.name || 'NPC').trim();
          const cleanSlug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
          const key = `npc_${cleanSlug}@${rx},${ry}`;

          if (this.resourceMemory.has(key)) {
            const existing = this.resourceMemory.get(key);
            existing.lastSeen = now;
            existing.id = entity.id;
          } else {
            this.resourceMemory.set(key, {
              key,
              id: entity.id,
              type: 'npc',
              name: rawName,
              category: 'npc',
              skill: null,
              action: 'Talk',
              x: rx,
              y: ry,
              firstSeen: now,
              lastSeen: now
            });
            newCount++;
          }
        }
      }

      if (newCount > 0) {
        this.saveResourceMemoryDebounced();
        this.updateResourceMemoryUI();
      }

      return newCount;
    },

    saveResourceMemoryDebounced() {
      if (this.runtime.resourceSaveTimer) {
        clearTimeout(this.runtime.resourceSaveTimer);
      }
      this.runtime.resourceSaveTimer = setTimeout(() => {
        this.saveResourceMemory();
        this.runtime.resourceSaveTimer = null;
      }, 2000);
    },

    saveResourceMemory() {
      try {
        const arr = Array.from(this.resourceMemory.values());
        localStorage.setItem('pix_resource_memory', JSON.stringify(arr));
        this.updateResourceMemoryUI();
      } catch (err) {
        console.warn('[Pixlaria Bot] Failed to persist resource memory:', err);
      }
    },

    loadResourceMemory() {
      try {
        const raw = localStorage.getItem('pix_resource_memory');
        if (!raw) return;
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          this.resourceMemory.clear();
          for (const item of arr) {
            if (item && item.key && typeof item.x === 'number' && typeof item.y === 'number') {
              this.resourceMemory.set(item.key, item);
            }
          }
          this.updateResourceMemoryUI();
        }
      } catch (err) {
        console.warn('[Pixlaria Bot] Error loading resource memory:', err);
      }
    },

    clearResourceMemory() {
      this.resourceMemory.clear();
      try {
        localStorage.removeItem('pix_resource_memory');
      } catch (e) {}
      this.updateResourceMemoryUI();
      this.log('Cleared all remembered resources and static entities.');
    },

    exportResourceMemoryToFile() {
      const arr = Array.from(this.resourceMemory.values());
      if (arr.length === 0) {
        alert('No static resources in memory to export yet. Walk near trees, rocks, or NPCs to capture them.');
        return;
      }
      const payload = JSON.stringify({
        format: 'pixlaria_resource_memory_v1',
        exportedAt: new Date().toISOString(),
        count: arr.length,
        resources: arr
      }, null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resources_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.log(`Exported ${arr.length} static resources to file.`);
    },

    async importResourceMemoryFromFile(file) {
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        let items = [];
        if (Array.isArray(parsed)) items = parsed;
        else if (parsed && Array.isArray(parsed.resources)) items = parsed.resources;

        let added = 0;
        for (const item of items) {
          if (item && typeof item.x === 'number' && typeof item.y === 'number' && item.type) {
            const rx = Math.round(item.x);
            const ry = Math.round(item.y);
            const key = item.key || `${item.type}@${rx},${ry}`;
            item.key = key;
            item.x = rx;
            item.y = ry;
            this.resourceMemory.set(key, item);
            added++;
          }
        }

        this.saveResourceMemory();
        this.updateResourceMemoryUI();
        this.log(`Imported ${added} static resources from file. Total in memory: ${this.resourceMemory.size}`);
      } catch (err) {
        alert(`Failed to import resource file: ${err.message}`);
      }
    },

    getNearestRememberedResource(typeOrTypes, maxRadius = 500) {
      if (!this.isReady() || this.resourceMemory.size === 0) return null;
      const me = app.entities?.me;
      if (!me) return null;

      const types = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];
      let best = null;
      let bestScore = Infinity;
      const now = Date.now();
      const skillKey = this.config.skillingSkill;

      for (const res of this.resourceMemory.values()) {
        if (!types.includes(res.type)) continue;

        const coordKey = `${Math.round(res.x)},${Math.round(res.y)}`;

        // Check unreachable blacklist
        if (res.id && this.runtime.unreachableNodes.has(res.id)) {
          if (now < this.runtime.unreachableNodes.get(res.id)) continue;
          else this.runtime.unreachableNodes.delete(res.id);
        }
        if (this.runtime.unreachableNodes.has(coordKey)) {
          if (now < this.runtime.unreachableNodes.get(coordKey)) continue;
          else this.runtime.unreachableNodes.delete(coordKey);
        }

        // Skip if this node is on depletion cooldown
        if (res.id && this.runtime.depletedNodes.has(res.id)) {
          if (now < this.runtime.depletedNodes.get(res.id)) continue;
          else this.runtime.depletedNodes.delete(res.id);
        }
        if (this.runtime.depletedCoords.has(coordKey)) {
          if (now < this.runtime.depletedCoords.get(coordKey)) continue;
          else this.runtime.depletedCoords.delete(coordKey);
        }

        // If the object is currently rendered in app.world.objects, check its live status
        if (res.id && app.world?.objects?.has(res.id)) {
          const live = app.world.objects.get(res.id)?.obj || app.world.objects.get(res.id);
          if (live && (live.depleted || live.fe || (live.lf !== undefined && live.lf <= 0))) {
            continue;
          }
        }

        const dist = Math.hypot(res.x - me.x, res.y - me.y);
        if (dist > maxRadius) continue;

        // Anti-ping-pong recency penalty
        let penalty = 0;
        const lastVisit = Math.max(
          (res.id ? this.runtime.lastVisitedNodes.get(res.id) : 0) || 0,
          this.runtime.lastVisitedCoords.get(coordKey) || 0
        );
        const timeSinceVisit = now - lastVisit;

        if (skillKey === 'fishing') {
          if (timeSinceVisit < 140000) {
            penalty += Math.max(0, (140000 - timeSinceVisit) / 4000);
          }
        } else if (skillKey === 'woodcutting') {
          if (timeSinceVisit < 45000) {
            penalty += Math.max(0, (45000 - timeSinceVisit) / 4000);
          }
        } else if (skillKey === 'mining') {
          if (timeSinceVisit < 20000) {
            penalty += Math.max(0, (20000 - timeSinceVisit) / 3500);
          }
        }

        const effectiveDist = dist + penalty;
        if (effectiveDist < bestScore) {
          bestScore = effectiveDist;
          best = res;
        }
      }

      return best ? { resource: best, dist: Math.hypot(best.x - me.x, best.y - me.y) } : null;
    },

    updateResourceMemoryUI() {
      const badge = document.getElementById('pix-resmem-badge');
      const statsEl = document.getElementById('pix-resmem-stats');
      if (!badge && !statsEl) return;

      const total = this.resourceMemory.size;
      if (badge) badge.textContent = `${total} Nodes`;

      if (statsEl) {
        let trees = 0, rocks = 0, fish = 0, stations = 0, npcs = 0;
        for (const r of this.resourceMemory.values()) {
          if (r.category === 'woodcutting') trees++;
          else if (r.category === 'mining') rocks++;
          else if (r.category === 'fishing') fish++;
          else if (r.category === 'station') stations++;
          else if (r.category === 'npc') npcs++;
        }
        statsEl.innerHTML = `
          <span>🌲 ${trees} Trees</span>
          <span>⛏️ ${rocks} Rocks</span>
          <span>🎣 ${fish} Fish</span>
          <span>🔨 ${stations} Stations</span>
          <span>🟡 ${npcs} NPCs</span>
        `;
      }
    },

    // --- 7. Self-Scheduling Master Heartbeat ---
    async tick() {
      if (!this.running || !this.isReady()) return;

      try {
        // Continuous scan of nearby static nodes and static NPCs
        if (this.config.recordResources) {
          this.scanNearbyStaticResources();
        }

        // Anti-Inactivity & Human Anti-AFK Engine (Keepalive pulses, camera yaw glances)
        if (this.config.antiInactivity) {
          this.runAntiInactivityRoutines();
        }

        // Occasional micro-hesitation (7% chance): simulates natural eye glance / breathing room
        if (this.humanMode && Math.random() < 0.07) {
          await this.sleep(gaussian(400, 80));
        }

        // Priority 1: Survival Auto-Eat
        if (this.autoEatActive && await this.checkEmergencyEat()) return;

        // Priority 2: Auto-Haste buff (recast venti every 40s)
        if (this.config.autoHaste) {
          await this.checkAutoHaste();
        }

        // Priority 3: Auto Cast Combat Skill (whenever locked on target)
        if (this.config.castSpells && app.stats.target) {
          await this.tryCastCombatSpell(app.stats.target);
        }

        // Priority 4: Auto-Loot nearby dropped piles
        if (this.autoLootActive && await this.executeLootCycle()) return;

        // Priority 5: Cavebot Loop (Walk Waypoints + Combat Interruption)
        if (this.cavebotActive && await this.executeCavebotCycle()) return;

        // Priority 6: Standard Auto Attack Creature (when Cavebot is off)
        if (!this.cavebotActive && this.combatLoopActive && await this.executeCombatCycle()) return;

        // Priority 7: Soft Skills Gathering / Crafting Loop
        if (this.skillingLoopActive && await this.executeSkillingCycle()) return;
      } catch (err) {
        console.error('[Pixlaria Bot] Error in tick cycle:', err);
      }
    },

    scheduleNextTick() {
      if (!this.running) return;
      const delay = this.getDelay('tick');
      this.runtime.tickTimer = setTimeout(async () => {
        await this.tick();
        this.scheduleNextTick();
      }, delay);
    },

    start() {
      if (this.running) return;
      this.running = true;
      this.log(`Automation Resumed [Profile: ${this.config.profile.toUpperCase()}, HumanMode: ${this.humanMode}].`);
      this.scheduleNextTick();
      this.updateUIState();
    },

    stop() {
      this.running = false;
      this.runtime.activeSkillingObjId = null;
      if (this.runtime.tickTimer) {
        clearTimeout(this.runtime.tickTimer);
        this.runtime.tickTimer = null;
      }
      if (app && app.net) {
        app.net.send({ t: 'stop' });
      }
      this.log('Automation Stopped.');
      this.updateUIState();
    },

    toggle() {
      if (this.running) this.stop();
      else this.start();
    },

    // --- 6. Quick Action Utilities with Humanized Clicks ---
    async walkTo(x, y) {
      if (!this.isReady()) return;
      await this.sleep(this.getDelay('aim'));
      app.net.send({ t: 'walk', x: Math.floor(x), y: Math.floor(y), cancelAttack: true });
    },

    async attackEntity(id) {
      if (!this.isReady()) return;
      await this.sleep(this.getDelay('aim'));
      app.net.send({ t: 'attack', id });
    },

    async talkToEntity(id) {
      if (!this.isReady()) return;
      await this.sleep(this.getDelay('aim'));
      app.net.send({ t: 'talk', id });
    },

    async lootAllNearby() {
      if (!this.isReady() || !app.entities.ground) return;
      for (const [key, pile] of app.entities.ground) {
        await this.sleep(this.getDelay('item_click'));
        app.net.send({ t: 'take', x: pile.x, y: pile.y, all: true });
      }
      this.log('Looted nearby ground piles.');
    },

    async sellJunkToOpenShop() {
      if (!this.isReady() || !app.ui?.shopOpen) {
        alert('Please open an NPC shop window first.');
        return;
      }
      const keep = ['coins', 'hammer', 'tinderbox', 'bronze_pickaxe', 'bronze_axe'];
      const inv = app.inv || [];
      let count = 0;
      for (const slot of inv) {
        if (!slot || !slot.item || keep.includes(slot.item)) continue;
        await this.sleep(this.getDelay('item_click'));
        app.net.send({ t: 'sell', item: slot.item, count: 0 }); // count 0 = sell all
        count++;
      }
      this.log(`Sold ${count} item types to ${app.ui.shopOpen.name}.`);
    },

    async bankDepositAll() {
      if (!this.isReady()) return;
      await this.sleep(this.getDelay('item_click'));
      app.net.send({ t: 'depositall' });
    },

    // --- 8. Wilderness Supply Box & Old Chest Radar Engine ---
    isBoxInteracted(id, x, y) {
      if (!this.config.boxRadarHideInteracted) return false;
      const coordKey = typeof x === 'number' && typeof y === 'number' ? `${Math.round(x)},${Math.round(y)}` : null;
      const idKey = id !== undefined && id !== null ? String(id) : null;
      const now = Date.now();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

      if (idKey && this.runtime.interactedBoxes.has(idKey)) {
        if (now - this.runtime.interactedBoxes.get(idKey) < TWENTY_FOUR_HOURS) return true;
        this.runtime.interactedBoxes.delete(idKey);
      }
      if (coordKey && this.runtime.interactedBoxes.has(coordKey)) {
        if (now - this.runtime.interactedBoxes.get(coordKey) < TWENTY_FOUR_HOURS) return true;
        this.runtime.interactedBoxes.delete(coordKey);
      }
      return false;
    },

    markBoxInteracted(id, x, y) {
      const now = Date.now();
      if (id !== undefined && id !== null) {
        this.runtime.interactedBoxes.set(String(id), now);
      }
      if (typeof x === 'number' && typeof y === 'number') {
        this.runtime.interactedBoxes.set(`${Math.round(x)},${Math.round(y)}`, now);
      }
      this.saveInteractedBoxes();
      this.log(`Marked Box/Chest #${id || ''} at (${Math.round(x)}, ${Math.round(y)}) as interacted (hidden from radar).`);
    },

    deleteBoxFromRadar(id, x, y) {
      this.markBoxInteracted(id, x, y);
    },

    clearInteractedBoxes() {
      const count = this.runtime.interactedBoxes.size;
      this.runtime.interactedBoxes.clear();
      try { localStorage.removeItem('pix_interacted_boxes'); } catch (_) {}
      this.log(`Reset ${count} interacted/hidden box and chest markers.`);
    },

    loadInteractedBoxes() {
      try {
        const raw = localStorage.getItem('pix_interacted_boxes');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        const now = Date.now();
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        for (const [k, ts] of Object.entries(parsed)) {
          if (now - Number(ts) < TWENTY_FOUR_HOURS) {
            this.runtime.interactedBoxes.set(k, Number(ts));
          }
        }
      } catch (_) {}
    },

    saveInteractedBoxes() {
      try {
        const obj = {};
        for (const [k, ts] of this.runtime.interactedBoxes.entries()) {
          obj[k] = ts;
        }
        localStorage.setItem('pix_interacted_boxes', JSON.stringify(obj));
      } catch (_) {}
    },

    deleteRememberedResource(key) {
      if (this.resourceMemory.has(key)) {
        this.resourceMemory.delete(key);
        this.saveResourceMemory();
        this.updateResourceMemoryUI();
        this.log(`Deleted static entity [${key}] from memory.`);
      }
    },

    ignoreEntity(id) {
      if (!this.runtime.ignoredEntities) this.runtime.ignoredEntities = new Set();
      this.runtime.ignoredEntities.add(id);
      this.log(`Ignored entity #${id} (hidden from live entities list).`);
    },

    getNearbySupplyBoxes() {
      if (!this.isReady() || !app.world?.objects) return [];
      const me = app.entities?.me;
      if (!me) return [];
      const boxes = [];
      const maxDist = this.config.boxRadarMaxDistance || 35;

      for (const [id, entry] of app.world.objects) {
        const obj = entry?.obj || entry;
        if (!obj || typeof obj.x !== 'number' || typeof obj.y !== 'number') continue;
        if (this.config.boxRadarWildOnly && obj.b) continue; // Skip player plot furniture

        // Filter out boxes already interacted with / looted by the user
        if (this.isBoxInteracted(obj.id, obj.x, obj.y)) continue;

        const type = (obj.type || '').toLowerCase();
        const model = (obj.model || '').toLowerCase();
        const objName = (obj.name || '').toLowerCase();

        // Check global or app tile definitions for canonical names (shared/tiles.js)
        const def = (typeof OBJECTS !== 'undefined' ? OBJECTS[obj.type] : null) ||
                    (window.OBJECTS ? window.OBJECTS[obj.type] : null) ||
                    (window.app?.tiles ? window.app.tiles[obj.type] : null);
        const defName = (def?.name || '').toLowerCase();
        const defModel = (def?.model || '').toLowerCase();

        // 1. Identify "Old Chest" (weathered daily landmark chests scattered across the world)
        // Pixlaria tiles.js: cache: { name: 'Old chest', action: 'Open', model: 'cache', examine: 'A weathered chest...' }
        const isOldChest = (
          type === 'cache' ||
          type === 'old_chest' ||
          type === 'oldchest' ||
          model === 'cache' ||
          defModel === 'cache' ||
          objName.includes('old chest') ||
          objName.includes('cache') ||
          defName.includes('old chest') ||
          defName.includes('weathered chest')
        );

        if (isOldChest && !this.config.boxRadarTargetChests) continue;

        // 2. Identify wilderness supply crates and containers
        const isSupplyBox = (
          ['crate', 'supply_box', 'supply_crate', 'wilderness_box', 'box'].includes(type) ||
          ['crate', 'box'].includes(model) ||
          ['crate', 'box'].includes(defModel) ||
          objName.includes('crate') ||
          objName.includes('supply box') ||
          objName.includes('supply_box') ||
          defName.includes('crate') ||
          defName.includes('supply box')
        );

        // 3. Other wild chests (excluding bank, guild, or player storage)
        const isGenericChest = (
          (type.includes('chest') || model.includes('chest') || objName.includes('chest') || defName.includes('chest')) &&
          !['chest', 'bank_chest', 'guild_chest', 'storage_chest', 'public_chest'].includes(type) &&
          !objName.includes('bank') && !defName.includes('bank') &&
          !objName.includes('guild') && !defName.includes('guild') &&
          !objName.includes('storage') && !defName.includes('storage')
        );

        const isTarget = isOldChest || isSupplyBox || isGenericChest;
        if (!isTarget) continue;

        if (obj.depleted || obj.fe) continue; // Skip opened / depleted boxes

        const dist = Math.hypot(obj.x - me.x, obj.y - me.y);
        if (dist > maxDist) continue;

        let displayName = obj.name || def?.name;
        if (!displayName) {
          if (isOldChest) displayName = 'Old Chest';
          else if (type === 'crate') displayName = 'Wilderness Crate';
          else displayName = 'Wilderness Supply Box';
        }

        boxes.push({
          id: obj.id,
          x: obj.x,
          y: obj.y,
          type: obj.type || (isOldChest ? 'cache' : 'crate'),
          model: obj.model || defModel || '',
          name: displayName,
          isOldChest,
          dist,
          isWild: !obj.b,
          obj
        });
      }

      return boxes.sort((a, b) => a.dist - b.dist);
    },

    initRadarCanvas() {
      if (typeof document === 'undefined') return;
      let canvas = document.getElementById('pix-radar-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'pix-radar-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '999980';
        document.body.appendChild(canvas);

        const resize = () => {
          const dpr = window.devicePixelRatio || 1;
          canvas.width = Math.round(window.innerWidth * dpr);
          canvas.height = Math.round(window.innerHeight * dpr);
        };
        resize();
        window.addEventListener('resize', resize);
      }

      this.runtime.radarCanvas = canvas;
      this.runtime.radarCtx = canvas.getContext('2d');

      if (!this.runtime.radarAnimationLoopActive) {
        this.runtime.radarAnimationLoopActive = true;
        this.startRadarRenderLoop();
      }
    },

    startRadarRenderLoop() {
      const render = () => {
        try {
          this.renderRadarFrame();
        } catch (_) {}
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    },

    renderRadarFrame() {
      const canvas = this.runtime.radarCanvas;
      const ctx = this.runtime.radarCtx;
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width;
      const height = canvas.height;
      const cssW = width / dpr;
      const cssH = height / dpr;

      ctx.clearRect(0, 0, width, height);

      if (!this.config.boxRadar || !this.isReady()) return;

      const me = app.entities?.me;
      const camera = app.camera;
      if (!me || !camera || typeof THREE === 'undefined') return;

      const boxes = this.getNearbySupplyBoxes();
      this.runtime.nearbyBoxes = boxes;

      if (boxes.length === 0) return;

      // Project player screen position
      let playerScreenX = cssW / 2;
      let playerScreenY = cssH - 50;

      const meY = (me.sprite?.position?.y || (app.world?.tileHeight ? app.world.tileHeight(me.x, me.y) : 0)) + 0.8;
      const mePos = new THREE.Vector3(me.x + 0.5, meY, me.y + 0.5);
      mePos.project(camera);

      if (mePos.z > -1 && mePos.z < 1) {
        playerScreenX = (mePos.x + 1) * cssW / 2;
        playerScreenY = (1 - mePos.y) * cssH / 2;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      for (const box of boxes) {
        const h = app.world?.tileHeight ? app.world.tileHeight(box.x, box.y) : 0;
        const bPos = new THREE.Vector3(box.x + 0.5, h + 0.45, box.y + 0.5);
        bPos.project(camera);

        const inFront = bPos.z > -1 && bPos.z < 1;
        const rawBx = (bPos.x + 1) * cssW / 2;
        const rawBy = (1 - bPos.y) * cssH / 2;

        const isVisibleOnScreen = inFront && rawBx >= 15 && rawBx <= cssW - 15 && rawBy >= 15 && rawBy <= cssH - 15;
        const themeColor = box.isOldChest ? '#fbbf24' : '#f6c531';
        const icon = box.isOldChest ? '🗝️' : '📦';

        if (isVisibleOnScreen) {
          const bx = rawBx;
          const by = rawBy;

          // 1. Glowing Snapline from Player to Box/Chest
          if (this.config.boxRadarSnaplines) {
            ctx.beginPath();
            ctx.moveTo(playerScreenX, playerScreenY);
            ctx.lineTo(bx, by);
            const grad = ctx.createLinearGradient(playerScreenX, playerScreenY, bx, by);
            if (box.isOldChest) {
              grad.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
              grad.addColorStop(1, 'rgba(251, 191, 36, 0.98)');
            } else {
              grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
              grad.addColorStop(1, 'rgba(246, 197, 49, 0.95)');
            }
            ctx.strokeStyle = grad;
            ctx.lineWidth = box.isOldChest ? 2 : 1.5;
            ctx.shadowColor = box.isOldChest ? 'rgba(251, 191, 36, 0.7)' : 'rgba(246, 197, 49, 0.6)';
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }

          // 2. Tactical 3D Corner Brackets [ ]
          const sz = Math.max(12, Math.min(22, Math.round(320 / Math.max(4, box.dist))));
          ctx.strokeStyle = themeColor;
          ctx.lineWidth = box.isOldChest ? 2.5 : 2;

          // Top-left
          ctx.beginPath();
          ctx.moveTo(bx - sz, by - sz + 5);
          ctx.lineTo(bx - sz, by - sz);
          ctx.lineTo(bx - sz + 5, by - sz);
          ctx.stroke();

          // Top-right
          ctx.beginPath();
          ctx.moveTo(bx + sz - 5, by - sz);
          ctx.lineTo(bx + sz, by - sz);
          ctx.lineTo(bx + sz, by - sz + 5);
          ctx.stroke();

          // Bottom-left
          ctx.beginPath();
          ctx.moveTo(bx - sz, by + sz - 5);
          ctx.lineTo(bx - sz, by + sz);
          ctx.lineTo(bx - sz + 5, by + sz);
          ctx.stroke();

          // Bottom-right
          ctx.beginPath();
          ctx.moveTo(bx + sz - 5, by + sz);
          ctx.lineTo(bx + sz, by + sz);
          ctx.lineTo(bx + sz, by + sz - 5);
          ctx.stroke();

          // 3. Tactical Badge Tag
          const label = `${icon} ${box.name} (${box.dist.toFixed(1)}t)`;
          ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const textWidth = ctx.measureText(label).width;
          const tagW = textWidth + 12;
          const tagH = 18;
          const tagX = bx - tagW / 2;
          const tagY = by - sz - tagH - 4;

          ctx.fillStyle = 'rgba(17, 24, 39, 0.90)';
          ctx.strokeStyle = box.isOldChest ? 'rgba(251, 191, 36, 0.95)' : 'rgba(246, 197, 49, 0.8)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(tagX, tagY, tagW, tagH, 4);
          } else {
            ctx.rect(tagX, tagY, tagW, tagH);
          }
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = themeColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, bx, tagY + tagH / 2);

        } else {
          // Off-screen / Behind Camera: Draw Directional Arrow on Screen Perimeter
          let angle = Math.atan2(rawBy - cssH / 2, rawBx - cssW / 2);
          if (!inFront) angle += Math.PI;

          const pad = 35;
          const edgeX = Math.max(pad, Math.min(cssW - pad, cssW / 2 + Math.cos(angle) * (cssW / 2 - pad)));
          const edgeY = Math.max(pad, Math.min(cssH - pad, cssH / 2 + Math.sin(angle) * (cssH / 2 - pad)));

          ctx.save();
          ctx.translate(edgeX, edgeY);
          ctx.rotate(angle);

          ctx.fillStyle = box.isOldChest ? 'rgba(251, 191, 36, 0.95)' : 'rgba(246, 197, 49, 0.9)';
          ctx.beginPath();
          ctx.moveTo(10, 0);
          ctx.lineTo(-7, -5);
          ctx.lineTo(-4, 0);
          ctx.lineTo(-7, 5);
          ctx.closePath();
          ctx.fill();

          ctx.restore();

          // Distance tag at perimeter
          const edgeLabel = `${icon} ${box.dist.toFixed(1)}t`;
          ctx.font = 'bold 10px sans-serif';
          const ew = ctx.measureText(edgeLabel).width + 8;
          ctx.fillStyle = 'rgba(17, 24, 39, 0.88)';
          ctx.strokeStyle = box.isOldChest ? 'rgba(251, 191, 36, 0.8)' : 'rgba(246, 197, 49, 0.6)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(edgeX - ew / 2, edgeY - 22, ew, 15, 3);
          } else {
            ctx.rect(edgeX - ew / 2, edgeY - 22, ew, 15);
          }
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = themeColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(edgeLabel, edgeX, edgeY - 14);
        }
      }

      ctx.restore();
    },

    toggleBoxRadar(forcedState) {
      this.config.boxRadar = forcedState !== undefined ? Boolean(forcedState) : !this.config.boxRadar;
      try { localStorage.setItem('pix_box_radar', this.config.boxRadar); } catch (_) {}
      this.log(`Supply Box & Chest Radar ${this.config.boxRadar ? 'ENABLED' : 'DISABLED'}.`);
      const switchEl = document.getElementById('pix-toggle-box-radar');
      if (switchEl) switchEl.checked = this.config.boxRadar;
      const entitiesSwitchEl = document.getElementById('pix-radar-toggle-entities');
      if (entitiesSwitchEl) entitiesSwitchEl.checked = this.config.boxRadar;
    },

    async openSupplyBox(id, x, y) {
      if (!this.isReady()) return;
      const me = app.entities?.me;
      const dist = me ? Math.hypot(x - me.x, y - me.y) : 10;
      if (dist > 1.5) {
        this.log(`Navigating to Box/Chest #${id} at (${x}, ${y}) (${dist.toFixed(1)}t away)...`);
        app.net.send({ t: 'walk', x: Math.round(x), y: Math.round(y), cancelAttack: true });
        await this.sleep(Math.min(2200, Math.max(500, Math.round(dist * 220))));
      }
      await this.sleep(this.getDelay('aim'));
      this.log(`Opening Box/Chest #${id} at (${x}, ${y})`);
      app.net.send({ t: 'object', id, action: 'Open' });

      // Automatically mark as interacted so it clears from the active radar and list
      this.markBoxInteracted(id, x, y);
    },

    // --- 9. Human-Like Anti-Inactivity & Anti-AFK Engine ---
    runAntiInactivityRoutines() {
      if (!this.config.antiInactivity || !this.isReady()) return;
      const now = Date.now();

      // Routine 1: Keepalive Activity Pulse (every 45s - 75s Gaussian)
      if (now - this.runtime.lastActivityPulseTime > (this.runtime.nextActivityPulseDelay || 55000)) {
        try {
          app.net.send({ t: 'activity' });
          this.runtime.lastActivityPulseTime = now;
          this.runtime.nextActivityPulseDelay = this.humanMode ? gaussian(58000, 11000) : 50000;
        } catch (_) {}
      }

      // Routine 2: Natural Camera Glances / Micro-Yaw Nudges
      if (this.config.antiInactivityCamera && typeof app.yaw === 'number') {
        if (now - this.runtime.lastCameraFidgetTime > (this.runtime.nextCameraFidgetDelay || 105000)) {
          this.performHumanCameraNudge();
          this.runtime.lastCameraFidgetTime = now;
          this.runtime.nextCameraFidgetDelay = this.humanMode ? gaussian(115000, 24000) : 100000;
        }
      }

      // Routine 3: Idle Micro-Fidgeting (Only when completely idle)
      if (this.config.antiInactivityFidget && !this.combatLoopActive && !this.skillingLoopActive && !this.cavebotActive) {
        if (now - this.runtime.lastPositionFidgetTime > (this.runtime.nextPositionFidgetDelay || 185000)) {
          this.performHumanIdleFidget();
          this.runtime.lastPositionFidgetTime = now;
          this.runtime.nextPositionFidgetDelay = this.humanMode ? gaussian(190000, 35000) : 160000;
        }
      }
    },

    performHumanCameraNudge() {
      if (typeof app.yaw !== 'number') return;
      // Realistic human glance: rotate yaw by ±3 to ±8 degrees (0.05 to 0.14 radians)
      const delta = (Math.random() * 0.14 - 0.07) * (Math.random() < 0.5 ? 1 : -1);
      const startTime = performance.now();
      const startYaw = app.yaw;
      const duration = this.humanMode ? gaussian(340, 50) : 250;

      const step = (now) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const ease = 0.5 * (1 - Math.cos(Math.PI * progress));
        app.yaw = startYaw + (delta * ease);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    },

    performHumanIdleFidget() {
      if (!this.isReady()) return;
      const me = app.entities?.me;
      if (!me) return;

      const roll = Math.random();
      if (roll < 0.65) {
        app.net.send({ t: 'activity' });
      } else {
        const emotes = ['wave', 'nod', 'shrug', 'cheer'];
        const chosen = emotes[Math.floor(Math.random() * emotes.length)];
        try {
          app.net.send({ t: 'emote', k: chosen });
        } catch (_) {}
      }
    },

    handleServerIdleWarning(msg) {
      if (!this.config.antiInactivityAutoStay) return;
      const banner = document.getElementById('idle-warning');
      this.log(`Server Inactivity Notice received (remaining: ${msg.remaining}s). Scheduling humanized Stay response...`);

      const reactDelay = this.humanMode ? gaussian(1750, 320) : 800;
      setTimeout(() => {
        try {
          app.net.send({ t: 'stay' });
          app.net.send({ t: 'activity' });

          const stayBtn = document.getElementById('idle-stay');
          if (stayBtn) {
            stayBtn.click();
          }

          if (banner) {
            banner.hidden = true;
          }

          this.performHumanCameraNudge();
          this.log('Successfully acknowledged Inactivity Warning (Stay sent, idle timer reset).');
        } catch (err) {
          console.error('[Pixlaria Bot] Error responding to idle warning:', err);
        }
      }, reactDelay);
    },

    updateUIState() {
      const badge = document.getElementById('pix-bot-badge');
      const startBtn = document.getElementById('pix-bot-master-btn');
      if (badge) {
        badge.textContent = this.running ? 'RUNNING' : 'IDLE';
        badge.className = `pix-badge ${this.running ? 'active' : ''}`;
      }
      if (startBtn) {
        startBtn.textContent = this.running ? '⏹ Stop Automation' : '▶ Start Automation';
        startBtn.className = `pix-btn ${this.running ? 'pix-btn-red' : 'pix-btn-green'} pix-btn-block`;
      }
    }
  };

  window.PixlariaBot = Bot;

  // --- 7. In-Game Floating Overlay Builder ---
  function buildOverlayDOM() {
    if (document.getElementById('pix-bot-overlay')) return;

    // Inject styles dynamically if not already present
    if (!document.getElementById('pix-bot-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'pix-bot-styles';
      styleEl.textContent = `
        #pix-bot-overlay {
          position: fixed; top: 60px; right: 20px; width: 380px; max-height: 84vh;
          background: rgba(18, 22, 31, 0.94); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(246, 197, 49, 0.35); border-radius: 10px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.7), 0 0 15px rgba(246, 197, 49, 0.15);
          color: #e5e7eb; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 13px;
          z-index: 999999; display: flex; flex-direction: column; overflow: hidden; user-select: none;
        }
        #pix-bot-overlay.minimized { width: auto; max-height: none; border-radius: 30px; }
        #pix-bot-overlay.minimized .pix-body, #pix-bot-overlay.minimized .pix-tabs, #pix-bot-overlay.minimized .pix-master-bar { display: none; }
        #pix-bot-header {
          padding: 10px 14px; background: linear-gradient(180deg, rgba(35, 42, 58, 0.8) 0%, rgba(20, 25, 36, 0.8) 100%);
          border-bottom: 1px solid rgba(246, 197, 49, 0.2); display: flex; align-items: center; justify-content: space-between; cursor: move;
        }
        #pix-bot-header h3 { margin: 0; font-size: 14px; font-weight: 700; color: #f6c531; display: flex; align-items: center; gap: 8px; }
        .pix-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold; background: #374151; color: #9ca3af; }
        .pix-badge.active { background: #065f46; color: #34d399; }
        .pix-header-btns { display: flex; gap: 6px; }
        .pix-btn-icon { background: transparent; border: none; color: #9ca3af; font-size: 14px; cursor: pointer; padding: 2px 6px; border-radius: 4px; }
        .pix-btn-icon:hover { color: #fff; background: rgba(255, 255, 255, 0.1); }
        .pix-master-bar {
          padding: 8px 12px; background: rgba(14, 18, 27, 0.95);
          border-bottom: 1px solid rgba(246, 197, 49, 0.2);
          display: flex; gap: 8px;
        }
        .pix-btn-block {
          width: 100%; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          padding: 9px 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .pix-tabs { display: flex; background: rgba(14, 17, 24, 0.9); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .pix-tab-btn { flex: 1; padding: 8px 4px; background: transparent; border: none; color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; }
        .pix-tab-btn:hover { color: #e5e7eb; }
        .pix-tab-btn.active { color: #f6c531; border-bottom-color: #f6c531; background: rgba(246, 197, 49, 0.06); }
        .pix-body { padding: 12px; overflow-y: auto; max-height: calc(84vh - 125px); flex: 1; display: flex; flex-direction: column; gap: 12px; }
        .pix-tab-pane { display: none; flex-direction: column; gap: 10px; }
        .pix-tab-pane.active { display: flex; }
        .pix-card { background: rgba(25, 31, 45, 0.6); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 6px; padding: 10px; display: flex; flex-direction: column; gap: 8px; }
        .pix-card-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af; }
        .pix-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .pix-input { width: 100%; box-sizing: border-box; background: rgba(14, 17, 24, 0.8); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px; color: #fff; padding: 6px 8px; font-size: 12px; }
        .pix-input:focus { outline: none; border-color: #f6c531; }
        .pix-select { width: 100%; box-sizing: border-box; background: #161b26; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 4px; color: #fff; padding: 6px 8px; font-size: 12px; }
        .pix-select:focus { outline: none; border-color: #f6c531; }
        .pix-btn { padding: 7px 12px; background: #2563eb; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.15s; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
        .pix-btn:hover { background: #1d4ed8; }
        .pix-btn-gold { background: #d97706; } .pix-btn-gold:hover { background: #b45309; }
        .pix-btn-green { background: #059669; } .pix-btn-green:hover { background: #047857; }
        .pix-btn-red { background: #dc2626; } .pix-btn-red:hover { background: #b91c1c; }
        .pix-btn-sm { padding: 3px 7px; font-size: 11px; }
        .pix-switch { position: relative; display: inline-block; width: 38px; height: 20px; }
        .pix-switch input { opacity: 0; width: 0; height: 0; }
        .pix-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #374151; transition: 0.2s; border-radius: 20px; }
        .pix-slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; transition: 0.2s; border-radius: 50%; }
        input:checked + .pix-slider { background-color: #10b981; }
        input:checked + .pix-slider:before { transform: translateX(18px); }
        .pix-list { max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 5px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; background: rgba(10, 13, 18, 0.5); padding: 4px; }
        .pix-list-item { display: flex; align-items: center; justify-content: space-between; padding: 5px 8px; background: rgba(28, 35, 50, 0.7); border-radius: 4px; font-size: 12px; transition: background 0.15s; }
        .pix-list-item:hover { background: rgba(40, 50, 72, 0.9); }
        .pix-item-title { font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .pix-item-sub { font-size: 10px; color: #9ca3af; }
        .pix-item-actions { display: flex; gap: 4px; }
        .pix-active-wp { border-left: 3px solid #f6c531; background: rgba(246, 197, 49, 0.15) !important; }
        #pix-launcher-pill { position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #f6c531 0%, #b45309 100%); color: #111827; padding: 8px 14px; border-radius: 20px; font-weight: 700; font-size: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); cursor: pointer; z-index: 999998; display: flex; align-items: center; gap: 6px; }
        #pix-launcher-pill:hover { transform: scale(1.05); }
      `;
      document.head.appendChild(styleEl);
    }

    // Create container
    const overlay = document.createElement('div');
    overlay.id = 'pix-bot-overlay';
    overlay.innerHTML = `
      <div id="pix-bot-header">
        <h3>⚔️ Pixlaria Bot <span id="pix-bot-badge" class="pix-badge">IDLE</span></h3>
        <div class="pix-header-btns">
          <button id="pix-btn-min" class="pix-btn-icon" title="Minimize">−</button>
          <button id="pix-btn-close" class="pix-btn-icon" title="Close">×</button>
        </div>
      </div>

      <!-- Persistent Master Action Bar: ALWAYS VISIBLE across all tabs -->
      <div class="pix-master-bar">
        <button id="pix-bot-master-btn" class="pix-btn pix-btn-green pix-btn-block">
          ▶ Start Automation
        </button>
      </div>

      <div class="pix-tabs">
        <button class="pix-tab-btn active" data-tab="dash">Dashboard</button>
        <button class="pix-tab-btn" data-tab="entities">Entities</button>
        <button class="pix-tab-btn" data-tab="loot">Loot</button>
        <button class="pix-tab-btn" data-tab="combat">Combat</button>
        <button class="pix-tab-btn" data-tab="skills">Skills</button>
        <button class="pix-tab-btn" data-tab="cavebot">Cavebot</button>
        <button class="pix-tab-btn" data-tab="utils">Utils</button>
      </div>

      <div class="pix-body">
        <!-- 1. Dashboard Tab -->
        <div class="pix-tab-pane active" id="pane-dash">
          <div class="pix-card">
            <div class="pix-card-title">Character Status</div>
            <div class="pix-row">
              <span id="pix-stat-name">Player: --</span>
              <span id="pix-stat-pos">Pos: (0, 0)</span>
            </div>
            <div class="pix-row">
              <span>HP: <strong id="pix-stat-hp" style="color:#ef4444;">-- / --</strong></span>
              <span>MP: <strong id="pix-stat-mp" style="color:#3b82f6;">-- / --</strong></span>
            </div>
            <div class="pix-row">
              <span>Target: <strong id="pix-stat-target" style="color:#f6c531;">None</strong></span>
            </div>
          </div>

          <!-- Automated Actions Selection Card -->
          <div class="pix-card" style="border-color: rgba(246, 197, 49, 0.35);">
            <div class="pix-card-title" style="color:#f6c531; display:flex; justify-content:space-between; align-items:center;">
              <span>⚡ Automated Actions</span>
              <span style="font-size:10px; color:#9ca3af; text-transform:none;">Picked by You</span>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">⚔️ Auto Attack Creature</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-fight" checked><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">🍖 Auto Eat (&lt; HP Threshold)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-eat" checked><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">🔮 Auto Cast Skill in Combat</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-spell" checked><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">📦 Auto Loot Ground Items</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-loot" checked><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">🪓 Auto Soft Skill</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-skilling"><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">🏃 Cavebot (Waypoints)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-dash-toggle-cavebot"><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">💨 Auto Haste (Recast 40s)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-haste"><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">📦 Supply Box Radar (Key: B)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-box-radar" checked><span class="pix-slider"></span></label>
            </div>

            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">🛡️ Anti-Inactivity (Anti-AFK)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-anti-inactivity" checked><span class="pix-slider"></span></label>
            </div>
          </div>

          <!-- Telemetry Dashboard Card -->
          <div class="pix-card" style="border-color: rgba(52, 211, 153, 0.35);">
            <div class="pix-card-title" style="color:#34d399; display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; gap:6px;">📊 Session Telemetry</span>
              <button id="pix-btn-telemetry-reset" class="pix-btn pix-btn-sm pix-btn-gold" style="padding:2px 8px; font-size:10px;">↺ Reset</button>
            </div>
            <div class="pix-row">
              <span style="color:#9ca3af;">Elapsed Time:</span>
              <strong id="pix-telem-time" style="color:#ffffff; font-family:monospace; font-size:12px;">00:00:00</strong>
            </div>
            <div class="pix-row">
              <span style="color:#9ca3af;">Loot Gathered:</span>
              <strong id="pix-telem-loot" style="color:#38bdf8;">0 items</strong>
            </div>
            <div class="pix-row">
              <span style="color:#9ca3af;">Gold Gained:</span>
              <strong id="pix-telem-gold" style="color:#f6c531;">+0 GC</strong>
            </div>
            <div class="pix-row">
              <span style="color:#9ca3af;">XP Gained:</span>
              <strong id="pix-telem-xp" style="color:#a855f7;">+0 XP</strong>
            </div>
            <div class="pix-row">
              <span style="color:#9ca3af;">Skill XP Gained:</span>
              <strong id="pix-telem-skillxp" style="color:#34d399;">+0 XP</strong>
            </div>
            <div id="pix-telem-skill-breakdown" style="font-size:10px; color:#9ca3af; margin-top:4px; display:flex; flex-wrap:wrap; gap:4px;">
            </div>
          </div>
        </div>

        <!-- 2. Entities Tab -->
        <div class="pix-tab-pane" id="pane-entities">
          <!-- Wilderness Supply Box Scanner & Radar Card -->
          <div class="pix-card" style="border-color: rgba(246, 197, 49, 0.45);">
            <div class="pix-card-title" style="color:#f6c531; display:flex; justify-content:space-between; align-items:center;">
              <span>📦 Boxes &amp; Old Chests Radar</span>
              <div style="display:flex; align-items:center; gap:6px;">
                <span id="pix-box-radar-count" style="color:#38bdf8; font-weight:700; font-size:11px;">0 Found</span>
                <button id="pix-btn-reset-interacted" class="pix-btn pix-btn-sm" style="padding:1px 6px; font-size:10px; display:none;" onclick="PixlariaBot.clearInteractedBoxes()" title="Reset hidden/interacted boxes">↺ Reset (0)</button>
              </div>
            </div>
            <div class="pix-row">
              <span style="font-size:12px;">3D Radar &amp; Snaplines (Key: B)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-radar-toggle-entities" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row" style="margin-top:2px;">
              <span style="font-size:11px; color:#9ca3af;">Wilderness Only (Ignore claim crates)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-radar-wild-only" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row" style="margin-top:2px;">
              <span style="font-size:11px; color:#9ca3af;">Target Old Chests (Caches)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-radar-target-chests" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row" style="margin-top:2px;">
              <span style="font-size:11px; color:#9ca3af;">Hide Interacted / Looted</span>
              <label class="pix-switch"><input type="checkbox" id="pix-radar-hide-interacted" checked><span class="pix-slider"></span></label>
            </div>
            <div id="pix-radar-box-list" class="pix-list" style="margin-top:6px; max-height:160px; overflow-y:auto;">
              <div style="font-size:11px; color:#9ca3af; text-align:center; padding:8px;">Searching for chests &amp; wilderness boxes...</div>
            </div>
          </div>
          <!-- Static Resource & Entity Memory Card -->
          <div class="pix-card" style="border-color: rgba(246, 197, 49, 0.35);">
            <div class="pix-card-title" style="color:#f6c531; display:flex; justify-content:space-between; align-items:center;">
              <span>🗺️ Static Resource Memory</span>
              <span id="pix-resmem-badge" style="color:#34d399; font-weight:700; font-size:11px;">0 Nodes</span>
            </div>
            <div class="pix-row">
              <span style="font-size:12px;">Auto-Record Nodes &amp; NPCs</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-record-resources" checked><span class="pix-slider"></span></label>
            </div>
            <div style="font-size:10px; color:#9ca3af; line-height:1.3; margin-top:3px;">
              Captures stationary trees, rocks, fishing pools, crafting stations, and static NPCs into persistent memory without duplicates.
            </div>
            <div id="pix-resmem-stats" style="font-size:10px; color:#f6c531; margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
              <span>🌲 0 Trees</span> <span>⛏️ 0 Rocks</span> <span>🎣 0 Fish</span> <span>🔨 0 Stations</span> <span>🟡 0 NPCs</span>
            </div>
            <div style="display:flex; gap:6px; margin-top:8px;">
              <button id="pix-btn-resmem-export" class="pix-btn pix-btn-sm" style="flex:1;">Export JSON</button>
              <button id="pix-btn-resmem-import" class="pix-btn pix-btn-sm" style="flex:1;">Import JSON</button>
              <button id="pix-btn-resmem-clear" class="pix-btn pix-btn-sm pix-btn-red" style="padding:4px 8px;" title="Clear Memory">Clear</button>
              <input type="file" id="pix-resmem-file-input" accept=".json" style="display:none;">
            </div>
          </div>

          <div class="pix-row">
            <input type="text" id="pix-ent-search" class="pix-input" placeholder="Search entity (e.g. Smith, Wolf, Copper)...">
          </div>
          <div class="pix-row">
            <select id="pix-ent-kind" class="pix-select">
              <option value="all">All Types (Monsters, NPCs, Players)</option>
              <option value="monster">Monsters Only</option>
              <option value="npc">NPCs Only</option>
              <option value="player">Players Only</option>
              <option value="resources">🗺️ Remembered Static Nodes</option>
            </select>
          </div>
          <div id="pix-ent-list" class="pix-list">
            <div style="padding:10px;text-align:center;color:#9ca3af;">Scanning nearby entities...</div>
          </div>
        </div>

        <!-- 3. Loot Tab -->
        <div class="pix-tab-pane" id="pane-loot">
          <div class="pix-card">
            <div class="pix-row">
              <span>Enable Auto-Loot</span>
              <label class="pix-switch"><input type="checkbox" id="pix-loot-sub-toggle" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row">
              <span>Loot Max Radius:</span>
              <input type="number" id="pix-loot-radius" class="pix-input" style="width:60px;" value="8" min="1" max="15">
            </div>
            <div>
              <span class="pix-card-title">Blacklisted Items (ignored)</span>
              <input type="text" id="pix-loot-blacklist" class="pix-input" style="margin-top:4px;" value="bones, burnt_shrimp, burnt_meat">
            </div>
          </div>
          <button id="pix-btn-loot-now" class="pix-btn pix-btn-gold">Take All Visible Loot</button>
          <div class="pix-card-title">Nearby Ground Items</div>
          <div id="pix-loot-list" class="pix-list">
            <div style="padding:10px;text-align:center;color:#9ca3af;">No ground items nearby.</div>
          </div>
        </div>

        <!-- 4. Combat Tab -->
        <div class="pix-tab-pane" id="pane-combat">
          <div class="pix-card">
            <div class="pix-card-title">Target Monster Filter</div>
            <select id="pix-target-select" class="pix-select">
              <option value="any">Target Any Nearby Monster</option>
              <option value="wolf">Wolf</option>
              <option value="hoglet">Hoglet</option>
              <option value="goblin">Goblin</option>
              <option value="skeleton">Skeleton</option>
              <option value="giant_spider">Giant Spider</option>
              <option value="alligator">Alligator</option>
              <option value="monkey">Monkey</option>
              <option value="dragon">Dragon</option>
            </select>
            <input type="text" id="pix-target-custom" class="pix-input" placeholder="Or custom monster type...">
          </div>

          <div class="pix-card">
            <div class="pix-card-title">Spell / Skill Rotation</div>
            <div class="pix-row">
              <span>Cast Spells In Combat</span>
              <label class="pix-switch"><input type="checkbox" id="pix-spell-toggle" checked><span class="pix-slider"></span></label>
            </div>
            <select id="pix-spell-select" class="pix-select">
              <option value="kira">Strike (kira) - Melee</option>
              <option value="volta">Bolt (volta) - Magic 4 Range</option>
              <option value="ronda">Berserk (ronda) - Area Melee</option>
              <option value="fireball">Fireball (volta ronda) - AoE Magic</option>
              <option value="frost">Frost Bind (kyla) - Slow</option>
              <option value="pin">Pinning Shot (pil stilla) - Ranged</option>
              <option value="charge">Charge (rusa) - Melee Dash</option>
              <option value="vara">Healing (vara) - Self Heal</option>
            </select>
            <div class="pix-row">
              <span>Min Mana %:</span>
              <input type="number" id="pix-spell-mana" class="pix-input" style="width:60px;" value="25" min="0" max="100">
            </div>
          </div>
        </div>

        <!-- 5. Soft Skills Tab -->
        <div class="pix-tab-pane" id="pane-skills">
          <div class="pix-card">
            <div class="pix-card-title">Activity Selection</div>
            <select id="pix-skill-select" class="pix-select">
              <option value="woodcutting">🪓 Woodcutting (Axe required)</option>
              <option value="mining">⛏️ Mining (Pickaxe required)</option>
              <option value="fishing">🎣 Fishing (Net / Rod / Harpoon)</option>
              <option value="cooking">🍳 Cooking (Range / Fire)</option>
              <option value="smithing">🔨 Smithing & Smelting (Furnace / Anvil)</option>
              <option value="firemaking">🔥 Firemaking (Tinderbox + Logs)</option>
            </select>
          </div>

          <div class="pix-card">
            <div class="pix-card-title">Target Resource / Object</div>
            <select id="pix-skill-target" class="pix-select">
              <option value="any_highest">⭐ Highest Available (Auto-Detect)</option>
            </select>
          </div>

          <!-- Tool & Level Diagnostic Card -->
          <div class="pix-card" style="border-color: rgba(246, 197, 49, 0.25);">
            <div class="pix-card-title" style="color:#f6c531; display:flex; justify-content:space-between;">
              <span>Tool & Requirement Check</span>
              <span id="pix-skill-level-badge" style="color:#34d399; font-weight:bold;">Lv 1</span>
            </div>
            <div id="pix-skill-tool-status" style="font-size:12px; line-height:1.4; color:#e5e7eb;">
              Scanning equipment, tool belt, bag and bank...
            </div>
          </div>

          <!-- Configuration & Settings -->
          <div class="pix-card">
            <div class="pix-card-title">Automation Settings</div>
            <div class="pix-row">
              <span>Search Radius:</span>
              <div style="display:flex; align-items:center; gap:6px;">
                <input type="number" id="pix-skill-radius" class="pix-input" style="width:60px;" value="20" min="3" max="50">
                <span>tiles</span>
              </div>
            </div>
            <div class="pix-row" id="pix-firemaking-mode-row" style="margin-top:2px; display:none;">
              <span>Lighting Mode:</span>
              <select id="pix-firemaking-mode" class="pix-select" style="width:140px; padding:3px 6px; font-size:11px;">
                <option value="line">🔥 Light 5x in a Line</option>
                <option value="single">🕯️ Light 1x Single</option>
              </select>
            </div>
            <div class="pix-row">
              <span style="display:flex; align-items:center; gap:6px;">🗺️ Feed from Memory Map</span>
              <label class="pix-switch"><input type="checkbox" id="pix-skill-use-memory" checked><span class="pix-slider"></span></label>
            </div>
            <div style="font-size:10px; color:#9ca3af; margin-top:2px; line-height:1.2;">
              When selected node/station is outside view window, paths automatically to nearest remembered coordinate on the map.
            </div>
            <div class="pix-row" style="margin-top:6px;">
              <span>Auto-Drop Full Bag</span>
              <label class="pix-switch"><input type="checkbox" id="pix-skill-autodrop"><span class="pix-slider"></span></label>
            </div>
          </div>

          <!-- Live Status & Start Button -->
          <div class="pix-card">
            <div class="pix-row">
              <span>Current Status:</span>
              <span id="pix-skill-action-state" style="font-weight:600; color:#f6c531;">Idle</span>
            </div>
          </div>

          <button id="pix-skill-master-btn" class="pix-btn pix-btn-green" style="font-size:13px; padding:9px;">
            Start Woodcutting
          </button>
        </div>

        <!-- 6. Cavebot Tab -->
        <div class="pix-tab-pane" id="pane-cavebot">
          <!-- Master Toggle Card -->
          <div class="pix-card" style="border-color: rgba(246, 197, 49, 0.35);">
            <div class="pix-card-title" style="color:#f6c531; display:flex; justify-content:space-between; align-items:center;">
              <span>🏃 Cavebot System</span>
              <span id="pix-cavebot-badge" class="pix-badge">IDLE</span>
            </div>
            <div class="pix-row">
              <span>Enable Cavebot Loop</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-cavebot"><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row">
              <span>Current Position:</span>
              <span id="pix-cavebot-curpos" style="font-weight:700; color:#f6c531;">(0, 0)</span>
            </div>
            <div class="pix-row">
              <span>Status:</span>
              <span id="pix-cavebot-status" style="font-size:11px; color:#9ca3af; text-align:right; max-width:210px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Idle</span>
            </div>
            <button id="pix-cavebot-master-btn" class="pix-btn pix-btn-green" style="font-size:13px; padding:9px;">
              Start Cavebot
            </button>
          </div>

          <!-- Waypoints Management Card -->
          <div class="pix-card">
            <div class="pix-card-title" style="display:flex; justify-content:space-between; align-items:center;">
              <span>Waypoints Navigation</span>
              <span id="pix-waypoint-count" style="font-size:11px; color:#f6c531;">0 points</span>
            </div>

            <button id="pix-btn-capture-wp" class="pix-btn pix-btn-gold" style="padding:8px;">
              📍 Capture Current Pos as Waypoint
            </button>

            <div class="pix-row">
              <input type="number" id="pix-wp-x" class="pix-input" placeholder="X" style="width:70px;">
              <input type="number" id="pix-wp-y" class="pix-input" placeholder="Y" style="width:70px;">
              <button id="pix-btn-add-wp" class="pix-btn" style="flex:1;">+ Add</button>
            </div>

            <div id="pix-waypoint-list" class="pix-list" style="max-height: 160px;">
              <div style="padding:10px;text-align:center;color:#9ca3af;">No waypoints saved.</div>
            </div>

            <div class="pix-row" style="margin-top:4px;">
              <button id="pix-btn-save-wps" class="pix-btn pix-btn-sm" style="flex:1;">💾 Save to File</button>
              <button id="pix-btn-load-wps" class="pix-btn pix-btn-sm" style="flex:1;">📂 Load from File</button>
              <button id="pix-btn-clear-wps" class="pix-btn pix-btn-sm pix-btn-red" style="flex:0.7;">Clear</button>
              <input type="file" id="pix-file-wp-input" accept=".json,.txt" style="display:none;">
            </div>
          </div>
        </div>

        <!-- 7. Utils Tab -->
        <div class="pix-tab-pane" id="pane-utils">
          <!-- Humanizer Engine Card (Moved from Dashboard) -->
          <div class="pix-card" style="border-color: rgba(246, 197, 49, 0.25);">
            <div class="pix-card-title" style="color:#f6c531; display:flex; justify-content:space-between; align-items:center;">
              <span>🧠 Humanizer Engine</span>
              <span style="font-size:10px; color:#9ca3af;">Reaction Simulation</span>
            </div>
            <div class="pix-row">
              <span>Human-Like Behavior</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-human" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row">
              <span>Profile:</span>
              <select id="pix-human-profile" class="pix-select" style="width:140px;">
                <option value="natural">Natural (Balanced)</option>
                <option value="gamer">Gamer (Fast)</option>
                <option value="stealth">Stealth (Slow/Safe)</option>
              </select>
            </div>
            <div class="pix-row" style="font-size:11px;color:#9ca3af;">
              <span>Dynamic Latency:</span>
              <strong id="pix-human-delay" style="color:#34d399;">-- ms</strong>
            </div>
          </div>

          <!-- Anti-Inactivity & Anti-AFK Protection Card -->
          <div class="pix-card" style="border-color: rgba(52, 211, 153, 0.35);">
            <div class="pix-card-title" style="color:#34d399; display:flex; justify-content:space-between; align-items:center;">
              <span>🛡️ Anti-Inactivity &amp; Anti-AFK</span>
              <label class="pix-switch"><input type="checkbox" id="pix-utils-toggle-anti-inactivity" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row" style="margin-top:4px;">
              <span style="font-size:11px;">Auto-Stay on Idle Warning</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-auto-stay" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row">
              <span style="font-size:11px;">Natural Camera Glances (Yaw Ease)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-camera-nudge" checked><span class="pix-slider"></span></label>
            </div>
            <div class="pix-row">
              <span style="font-size:11px;">Idle Micro-Fidgets (Safe Emotes/Pulse)</span>
              <label class="pix-switch"><input type="checkbox" id="pix-toggle-idle-fidget" checked><span class="pix-slider"></span></label>
            </div>
          </div>

          <div class="pix-card">
            <div class="pix-card-title">Emergency Healing</div>
            <div class="pix-row">
              <span>Eat Food Below:</span>
              <span id="pix-eat-val">50% HP</span>
            </div>
            <input type="range" id="pix-eat-slider" min="10" max="90" value="50" style="width:100%;">
          </div>

          <div class="pix-card">
            <div class="pix-card-title">Quick Actions</div>
            <button id="pix-btn-vendor-sell" class="pix-btn">💰 Auto-Sell Junk to Shop</button>
            <button id="pix-btn-bank-all" class="pix-btn pix-btn-gold">🏦 Deposit All to Bank</button>
          </div>

          <div class="pix-card">
            <div class="pix-card-title">Walk to Coordinates</div>
            <div class="pix-row">
              <input type="number" id="pix-walk-x" class="pix-input" placeholder="X">
              <input type="number" id="pix-walk-y" class="pix-input" placeholder="Y">
              <button id="pix-btn-walk-coords" class="pix-btn">Walk</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Floating Pill Launcher
    const pill = document.createElement('div');
    pill.id = 'pix-launcher-pill';
    pill.innerHTML = '⚔️ Pixlaria Bot';
    pill.onclick = () => {
      overlay.style.display = overlay.style.display === 'none' ? 'flex' : 'none';
    };
    document.body.appendChild(pill);

    // Setup Dragging
    const header = document.getElementById('pix-bot-header');
    let isDragging = false, dragX = 0, dragY = 0;
    header.onmousedown = e => {
      if (e.target.tagName === 'BUTTON') return;
      isDragging = true;
      dragX = e.clientX - overlay.offsetLeft;
      dragY = e.clientY - overlay.offsetTop;
      overlay.style.transition = 'none';
    };
    document.onmousemove = e => {
      if (!isDragging) return;
      overlay.style.left = (e.clientX - dragX) + 'px';
      overlay.style.top = (e.clientY - dragY) + 'px';
      overlay.style.right = 'auto';
    };
    document.onmouseup = () => { isDragging = false; };

    // Header buttons
    document.getElementById('pix-btn-min').onclick = () => overlay.classList.toggle('minimized');
    document.getElementById('pix-btn-close').onclick = () => { overlay.style.display = 'none'; };

    // Tab Switching
    overlay.querySelectorAll('.pix-tab-btn').forEach(btn => {
      btn.onclick = () => {
        overlay.querySelectorAll('.pix-tab-btn').forEach(b => b.classList.remove('active'));
        overlay.querySelectorAll('.pix-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = document.getElementById(`pane-${btn.dataset.tab}`);
        if (pane) pane.classList.add('active');
      };
    });

    // Wire Up Form Controls
    const masterBtn = document.getElementById('pix-bot-master-btn');
    if (masterBtn) {
      masterBtn.onclick = () => {
        if (Bot.running) Bot.stop();
        else Bot.start();
      };
    }

    document.getElementById('pix-toggle-human').onchange = e => {
      Bot.humanMode = e.target.checked;
    };
    document.getElementById('pix-human-profile').onchange = e => {
      Bot.config.profile = e.target.value;
    };

    // 1. Auto Attack Creature
    const fightToggle = document.getElementById('pix-toggle-fight');
    if (fightToggle) {
      fightToggle.checked = Bot.combatLoopActive;
      fightToggle.onchange = e => { Bot.combatLoopActive = e.target.checked; };
    }

    // 2. Auto Eat
    const eatToggle = document.getElementById('pix-toggle-eat');
    if (eatToggle) {
      eatToggle.checked = Bot.autoEatActive;
      eatToggle.onchange = e => { Bot.autoEatActive = e.target.checked; };
    }

    // 3. Auto Cast Skill in Combat (2-way sync with combat tab)
    const spellToggle = document.getElementById('pix-toggle-spell');
    const spellSubToggle = document.getElementById('pix-spell-toggle');
    if (spellToggle) {
      spellToggle.checked = Bot.config.castSpells;
      spellToggle.onchange = e => {
        Bot.config.castSpells = e.target.checked;
        if (spellSubToggle) spellSubToggle.checked = e.target.checked;
      };
    }
    if (spellSubToggle) {
      spellSubToggle.checked = Bot.config.castSpells;
      spellSubToggle.onchange = e => {
        Bot.config.castSpells = e.target.checked;
        if (spellToggle) spellToggle.checked = e.target.checked;
      };
    }

    // 4. Auto Loot (2-way sync with loot tab)
    const lootToggle = document.getElementById('pix-toggle-loot');
    const lootSubToggle = document.getElementById('pix-loot-sub-toggle');
    if (lootToggle) {
      lootToggle.checked = Bot.autoLootActive;
      lootToggle.onchange = e => {
        Bot.autoLootActive = e.target.checked;
        if (lootSubToggle) lootSubToggle.checked = e.target.checked;
      };
    }
    if (lootSubToggle) {
      lootSubToggle.checked = Bot.autoLootActive;
      lootSubToggle.onchange = e => {
        Bot.autoLootActive = e.target.checked;
        if (lootToggle) lootToggle.checked = e.target.checked;
      };
    }

    // 5. Auto Soft Skill (2-way sync with skills tab)
    const skillingToggle = document.getElementById('pix-toggle-skilling');
    if (skillingToggle) {
      skillingToggle.checked = Bot.skillingLoopActive;
      skillingToggle.onchange = e => {
        Bot.skillingLoopActive = e.target.checked;
        if (!Bot.skillingLoopActive) {
          Bot.runtime.activeSkillingObjId = null;
          Bot.runtime.skillingActionStatus = 'Stopped';
        }
        Bot.updateUIState();
      };
    }

    const eatSlider = document.getElementById('pix-eat-slider');
    if (eatSlider) {
      eatSlider.oninput = e => {
        Bot.config.eatThreshold = Number(e.target.value) / 100;
        const lbl = document.getElementById('pix-eat-val');
        if (lbl) lbl.textContent = `${e.target.value}% HP`;
      };
    }

    const targetSelect = document.getElementById('pix-target-select');
    if (targetSelect) {
      targetSelect.onchange = e => { Bot.config.targetMonsterType = e.target.value; };
    }

    const targetCustom = document.getElementById('pix-target-custom');
    if (targetCustom) {
      targetCustom.oninput = e => { Bot.config.customTargetName = e.target.value.trim(); };
    }

    const spellSelect = document.getElementById('pix-spell-select');
    if (spellSelect) {
      spellSelect.onchange = e => { Bot.config.selectedSpell = e.target.value; };
    }

    const spellMana = document.getElementById('pix-spell-mana');
    if (spellMana) {
      spellMana.onchange = e => { Bot.config.minManaPercent = Number(e.target.value) / 100; };
    }

    document.getElementById('pix-loot-radius').onchange = e => {
      Bot.config.maxLootDistance = Number(e.target.value) || 8;
    };
    document.getElementById('pix-loot-blacklist').onchange = e => {
      Bot.config.lootBlacklist = e.target.value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    };

    document.getElementById('pix-btn-loot-now').onclick = () => Bot.lootAllNearby();
    document.getElementById('pix-btn-vendor-sell').onclick = () => Bot.sellJunkToOpenShop();
    document.getElementById('pix-btn-bank-all').onclick = () => Bot.bankDepositAll();

    document.getElementById('pix-btn-walk-coords').onclick = () => {
      const x = Number(document.getElementById('pix-walk-x').value);
      const y = Number(document.getElementById('pix-walk-y').value);
      if (!isNaN(x) && !isNaN(y)) Bot.walkTo(x, y);
    };

    // Skilling Controls Wiring
    const skillSelect = document.getElementById('pix-skill-select');
    const skillTarget = document.getElementById('pix-skill-target');
    const skillRadius = document.getElementById('pix-skill-radius');
    const skillAutoDrop = document.getElementById('pix-skill-autodrop');
    const skillMasterBtn = document.getElementById('pix-skill-master-btn');

    function populateSkillTargets(skillKey) {
      if (!skillTarget) return;
      const def = SKILL_DATA[skillKey];
      if (!def) return;

      const fmRow = document.getElementById('pix-firemaking-mode-row');
      if (fmRow) {
        fmRow.style.display = skillKey === 'firemaking' ? 'flex' : 'none';
      }

      skillTarget.innerHTML = '<option value="any_highest">⭐ Highest Available (Auto-Detect)</option>';
      for (const res of def.resources) {
        const opt = document.createElement('option');
        opt.value = res.id;
        const extra = res.ores ? ` (${res.ores.join(' + ')})` : (res.xp ? ` (+${res.xp} XP)` : '');
        opt.textContent = `${res.name} (Lv ${res.level})${extra}`;
        skillTarget.appendChild(opt);
      }
      skillTarget.value = Bot.config.skillingTarget || 'any_highest';

      if (skillMasterBtn) {
        skillMasterBtn.textContent = Bot.skillingLoopActive
          ? `Stop ${def.name}`
          : `Start ${def.name}`;
      }
    }

    if (skillSelect) {
      skillSelect.value = Bot.config.skillingSkill;
      populateSkillTargets(Bot.config.skillingSkill);

      skillSelect.onchange = e => {
        Bot.config.skillingSkill = e.target.value;
        Bot.config.skillingTarget = 'any_highest';
        populateSkillTargets(e.target.value);
        if (Bot.skillingLoopActive) {
          Bot.runtime.activeSkillingObjId = null;
        }
      };
    }

    const firemakingMode = document.getElementById('pix-firemaking-mode');
    if (firemakingMode) {
      firemakingMode.value = Bot.config.firemakingBatch !== false ? 'line' : 'single';
      firemakingMode.onchange = e => {
        Bot.config.firemakingBatch = e.target.value === 'line';
        try { localStorage.setItem('pix_firemaking_batch', Bot.config.firemakingBatch); } catch (_) {}
      };
    }

    if (skillTarget) {
      skillTarget.onchange = e => {
        Bot.config.skillingTarget = e.target.value;
        if (Bot.skillingLoopActive) {
          Bot.runtime.activeSkillingObjId = null;
        }
      };
    }

    if (skillRadius) {
      skillRadius.onchange = e => {
        Bot.config.skillingRadius = Number(e.target.value) || 20;
      };
    }

    if (skillAutoDrop) {
      skillAutoDrop.onchange = e => {
        Bot.config.skillingAutoDrop = e.target.checked;
      };
    }

    if (skillMasterBtn) {
      skillMasterBtn.onclick = () => {
        Bot.toggleSkilling();
        const def = SKILL_DATA[Bot.config.skillingSkill];
        skillMasterBtn.textContent = Bot.skillingLoopActive ? `Stop ${def?.name || 'Skilling'}` : `Start ${def?.name || 'Skilling'}`;
        skillMasterBtn.className = `pix-btn ${Bot.skillingLoopActive ? 'pix-btn-red' : 'pix-btn-green'}`;
        const sToggle = document.getElementById('pix-toggle-skilling');
        if (sToggle) sToggle.checked = Bot.skillingLoopActive;
      };
    }

    // Cavebot and Auto-Haste Controls Wiring
    const toggleHaste = document.getElementById('pix-toggle-haste');
    if (toggleHaste) {
      toggleHaste.checked = Bot.config.autoHaste;
      toggleHaste.onchange = e => {
        Bot.config.autoHaste = e.target.checked;
        try { localStorage.setItem('pix_auto_haste', e.target.checked); } catch (err) {}
      };
    }

    const toggleDashCavebot = document.getElementById('pix-dash-toggle-cavebot');
    const toggleCavebot = document.getElementById('pix-toggle-cavebot');
    const cavebotMasterBtn = document.getElementById('pix-cavebot-master-btn');

    if (toggleDashCavebot) {
      toggleDashCavebot.checked = Bot.cavebotActive;
      toggleDashCavebot.onchange = e => {
        Bot.toggleCavebot(e.target.checked);
        if (toggleCavebot) toggleCavebot.checked = Bot.cavebotActive;
      };
    }

    if (toggleCavebot) {
      toggleCavebot.checked = Bot.cavebotActive;
      toggleCavebot.onchange = e => {
        Bot.toggleCavebot(e.target.checked);
        if (toggleDashCavebot) toggleDashCavebot.checked = Bot.cavebotActive;
      };
    }

    if (cavebotMasterBtn) {
      cavebotMasterBtn.onclick = () => {
        Bot.toggleCavebot();
      };
    }

    const btnCaptureWp = document.getElementById('pix-btn-capture-wp');
    if (btnCaptureWp) btnCaptureWp.onclick = () => Bot.addCurrentWaypoint();

    const btnAddWp = document.getElementById('pix-btn-add-wp');
    if (btnAddWp) {
      btnAddWp.onclick = () => {
        const xInput = document.getElementById('pix-wp-x');
        const yInput = document.getElementById('pix-wp-y');
        if (xInput && yInput && xInput.value !== '' && yInput.value !== '') {
          Bot.addWaypoint(xInput.value, yInput.value);
          xInput.value = '';
          yInput.value = '';
        }
      };
    }

    const btnSaveWps = document.getElementById('pix-btn-save-wps');
    if (btnSaveWps) btnSaveWps.onclick = () => Bot.saveWaypointsToFile();

    const btnLoadWps = document.getElementById('pix-btn-load-wps');
    const fileWpInput = document.getElementById('pix-file-wp-input');
    if (btnLoadWps && fileWpInput) {
      btnLoadWps.onclick = () => fileWpInput.click();
      fileWpInput.onchange = e => {
        if (e.target.files && e.target.files[0]) {
          Bot.loadWaypointsFromFile(e.target.files[0]);
          e.target.value = '';
        }
      };
    }

    const btnClearWps = document.getElementById('pix-btn-clear-wps');
    if (btnClearWps) {
      btnClearWps.onclick = () => {
        if (confirm('Clear all saved waypoints?')) Bot.clearWaypoints();
      };
    }

    // Resource Memory Controls Wiring
    const toggleRecordRes = document.getElementById('pix-toggle-record-resources');
    if (toggleRecordRes) {
      toggleRecordRes.checked = Bot.config.recordResources;
      toggleRecordRes.onchange = e => {
        Bot.config.recordResources = e.target.checked;
        try { localStorage.setItem('pix_record_resources', e.target.checked); } catch (err) {}
      };
    }

    const btnResExport = document.getElementById('pix-btn-resmem-export');
    if (btnResExport) btnResExport.onclick = () => Bot.exportResourceMemoryToFile();

    const btnResImport = document.getElementById('pix-btn-resmem-import');
    const fileResInput = document.getElementById('pix-resmem-file-input');
    if (btnResImport && fileResInput) {
      btnResImport.onclick = () => fileResInput.click();
      fileResInput.onchange = e => {
        if (e.target.files && e.target.files[0]) {
          Bot.importResourceMemoryFromFile(e.target.files[0]);
          e.target.value = '';
        }
      };
    }

    const btnResClear = document.getElementById('pix-btn-resmem-clear');
    if (btnResClear) {
      btnResClear.onclick = () => {
        if (confirm('Clear all recorded static resource and NPC coordinates?')) {
          Bot.clearResourceMemory();
        }
      };
    }

    // Skill Memory Map Feed Toggle Wiring
    const toggleUseMemory = document.getElementById('pix-skill-use-memory');
    if (toggleUseMemory) {
      toggleUseMemory.checked = Bot.config.useResourceMemory;
      toggleUseMemory.onchange = e => {
        Bot.config.useResourceMemory = e.target.checked;
        try { localStorage.setItem('pix_skill_use_memory', e.target.checked); } catch (err) {}
      };
    }

    const btnResetTelem = document.getElementById('pix-btn-telemetry-reset');
    if (btnResetTelem) {
      btnResetTelem.onclick = () => Bot.resetTelemetry();
    }

    // Supply Box Radar Controls Wiring
    const toggleDashRadar = document.getElementById('pix-toggle-box-radar');
    if (toggleDashRadar) {
      toggleDashRadar.checked = Bot.config.boxRadar;
      toggleDashRadar.onchange = e => Bot.toggleBoxRadar(e.target.checked);
    }
    const toggleEntRadar = document.getElementById('pix-radar-toggle-entities');
    if (toggleEntRadar) {
      toggleEntRadar.checked = Bot.config.boxRadar;
      toggleEntRadar.onchange = e => Bot.toggleBoxRadar(e.target.checked);
    }
    const toggleWildOnly = document.getElementById('pix-radar-wild-only');
    if (toggleWildOnly) {
      toggleWildOnly.checked = Bot.config.boxRadarWildOnly;
      toggleWildOnly.onchange = e => {
        Bot.config.boxRadarWildOnly = e.target.checked;
        try { localStorage.setItem('pix_radar_wild_only', e.target.checked); } catch (_) {}
      };
    }
    const toggleTargetChests = document.getElementById('pix-radar-target-chests');
    if (toggleTargetChests) {
      toggleTargetChests.checked = Bot.config.boxRadarTargetChests;
      toggleTargetChests.onchange = e => {
        Bot.config.boxRadarTargetChests = e.target.checked;
        try { localStorage.setItem('pix_radar_target_chests', e.target.checked); } catch (_) {}
      };
    }
    const toggleHideInteracted = document.getElementById('pix-radar-hide-interacted');
    if (toggleHideInteracted) {
      toggleHideInteracted.checked = Bot.config.boxRadarHideInteracted;
      toggleHideInteracted.onchange = e => {
        Bot.config.boxRadarHideInteracted = e.target.checked;
        try { localStorage.setItem('pix_radar_hide_interacted', e.target.checked); } catch (_) {}
      };
    }
    const btnResetInteracted = document.getElementById('pix-btn-reset-interacted');
    if (btnResetInteracted) {
      btnResetInteracted.onclick = () => Bot.clearInteractedBoxes();
    }

    // Anti-Inactivity & Idle Controls Wiring
    const toggleDashAntiInact = document.getElementById('pix-toggle-anti-inactivity');
    if (toggleDashAntiInact) {
      toggleDashAntiInact.checked = Bot.config.antiInactivity;
      toggleDashAntiInact.onchange = e => {
        Bot.config.antiInactivity = e.target.checked;
        try { localStorage.setItem('pix_anti_inactivity', e.target.checked); } catch (_) {}
      };
    }
    const toggleUtilsAntiInact = document.getElementById('pix-utils-toggle-anti-inactivity');
    if (toggleUtilsAntiInact) {
      toggleUtilsAntiInact.checked = Bot.config.antiInactivity;
      toggleUtilsAntiInact.onchange = e => {
        Bot.config.antiInactivity = e.target.checked;
        try { localStorage.setItem('pix_anti_inactivity', e.target.checked); } catch (_) {}
      };
    }
    const toggleAutoStay = document.getElementById('pix-toggle-auto-stay');
    if (toggleAutoStay) {
      toggleAutoStay.checked = Bot.config.antiInactivityAutoStay;
      toggleAutoStay.onchange = e => { Bot.config.antiInactivityAutoStay = e.target.checked; };
    }
    const toggleCameraNudge = document.getElementById('pix-toggle-camera-nudge');
    if (toggleCameraNudge) {
      toggleCameraNudge.checked = Bot.config.antiInactivityCamera;
      toggleCameraNudge.onchange = e => { Bot.config.antiInactivityCamera = e.target.checked; };
    }
    const toggleIdleFidget = document.getElementById('pix-toggle-idle-fidget');
    if (toggleIdleFidget) {
      toggleIdleFidget.checked = Bot.config.antiInactivityFidget;
      toggleIdleFidget.onchange = e => { Bot.config.antiInactivityFidget = e.target.checked; };
    }

    try { Bot.renderWaypointList(); } catch (e) {}
    try { Bot.updateResourceMemoryUI(); } catch (e) {}
    try { Bot.updateTelemetryUI(); } catch (e) {}

    // Hotkeys:
    // press '`' (Backquote / ~) to toggle bot overlay
    // press 'B' / 'b' to toggle Supply Box Radar
    window.addEventListener('keydown', e => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === '`') {
        overlay.style.display = overlay.style.display === 'none' ? 'flex' : 'none';
      } else if (e.key === 'b' || e.key === 'B') {
        Bot.toggleBoxRadar();
      }
    });

    // Start Live View Loop
    setInterval(updateOverlayLiveView, 500);
    try { updateOverlayLiveView(); } catch (e) {}
  }

  // --- 8. Real-time View Updates ---
  function updateOverlayLiveView() {
    try {
      // 1. Dashboard Character Status
      const a = window.app;
      const me = a?.entities?.me;
      const stats = a?.stats;

      const nameEl = document.getElementById('pix-stat-name');
      const posEl = document.getElementById('pix-stat-pos');
      const hpEl = document.getElementById('pix-stat-hp');
      const mpEl = document.getElementById('pix-stat-mp');
      const targetEl = document.getElementById('pix-stat-target');

      if (nameEl) {
        const playerName = a?.name || me?.name || (a?.myId ? `Player #${a.myId}` : 'Hero');
        nameEl.textContent = `Player: ${playerName}`;
      }
      if (posEl) {
        if (me && typeof me.x === 'number' && typeof me.y === 'number') {
          posEl.textContent = `Pos: (${Math.round(me.x)}, ${Math.round(me.y)})`;
        }
      }
      if (hpEl) {
        if (stats && typeof stats.hp === 'number') {
          hpEl.textContent = `${stats.hp} / ${stats.mhp || 1}`;
        }
      }
      if (mpEl) {
        if (stats && typeof stats.mana === 'number') {
          mpEl.textContent = `${stats.mana} / ${stats.mmana || 1}`;
        }
      }

      if (targetEl) {
        if (stats?.target) {
          const t = a?.entities?.get ? a.entities.get(stats.target) : a?.entities?.entities?.get?.(stats.target);
          targetEl.textContent = t ? `${t.name} (HP ${t.hp ?? '?'})` : `ID: ${stats.target}`;
        } else {
          targetEl.textContent = 'None';
        }
      }

      // Continuous Resource Scan & UI badge refresh
      if (Bot.config.recordResources && Bot.isReady()) {
        try { Bot.scanNearbyStaticResources(); } catch (e) {}
      }
      try { Bot.updateResourceMemoryUI(); } catch (e) {}

      // Telemetry Session Tracking & UI Update (ALWAYS RUNS)
      try {
        Bot.updateTelemetry();
        Bot.updateTelemetryUI();
      } catch (err) {
        console.error('[Pixlaria Bot] Error updating telemetry:', err);
      }

      // Supply Box & Old Chest Radar Live View Rendering
      const radarListEl = document.getElementById('pix-radar-box-list');
      const radarCountEl = document.getElementById('pix-box-radar-count');
      const resetInteractedBtn = document.getElementById('pix-btn-reset-interacted');
      if (resetInteractedBtn) {
        const count = Bot.runtime.interactedBoxes ? Bot.runtime.interactedBoxes.size : 0;
        if (count > 0) {
          resetInteractedBtn.style.display = 'inline-block';
          resetInteractedBtn.textContent = `↺ Reset (${count})`;
        } else {
          resetInteractedBtn.style.display = 'none';
        }
      }

      if (radarListEl && Bot.isReady() && me) {
        const boxes = Bot.getNearbySupplyBoxes();
        if (radarCountEl) {
          const oldChestCount = boxes.filter(b => b.isOldChest).length;
          radarCountEl.textContent = oldChestCount > 0 ? `${boxes.length} Found (${oldChestCount} 🗝️)` : `${boxes.length} Found`;
        }
        if (boxes.length === 0) {
          radarListEl.innerHTML = '<div style="padding:8px;text-align:center;color:#9ca3af;font-size:11px;">No chests or supply boxes nearby. Scanning...</div>';
        } else {
          radarListEl.innerHTML = boxes.slice(0, 15).map(b => {
            const icon = b.isOldChest ? '🗝️' : '📦';
            const titleColor = b.isOldChest ? '#fbbf24' : '#f6c531';
            const badgeType = b.isOldChest ? 'Old Chest (Cache)' : b.type;
            const borderStyle = b.isOldChest ? 'border-left: 3px solid #fbbf24;' : '';
            return `
            <div class="pix-list-item" style="${borderStyle}">
              <div style="flex:1; overflow:hidden;">
                <div class="pix-item-title" style="color:${titleColor}; font-weight:700;">
                  ${icon} ${b.name} <small style="color:#38bdf8; font-weight:normal;">(${b.dist.toFixed(1)}t away)</small>
                </div>
                <div class="pix-item-sub">Pos: (${b.x}, ${b.y}) · Type: ${badgeType}</div>
              </div>
              <div class="pix-item-actions" style="display:flex; gap:4px; align-items:center;">
                <button class="pix-btn pix-btn-sm" onclick="PixlariaBot.walkTo(${b.x}, ${b.y})">Walk</button>
                <button class="pix-btn pix-btn-sm pix-btn-gold" onclick="PixlariaBot.openSupplyBox('${b.id}', ${b.x}, ${b.y})">Open</button>
                <button class="pix-btn pix-btn-sm pix-btn-red" onclick="PixlariaBot.deleteBoxFromRadar('${b.id}', ${b.x}, ${b.y})" title="Delete from list (already interacted/looted)">✕</button>
              </div>
            </div>
          `;
          }).join('');
        }
      }

    // 2. Entities Tab Rendering
    const entList = document.getElementById('pix-ent-list');
    const entSearch = document.getElementById('pix-ent-search');
    const entKind = document.getElementById('pix-ent-kind');

    if (entList && me) {
      const query = (entSearch?.value || '').toLowerCase().trim();
      const kindFilter = entKind?.value || 'all';

      if (kindFilter === 'resources') {
        const memList = [];
        for (const res of Bot.resourceMemory.values()) {
          if (query && !res.name.toLowerCase().includes(query) && !res.type.toLowerCase().includes(query)) continue;
          const dist = Math.hypot(res.x - me.x, res.y - me.y);
          memList.push({ res, dist });
        }
        memList.sort((a, b) => a.dist - b.dist);

        if (memList.length === 0) {
          entList.innerHTML = '<div style="padding:10px;text-align:center;color:#9ca3af;">No remembered static resources match. Walk around to record nodes.</div>';
        } else {
          entList.innerHTML = memList.slice(0, 35).map(({ res, dist }) => {
            const icon = res.category === 'woodcutting' ? '🌲'
                       : res.category === 'mining' ? '⛏️'
                       : res.category === 'fishing' ? '🎣'
                       : res.category === 'station' ? '🔨'
                       : res.category === 'npc' ? '🟡' : '📦';
            return `
              <div class="pix-list-item">
                <div style="flex:1; overflow:hidden;">
                  <div class="pix-item-title">${icon} ${res.name} <small style="color:#f6c531;">(${res.type})</small></div>
                  <div class="pix-item-sub">Dist: ${dist.toFixed(1)}t (${res.x}, ${res.y}) · ${res.category}</div>
                </div>
                <div class="pix-item-actions" style="display:flex; gap:4px; align-items:center;">
                  <button class="pix-btn pix-btn-sm" onclick="PixlariaBot.walkTo(${res.x}, ${res.y})">Walk</button>
                  <button class="pix-btn pix-btn-sm pix-btn-red" onclick="PixlariaBot.deleteRememberedResource('${res.key}')" title="Delete from remembered list">✕</button>
                </div>
              </div>
            `;
          }).join('');
        }
      } else {
        const list = [];
        for (const [id, entity] of app.entities.entities) {
          if (id === app.myId) continue;
          if (Bot.runtime.ignoredEntities?.has(id)) continue;
          if (kindFilter !== 'all' && entity.kind !== kindFilter) continue;
          if (query && !entity.name.toLowerCase().includes(query)) continue;

          const dist = Math.hypot(entity.x - me.x, entity.y - me.y);
          list.push({ entity, dist });
        }

        list.sort((a, b) => a.dist - b.dist);

        if (list.length === 0) {
          entList.innerHTML = '<div style="padding:10px;text-align:center;color:#9ca3af;">No matching entities found.</div>';
        } else {
          entList.innerHTML = list.slice(0, 30).map(({ entity: e, dist }) => {
            const hpStr = e.hp > 0 ? ` · HP: ${e.hp}/${e.maxhp || e.hp}` : '';
            const lvStr = e.level ? `Lv ${e.level}` : '';
            const kindBadge = e.kind === 'monster' ? '🔴' : e.kind === 'npc' ? '🟡' : '🟢';

            return `
              <div class="pix-list-item">
                <div style="flex:1; overflow:hidden;">
                  <div class="pix-item-title">${kindBadge} ${e.name} <small style="color:#f6c531;">${lvStr}</small></div>
                  <div class="pix-item-sub">Dist: ${dist.toFixed(1)}t (${e.x}, ${e.y})${hpStr}</div>
                </div>
                <div class="pix-item-actions" style="display:flex; gap:4px; align-items:center;">
                  <button class="pix-btn pix-btn-sm" onclick="PixlariaBot.walkTo(${e.x}, ${e.y})">Walk</button>
                  ${e.kind === 'monster' ? `<button class="pix-btn pix-btn-sm pix-btn-red" onclick="PixlariaBot.attackEntity(${e.id})">Attack</button>` : ''}
                  ${e.kind === 'npc' ? `<button class="pix-btn pix-btn-sm pix-btn-gold" onclick="PixlariaBot.talkToEntity(${e.id})">Talk</button>` : ''}
                  <button class="pix-btn pix-btn-sm pix-btn-red" onclick="PixlariaBot.ignoreEntity(${e.id})" title="Dismiss entity from list">✕</button>
                </div>
              </div>
            `;
          }).join('');
        }
      }

      // Populate combat monster select options dynamically if empty
      const targetSelect = document.getElementById('pix-target-select');
      if (targetSelect) {
        const currentSelected = targetSelect.value;
        const monsterTypes = new Set();
        for (const [id, e] of app.entities.entities) {
          if (e.kind === 'monster' && e.monsterType) monsterTypes.add(e.monsterType);
        }
        for (const mt of monsterTypes) {
          if (!targetSelect.querySelector(`option[value="${mt}"]`)) {
            const opt = document.createElement('option');
            opt.value = mt;
            opt.textContent = `Nearby: ${mt.charAt(0).toUpperCase() + mt.slice(1)}`;
            targetSelect.appendChild(opt);
          }
        }
      }
    }

    // 3. Loot Tab Rendering
    const lootList = document.getElementById('pix-loot-list');
    if (lootList && me && app.entities.ground) {
      const piles = [];
      for (const [key, pile] of app.entities.ground) {
        const dist = Math.hypot(pile.x - me.x, pile.y - me.y);
        piles.push({ pile, dist });
      }
      piles.sort((a, b) => a.dist - b.dist);

      if (piles.length === 0) {
        lootList.innerHTML = '<div style="padding:10px;text-align:center;color:#9ca3af;">No ground items nearby.</div>';
      } else {
        lootList.innerHTML = piles.slice(0, 20).map(({ pile, dist }) => {
          const itemSummary = pile.items.map(([id, count]) => `${id} ×${count}`).join(', ');
          return `
            <div class="pix-list-item">
              <div>
                <div class="pix-item-title">📦 ${pile.items.length} item(s)</div>
                <div class="pix-item-sub">Dist: ${dist.toFixed(1)}t · ${itemSummary}</div>
              </div>
              <div class="pix-item-actions">
                <button class="pix-btn pix-btn-sm" onclick="PixlariaBot.walkTo(${pile.x}, ${pile.y})">Walk</button>
                <button class="pix-btn pix-btn-sm pix-btn-gold" onclick="app.net.send({t:'take', x:${pile.x}, y:${pile.y}, all:true})">Take</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 4. Soft Skills Live View Rendering
    const skillLevelBadge = document.getElementById('pix-skill-level-badge');
    const skillToolStatus = document.getElementById('pix-skill-tool-status');
    const skillActionState = document.getElementById('pix-skill-action-state');
    const skillMasterBtn = document.getElementById('pix-skill-master-btn');

    if (skillLevelBadge && Bot.config.skillingSkill) {
      const curLvl = Bot.getSkillLevel(Bot.config.skillingSkill);
      const curXp = app.skills?.[Bot.config.skillingSkill] || 0;
      skillLevelBadge.textContent = `Lv ${curLvl} (${Math.floor(curXp)} XP)`;
    }

    if (skillToolStatus && Bot.config.skillingSkill) {
      const diag = Bot.checkToolStatus(Bot.config.skillingSkill, Bot.config.skillingTarget);
      let color = '#34d399';
      let icon = '🟢';
      if (diag.status === 'IN_BANK') { color = '#fbbf24'; icon = '⚠️'; }
      else if (diag.status === 'LEVEL_TOO_LOW') { color = '#f87171'; icon = '🔒'; }
      else if (!diag.ok) { color = '#ef4444'; icon = '❌'; }

      skillToolStatus.innerHTML = `<div>${icon} <span style="color:${color};font-weight:600;">${diag.message}</span></div>`;
    }

    if (skillActionState) {
      skillActionState.textContent = Bot.runtime.skillingActionStatus || (Bot.skillingLoopActive ? 'Searching...' : 'Idle');
    }

    if (skillMasterBtn) {
      const def = SKILL_DATA[Bot.config.skillingSkill];
      skillMasterBtn.textContent = Bot.skillingLoopActive
        ? `Stop ${def?.name || 'Skilling'}`
        : `Start ${def?.name || 'Skilling'}`;
      skillMasterBtn.className = `pix-btn ${Bot.skillingLoopActive ? 'pix-btn-red' : 'pix-btn-green'}`;
    }

    // 5. Cavebot Live View Rendering
    const cavebotCurpos = document.getElementById('pix-cavebot-curpos');
    const cavebotStatus = document.getElementById('pix-cavebot-status');
    const cavebotBadge = document.getElementById('pix-cavebot-badge');
    const cavebotMasterBtn = document.getElementById('pix-cavebot-master-btn');

    if (cavebotCurpos && me) {
      cavebotCurpos.textContent = `(${Math.round(me.x)}, ${Math.round(me.y)})`;
    }
    if (cavebotStatus) {
      cavebotStatus.textContent = Bot.runtime.cavebotStatus || (Bot.cavebotActive ? 'Pathing...' : 'Idle');
    }
    if (cavebotBadge) {
      cavebotBadge.textContent = Bot.cavebotActive ? 'RUNNING' : 'IDLE';
      cavebotBadge.className = `pix-badge ${Bot.cavebotActive ? 'active' : ''}`;
    }
    if (cavebotMasterBtn) {
      cavebotMasterBtn.textContent = Bot.cavebotActive ? '⏹ Stop Cavebot' : '▶ Start Cavebot';
      cavebotMasterBtn.className = `pix-btn ${Bot.cavebotActive ? 'pix-btn-red' : 'pix-btn-green'}`;
    }

    // 6. Keep Master Bar Button & Badge Synced
    const masterBtn = document.getElementById('pix-bot-master-btn');
    const badge = document.getElementById('pix-bot-badge');
    if (masterBtn) {
      const wantedText = Bot.running ? '⏹ Stop Automation' : '▶ Start Automation';
      if (masterBtn.textContent !== wantedText) {
        masterBtn.textContent = wantedText;
        masterBtn.className = `pix-btn ${Bot.running ? 'pix-btn-red' : 'pix-btn-green'} pix-btn-block`;
      }
    }
    if (badge) {
      const wantedBadge = Bot.running ? 'RUNNING' : 'IDLE';
      if (badge.textContent !== wantedBadge) {
        badge.textContent = wantedBadge;
        badge.className = `pix-badge ${Bot.running ? 'active' : ''}`;
      }
    }

    // 7. Keep Checkbox States Synced
    const toggleFight = document.getElementById('pix-toggle-fight');
    if (toggleFight && document.activeElement !== toggleFight) toggleFight.checked = Bot.combatLoopActive;
    const toggleEat = document.getElementById('pix-toggle-eat');
    if (toggleEat && document.activeElement !== toggleEat) toggleEat.checked = Bot.autoEatActive;
    const toggleSpell = document.getElementById('pix-toggle-spell');
    if (toggleSpell && document.activeElement !== toggleSpell) toggleSpell.checked = Bot.config.castSpells;
    const toggleLoot = document.getElementById('pix-toggle-loot');
    if (toggleLoot && document.activeElement !== toggleLoot) toggleLoot.checked = Bot.autoLootActive;
    const toggleSkill = document.getElementById('pix-toggle-skilling');
    if (toggleSkill && document.activeElement !== toggleSkill) toggleSkill.checked = Bot.skillingLoopActive;
    const toggleDashCavebot = document.getElementById('pix-dash-toggle-cavebot');
    if (toggleDashCavebot && document.activeElement !== toggleDashCavebot) toggleDashCavebot.checked = Bot.cavebotActive;
    const toggleCavebot = document.getElementById('pix-toggle-cavebot');
    if (toggleCavebot && document.activeElement !== toggleCavebot) toggleCavebot.checked = Bot.cavebotActive;
    const toggleHaste = document.getElementById('pix-toggle-haste');
    if (toggleHaste && document.activeElement !== toggleHaste) toggleHaste.checked = Bot.config.autoHaste;

    // Sync Resource Memory & Skill Memory Feed Switches
    const toggleRecord = document.getElementById('pix-toggle-record-resources');
    if (toggleRecord && document.activeElement !== toggleRecord) toggleRecord.checked = Bot.config.recordResources;
    const toggleUseMem = document.getElementById('pix-skill-use-memory');
    if (toggleUseMem && document.activeElement !== toggleUseMem) toggleUseMem.checked = Bot.config.useResourceMemory;

    // Sync Supply Box Radar Switches
    const toggleDashRadar = document.getElementById('pix-toggle-box-radar');
    if (toggleDashRadar && document.activeElement !== toggleDashRadar) toggleDashRadar.checked = Bot.config.boxRadar;
    const toggleEntRadar = document.getElementById('pix-radar-toggle-entities');
    if (toggleEntRadar && document.activeElement !== toggleEntRadar) toggleEntRadar.checked = Bot.config.boxRadar;
    const toggleWildOnly = document.getElementById('pix-radar-wild-only');
    if (toggleWildOnly && document.activeElement !== toggleWildOnly) toggleWildOnly.checked = Bot.config.boxRadarWildOnly;
    const toggleTargetChests = document.getElementById('pix-radar-target-chests');
    if (toggleTargetChests && document.activeElement !== toggleTargetChests) toggleTargetChests.checked = Bot.config.boxRadarTargetChests;
    const toggleHideInteracted = document.getElementById('pix-radar-hide-interacted');
    if (toggleHideInteracted && document.activeElement !== toggleHideInteracted) toggleHideInteracted.checked = Bot.config.boxRadarHideInteracted;

    // Sync Anti-Inactivity Switches
    const toggleDashAntiInact = document.getElementById('pix-toggle-anti-inactivity');
    if (toggleDashAntiInact && document.activeElement !== toggleDashAntiInact) toggleDashAntiInact.checked = Bot.config.antiInactivity;
    const toggleUtilsAntiInact = document.getElementById('pix-utils-toggle-anti-inactivity');
    if (toggleUtilsAntiInact && document.activeElement !== toggleUtilsAntiInact) toggleUtilsAntiInact.checked = Bot.config.antiInactivity;
    const toggleAutoStay = document.getElementById('pix-toggle-auto-stay');
    if (toggleAutoStay && document.activeElement !== toggleAutoStay) toggleAutoStay.checked = Bot.config.antiInactivityAutoStay;
    const toggleCameraNudge = document.getElementById('pix-toggle-camera-nudge');
    if (toggleCameraNudge && document.activeElement !== toggleCameraNudge) toggleCameraNudge.checked = Bot.config.antiInactivityCamera;
    const toggleIdleFidget = document.getElementById('pix-toggle-idle-fidget');
    if (toggleIdleFidget && document.activeElement !== toggleIdleFidget) toggleIdleFidget.checked = Bot.config.antiInactivityFidget;
    } catch (err) {
      console.error('[Pixlaria Bot] Error in updateOverlayLiveView:', err);
    }
  }

  // Load saved preferences and static resource memory from localStorage
  try {
    const savedWps = localStorage.getItem('pix_cavebot_waypoints');
    if (savedWps) {
      const parsed = JSON.parse(savedWps);
      if (Array.isArray(parsed)) Bot.config.waypoints = parsed;
    }
    const savedHaste = localStorage.getItem('pix_auto_haste');
    if (savedHaste !== null) {
      Bot.config.autoHaste = savedHaste === 'true';
    }
    const savedRecordRes = localStorage.getItem('pix_record_resources');
    if (savedRecordRes !== null) {
      Bot.config.recordResources = savedRecordRes === 'true';
    }
    const savedUseMem = localStorage.getItem('pix_skill_use_memory');
    if (savedUseMem !== null) {
      Bot.config.useResourceMemory = savedUseMem === 'true';
    }
    const savedBoxRadar = localStorage.getItem('pix_box_radar');
    if (savedBoxRadar !== null) {
      Bot.config.boxRadar = savedBoxRadar === 'true';
    }
    const savedRadarWild = localStorage.getItem('pix_radar_wild_only');
    if (savedRadarWild !== null) {
      Bot.config.boxRadarWildOnly = savedRadarWild === 'true';
    }
    const savedTargetChests = localStorage.getItem('pix_radar_target_chests');
    if (savedTargetChests !== null) {
      Bot.config.boxRadarTargetChests = savedTargetChests === 'true';
    }
    const savedHideInteracted = localStorage.getItem('pix_radar_hide_interacted');
    if (savedHideInteracted !== null) {
      Bot.config.boxRadarHideInteracted = savedHideInteracted === 'true';
    }
    const savedAntiInact = localStorage.getItem('pix_anti_inactivity');
    if (savedAntiInact !== null) {
      Bot.config.antiInactivity = savedAntiInact === 'true';
    }
    const savedFmBatch = localStorage.getItem('pix_firemaking_batch');
    if (savedFmBatch !== null) {
      Bot.config.firemakingBatch = savedFmBatch === 'true';
    }
    Bot.loadResourceMemory();
    Bot.loadInteractedBoxes();
  } catch (e) {}

  // Inject overlay once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      buildOverlayDOM();
      Bot.renderWaypointList();
    });
  } else {
    buildOverlayDOM();
    Bot.renderWaypointList();
  }
})();
