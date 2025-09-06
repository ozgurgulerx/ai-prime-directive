// speaking.js
// Left sidebar filters (Year, Tags) for the Speaking page.
// Uses MkDocs Material's instant navigation (document$).
(function(){
  const run = () => {
    const page = document.querySelector('.page-speaking');
    const grid = document.querySelector('.talk-grid');
    const left = document.querySelector('.md-sidebar--primary');
    const leftInner = document.querySelector('.md-sidebar--primary .md-sidebar__inner');
    if (!page || !grid || !left) return;

    const cards = Array.from(grid.querySelectorAll('.talk-card'));
    if (!cards.length) return;

    // Derive years and tags from data-* attributes on .talk-card
    const years = new Set();
    const tags = new Set();
    cards.forEach(c => {
      const y = (c.getAttribute('data-year') || '').trim() || 'Unknown';
      years.add(y);
      const t = (c.getAttribute('data-tags') || '')
        .split(',').map(s => s.trim()).filter(Boolean);
      t.forEach(x => tags.add(x));
    });

    const yearsArr = ['All', ...Array.from(years).filter(Boolean).sort().reverse()];
    const tagsArr = ['All', ...Array.from(tags).filter(Boolean).sort((a,b) => a.localeCompare(b))];

    // Cleanup previous injected filters (due to instant navigation)
    const container = leftInner || left;
    const old = container.querySelector('.speaking-filter');
    if (old) old.remove();

    // Build filter nav
    const wrap = document.createElement('nav');
    wrap.className = 'speaking-filter md-nav';
    wrap.innerHTML = [
      '<div class="speaking-filter__section">',
      '  <div class="speaking-filter__title">Archive</div>',
      '  <ul class="speaking-filter__list speaking-filter__years"></ul>',
      '</div>',
      '<div class="speaking-filter__section">',
      '  <div class="speaking-filter__title">Tags</div>',
      '  <ul class="speaking-filter__list speaking-filter__tags"></ul>',
      '</div>'
    ].join('');

    const yearsUl = wrap.querySelector('.speaking-filter__years');
    const tagsUl = wrap.querySelector('.speaking-filter__tags');

    yearsArr.forEach(y => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" data-year="${y}">${y}</a>`;
      yearsUl.appendChild(li);
    });
    tagsArr.forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" data-tag="${t}">${t}</a>`;
      tagsUl.appendChild(li);
    });

    let selYear = 'All';
    let selTag = 'All';

    const setActive = () => {
      wrap.querySelectorAll('[data-year]').forEach(a => a.classList.toggle('is-active', a.getAttribute('data-year') === selYear));
      wrap.querySelectorAll('[data-tag]').forEach(a => a.classList.toggle('is-active', a.getAttribute('data-tag') === selTag));
    };

    const apply = () => {
      cards.forEach(c => {
        const okY = (selYear === 'All') || (c.getAttribute('data-year') === selYear);
        const cTags = (c.getAttribute('data-tags') || '').split(',').map(s => s.trim()).filter(Boolean);
        const okT = (selTag === 'All') || cTags.includes(selTag);
        c.style.display = (okY && okT) ? '' : 'none';
      });
    };

    wrap.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (a.hasAttribute('data-year')) selYear = a.getAttribute('data-year');
      if (a.hasAttribute('data-tag')) selTag = a.getAttribute('data-tag');
      e.preventDefault();
      setActive();
      apply();
    });

    container.appendChild(wrap);
    setActive();
    apply();
  };

  if (window.document$) {
    window.document$.subscribe(run);
  } else {
    document.addEventListener('DOMContentLoaded', run);
  }
})();
