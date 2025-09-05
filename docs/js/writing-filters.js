/* Year filter for Writing page
   - Filters .post-card[data-year]
   - Supports ?year=YYYY[,YYYY]
   - Persists to localStorage("writingYears")
*/
(function () {
  var form = document.getElementById('year-filter');
  if (!form) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll('.post-card'));
  var clear = document.getElementById('clear-years');

  var years = Array.from(new Set(cards.map(function (c) { return c.getAttribute('data-year'); }))).sort().reverse();

  if (!form.querySelector('input[type="checkbox"')) {
    form.innerHTML = years.map(function (y) {
      return '<label><input type="checkbox" value="' + y + '" checked> ' + y + '</label>';
    }).join('');
  }

  var urlYears = new URLSearchParams(location.search).get('year');
  var stored = localStorage.getItem('writingYears');
  var initial = urlYears ? urlYears.split(',') : (stored ? JSON.parse(stored) : years);

  Array.prototype.forEach.call(form.elements, function (el) {
    if (el.type === 'checkbox') el.checked = initial.indexOf(el.value) !== -1;
  });

  function apply() {
    var active = Array.prototype.filter.call(form.elements, function (el) {
      return el.type === 'checkbox' && el.checked;
    }).map(function (el) { return el.value; });

    cards.forEach(function (c) {
      var y = c.getAttribute('data-year');
      c.style.display = active.indexOf(y) !== -1 ? '' : 'none';
    });

    var params = new URLSearchParams(location.search);
    if (active.length && active.length < years.length) params.set('year', active.join(','));
    else params.delete('year');
    history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params.toString() : ''));

    localStorage.setItem('writingYears', JSON.stringify(active));
  }

  form.addEventListener('change', apply);
  if (clear) clear.addEventListener('click', function (e) {
    e.preventDefault();
    Array.prototype.forEach.call(form.elements, function (el) { if (el.type === 'checkbox') el.checked = true; });
    apply();
  });

  apply();
})();

