# Pixlaria Bot & Automation Suite (Chromium Extension)

A high-performance automation suite and tactical assistant for **Pixlaria** built on Manifest V3. Interacts directly with the client-side game engine (`window.app`), network WebSocket handlers, spatial entity maps, and UI managers.

---

## 🚀 Installation & Setup

### Option 1: Load as Chromium Extension (Chrome / Edge / Brave / Opera)
1. Open your browser and navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** (top-left).
4. Select the folder:
   `c:\Users\Lencina\Desktop\Pixlaria\pixlaria-bot-extension`
5. Navigate to your Pixlaria game tab (e.g. `https://www.pixlaria.com/play.html`).
6. The bot dashboard will automatically appear on screen.

### Option 2: Standalone DevTools Execution (No Installation Required)
If you prefer running without installing an extension:
1. Open the Pixlaria game in your browser.
2. Press `F12` to open DevTools, then switch to the **Console** tab.
3. Copy the entire contents of [`inject.js`](file:///c:/Users/Lencina/Desktop/Pixlaria/pixlaria-bot-extension/inject.js) and paste it into the console, then hit `Enter`.
4. The floating overlay and `PixlariaBot` global controller will initialize immediately.

---

## 🎮 Interface & Hotkeys

- **In-Game Floating HUD**: Glassmorphism tactical overlay anchored to the top-right of the screen.
- **Toggle Visibility**: Press **`~`** (Tilde / Backquote key) on your keyboard anytime, or click the **⚔️ Pixlaria Bot** gold pill in the bottom-right corner.
- **Draggable**: Click and drag the header bar to reposition the panel anywhere on your screen.
- **Collapsible**: Click `−` in the header to minimize the panel into a compact pill while keeping automation active.
- **Toolbar Popup**: Click the extension icon in your browser toolbar to quickly start/stop the bot or toggle features.

---

## 🛠️ Feature Walkthrough

### 1. Persistent Master Bar & Dashboard
- **Persistent Master Automation Bar**:
  - Always visible at the top of the interface across **every single tab** (Dashboard, Entities, Loot, Combat, Skills, Utils).
  - Single-click master start/stop (`▶ Start Automation` / `⏹ Stop Automation`) that pauses and resumes all currently checked actions simultaneously without clearing your configured settings.
  - Live state badge (`IDLE` vs `RUNNING`) continuously synchronized.
- **Individually Pickable Automated Actions (Toggles)**:
  - ⚔️ **Auto Attack Creature** (`toggle on/off`): Continuously acquires nearest filtered target, paths into range, and sustains combat.
  - 🍖 **Auto Eat** (`toggle on/off`): Overhauled survival engine; monitors health %, respects server bite cooldowns, and digests best food/potion without missing combat swings.
  - 🔮 **Auto Cast Skill in Combat** (`toggle on/off`): Fires chosen offensive or healing skill rotation (e.g., `kira`, `volta`, `ronda`, `vara`) while locked on target (works in both manual and bot combat).
  - 📦 **Auto Loot** (`toggle on/off`): Sweeps nearby dropped item piles, respecting radius and item blacklists.
  - 🪓 **Auto Soft Skill** (`toggle on/off`): Runs woodcutting, mining, fishing, cooking, or smithing loops according to the Soft Skills tab settings.
- **Real-time Vitals**: Live display of Character Name, World Coordinates `(x, y)`, Health (`HP / MaxHP`), Mana (`MP / MaxMP`), and Current Locked Target.
- **📊 Session Telemetry**:
  - **↺ Reset Button**: Instantly zeros out session counters and baselines your gold, player XP, and skill XP to current levels.
  - **Elapsed Time**: Live running session stopwatch (`HH:MM:SS`) updated continuously.
  - **Loot Gathered**: Real-time counter of items looted from the ground and gathered via soft skills (ores, logs, fish, herbs).
  - **Gold Gained**: Live net delta of gold coins (`+X GC`) acquired during the session.
  - **Character XP**: Net character experience (`+X XP`) gained from monster kills and quest rewards.
  - **Skill XP Gained**: Total net experience gained across all soft skills, plus an interactive pill breakdown (`🪓 Woodcutting: +X`, `⛏️ Mining: +Y`, `🎣 Fishing: +Z`, etc.).

### 2. Entities Tab (Radar, Navigation & Static Resource Memory)
- **Investigation on Entity Disappearance & Distance Limits**:
  - *Finding*: Entity disappearance is a **hard server-authoritative spatial streaming limitation (Area of Interest / AOI)**, not a client-side memory cleanup.
  - In `js/main.js` and `js/entities.js`, living entities (monsters, NPCs, players) are sent in packet `s` (`{ t: 's', e: [...], r: [...] }`). The server only broadcasts objects within ~15-20 tiles of the player. When an entity leaves this zone, the server explicitly commands `for (const id of s.r) app.entities.remove(id)`.
  - Similarly, scenery and static objects are streamed in 32x32 `chunk` packets; when moving away, the server sends `unchunk`, dropping the tiles and calling `app.world.removeObjects(ids)`.
  - The client cannot force the server to broadcast entities from farther away without server cooperation.
  - *The Architectural Solution*: **Static Resource & Entity Memory Engine**. Once a stationary node or NPC enters your screen, the bot records its exact coordinates and metadata into persistent memory. Even when the server unloads it, your map keeps permanent track of it!
- **🗺️ Static Resource Acquisition & Memory Engine**:
  - **Zero Duplicate Guarantee**: Uses canonical coordinate keys `${type}@${Math.round(x)},${Math.round(y)}` and `npc_${slug}@${Math.round(x)},${Math.round(y)}`. Discovered nodes update `lastSeen` in-place without generating duplicates or re-saving identical positions.
  - **Stationary Scope Only**: Tracks trees, rocks, fishing pools, foraging plants, furnaces, anvils, cooking ranges, and static NPCs. Never clutters memory with wandering monsters or other players.
  - **Debounced Persistence**: Buffers writes and debounces storage updates (2-second flush) to `localStorage` (`pix_resource_memory`) to eliminate frame drops.
  - **Export / Import JSON**: Single-click `Export JSON` and `Import JSON` to back up or share complete world maps across accounts and browsers.
  - **Remembered Nodes Inspector**: Switch the Entities filter to `🗺️ Remembered Static Nodes` to view all saved resources sorted by distance with single-click `[Walk]` navigation buttons!

### 3. Loot Tab (Ground Item Harvester)
- **Nearby Ground Piles Radar**: Displays every item pile dropped on the ground, tile distance, item names, and stack sizes.
- **Auto-Loot Toggle**: Autonomously steps to dropped loot and claims all eligible items using `{ t: 'take', all: true }`.
- **Max Radius Slider**: Configurable radius limit (1 to 15 tiles) so the bot doesn't wander off.
- **Blacklist Filter**: Comma-separated list of unwanted item IDs to ignore (e.g. `bones, burnt_shrimp, burnt_meat`).
- **One-Click "Take All Visible"**: Manually triggers immediate loot sweeps across all ground tiles in render range.

### 4. Combat Tab (Autonomous Hunting Loop)
- **Target Monster Filter**:
  - Presets for common monsters (`Wolf`, `Hoglet`, `Goblin`, `Skeleton`, `Giant Spider`, `Alligator`, `Monkey`, `Dragon`, or `Target Any Nearby Monster`).
  - Dynamically populates with all monster types currently detected nearby.
  - Custom text input for exact target names.
- **Combat Loop Execution**:
  1. Identifies the closest eligible monster matching your filter.
  2. Paths towards the target until in combat range.
  3. Dispatches the `{ t: 'attack', id }` packet.
  4. Sustains combat while monitoring health.
  5. Upon monster defeat, immediately harvests dropped loot piles.
  6. Repeats for the next nearest monster.
- **Spell & Ability Rotation**:
  - Toggle to cast offensive abilities during combat.
  - Selectable spells:
    - `kira` (Strike) — Basic Melee strike.
    - `volta` (Bolt) — Magic projectile (4 range).
    - `ronda` (Berserk) — Melee AoE sweep.
    - `fireball` (Fireball) — High damage AoE fire blast.
    - `frost` (Frost Bind) — Slows enemy movement by 50%.
    - `pin` (Pinning Shot) — Pins enemy in place.
    - `charge` (Charge) — Closes gap with 20% bonus damage.
    - `vara` (Healing) — Self health restoration.
  - **Min Mana Threshold**: Prevents draining mana below your set safety percentage.

### 5. Soft Skills Tab (Autonomous Gathering & Production)
- **Separated Activity Modules**:
  - 🪓 **Woodcutting**: Automatically seeks and chops trees within radius.
  - ⛏️ **Mining**: Automatically identifies and mines ore veins and coal seams.
  - 🎣 **Fishing**: Casts nets, lures, harpoons, and sea rods at available water spots.
  - 🍳 **Cooking**: Paths to cooking ranges or fires and cooks batches of raw food.
  - 🔨 **Smithing & Smelting**: Refines ores at furnaces into bars, or forges bars at anvils.
  - 🔥 **Firemaking**: Automatically burns carried logs using a Tinderbox. Supports **Light 5x in a Line** (fast batch XP) or **Light 1x (Single)**, verifies Tinderbox on belt/bag, validates open ground, strictly avoids roads (`T.STONE`), wooden floors, caves, and obstacles, and autonomously steps to adjacent clear outdoor ground spots between fires.
- **Resource Selection & "Highest Available" Mode**:
  - **⭐ Highest Available (Default)**: Automatically inspects your current skill level and tools, selecting the highest-tier unlocked resource accessible to you (e.g. highest level log in inventory you can light).
  - **Individual Resource Picker**: Dropdown list allowing manual selection of any unlocked target (e.g., `Oak Tree (Lv 15)`, `Willow Tree (Lv 30)`, `Coal Rock (Lv 30)`, `Trout (Lv 20)`, `Oak logs (Lv 15)`, `Yew logs (Lv 60)`).
- **Multi-Location Tool & Level Diagnostic Engine**:
  - Scans across all four storage locations:
    1. **Tool Belt** (`app.belt`)
    2. **Equipped Slots** (`app.eq`)
    3. **Inventory Bag** (`app.inv`)
    4. **Stash / Bank** (`app.ui.bankItems`)
  - **Level Requirement Verification**:
    - **Axes & Pickaxes**: Bronze (Lv 1), Iron (Lv 5), Steel (Lv 15), Silver (Lv 30), Gold (Lv 40).
    - **Fishing**: Net (Lv 1), Rod (Lv 20), Harpoon (Lv 35), Sea Rod (Lv 40).
    - **Smithing**: Hammer (Lv 1, required for Anvil forging).
  - **Live Diagnostic Reporting**:
    - `🟢 Active: [Tool Name] ([Location], req Lv [X])` — Ready to gather.
    - `⚠️ Found in Bank/Stash! Withdraw to use.` — Alerts you that your tool is stored in bank.
    - `🔒 Level Too Low: [Tool Name] req Lv [X] (You are Lv [Y])` — Tool level not met.
    - `❌ No Tool Found` — Missing necessary equipment.
- **Single-Click Gathering & Depletion Engine**:
  - **Zero Click-Spamming**: Dispatches exactly **one interaction click** upon reaching the node. Once the character begins swinging or fishing (`isGatheringActive()` via model action state `me.action`, `me.workAt`, or `me.stroke`), all redundant clicking ceases completely.
  - **Fishing Shoreline Intelligence**: Fishing spots are located on water tiles where players cannot walk. The bot keeps the character **1 tile around the spot on the shoreline** (`isTileWalkable()`), pathing to the nearest land tile and casting from the bank without ever trying to step into the water.
  - **Server Depletion Reply Listener**: Hooks incoming network packets (`m.t === 'msg'`, `m.t === 'anim'`, `m.t === 'obj'`) and UI notices to capture exact server replies:
    - *Mining:* Catches `"No ore left here. Try another rock while this one recovers."`
    - *Woodcutting:* Catches tree stump / felled notices and `"Tree is spent"`.
    - *Fishing:* Catches `"The fish have scattered..."` and `"gone quiet"`.
    - *Server Signals:* Captures `anim` with `workdone` and world object `depleted: true`.
  - **45s Node Cooldown Protection**: Automatically blacklists depleted node IDs so the bot never attempts to click the recovering rock/stump again while empty.
  - **Human-Like Node Transit**: Introduces realistic perception latency (~400ms - 650ms) to acknowledge the depleted resource before steering toward the next valid node.
  - **Applies Uniformly Across All Skills**: Mining, Woodcutting, Fishing, Cooking (awaits batch finish), and Smithing/Smelting (awaits forging finish).
  - **🐒 Monkey Tree Protection & Shoo-away Engine (Woodcutting)**:
    - **Axe Theft Prevention**: In Pixlaria, trees can have a mischievous monkey perched in the upper branches (`obj.mk`). Attempting to chop a tree with a monkey triggers the server thief animation, causing the monkey to jump down, steal the player's equipped axe, and dance off.
    - **Pre-Chop Monkey Inspection**: When approaching a target tree or re-engaging strokes, the bot checks `obj.mk` before sending any `Chop` command.
    - **Automated Shoo Action**: If a monkey is detected, the bot sends `{ t: 'object', id: tree.id, action: 'Shoo' }` and pauses to wait for the flight animation and server packet (`obj.mk === 0`).
    - **Safe Skip on Failure / Rejection**: If shooing fails, is rejected, or is not possible, the bot **immediately skips the tree** and flags it in `skippedMonkeyTrees` with a 45-second cooldown. It immediately paths to another clean tree, guaranteeing your axe is never stolen.
    - **Clean Tree Targeting Preference**: In target acquisition, trees with monkeys carry an effective distance penalty (+2.5 tiles) so clean trees are always favored first.
  - **🗺️ Feed from Memory Map Integration**:
    - Toggle switch in the Soft Skills tab: `Feed from Memory Map`.
    - When your selected resource node (or crafting station/furnace/range) is not currently rendered in the immediate view area (~15-20 tiles), the bot **queries your persistent Static Resource Memory** to locate the nearest known node across the entire world map.
    - Autonomously paths toward the remembered coordinates. As the character enters the region, the server streams the live node into view, and gathering begins seamlessly.
  - **Auto-Drop Option**: Drops gathered logs or ores if the bag becomes completely full.

### 6. Cavebot & Waypoint Navigation Tab
- **Dedicated Cavebot Tab & Dashboard Toggle**: Walk through dungeon corridors, hunting grounds, or resource zones automatically.
- **1-Click Coordinate Capture**: Click `📍 Capture Current Pos as Waypoint` to record the character's exact coordinates into the waypoint sequence.
- **Manual Coordinate Input**: Enter custom `X` and `Y` and add to route.
- **Sequential Pathing & Looping**: Paths sequentially through saved waypoints (`#1 -> #2 -> ... -> #N`) and automatically loops back to the start.
- **Combat Priority Interruption**:
  - If a reachable enemy is detected near the player while pathing, the bot **halts waypoint movement immediately and enters combat**.
  - Automatically casts chosen combat abilities, drinks potions/eats if damaged, and picks up dropped loot.
  - Waypoint pathing only resumes once **all nearby reachable enemies have been slain**.
- **File Save & Load**:
  - `💾 Save to File`: Exports the waypoint sequence to a downloadable JSON file (`waypoints_<timestamp>.json`).
  - `📂 Load from File`: Imports waypoint sequences from JSON or TXT coordinate files.
- **Auto-Persistence**: Waypoints and cavebot state auto-save to `localStorage` so reloading the browser preserves your paths.

### 7. Auto-Haste (Venti) Buff
- **40-Second Auto-Recast**: Automatically recasts the `venti` speed spell every 40 seconds whenever mana is >= 30, keeping your character permanently boosted.
- **Accessible on Dashboard & Popup**: Quick toggle switch available on the Dashboard and Extension popup.

### 8. Wilderness Supply Box Radar & Tactical Snaplines
- **Wilderness Box Detection & Discrimination**:
  - Automatically scans active world objects for wilderness supply crates, caches, and event containers (`crate`, `cache`, `supply_box`, etc.) spawned for the global hunt event (*"HUNT REMAINING: X/30 PIX · Y/35 HELMETS"*).
  - **Plot Furniture Filter**: Inspects `obj.b` (claim builder flag) to distinguish wilderness supply boxes from decorative crates built on player plots.
- **3D World-to-Screen Projection & HUD Overlay**:
  - Leverages Three.js projection (`THREE.Vector3.project(app.camera)`) to compute live screen coordinates for every box in real time (60 FPS smooth overlay canvas).
  - **Glowing Snaplines**: Renders dynamic cyan/gold laser lines originating from your player character directly to each discovered supply box.
  - **Tactical Corner Brackets**: Draws high-visibility bracket indicators around the 3D bounding position of each crate with exact distance metrics (`e.g., 📦 Wilderness Box [14.2t]`).
  - **Off-Screen Edge Indicators**: For supply boxes outside your camera frustum, draws glowing directional pointer arrows along the display edge pointing towards the box's bearing.
- **Hotkeys & Controls**:
  - **Hotkey `B`**: Instant toggle to turn the 3D radar and snaplines on/off at any time.
  - **Entities Tab & Dashboard**: Toggle switches for Radar and "Wilderness Only" filter, plus a live list with single-click `[Walk]` and `[Open]` action buttons.
  - **Toolbar Popup**: Quick radar toggle available directly from the browser extension popup.

### 9. Soft Skills Anti-Stall Watchdog (Mining & Gathering Fix)
- **Root-Cause Analysis of Mining Freezes**:
  - In Pixlaria, starting a gathering action sets `me.workAt = { k: msg.k, ... }` on your character. However, the game engine **never clears this property** upon resource depletion or idle transitions.
  - Bots that relied solely on `me.workAt` entered a permanent "waiting for task to complete" loop. The character stood frozen in front of an active rock, neither striking nor pathing, eventually triggering the server's 10-minute inactivity timeout.
- **Watchdog & Stroke Interval Solution**:
  - **Real-Time Stroke Recency**: Instead of assuming gathering is active indefinitely, the engine now checks `Date.now() - lastGatherStrokeAt < 3200ms` against server swing animation pulses (swings occur every 1.8s).
  - **Smart Re-Engagement**: If standing adjacent to a target node without received strokes for >2.5s, the bot automatically re-sends the interaction click.
  - **Anti-Stall Fail-Safe**: If 3 re-attempts (>9s total) produce zero swing strokes, the node is diagnosed as desynced or unresponsive. The bot automatically blacklists the node for 25 seconds and smoothly rotates to the next available resource in range or memory.

### 10. Human-Like Anti-Inactivity & Anti-AFK Engine
Designed specifically to prevent server inactivity disconnects and timeout warnings while emulating realistic human player behavior:
- **Routine 1: Gaussian Keepalive Pulses**:
  - Automatically sends `{ t: 'activity' }` on irregular human intervals (45s – 75s Gaussian distribution), keeping the server session alive without rigid periodic footprints.
- **Routine 2: Natural Camera Glances (Yaw Micro-Nudges)**:
  - Real human players adjust their viewing angles while playing or waiting. The engine applies smooth cosine-eased camera glances, adjusting `app.yaw` by ±3° to ±8° over 300ms–400ms every 90s–140s.
- **Routine 3: Idle Micro-Fidgets**:
  - When completely idle outside of combat and gathering loops, the bot periodically performs harmless human fidgets (such as social emotes: `wave`, `nod`, `shrug`, `cheer` or brief focus shifts).
- **Routine 4: Server Idle Warning Interceptor**:
  - Intercepts the server's 60-second inactivity warning (`m.t === 'idle'` and the `#idle-warning` modal).
  - Simulates a natural human perception delay (~1.4s – 2.1s Gaussian) before dispatching `{ t: 'stay' }` and `{ t: 'activity' }`, and safely clicks the in-game `#idle-stay` button.

### 11. Utilities Tab (QoL, Advantages & Humanizer)
- **🧠 Humanizer Engine (Moved to Utils Tab)**:
  - **Box-Muller Gaussian Distributions**: Replaces rigid machine timers with natural human reaction curves.
  - **Dynamic Reaction Latency**: Live readout on the utils panel showing the latest computed human reaction time in ms.
  - **Profiles**:
    - **Natural (Balanced)**: ~280ms - 520ms reaction times, realistic target glance latency, natural looting pauses, variable eating threshold.
    - **Gamer (Fast)**: ~160ms - 340ms reaction times, crisp rotations, quick mouse hover-to-click pacing.
    - **Stealth (Safe)**: ~450ms - 850ms reaction times, deliberate pauses, cautious approach.
  - **Perception Latency**: Introduces a realistic 220ms - 450ms delay upon spotting a newly spawned target before pathing or attacking.
  - **Pre-Attack Aim Delay**: Pauses 140ms - 320ms when within range before clicking attack (simulating mouse travel and clicking).
  - **Loot Drop Recognition**: Pauses 320ms - 600ms after a monster dies to allow the visual drop animation to pop before stepping towards loot.
  - **Micro-Hesitations**: Occasional ~7% natural pause (400ms - 750ms) mimicking casual glance, chat read, or inventory check.
- **Emergency Auto-Eat**: Configurable HP % slider (10% - 90%). When health drops below threshold, automatically consumes the highest healing food or potion from your inventory without interrupting your attacks.
- **Auto-Sell Junk to Vendor**: With any NPC shop dialogue open, click `Auto-Sell Junk to Shop` to instantly sell all non-essential carried items using bulk `{ t: 'sell', item, count: 0 }`.
- **Deposit All to Bank**: One-click `{ t: 'depositall' }` to empty carried materials into your bank vault.
- **Direct Coordinate Walk**: Enter target `X` and `Y` and click `Walk` to command the client to path there.

---

## 💻 Developer API (`window.PixlariaBot`)

The bot engine exposes full programmatic control to the browser console:

```javascript
// Telemetry Controls
PixlariaBot.resetTelemetry();
const stats = PixlariaBot.getTelemetryStats();
console.log(stats); // { elapsedFormatted: '00:14:22', lootGathered: 18, goldGained: 450, xpGained: 1200, ... }

// Start / Stop Master Automation
PixlariaBot.start();
PixlariaBot.stop();

// Cavebot Controls
PixlariaBot.startCavebot();
PixlariaBot.stopCavebot();
PixlariaBot.toggleCavebot();
PixlariaBot.addCurrentWaypoint();
PixlariaBot.addWaypoint(120, 345);
PixlariaBot.saveWaypointsToFile();

// Auto-Haste
PixlariaBot.config.autoHaste = true;

// Start / Stop Skilling Specifically
PixlariaBot.startSkilling('firemaking'); // 'woodcutting' | 'mining' | 'fishing' | 'cooking' | 'smithing' | 'firemaking'
PixlariaBot.stopSkilling();
PixlariaBot.toggleSkilling();

// Inspect Tools & Levels Programmatically
const axeStatus = PixlariaBot.checkToolStatus('woodcutting');
console.log(axeStatus); // { ok: true, status: 'READY', tool: { name: 'Steel Axe', location: 'Belt' }, message: '...' }

// Find Highest Available Resource
const bestTree = PixlariaBot.getHighestAvailableResource('woodcutting');
console.log(bestTree); // { id: 'willow', name: 'Willow Tree', level: 30, action: 'Chop' }

// Configure Skilling
PixlariaBot.config.skillingSkill = 'mining';
PixlariaBot.config.skillingTarget = 'any_highest'; // or 'rock_iron'
PixlariaBot.config.skillingRadius = 25; // tiles
PixlariaBot.config.skillingAutoDrop = true;

// Toggle Sub-systems
PixlariaBot.skillingLoopActive = true;
PixlariaBot.combatLoopActive = false;
PixlariaBot.autoLootActive = true;
PixlariaBot.autoEatActive = true;

// Configure Combat Target
PixlariaBot.config.targetMonsterType = 'wolf'; // or 'any'
PixlariaBot.config.selectedSpell = 'volta';
PixlariaBot.config.combatRange = 10;

// Programmatic Actions
PixlariaBot.walkTo(250, 310);
PixlariaBot.attackEntity(12345);
PixlariaBot.talkToEntity(67890);
PixlariaBot.lootAllNearby();
PixlariaBot.sellJunkToOpenShop();
PixlariaBot.bankDepositAll();
```
