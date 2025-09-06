// writing.js
// Left sidebar filters (Year, Topic) for the Writing page.
// Works with MkDocs Material and instant navigation.
(function(){
  const run = () => {
    const page = document.querySelector('.page-writing');
    const left = document.querySelector('.md-sidebar--primary');
    const leftInner = document.querySelector('.md-sidebar--primary .md-sidebar__inner');
    if (!page || !left) return;

    // Build dataset from list items
    const items = Array.from(page.querySelectorAll('li'))
      .filter(li => li.querySelector('a'));
    if (!items.length) return;

    // Derive year/topics and store in data-* so filtering is fast
    const years = new Set();
    const topics = new Set();

    items.forEach(li => {
      const txt = li.textContent.trim();
      // Year: look for 20xx in text (e.g., Nov 21, 2024)
      const ym = txt.match(/\b(20\d{2})\b/);
      const year = ym ? ym[1] : 'Unknown';
      li.dataset.year = year;
      years.add(year);

      // Topics: at the end: "Topics: A, B" (case-insensitive)
      const tm = txt.match(/Topics:\s*([^\n]+)/i);
      if (tm && tm[1]) {
        tm[1].split(',').map(s => s.trim()).filter(Boolean).forEach(t => topics.add(t));
        li.dataset.topics = tm[1].split(',').map(s => s.trim()).filter(Boolean).join(',');
      } else {
        li.dataset.topics = '';
      }
    });

    const yearsArr = ['All', ...Array.from(years).filter(Boolean).sort().reverse()];
    const topicsArr = ['All', ...Array.from(topics).filter(Boolean).sort((a,b)=>a.localeCompare(b))];

    // Remove any previous filter block we may have injected (due to instant nav)
    const old = (leftInner || left).querySelector('.writing-filter');
    if (old) old.remove();

    // Inject filter block
    const wrap = document.createElement('nav');
    wrap.className = 'writing-filter md-nav';
    wrap.innerHTML = [
      '<div class="writing-filter__section">',
      '  <div class="writing-filter__title">Archive</div>',
      '  <ul class="writing-filter__list writing-filter__years"></ul>',
      '</div>',
      '<div class="writing-filter__section">',
      '  <div class="writing-filter__title">Categories</div>',
      '  <ul class="writing-filter__list writing-filter__topics"></ul>',
      '</div>'
    ].join('');

    const yearsUl = wrap.querySelector('.writing-filter__years');
    const topicsUl = wrap.querySelector('.writing-filter__topics');

    yearsArr.forEach(y => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" data-year="${y}">${y}</a>`;
      yearsUl.appendChild(li);
    });

    topicsArr.forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" data-topic="${t}">${t}</a>`;
      topicsUl.appendChild(li);
    });

    // Current selections
    let selYear = 'All';
    let selTopic = 'All';

    const setActive = () => {
      wrap.querySelectorAll('[data-year]').forEach(a => a.classList.toggle('is-active', a.getAttribute('data-year') === selYear));
      wrap.querySelectorAll('[data-topic]').forEach(a => a.classList.toggle('is-active', a.getAttribute('data-topic') === selTopic));
    };

    const apply = () => {
      items.forEach(li => {
        const okY = (selYear === 'All') || (li.dataset.year === selYear);
        const okT = (selTopic === 'All') || (li.dataset.topics || '').split(',').map(s=>s.trim()).includes(selTopic);
        li.style.display = (okY && okT) ? '' : 'none';
      });
    };

    wrap.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (a.hasAttribute('data-year')) {
        selYear = a.getAttribute('data-year');
      }
      if (a.hasAttribute('data-topic')) {
        selTopic = a.getAttribute('data-topic');
      }
      e.preventDefault();
      setActive();
      apply();
    });

    (leftInner || left).appendChild(wrap);
    setActive();
    apply();
  };

  if (window.document$) {
    window.document$.subscribe(run);
  } else {
    document.addEventListener('DOMContentLoaded', run);
  }
})();
