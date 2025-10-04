(function(){
  function isBlogSection(){
    return window.location.pathname.includes('/blog/');
  }

  function blogRootUrl(){
    const { origin, pathname } = window.location;
    const idx = pathname.indexOf('/blog/');
    if (idx === -1) return null;
    const base = pathname.slice(0, idx + '/blog/'.length);
    return `${origin}${base}`;
  }

  function collectPosts(root, baseHref){
    const items = [];

    // 1) MkDocs Material blog plugin cards
    const cardAnchors = root.querySelectorAll('article.md-post a.toclink, article.md-post a');
    cardAnchors.forEach(anchor => {
      const rawHref = anchor.getAttribute('href') || '';
      if (!rawHref || rawHref.includes('#')) return;
      // Accept only blog post links
      if (!(rawHref.includes('/blog/posts/') || rawHref.startsWith('posts/'))) return;
      const title = anchor.textContent.trim();
      if (!title) return;
      const article = anchor.closest('article.md-post');
      const timeEl = article ? article.querySelector('time') : null;
      const dateISO = timeEl ? timeEl.getAttribute('datetime') || '' : '';
      const url = new URL(rawHref, baseHref);
      items.push({ title, href: url.pathname, dateISO });
    });

    // 2) Custom index list: <li><time>...</time> — <strong><a href="posts/...">Title</a></strong></li>
    if (items.length === 0) {
      const listAnchors = root.querySelectorAll('li a[href*="posts/"]');
      listAnchors.forEach(anchor => {
        const rawHref = anchor.getAttribute('href') || '';
        if (!rawHref || rawHref.includes('#')) return;
        const title = anchor.textContent.trim();
        if (!title) return;
        const li = anchor.closest('li');
        const timeEl = li ? li.querySelector('time') : null;
        const dateISO = timeEl ? (timeEl.getAttribute('datetime') || '') : '';
        const url = new URL(rawHref, baseHref);
        items.push({ title, href: url.pathname, dateISO });
      });
    }

    return items;
  }

  function renderSidebar(posts){
    if (!posts.length) return;
    const sidebar = document.querySelector('.md-sidebar--secondary');
    if (!sidebar) return;

    // Remove any existing blog ToC to avoid duplicates
    sidebar.querySelectorAll('nav.blog-toc').forEach(nav => nav.remove());

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
      try {
        return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
      } catch (_) {
        return date.toISOString().slice(0,10);
      }
    };

    const currentPath = window.location.pathname;
    posts.forEach(post => {
      const li = document.createElement('li');
      li.className = 'md-nav__item';
      const link = document.createElement('a');
      link.className = 'md-nav__link';
      link.href = post.href;
      const dateText = formatDate(post.dateISO);

      const time = document.createElement('time');
      if (post.dateISO) time.setAttribute('datetime', post.dateISO);
      time.textContent = dateText;

      const titleSpan = document.createElement('span');
      titleSpan.textContent = ` — ${post.title}`;

      link.appendChild(time);
      link.appendChild(titleSpan);

      if (currentPath === post.href || currentPath.endsWith(post.href)) {
        link.setAttribute('aria-current', 'page');
      }
      li.appendChild(link);
      list.appendChild(li);
    });
    nav.appendChild(list);

    // Append below the default secondary nav to avoid flicker
    sidebar.appendChild(nav);
  }

  async function buildBlogToc(){
    if (!isBlogSection()) return;

    const root = blogRootUrl();
    if (!root) return;
    const seen = new Set();
    const posts = [];

    function add(items){
      items.forEach(item => {
        if (seen.has(item.href)) return;
        seen.add(item.href);
        posts.push(item);
      });
    }

    // Always fetch the blog index and subsequent pages to collect posts
    const parser = new DOMParser();
    try {
      const res = await fetch(`${root}index.html`, { credentials: 'same-origin' });
      if (res.ok) {
        const html = await res.text();
        const doc = parser.parseFromString(html, 'text/html');
        add(collectPosts(doc, `${root}`));
      }
    } catch (_) { /* ignore */ }

    let page = 2;
    while (true){
      const variants = [
        `${root}page/${page}/index.html`,
        `${root}page/${page}/`
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
