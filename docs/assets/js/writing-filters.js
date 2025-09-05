/* Year filter for Writing page using data-year attributes.
   - Finds elements with [data-year] inside grid cards
   - Shows/hides their closest <li> based on selected years
   - Supports URL ?year=2024,2023 and persists to localStorage
*/
(function () {
  var form = document.getElementById('year-filter');
  if (!form) return;

  var markers = Array.prototype.slice.call(document.querySelectorAll('.grid.cards [data-year]'));
  var items = markers.map(function (m) { return m.closest('li'); });
  var years = Array.from(new Set(markers.map(function (m) { return m.getAttribute('data-year'); }))).sort().reverse();

  // If checkboxes not present (or missing years), build them dynamically
  var present = Array.prototype.slice.call(form.querySelectorAll('input[type="checkbox"]')).map(function (c) { return c.value; });
  if (present.length === 0 || years.some(function (y) { return present.indexOf(y) === -1; })) {
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

    markers.forEach(function (m, idx) {
      var y = m.getAttribute('data-year');
      var li = items[idx];
      if (!li) return;
      li.style.display = active.indexOf(y) !== -1 ? '' : 'none';
    });

    var params = new URLSearchParams(location.search);
    if (active.length && active.length < years.length) params.set('year', active.join(','));
    else params.delete('year');
    history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params.toString() : ''));

    localStorage.setItem('writingYears', JSON.stringify(active));
  }

  form.addEventListener('change', apply);
  var clear = document.getElementById('clear-years');
  if (clear) clear.addEventListener('click', function (e) {
    e.preventDefault();
    Array.prototype.forEach.call(form.elements, function (el) { if (el.type === 'checkbox') el.checked = true; });
    apply();
  });

  apply();
})();

