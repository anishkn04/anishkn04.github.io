(function () {
  const panels = [...document.querySelectorAll(".collage-item")];
  const collage = document.querySelector(".collage");
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // ── Theme ────────────────────────────────────────────────────────────────
  const applyTheme = (theme) => {
    html.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  };

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current =
        html.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  // ── Panels ───────────────────────────────────────────────────────────────
  if (!panels.length) {
    return;
  }

  const isMobile = () => window.innerWidth <= 760;

  const syncPanelSizes = () => {
    if (isMobile()) {
      // On mobile, remove all JS-set heights; CSS handles it
      if (collage) collage.style.height = "";
      panels.forEach((panel) => {
        panel.style.height = "";
        const copy = panel.querySelector(".collage-copy");
        if (copy) copy.style.maxHeight = "";
      });
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const ratio = viewportWidth <= 1100 ? 0.62 : 0.72;
    const minHeight = viewportWidth <= 1100 ? 460 : 560;
    const maxHeight = viewportWidth <= 1100 ? 620 : 760;
    const panelHeight = Math.round(
      Math.min(Math.max(viewportHeight * ratio, minHeight), maxHeight),
    );

    if (collage) {
      collage.style.height = `${panelHeight}px`;
    }

    panels.forEach((panel) => {
      panel.style.height = `${panelHeight}px`;
    });

    // After heights are set, measure the open panel's rail and fix copy
    const activePanel = panels.find((p) => p.open);
    if (activePanel) requestAnimationFrame(() => setCopyMaxHeight(activePanel));
  };

  const setCopyMaxHeight = (panel) => {
    if (isMobile()) return;
    const copy = panel.querySelector(".collage-copy");
    const rail = panel.querySelector(".collage-rail");
    if (!copy || !rail) return;
    const panelH = panel.getBoundingClientRect().height;
    const railH = rail.getBoundingClientRect().height;
    // body padding: 18px top + 24px bottom = 42px
    const copyMax = panelH - Math.round(railH) - 42;
    copy.style.maxHeight = `${copyMax}px`;
  };

  const openPanel = (nextPanel) => {
    panels.forEach((panel) => {
      panel.open = panel === nextPanel;
      panel.classList.toggle("is-active", panel === nextPanel);
    });
    // Measure after the panel is open and the rail has its horizontal layout
    requestAnimationFrame(() => setCopyMaxHeight(nextPanel));
  };

  panels.forEach((panel) => {
    const summary = panel.querySelector("summary");

    if (!summary) {
      return;
    }

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      openPanel(panel);
    });

    summary.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPanel(panel);
      }
    });
  });

  openPanel(panels[0]);
  syncPanelSizes();

  window.addEventListener("resize", syncPanelSizes);
})();
