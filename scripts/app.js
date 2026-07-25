/* ABJ Design Co. — Shared Site Runtime */
(() => {
  const root = document.documentElement;
  const storageKey = "abj-theme";
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  const getTheme = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "dark" || saved === "light") return saved;
    return systemDark.matches ? "dark" : "light";
  };

  const applyTheme = theme => {
    root.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#15110D" : "#FBF8F3"
    );
    document.querySelectorAll("#themeToggle, #themeToggleMobile").forEach(button => {
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
  };

  const toggleTheme = () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, next);
    applyTheme(next);
  };

  applyTheme(getTheme());

  document.querySelectorAll("#themeToggle, #themeToggleMobile").forEach(button => {
    button.addEventListener("click", toggleTheme);
  });

  systemDark.addEventListener?.("change", () => {
    if (!localStorage.getItem(storageKey)) applyTheme(getTheme());
  });

  const header = document.getElementById("siteHeader");
  const navShell = document.getElementById("navShell");
  const menuToggle =
    document.getElementById("menuToggle") ||
    document.getElementById("mobileToggle") ||
    document.querySelector(".mobile-toggle");
  const mobileMenu =
    document.getElementById("mobileMenu") ||
    document.getElementById("mobileNav");

  const closeMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-label", "Open menu");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const updateNavigation = () => {
    const scrolled = window.scrollY > 32;
    header?.classList.toggle("scrolled", scrolled);
    navShell?.classList.toggle("scrolled", scrolled);
  };

  updateNavigation();
  window.addEventListener("scroll", updateNavigation, { passive: true });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -35px" }
    );

    document.querySelectorAll(".reveal").forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("visible");
    });
  }

  document.querySelectorAll(".faq-button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  if (filterButtons.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;
        document.querySelectorAll(".project").forEach(project => {
          project.hidden =
            filter !== "all" && project.dataset.category !== filter;
        });
      });
    });
  }
})();
