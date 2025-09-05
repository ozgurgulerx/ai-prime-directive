/* Writing page year filter (non-invasive)
   - Parses years from the text of .post-meta within each card
   - Builds checkboxes dynamically into #year-filter
   - Shows/hides cards by selected years
   - Supports deep-link ?year=YYYY[,YYYY] and persists to localStorage
*/
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var form = document.getElementById('year-filter');
    if (!form) return;

    var items = Array.from(document.querySelectorAll('.grid.cards > ul > li'));
    if (!items.length) return;

    function getYear(li){
      var meta = li.querySelector('.post-meta');
      var txt = meta ? meta.textContent : li.textContent;
      // Match formats like "Aug 26, 2024" or standalone year
      var m = txt.match(/\b(\d{4})\b/);
      return m ? m[1] : null;
    }

    var years = Array.from(new Set(items.map(getYear).filter(Boolean))).sort().reverse();
    if (!years.length) return;

    // Build checkboxes if empty
    if (!form.querySelector('input[type="checkbox"]')){
      form.innerHTML = years.map(function(y){
        return '<label><input type="checkbox" value="' + y + '" checked> ' + y + '</label>';
      }).join('');
    }

    // Initial selection from URL or localStorage
    var params = new URLSearchParams(location.search);
    var urlYears = params.get('year');
    var stored = localStorage.getItem('writingYears');
    var initial = urlYears ? urlYears.split(',') : (stored ? JSON.parse(stored) : years);
    Array.from(form.elements).forEach(function(el){ if (el.type==='checkbox') el.checked = initial.indexOf(el.value) !== -1; });

    function apply(){
      var active = Array.from(form.elements).filter(function(el){ return el.type==='checkbox' && el.checked; }).map(function(el){ return el.value; });
      items.forEach(function(li){ var y = getYear(li); li.style.display = !y || active.indexOf(y) !== -1 ? '' : 'none'; });

      var p = new URLSearchParams(location.search);
      if (active.length && active.length < years.length) p.set('year', active.join(',')); else p.delete('year');
      history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p.toString() : ''));
      localStorage.setItem('writingYears', JSON.stringify(active));
    }

    form.addEventListener('change', apply);
    var clear = document.getElementById('clear-years');
    if (clear) clear.addEventListener('click', function(e){ e.preventDefault(); Array.from(form.elements).forEach(function(el){ if (el.type==='checkbox') el.checked = true; }); apply(); });

    apply();
  });
})();

