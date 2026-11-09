// Keep Classic's state and focus management. Add the expected Escape action.
if (typeof document !== "undefined") {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented) return;
    const toggle = document.querySelector(
      '.navbar__toggle[aria-expanded="true"]',
    );
    const close = document.querySelector(".navbar-sidebar__close");
    if (toggle && close) {
      event.preventDefault();
      close.click();
      toggle.focus();
    }
  });
}
