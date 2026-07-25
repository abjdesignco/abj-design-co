(function () {
  var LIGHT_SRC = "images/ABJ_logo_mark_d.png";       // dark brown mark — used in light mode
  var DARK_SRC  = "images/ABJ_logo_mark_l.png";  // beige mark — used in dark mode
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function isDark() {
    var explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "dark") return true;
    if (explicit === "light") return false;
    return mq.matches; // no explicit choice made — follow system preference
  }

  function applyLogo() {
    var target = isDark() ? DARK_SRC : LIGHT_SRC;
    document.querySelectorAll(".logo-badge").forEach(function (img) {
      if (img.getAttribute("src") !== target) img.setAttribute("src", target);
    });
  }

  applyLogo();

  // React whenever the theme toggle changes data-theme on <html>
  new MutationObserver(applyLogo).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  // React to system theme changes when no explicit choice has been made
  if (mq.addEventListener) mq.addEventListener("change", applyLogo);
  else if (mq.addListener) mq.addListener(applyLogo);
})();
