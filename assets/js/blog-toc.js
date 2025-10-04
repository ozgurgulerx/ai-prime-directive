(function(){
  function isBlogIndex(){
    return !!document.querySelector('article.md-post--excerpt');
  }

  function blogBaseUrl(){
    const parts = window.location.pathname.split('/');
    const idx = parts.indexOf('blog');
    if (idx === -1) return window.location.origin + '/blog/';
    const prefix = parts.slice(0, idx + 1).join('/') || '';
    return window.location.origin + (prefix.endsWith('/') ? prefix : prefix + '/');
  }

  function collectPosts(root, baseHref){
    const items = [];
    const anchors = root.querySelectorAll('article.md-post a.toclink');
    anchors.forEach(anchor => {
      const href = anchor.getAttribute('href') || '';
      if (!href || href.includes('#')) return;
      const title = anchor.textContent.trim();
      if (!title) return;
      const article = anchor.closest('article.md-post');
      const timeEl = article ? article.querySelector('time') : null;
      const dateISO = timeEl ? timeEl.getAttribute('datetime') || '' : '';
      const url = new URL(href, baseHref);
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

    const prev = sidebar.querySelector('nav.blog-toc');
    if (prev) prev.remove();

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
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return '';
      return date.toISOString().slice(0, 10);
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
      const pageUrl = `${base}page/${page}/index.html`;
      try {
        const res = await fetch(pageUrl, { credentials: 'same-origin' });
        if (!res.ok) break;
        const html = await res.text();
        const doc = parser.parseFromString(html, 'text/html');
        add(collectPosts(doc, pageUrl));
        page += 1;
      } catch (err){
        break;
      }
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
