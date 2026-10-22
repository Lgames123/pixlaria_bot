document.addEventListener('DOMContentLoaded', async () => {
  const masterBtn = document.getElementById('master-btn');
  const toggleHudBtn = document.getElementById('toggle-hud-btn');
  const statusBadge = document.getElementById('bot-status');
  const humanToggle = document.getElementById('human-toggle');
  const humanProfile = document.getElementById('human-profile');
  const autoFight = document.getElementById('auto-fight');
  const autoSpell = document.getElementById('auto-spell');
  const autoSkill = document.getElementById('auto-skill');
  const autoLoot = document.getElementById('auto-loot');
  const autoEat = document.getElementById('auto-eat');
  const autoCavebot = document.getElementById('auto-cavebot');
  const autoHaste = document.getElementById('auto-haste');
  const boxRadar = document.getElementById('box-radar');
  const antiInactivity = document.getElementById('anti-inactivity');

  let isRunning = false;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  if (tab.url) {
    let isPixlaria = false;
    try {
      const u = new URL(tab.url);
      isPixlaria = u.hostname === 'pixlaria.com' || u.hostname.endsWith('.pixlaria.com');
    } catch {}
    if (!isPixlaria) {
      statusBadge.textContent = 'NOT PIXLARIA';
      statusBadge.className = 'badge';
      masterBtn.disabled = true;
      masterBtn.textContent = 'Pixlaria Only';
      masterBtn.style.opacity = '0.5';
      masterBtn.style.cursor = 'not-allowed';
      return;
    }
  }

  // Query bot state from active tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    world: 'MAIN',
    func: () => ({
      running: Boolean(window.PixlariaBot?.running),
      humanMode: window.PixlariaBot?.humanMode !== false,
      profile: window.PixlariaBot?.config?.profile || 'natural',
      autoFight: Boolean(window.PixlariaBot?.combatLoopActive),
      autoSpell: Boolean(window.PixlariaBot?.config?.castSpells),
      autoSkill: Boolean(window.PixlariaBot?.skillingLoopActive),
      autoLoot: Boolean(window.PixlariaBot?.autoLootActive),
      autoEat: Boolean(window.PixlariaBot?.autoEatActive),
      autoCavebot: Boolean(window.PixlariaBot?.cavebotActive),
      autoHaste: Boolean(window.PixlariaBot?.config?.autoHaste),
      boxRadar: window.PixlariaBot?.config?.boxRadar !== false,
      antiInactivity: window.PixlariaBot?.config?.antiInactivity !== false
    })
  }, results => {
    if (results && results[0]?.result) {
      const state = results[0].result;
      isRunning = state.running;
      humanToggle.checked = state.humanMode;
      humanProfile.value = state.profile;
      autoFight.checked = state.autoFight;
      if (autoSpell) autoSpell.checked = state.autoSpell;
      if (autoSkill) autoSkill.checked = state.autoSkill;
      autoLoot.checked = state.autoLoot;
      autoEat.checked = state.autoEat;
      if (autoCavebot) autoCavebot.checked = state.autoCavebot;
      if (autoHaste) autoHaste.checked = state.autoHaste;
      if (boxRadar) boxRadar.checked = state.boxRadar;
      if (antiInactivity) antiInactivity.checked = state.antiInactivity;
      updateUI();
    }
  }).catch(() => {});

  function updateUI() {
    if (isRunning) {
      statusBadge.textContent = 'RUNNING';
      statusBadge.className = 'badge running';
      masterBtn.textContent = 'Stop Bot';
      masterBtn.className = 'btn btn-stop';
    } else {
      statusBadge.textContent = 'IDLE';
      statusBadge.className = 'badge';
      masterBtn.textContent = 'Start Bot';
      masterBtn.className = 'btn btn-start';
    }
  }

  masterBtn.onclick = () => {
    isRunning = !isRunning;
    updateUI();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: (start, fight, spell, skill, loot, eat, cavebot, haste, radar, antiAfk, human, profile) => {
        if (!window.PixlariaBot) return;
        window.PixlariaBot.combatLoopActive = fight;
        if (window.PixlariaBot.config) {
          window.PixlariaBot.config.castSpells = spell;
          window.PixlariaBot.config.autoHaste = haste;
          window.PixlariaBot.config.boxRadar = radar;
          window.PixlariaBot.config.antiInactivity = antiAfk;
          try {
            localStorage.setItem('pix_auto_haste', haste);
            localStorage.setItem('pix_box_radar', radar);
            localStorage.setItem('pix_anti_inactivity', antiAfk);
          } catch (e) {}
        }
        window.PixlariaBot.skillingLoopActive = skill;
        window.PixlariaBot.autoLootActive = loot;
        window.PixlariaBot.autoEatActive = eat;
        window.PixlariaBot.cavebotActive = cavebot;
        window.PixlariaBot.humanMode = human;
        if (window.PixlariaBot.config) window.PixlariaBot.config.profile = profile;
        if (start) window.PixlariaBot.start();
        else window.PixlariaBot.stop();
      },
      args: [isRunning, autoFight.checked, autoSpell?.checked || false, autoSkill?.checked || false, autoLoot.checked, autoEat.checked, autoCavebot?.checked || false, autoHaste?.checked || false, boxRadar?.checked !== false, antiInactivity?.checked !== false, humanToggle.checked, humanProfile.value]
    }).catch(() => {});
  };

  toggleHudBtn.onclick = () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: () => {
        const el = document.getElementById('pix-bot-overlay');
        if (el) el.style.display = el.style.display === 'none' ? 'flex' : 'none';
      }
    }).catch(() => {});
  };

  const syncSettings = () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: (fight, spell, skill, loot, eat, cavebot, haste, radar, antiAfk, human, profile) => {
        if (!window.PixlariaBot) return;
        window.PixlariaBot.combatLoopActive = fight;
        if (window.PixlariaBot.config) {
          window.PixlariaBot.config.castSpells = spell;
          window.PixlariaBot.config.autoHaste = haste;
          window.PixlariaBot.config.boxRadar = radar;
          window.PixlariaBot.config.antiInactivity = antiAfk;
          try {
            localStorage.setItem('pix_auto_haste', haste);
            localStorage.setItem('pix_box_radar', radar);
            localStorage.setItem('pix_anti_inactivity', antiAfk);
          } catch (e) {}
        }
        window.PixlariaBot.skillingLoopActive = skill;
        window.PixlariaBot.autoLootActive = loot;
        window.PixlariaBot.autoEatActive = eat;
        window.PixlariaBot.cavebotActive = cavebot;
        window.PixlariaBot.humanMode = human;
        if (window.PixlariaBot.config) window.PixlariaBot.config.profile = profile;
        if (window.PixlariaBot.updateUIState) window.PixlariaBot.updateUIState();
      },
      args: [autoFight.checked, autoSpell?.checked || false, autoSkill?.checked || false, autoLoot.checked, autoEat.checked, autoCavebot?.checked || false, autoHaste?.checked || false, boxRadar?.checked !== false, antiInactivity?.checked !== false, humanToggle.checked, humanProfile.value]
    }).catch(() => {});
  };

  humanToggle.onchange = syncSettings;
  humanProfile.onchange = syncSettings;
  autoFight.onchange = syncSettings;
  if (autoSpell) autoSpell.onchange = syncSettings;
  if (autoSkill) autoSkill.onchange = syncSettings;
  if (autoLoot) autoLoot.onchange = syncSettings;
  if (autoEat) autoEat.onchange = syncSettings;
  if (autoCavebot) autoCavebot.onchange = syncSettings;
  if (autoHaste) autoHaste.onchange = syncSettings;
  if (boxRadar) boxRadar.onchange = syncSettings;
  if (antiInactivity) antiInactivity.onchange = syncSettings;
});
