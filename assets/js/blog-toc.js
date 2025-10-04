(function(){
  function isBlogIndex(){
    return !!document.querySelector('article.md-post--excerpt');
  }

  function blogBaseUrl(){
    const { origin, pathname } = window.location;
    const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
    return `${origin}${path}`;
  }

  function collectPosts(root, baseHref){
    const items = [];
    const anchors = root.querySelectorAll('article.md-post a.toclink');
    anchors.forEach(anchor => {
      const rawHref = anchor.getAttribute('href') || '';
      if (!rawHref || rawHref.includes('#')) return;
      const title = anchor.textContent.trim();
      if (!title) return;
      const article = anchor.closest('article.md-post');
      const timeEl = article ? article.querySelector('time') : null;
      const dateISO = timeEl ? timeEl.getAttribute('datetime') || '' : '';
      const url = new URL(rawHref, baseHref);
      items.push({
        title,
        href: url.pathname + url.search + url.hash,
        dateISO
      });
    });
    return items;
  }

  function renderSidebar(posts){
    if (!posts.length) return;
    const sidebar = document.querySelector('.md-sidebar--secondary');
    if (!sidebar) return;

    sidebar.querySelectorAll('nav.md-nav--secondary').forEach(nav => nav.remove());

    const nav = document.createElement('nav');
    nav.className = 'md-nav md-nav--secondary blog-toc';
    nav.setAttribute('aria-label', 'Blog posts');

    const label = document.createElement('label');
    label.className = 'md-nav__title';
    label.textContent = 'Blog posts';
    nav.appendChild(label);

    const list = document.createElement('ul');
    list.className = 'md-nav__list';
    const formatDate = (iso) => {
      if (!iso) return '';
      const clean = iso.includes('T') ? iso : iso.replace(' ', 'T');
      const date = new Date(clean);
      if (Number.isNaN(date.getTime())) return '';
      const yy = String(date.getFullYear()).slice(-2);
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yy}${mm}${dd}`;
    };

    posts.forEach(post => {
      const li = document.createElement('li');
      li.className = 'md-nav__item';
      const link = document.createElement('a');
      link.className = 'md-nav__link';
      link.href = post.href;
      const dateText = formatDate(post.dateISO);
      link.textContent = dateText ? `${dateText} — ${post.title}` : post.title;
      li.appendChild(link);
      list.appendChild(li);
    });
    nav.appendChild(list);

    sidebar.appendChild(nav);
  }

  async function buildBlogToc(){
    if (!isBlogIndex()) return;

    const base = blogBaseUrl();
    const seen = new Set();
    const posts = [];

    function add(items){
      items.forEach(item => {
        if (seen.has(item.href)) return;
        seen.add(item.href);
        posts.push(item);
      });
    }

    add(collectPosts(document, window.location.href));

    const parser = new DOMParser();
    let page = 2;
    while (true){
      const variants = [
        `${base}page/${page}/index.html`,
        `${base}page/${page}/`
      ];
      let html = null;
      let baseForLinks = null;
      for (const candidate of variants){
        try {
          const res = await fetch(candidate, { credentials: 'same-origin' });
          if (res.ok){
            html = await res.text();
            baseForLinks = candidate;
            break;
          }
        } catch (err){
          /* ignore and try next */
        }
      }
      if (!html) break;
      const doc = parser.parseFromString(html, 'text/html');
      add(collectPosts(doc, baseForLinks));
      page += 1;
    }

    posts.sort((a, b) => (b.dateISO || '').localeCompare(a.dateISO || ''));
    renderSidebar(posts);
  }

  const run = () => { buildBlogToc(); };

  if (window.document$) {
    window.document$.subscribe(run);
  } else {
    document.addEventListener('DOMContentLoaded', run);
  }
})();
