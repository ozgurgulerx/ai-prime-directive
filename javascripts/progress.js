/* Local, trust-based progress utility (optional).
 * - Designed for card lists with data attributes.
 * - Safe to include even if not used yet.
 */
(function () {
  const DONE_KEY = "notes.v1.done";   // ["some-slug", ...]
  const LAST_KEY = "notes.v1.last";   // "some-last-slug"
  const safeGet = k => {
    try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; }
  };
  const safeSet = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const done = new Set(safeGet(DONE_KEY) || []);

  window.markItemDone = function (slug) {
    if (!slug) return;
    done.add(slug);
    safeSet(DONE_KEY, [...done]);
    paint();
    reveal();
  };
  window.recordItemVisit = function (slug) {
    if (slug) localStorage.setItem(LAST_KEY, slug);
  };

  function paint() {
    document.querySelectorAll("[data-item-slug]").forEach(el => {
      const slug = el.getAttribute("data-item-slug");
      const card = el.closest(".card, li");
      if (card) card.classList.toggle("done", done.has(slug));
    });
  }

  function reveal() {
    document.querySelectorAll("[data-requires]").forEach(node => {
      const slug = node.getAttribute("data-requires");
      if (done.has(slug)) node.classList.remove("locked");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    paint();
    reveal();
  });
})();

