(function () {
  const app = document.getElementById("app");
  const sidebar = document.getElementById("sidebar");
  const openTabs = document.getElementById("open-tabs");
  const controlsHint = document.getElementById("controls-hint");
  const dashboardCenter = document.getElementById("dashboard-center");
  const comingScreen = document.getElementById("coming-screen");
  const comingTitle = document.getElementById("coming-title");
  const comingIcon = document.getElementById("coming-icon");
  const gamesScreen = document.getElementById("games-screen");
  const gamesCatalog = document.getElementById("games-catalog");
  const gameGrid = document.getElementById("game-grid");
  const gamesSearch = document.getElementById("games-search");
  const noGames = document.getElementById("no-games");
  const gamePlayer = document.getElementById("game-player");
  const activeGameTitle = document.getElementById("active-game-title");
  const gameFrame = document.getElementById("game-frame");
  const addressInput = document.getElementById("address-input");
  const dashboardSearch = document.getElementById("dashboard-search");
  const settingsDialog = document.getElementById("settings-dialog");
  const startupDialog = document.getElementById("startup-dialog");
  const intro = document.getElementById("intro");
  const introTitle = document.getElementById("intro-title");
  const introLogo = document.querySelector(".intro-logo");
  const projectNotice = document.getElementById("project-notice");
  const projectNoticeMessage = projectNotice.querySelector("span:nth-child(2)");
  const noticeTimerBar = document.getElementById("notice-timer-bar");
  const siteFavicon = document.getElementById("site-favicon");
  const maskPicker = document.getElementById("mask-picker");
  const maskPickerButton = document.getElementById("mask-picker-button");
  const maskOptions = document.getElementById("mask-options");
  const maskSelectedIcon = document.getElementById("mask-selected-icon");
  const maskSelectedName = document.getElementById("mask-selected-name");
  const cursorTrailCanvas = document.getElementById("cursor-trail");
  const cursorTrailContext = cursorTrailCanvas.getContext("2d");
  const cursorTrailToggle = document.getElementById("cursor-trail-toggle");
  const cursorTrailColor = document.getElementById("cursor-trail-color");
  const sidebarTip = document.getElementById("sidebar-tip");
  const homeBackground = document.getElementById("home-background");
  const homeBackgroundColor = document.getElementById("home-background-color");
  const tabsBackground = document.getElementById("tabs-background");
  const tabsBackgroundColor = document.getElementById("tabs-background-color");
  const themeAnimationToggle = document.getElementById("theme-animation-toggle");
  const siteFont = document.getElementById("site-font");
  const pageNames = ["home", "games", "music", "chat"];
  const pageLabels = { home: "Home", games: "Games", music: "Music", chat: "Chat" };
  const iconFiles = {
    Unseen: "Unseen.png",
    Back: "RetrunButton.png",
    Forward: "ForwardButton.png",
    Refresh: "Refresh.png",
    Home: "HomeButton.png",
    Games: "GamesButton.png",
    Music: "MusicButton.png",
    Chat: "ChatButton.png",
    Settings: "SettingsButton.png"
  };
  const games = [
    { title: "Block Blast", file: "Block Blast.html", thumbnail: "BlockBlast.jpg" },
    { title: "Stickman Destruction", file: "Stickman Destruction.html", thumbnail: "StickmanDestruction.jpg" },
    { title: "They Are Coming", file: "They Are Coming.html", thumbnail: "TheyAreComing.png" },
    { title: "BitLife", file: "BitLife.html", thumbnail: "BitLife.jpg" },
    { title: "Basketball Stars", file: "Basketball Stars.html", thumbnail: "BasketBallStars.jpg" },
    { title: "Ball Blast", file: "Ball Blast.html", thumbnail: "BallBlast.jpg" },
    { title: "Buckshot Roulette", file: "Buckshot Roulette.html", thumbnail: "BuckshotRoulette.jpg" }
  ];
  const siteMasks = [
    { id: "unseen", label: "Unseen", title: "Unseen Unblocker", icon: "Sitelogo.png" },
    { id: "clever", label: "Clever", title: "Clever", icon: "Cleverfav.jpg" },
    { id: "ixl", label: "IXL", title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish", icon: "IXLfav.png" },
    { id: "canvas", label: "Canvas", title: "Dashboard", icon: "Canvasfav.png" },
    { id: "wayground", label: "Wayground (RIP Quizizz)", title: "Quizizz is now Wayground | Teacher AI and Resources", icon: "waygroundfav.ico" },
    { id: "kahoot", label: "Kahoot", title: "Kahoot! | Learning games | Make learning awesome!", icon: "Kahootfav.png" },
    { id: "classroom", label: "Google Classrooms", title: "Home - Classroom", icon: "GoogleClassroomfav.webp" }
  ];
  const siteMaskStorageKey = "unseen-site-mask";
  const tips = [
    "Tired of just playing the games? Wait for the full release where all features will be live!",
    "If you are bored of your background, you can change it in settings!",
    "Schoolwork is OVERATED!",
    "WAZAAAAAA",
    "Share this site with your friends :)"
  ];
  const themeNames = ["unseen", "aurora", "nebula", "stars", "sunset", "ocean", "forest", "grid", "solid"];
  const fonts = {
    "dm-sans": '"DM Sans", "Segoe UI", sans-serif',
    manrope: 'Manrope, "Segoe UI", sans-serif',
    system: 'system-ui, "Segoe UI", sans-serif',
    rounded: '"Trebuchet MS", "Segoe UI", sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    mono: '"Cascadia Code", Consolas, monospace'
  };
  const tabsStorageKey = "unseen-open-tabs";
  function loadSavedTabs() {
    const saved = localStorage.getItem(tabsStorageKey);
    if (!saved) return null;
    try {
      const state = JSON.parse(saved);
      if (!state || !Array.isArray(state.tabs)) return null;
      const restored = [];
      state.tabs.forEach(function (tab) {
        if (!tab || !Number.isSafeInteger(tab.id) || tab.id < 1) return;
        if (tab.page !== "home" && tab.page !== "games") return;
        const game = tab.page === "games" && games.some(function (item) { return item.title === tab.game; })
          ? tab.game
          : null;
        if (restored.some(function (item) { return item.id === tab.id; })) return;
        restored.push({ id: tab.id, page: tab.page, game: game });
      });
      if (!restored.length) return null;
      const activeId = restored.some(function (tab) { return tab.id === state.activeTabId; })
        ? state.activeTabId
        : restored[0].id;
      const maxId = restored.reduce(function (maximum, tab) { return Math.max(maximum, tab.id); }, 0);
      return { tabs: restored, activeTabId: activeId, nextTabId: maxId + 1 };
    } catch (error) {
      console.warn("Could not restore saved tabs:", error);
      return null;
    }
  }
  const savedTabState = loadSavedTabs();
  let selectedSiteMask = siteMasks[0].id;
  let currentDocumentTitle = "Unseen Unblocker";
  const tabs = savedTabState ? savedTabState.tabs : [{ id: 1, page: "home", game: null }];
  let activeTabId = savedTabState ? savedTabState.activeTabId : 1;
  let nextTabId = savedTabState ? savedTabState.nextTabId : 2;
  const mobileSidebarQuery = window.matchMedia("(max-width: 700px)");
  let sidebarHidden = mobileSidebarQuery.matches;
  let introTimers = [];
  let aboutBlankBlocked = false;
  let noticeTimeout = 0;
  let noticeDismissTimeout = 0;
  const cursorTrail = [];
  let cursorTrailFrame = 0;
  let lastCursorTrailPoint = 0;

  function loadNamedIcon(image) {
    const file = iconFiles[image.dataset.icon];
    if (!file) return;
    image.src = "assets/icons/" + file;
    image.addEventListener("load", function () {
      image.classList.add("icon-loaded");
    });
    image.addEventListener("error", function () {
      image.classList.add("icon-missing");
    });
  }

  function getSelectedSiteMask() {
    return siteMasks.find(function (mask) {
      return mask.id === selectedSiteMask;
    }) || siteMasks[0];
  }

  function updateMaskedIdentity() {
    const mask = getSelectedSiteMask();
    siteFavicon.href = "assets/img/favicons/" + encodeURIComponent(mask.icon);
    maskSelectedIcon.src = siteFavicon.href;
    maskSelectedIcon.alt = "";
    maskSelectedName.textContent = mask.label;
    document.title = mask.id === "unseen" ? currentDocumentTitle : mask.title;
  }

  function setDocumentTitle(title) {
    currentDocumentTitle = title;
    updateMaskedIdentity();
  }

  function closeMaskOptions(restoreFocus) {
    maskOptions.hidden = true;
    maskPickerButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) maskPickerButton.focus();
  }

  function selectSiteMask(mask) {
    selectedSiteMask = mask.id;
    localStorage.setItem(siteMaskStorageKey, mask.id);
    maskOptions.querySelectorAll('[role="option"]').forEach(function (option) {
      option.setAttribute("aria-selected", String(option.dataset.mask === mask.id));
    });
    updateMaskedIdentity();
    closeMaskOptions(true);
  }

  function renderSiteMaskOptions() {
    siteMasks.forEach(function (mask) {
      const option = document.createElement("button");
      option.className = "mask-option";
      option.type = "button";
      option.id = "mask-option-" + mask.id;
      option.dataset.mask = mask.id;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(mask.id === selectedSiteMask));

      const icon = document.createElement("img");
      icon.src = "assets/img/favicons/" + encodeURIComponent(mask.icon);
      icon.alt = "";
      icon.loading = "lazy";

      const label = document.createElement("span");
      label.textContent = mask.label;
      option.append(icon, label);
      option.addEventListener("click", function () {
        selectSiteMask(mask);
      });
      maskOptions.appendChild(option);
    });
  }

  function showPage(page, addHistory) {
    if (!pageNames.includes(page)) return;
    const activeTab = getActiveTab();
    activeTab.page = page;
    if (page !== "games") activeTab.game = null;
    const isHome = page === "home";
    const isGames = page === "games";
    app.classList.toggle("showing-home", isHome);
    if (!isGames) closeGame();
    dashboardCenter.hidden = !isHome;
    gamesScreen.hidden = !isGames;
    if (isGames && activeTab.game) {
      const savedGame = games.find(function (game) { return game.title === activeTab.game; });
      if (savedGame) openGame(savedGame);
      else closeGame();
    } else if (isGames) {
      closeGame();
    }
    comingScreen.hidden = isHome || isGames;
    app.classList.toggle("showing-coming", !isHome);
    if (!isHome && !isGames) {
      comingTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
      comingIcon.src = "assets/icons/" + iconFiles[page.charAt(0).toUpperCase() + page.slice(1)];
      comingIcon.alt = page.charAt(0).toUpperCase() + page.slice(1) + " logo";
    }
    document.querySelectorAll("[data-page]").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.page === page);
    });
    renderTabs();
    setDocumentTitle(activeTab.game
      ? activeTab.game + " — Unseen Unblocker"
      : (isHome ? "Unseen Unblocker" : page.charAt(0).toUpperCase() + page.slice(1) + " — Unseen Unblocker"));
    if (addHistory) window.history.pushState({ page: page }, "", "#" + page);
  }

  function getActiveTab() {
    return tabs.find(function (tab) { return tab.id === activeTabId; }) || tabs[0];
  }

  function setSidebarHidden(hidden) {
    sidebarHidden = hidden;
    const mobile = mobileSidebarQuery.matches;
    app.classList.toggle("sidebar-hidden", hidden && !mobile);
    sidebar.classList.toggle("is-open", !hidden && mobile);
    sidebar.setAttribute("aria-hidden", String(hidden));
    sidebar.inert = hidden;
    if (hidden && sidebar.contains(document.activeElement)) {
      document.getElementById("dashboard").focus();
    }
  }

  function toggleDashboard() {
    setSidebarHidden(!sidebarHidden);
  }

  function closeMobileSidebar() {
    if (mobileSidebarQuery.matches) setSidebarHidden(true);
  }

  setSidebarHidden(sidebarHidden);
  mobileSidebarQuery.addEventListener("change", function () {
    setSidebarHidden(sidebarHidden);
  });

  function renderTabs() {
    localStorage.setItem(tabsStorageKey, JSON.stringify({ tabs: tabs, activeTabId: activeTabId }));
    openTabs.replaceChildren();
    tabs.forEach(function (tab) {
      const wrapper = document.createElement("div");
      wrapper.className = "open-tab" + (tab.id === activeTabId ? " is-active" : "");

      const select = document.createElement("button");
      select.className = "open-tab-select";
      select.type = "button";
      select.setAttribute("aria-current", tab.id === activeTabId ? "page" : "false");
      select.setAttribute("aria-label", "Switch to " + pageLabels[tab.page] + " tab");

      const icon = document.createElement("img");
      icon.className = "open-tab-icon";
      icon.src = "assets/icons/" + iconFiles[tab.page.charAt(0).toUpperCase() + tab.page.slice(1)];
      icon.alt = "";

      const label = document.createElement("span");
      label.className = "open-tab-label";
      label.textContent = tab.game || pageLabels[tab.page];
      select.append(icon, label);
      select.addEventListener("click", function () {
        activateTab(tab.id);
      });

      const close = document.createElement("button");
      close.className = "open-tab-close";
      close.type = "button";
      close.setAttribute("aria-label", "Close " + (tab.game || pageLabels[tab.page]) + " tab");
      close.textContent = "×";
      close.addEventListener("click", function (event) {
        event.stopPropagation();
        closeTab(tab.id, wrapper);
      });
      wrapper.append(select, close);
      openTabs.appendChild(wrapper);
    });
  }

  function createTab(page) {
    const tab = { id: nextTabId, page: page, game: null };
    nextTabId += 1;
    tabs.push(tab);
    activeTabId = tab.id;
    showPage(page, true);
    return tab;
  }

  function activateTab(tabId) {
    if (activeTabId === tabId) return;
    const tab = tabs.find(function (item) { return item.id === tabId; });
    if (!tab) return;
    activeTabId = tab.id;
    showPage(tab.page, true);
  }

  function closeTab(tabId, wrapper) {
    const tabIndex = tabs.findIndex(function (tab) { return tab.id === tabId; });
    if (tabIndex < 0 || wrapper.classList.contains("is-closing")) return;
    burstParticles(wrapper, 12);
    wrapper.classList.add("is-closing");
    window.setTimeout(function () {
      const currentIndex = tabs.findIndex(function (tab) { return tab.id === tabId; });
      if (currentIndex < 0) return;
      const wasActive = activeTabId === tabId;
      tabs.splice(currentIndex, 1);
      if (!tabs.length) {
        const homeTab = { id: nextTabId, page: "home", game: null };
        nextTabId += 1;
        tabs.push(homeTab);
        activeTabId = homeTab.id;
      } else if (wasActive) {
        activeTabId = tabs[Math.min(currentIndex, tabs.length - 1)].id;
      }
      if (wasActive) {
        const activeTab = getActiveTab();
        showPage(activeTab.page, true);
      } else {
        renderTabs();
      }
    }, 170);
  }

  function renderGames() {
    games.forEach(function (game) {
      const card = document.createElement("button");
      card.className = "game-card";
      card.type = "button";
      card.setAttribute("aria-label", "Play " + game.title);
      card.dataset.gameTitle = game.title.toLocaleLowerCase();

      const thumbnail = document.createElement("span");
      thumbnail.className = "game-card-thumbnail";
      const image = document.createElement("img");
      image.src = "assets/img/thumbnails/" + encodeURIComponent(game.thumbnail);
      image.alt = "";
      image.loading = "lazy";
      image.addEventListener("error", function () {
        thumbnail.classList.add("thumbnail-missing");
      });
      thumbnail.appendChild(image);

      const title = document.createElement("span");
      title.className = "game-card-title";
      title.textContent = game.title;
      card.append(thumbnail, title);
      card.addEventListener("click", function () {
        openGame(game);
      });
      gameGrid.appendChild(card);
    });
  }

  function filterGames() {
    const query = gamesSearch.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    gameGrid.querySelectorAll(".game-card").forEach(function (card) {
      const matches = card.dataset.gameTitle.includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    noGames.hidden = visibleCount > 0;
  }

  function openGame(game) {
    getActiveTab().game = game.title;
    renderTabs();
    activeGameTitle.textContent = game.title;
    gameFrame.title = game.title;
    gameFrame.src = "assets/games/" + encodeURIComponent(game.file);
    gamesCatalog.hidden = true;
    gamePlayer.hidden = false;
    setDocumentTitle(game.title + " — Unseen Unblocker");
  }

  function closeGame() {
    gameFrame.removeAttribute("src");
    gamePlayer.hidden = true;
    gamesCatalog.hidden = false;
  }

  function burstParticles(element, count, distributed) {
    const bounds = element.getBoundingClientRect();
    const originX = bounds.left + bounds.width / 2;
    const originY = bounds.top + bounds.height / 2;
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      const startX = distributed ? bounds.left + Math.random() * bounds.width : originX;
      const startY = distributed ? bounds.top + Math.random() * bounds.height : originY;
      const angle = distributed
        ? Math.atan2(startY - originY, startX - originX) + (Math.random() - 0.5) * 1.8
        : Math.random() * Math.PI * 2;
      const distance = distributed
        ? 22 + Math.random() * 72
        : 24 + Math.random() * Math.min(110, Math.max(bounds.width, bounds.height) * 0.4);
      particle.className = distributed ? "effect-particle effect-shard" : "effect-particle";
      particle.style.left = startX + "px";
      particle.style.top = startY + "px";
      particle.style.setProperty("--particle-x", Math.cos(angle) * distance + "px");
      particle.style.setProperty("--particle-y", Math.sin(angle) * distance + "px");
      particle.style.setProperty("--particle-delay", Math.random() * (distributed ? 90 : 100) + "ms");
      if (distributed) {
        particle.style.setProperty("--shard-size", 3 + Math.random() * 6 + "px");
        particle.style.setProperty("--shard-hue", 255 + Math.random() * 40 + "deg");
      }
      document.body.appendChild(particle);
      window.setTimeout(function () { particle.remove(); }, 850);
    }
  }

  function resizeCursorTrail() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    cursorTrailCanvas.width = Math.round(window.innerWidth * ratio);
    cursorTrailCanvas.height = Math.round(window.innerHeight * ratio);
    cursorTrailContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawCursorTrail() {
    cursorTrailFrame = 0;
    if (!cursorTrailToggle.checked) return;

    const now = performance.now();
    while (cursorTrail.length && now - cursorTrail[0].time > 560) cursorTrail.shift();
    cursorTrailContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    cursorTrailContext.fillStyle = cursorTrailColor.value;
    cursorTrail.forEach(function (point) {
      const progress = (now - point.time) / 560;
      cursorTrailContext.globalAlpha = (1 - progress) * 0.62;
      cursorTrailContext.beginPath();
      cursorTrailContext.arc(point.x, point.y, 1.4 + (1 - progress) * 2.8, 0, Math.PI * 2);
      cursorTrailContext.fill();
    });
    cursorTrailContext.globalAlpha = 1;
    if (cursorTrail.length) cursorTrailFrame = window.requestAnimationFrame(drawCursorTrail);
  }

  function clearCursorTrail() {
    cursorTrail.length = 0;
    if (cursorTrailFrame) {
      window.cancelAnimationFrame(cursorTrailFrame);
      cursorTrailFrame = 0;
    }
    cursorTrailContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  function trackCursor(event) {
    if (!cursorTrailToggle.checked || (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
    const now = performance.now();
    if (now - lastCursorTrailPoint < 18) return;
    lastCursorTrailPoint = now;
    cursorTrail.push({ x: event.clientX, y: event.clientY, time: now });
    if (cursorTrail.length > 28) cursorTrail.shift();
    if (!cursorTrailFrame) cursorTrailFrame = window.requestAnimationFrame(drawCursorTrail);
  }

  resizeCursorTrail();
  window.addEventListener("resize", resizeCursorTrail);
  window.addEventListener("pointermove", trackCursor, { passive: true });

  function dismissProjectNotice() {
    window.clearTimeout(noticeTimeout);
    window.clearTimeout(noticeDismissTimeout);
    noticeTimerBar.style.animation = "none";
    if (projectNotice.hidden || projectNotice.classList.contains("is-dissolving")) return;
    burstParticles(projectNotice, 36, true);
    projectNotice.classList.remove("is-visible");
    projectNotice.classList.add("is-dissolving");
    noticeDismissTimeout = window.setTimeout(function () {
      projectNotice.hidden = true;
      projectNotice.classList.remove("is-dissolving");
    }, 420);
  }

  function openInAboutBlank(gameTitle) {
    const blankWindow = window.open("about:blank", "_blank");
    if (!blankWindow) {
      aboutBlankBlocked = true;
      displayNotice("The new tab was blocked. Allow pop-ups for this site and try again.");
      return false;
    }

    const target = new URL(window.location.href);
    target.searchParams.set("unseen-blank", "1");
    if (gameTitle) target.searchParams.set("unseen-game", gameTitle);
    else target.searchParams.delete("unseen-game");
    const frame = blankWindow.document.createElement("iframe");
    frame.title = "Unseen";
    frame.src = target.href;
    frame.allow = "autoplay; fullscreen; gamepad";
    frame.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:0;";
    const blankDocument = blankWindow.document;
    const blankBody = blankDocument.body || blankDocument.documentElement.appendChild(blankDocument.createElement("body"));
    blankDocument.title = "Unseen";
    blankDocument.documentElement.style.cssText = "width:100%;height:100%;margin:0;overflow:hidden;";
    blankBody.style.cssText = "width:100%;height:100%;margin:0;overflow:hidden;background:#08080b;";
    blankBody.replaceChildren(frame);
    blankWindow.opener = null;
    return true;
  }

  function toggleFullscreen() {
    const target = document.fullscreenElement
      ? null
      : (gamePlayer.hidden ? app : gameFrame);
    const action = target ? target.requestFullscreen() : document.exitFullscreen();
    action.catch(function (error) {
      console.error("Could not change fullscreen mode:", error);
    });
  }

  function syncFullscreenButton() {
    const button = document.getElementById("fullscreen-button");
    const isFullscreen = Boolean(document.fullscreenElement);
    button.setAttribute("aria-pressed", String(isFullscreen));
    button.setAttribute("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
    button.title = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
    const gameButton = document.getElementById("game-fullscreen");
    const isGameFullscreen = document.fullscreenElement === gameFrame;
    gameButton.setAttribute("aria-pressed", String(isGameFullscreen));
    gameButton.textContent = isGameFullscreen ? "Exit fullscreen" : "Fullscreen";
  }

  selectedSiteMask = localStorage.getItem(siteMaskStorageKey) || "unseen";
  if (!siteMasks.some(function (mask) { return mask.id === selectedSiteMask; })) {
    selectedSiteMask = "unseen";
  }
  renderSiteMaskOptions();
  updateMaskedIdentity();
  maskPickerButton.addEventListener("click", function () {
    const isOpen = maskPickerButton.getAttribute("aria-expanded") === "true";
    maskOptions.hidden = isOpen;
    maskPickerButton.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
      const selectedOption = maskOptions.querySelector('[aria-selected="true"]');
      if (selectedOption) selectedOption.focus();
    }
  });
  maskOptions.addEventListener("keydown", function (event) {
    const options = Array.from(maskOptions.querySelectorAll('[role="option"]'));
    const currentIndex = options.indexOf(document.activeElement);
    let nextIndex = currentIndex;
    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % options.length;
    else if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + options.length) % options.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = options.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      closeMaskOptions(true);
      return;
    } else {
      return;
    }
    event.preventDefault();
    options[nextIndex].focus();
  });
  document.addEventListener("click", function (event) {
    if (!maskPicker.contains(event.target)) closeMaskOptions(false);
  });

  renderGames();
  gamesSearch.addEventListener("input", filterGames);
  document.querySelectorAll("[data-icon]").forEach(loadNamedIcon);
  document.querySelectorAll("[data-page]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      if (button.dataset.page === "music" || button.dataset.page === "chat") {
        button.classList.remove("is-unavailable");
        void button.offsetWidth;
        button.classList.add("is-unavailable");
        window.setTimeout(function () { button.classList.remove("is-unavailable"); }, 420);
        displayNotice("These Features are not available in the demo. But will be added in the full version :)");
        closeMobileSidebar();
        return;
      }
      if (button.dataset.page === "games") {
        createTab("games");
      } else {
        showPage(button.dataset.page, true);
      }
      closeMobileSidebar();
    });
  });

  document.getElementById("home-button").addEventListener("click", function () {
    addressInput.value = "";
    dashboardSearch.value = "";
    createTab("home");
    closeMobileSidebar();
  });
  document.getElementById("menu-button").addEventListener("click", function () {
    toggleDashboard();
  });
  document.getElementById("about-blank-button").addEventListener("click", openInAboutBlank);
  document.getElementById("fullscreen-button").addEventListener("click", toggleFullscreen);
  document.getElementById("game-about-blank").addEventListener("click", function () {
    openInAboutBlank(getActiveTab().game);
  });
  document.getElementById("game-fullscreen").addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", syncFullscreenButton);
  document.getElementById("settings-fullscreen").addEventListener("click", toggleFullscreen);
  document.getElementById("settings-about-blank").addEventListener("click", openInAboutBlank);
  document.getElementById("back-to-games").addEventListener("click", function () {
    burstParticles(gamePlayer, 24);
    closeGame();
    getActiveTab().game = null;
    renderTabs();
    setDocumentTitle("Games — Unseen Unblocker");
  });
  document.getElementById("back-button").addEventListener("click", function () {
    if (window.history.length > 1) window.history.back();
  });
  document.getElementById("forward-button").addEventListener("click", function () {
    window.history.forward();
  });
  document.getElementById("refresh-button").addEventListener("click", function () {
    window.location.reload();
  });
  document.getElementById("bookmark-button").addEventListener("click", function (event) {
    const button = event.currentTarget;
    const saved = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", saved ? "Remove bookmark" : "Bookmark this page");
    button.title = saved ? "Remove bookmark" : "Bookmark this page";
    localStorage.setItem("unseen-bookmark", String(saved));
  });
  document.getElementById("settings-button").addEventListener("click", function () {
    settingsDialog.showModal();
    closeMobileSidebar();
  });
  document.getElementById("settings-close").addEventListener("click", function () {
    burstParticles(settingsDialog, 14);
    settingsDialog.close();
  });
  document.getElementById("notice-close").addEventListener("click", function () {
    dismissProjectNotice();
  });
  document.querySelector(".brand").addEventListener("click", function (event) {
    event.preventDefault();
    showPage("home", true);
  });

  function navigateFromSearch(input) {
    const query = input.value.trim();
    if (!query) return;

    let destination;
    const hasHttpScheme = /^https?:\/\//i.test(query);
    const looksLikeDomain = /^(localhost|(?:[\w-]+\.)+[\w-]+)(?::\d+)?(?:\/\S*)?$/i.test(query);
    try {
      if (hasHttpScheme || looksLikeDomain) {
        const candidate = new URL(hasHttpScheme ? query : "https://" + query);
        destination = candidate.href;
      }
    } catch (error) {
      if (!(error instanceof TypeError)) throw error;
    }

    if (!destination) {
      destination = "https://www.google.com/search?q=" + encodeURIComponent(query);
    }
    window.location.assign(destination);
  }

  [addressInput, dashboardSearch].forEach(function (input, index, inputs) {
    input.addEventListener("input", function () {
      inputs[1 - index].value = input.value;
    });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        navigateFromSearch(input);
      }
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey
      && !startupDialog.open && !settingsDialog.open && intro.hidden
      && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
      && !document.activeElement.isContentEditable) {
      event.preventDefault();
      toggleDashboard();
      return;
    }
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      addressInput.focus();
    }
    if (event.key === "Escape" && !sidebarHidden) setSidebarHidden(true);
  });
  window.addEventListener("popstate", function (event) {
    const page = event.state && event.state.page;
    showPage(pageNames.includes(page) ? page : "home", false);
  });

  const bookmarkSaved = localStorage.getItem("unseen-bookmark") === "true";
  const bookmarkButton = document.getElementById("bookmark-button");
  bookmarkButton.setAttribute("aria-pressed", String(bookmarkSaved));
  bookmarkButton.setAttribute("aria-label", bookmarkSaved ? "Remove bookmark" : "Bookmark this page");
  bookmarkButton.title = bookmarkSaved ? "Remove bookmark" : "Bookmark this page";

  function displayNotice(message) {
    window.clearTimeout(noticeTimeout);
    window.clearTimeout(noticeDismissTimeout);
    projectNoticeMessage.textContent = message;
    projectNotice.hidden = false;
    projectNotice.classList.remove("is-dissolving");
    projectNotice.classList.remove("is-visible");
    noticeTimerBar.style.animation = "none";
    void projectNotice.offsetWidth;
    noticeTimerBar.style.animation = "";
    projectNotice.classList.add("is-visible");
    noticeTimeout = window.setTimeout(dismissProjectNotice, 6500);
  }

  function showProjectNotice() {
    if (aboutBlankBlocked) {
      aboutBlankBlocked = false;
      displayNotice("The new tab was blocked. Allow pop-ups for this site and try again.");
      return;
    }
    if (localStorage.getItem("unseen-show-notice") === "false") return;
    displayNotice("Unseen is still a work in progress project. Expect bugs!");
  }

  function finishIntro() {
    intro.classList.add("is-leaving");
    document.body.classList.add("intro-complete");
    introTimers.push(window.setTimeout(function () {
      intro.hidden = true;
      controlsHint.hidden = false;
      controlsHint.classList.add("is-visible");
      showProjectNotice();
    }, 720));
  }

  function playIntro() {
    introTimers.forEach(window.clearTimeout);
    introTimers = [];
    intro.hidden = false;
    controlsHint.hidden = true;
    controlsHint.classList.remove("is-visible");
    intro.classList.remove("is-leaving");
    introTitle.classList.remove("is-typing");
    introLogo.classList.remove("is-visible");
    document.body.classList.remove("intro-complete");
    projectNotice.hidden = true;
    void intro.offsetWidth;
    introTitle.classList.add("is-typing");
    introTimers.push(window.setTimeout(function () { introLogo.classList.add("is-visible"); }, 160));
    introTimers.push(window.setTimeout(finishIntro, 2250));
  }

  const startupPage = document.getElementById("startup-page");
  startupPage.value = localStorage.getItem("unseen-startup-page") || "home";
  startupPage.addEventListener("change", function () {
    localStorage.setItem("unseen-startup-page", startupPage.value);
  });
  const noticeToggle = document.getElementById("notice-toggle");
  noticeToggle.checked = localStorage.getItem("unseen-show-notice") !== "false";
  noticeToggle.addEventListener("change", function () {
    localStorage.setItem("unseen-show-notice", String(noticeToggle.checked));
  });
  cursorTrailToggle.checked = localStorage.getItem("unseen-cursor-trail") !== "false";
  cursorTrailColor.value = localStorage.getItem("unseen-cursor-trail-color") || "#aa85ff";
  cursorTrailToggle.addEventListener("change", function () {
    localStorage.setItem("unseen-cursor-trail", String(cursorTrailToggle.checked));
    if (!cursorTrailToggle.checked) clearCursorTrail();
  });
  cursorTrailColor.addEventListener("input", function () {
    localStorage.setItem("unseen-cursor-trail-color", cursorTrailColor.value);
    cursorTrailContext.fillStyle = cursorTrailColor.value;
  });
  function applyBackgroundSettings() {
    app.dataset.homeTheme = homeBackground.value;
    app.dataset.tabsTheme = tabsBackground.value;
    app.style.setProperty("--home-color", homeBackgroundColor.value);
    app.style.setProperty("--tabs-color", tabsBackgroundColor.value);
  }

  function loadThemeChoice(select, storageKey, fallback) {
    const saved = localStorage.getItem(storageKey);
    select.value = themeNames.includes(saved) ? saved : fallback;
    select.addEventListener("change", function () {
      localStorage.setItem(storageKey, select.value);
      applyBackgroundSettings();
    });
  }

  loadThemeChoice(homeBackground, "unseen-home-background", "aurora");
  loadThemeChoice(tabsBackground, "unseen-tabs-background", "aurora");
  homeBackgroundColor.value = /^#[\da-f]{6}$/i.test(localStorage.getItem("unseen-home-background-color") || "")
    ? localStorage.getItem("unseen-home-background-color")
    : "#8064d8";
  tabsBackgroundColor.value = /^#[\da-f]{6}$/i.test(localStorage.getItem("unseen-tabs-background-color") || "")
    ? localStorage.getItem("unseen-tabs-background-color")
    : "#8064d8";
  homeBackgroundColor.addEventListener("input", function () {
    localStorage.setItem("unseen-home-background-color", homeBackgroundColor.value);
    applyBackgroundSettings();
  });
  tabsBackgroundColor.addEventListener("input", function () {
    localStorage.setItem("unseen-tabs-background-color", tabsBackgroundColor.value);
    applyBackgroundSettings();
  });
  themeAnimationToggle.checked = localStorage.getItem("unseen-theme-animations") !== "false";
  themeAnimationToggle.addEventListener("change", function () {
    localStorage.setItem("unseen-theme-animations", String(themeAnimationToggle.checked));
    app.classList.toggle("theme-animations-off", !themeAnimationToggle.checked);
  });
  const savedFont = localStorage.getItem("unseen-site-font");
  siteFont.value = Object.prototype.hasOwnProperty.call(fonts, savedFont) ? savedFont : "dm-sans";
  document.documentElement.style.setProperty("--site-font", fonts[siteFont.value]);
  siteFont.addEventListener("change", function () {
    localStorage.setItem("unseen-site-font", siteFont.value);
    document.documentElement.style.setProperty("--site-font", fonts[siteFont.value]);
  });
  applyBackgroundSettings();
  app.classList.toggle("theme-animations-off", !themeAnimationToggle.checked);

  function chooseTip(previousTip) {
    const options = tips.filter(function (tip) { return tip !== previousTip; });
    const tip = options[Math.floor(Math.random() * options.length)];
    sidebarTip.textContent = tip;
    return tip;
  }

  let currentTip = chooseTip("");
  window.setInterval(function () {
    currentTip = chooseTip(currentTip);
  }, 8000);
  document.getElementById("replay-intro").addEventListener("click", function () {
    settingsDialog.close();
    playIntro();
  });

  function startExperience() {
    const parameters = new URLSearchParams(window.location.search);
    const requestedGame = games.find(function (game) { return game.title === parameters.get("unseen-game"); });
    const initialPage = requestedGame ? "games" : window.location.hash.slice(1);
    const page = requestedGame
      ? "games"
      : (savedTabState
        ? getActiveTab().page
        : (pageNames.includes(initialPage) ? initialPage : (startupPage.value === "games" ? "games" : "home")));
    showPage(page, false);
    if (requestedGame) openGame(requestedGame);
    playIntro();
  }

  document.getElementById("continue-here").addEventListener("click", function () {
    burstParticles(startupDialog, 16);
    startupDialog.close();
    startExperience();
  });
  document.getElementById("open-about-blank").addEventListener("click", function () {
    burstParticles(startupDialog, 16);
    startupDialog.close();
    openInAboutBlank();
    startExperience();
  });
  startupDialog.addEventListener("cancel", function (event) {
    event.preventDefault();
  });

  if (new URLSearchParams(window.location.search).has("unseen-blank")) {
    startExperience();
  } else {
    startupDialog.showModal();
  }
}());
