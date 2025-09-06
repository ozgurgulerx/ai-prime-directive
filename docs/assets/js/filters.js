// Writing page enhancements: Year • Topic • Search • Sort, click/keyboardable cards.
// Re-initialize on every Material page change (document$) and first load.
(function(){
  const run = () => {
    // Clean up any previous bar to avoid duplicates when navigating
    const old = document.querySelector(".filter-bar");
    if (old) old.remove();

    const inner = document.querySelector(".md-content__inner");
    const cards = Array.from(document.querySelectorAll(".post-card"));
    if (!inner) return;
    if (!cards.length) return; // nothing to do on pages without cards

    // Derive facets
    const years = ["All", ...new Set(cards.map(c => (c.dataset.year || "").slice(0,4)).filter(Boolean))].sort().reverse();
    const topics = Array.from(new Set(cards.flatMap(c => (c.dataset.topics || "")
                        .split(",").map(s => s.trim()).filter(Boolean))));
    // Primary topic → accent (first topic by convention)
    cards.forEach(c => {
      if (!c.dataset.primary) {
        const first = (c.dataset.topics || "").split(",").map(s => s.trim()).find(Boolean);
        if (first) c.dataset.primary = first;
      }
      // keyboardable
      c.tabIndex = 0;
      c.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const a = c.querySelector("a[href]");
          if (a) { e.preventDefault(); window.location.href = a.href; }
        }
      });
    });

    // Build UI (sticky)
    const bar = document.createElement("div");
    bar.className = "filter-bar";
    const yearSel = mkSel("Year", years);
    const topicSel = topics.length ? mkSel("Topic", ["All", ...topics]) : null;
    const sortSel = mkSel("Sort", ["Newest", "Oldest", "A–Z", "Z–A", "Shortest", "Longest"]);
    const search = Object.assign(document.createElement("input"), {
      type: "search", placeholder: "Search titles…", ariaLabel: "Search titles"
    });
    bar.append("Filter:", yearSel);
    if (topicSel) bar.append(topicSel);
    bar.append(sortSel, search);
    insertAfterH1(inner, bar);

    // Apply filters + sort
    const apply = () => {
      const y = yearSel.value;
      const t = topicSel ? topicSel.value : "All";
      const q = search.value.trim().toLowerCase();
      const nowVisible = [];

      cards.forEach(c => {
        const okY = (y === "All") || (c.dataset.year || "").startsWith(y);
        const okT = (t === "All") || (c.dataset.topics || "").split(",").map(s => s.trim()).includes(t);
        const okQ = !q || c.querySelector("h3")?.textContent.toLowerCase().includes(q);
        c.style.display = (okY && okT && okQ) ? "" : "none";
        if (c.style.display !== "none") nowVisible.push(c);
      });

      // Sorting
      const parent = cards[0]?.parentElement;
      if (!parent) return;
      const parseDate = c => new Date((c.dataset.date || "").replace(/(\d{1,2}) ([A-Za-z]+) (\d{4})/, "$3-$2-$1")) || new Date();
      const parseMin  = c => {
        if (c.dataset.min) return Number(c.dataset.min);
        const txt = c.querySelector(".post-meta")?.textContent || "";
        const m = txt.match(/~\s*(\d+)\s*min/i); return m ? Number(m[1]) : 999;
      };
      const by = sortSel.value;
      const sorted = nowVisible.slice().sort((a,b) => {
        if (by === "Newest")   return (parseDate(b) - parseDate(a)) || 0;
        if (by === "Oldest")   return (parseDate(a) - parseDate(b)) || 0;
        if (by === "A–Z")      return a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent);
        if (by === "Z–A")      return b.querySelector("h3").textContent.localeCompare(a.querySelector("h3").textContent);
        if (by === "Shortest") return parseMin(a) - parseMin(b);
        if (by === "Longest")  return parseMin(b) - parseMin(a);
        return 0;
      });
      sorted.forEach(n => parent.appendChild(n));
    };

    [yearSel, sortSel].forEach(el => el.addEventListener("change", apply));
    if (topicSel) topicSel.addEventListener("change", apply);
    search.addEventListener("input", apply);
    apply();

    // Card body click (don’t swallow real links/controls)
    cards.forEach(c => {
      c.addEventListener("click", (e) => {
        if (e.target.closest("a,button,select,input,details,summary")) return;
        const a = c.querySelector("a[href]"); if (a) window.location.href = a.href;
      });
    });

    // Helpers
    function mkSel(label, opts){ const s=document.createElement("select"); s.ariaLabel="Filter by "+label; opts.forEach(o=>s.add(new Option(o,o))); return s; }
    function insertAfterH1(container, node){ const h1 = container.querySelector("h1"); (h1?.parentElement || container).insertBefore(node, h1?.nextSibling || container.firstChild); }
  };

  if (window.document$) {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
