(function () {
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

  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("theme") || "dark";
  } catch (_) {
    // private mode: fall back to dark
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current =
        html.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch (_) {
        // ignore storage failures
      }
      applyTheme(next);
    });
  }
})();
