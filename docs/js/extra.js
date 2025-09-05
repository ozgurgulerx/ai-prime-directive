/*
  extra.js
  - Client-side validation for Formspree forms (data-validate)
  - Persona toggle to reorder value cards on homepage (localStorage)
*/

(function () {
  // Simple validation: block submit if required fields missing or honeypot filled
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.matches('[data-validate]')) return;
    var required = form.querySelectorAll('[required]');
    var missing = Array.prototype.some.call(required, function (el) { return !el.value; });
    var honeypot = form.querySelector('.hp input');
    if (honeypot && honeypot.value) missing = true;
    if (missing) {
      e.preventDefault();
      alert('Please complete all required fields.');
    }
  });

  // Persona toggle: reorder cards based on persona
  function reorderCards(persona) {
    var grid = document.querySelector('[data-card-grid]');
    if (!grid) return;
    var order = {
      builder: ['templates', 'patterns', 'guides'],
      product: ['guides', 'patterns', 'templates'],
      exec: ['patterns', 'guides', 'templates']
    }[persona] || ['patterns', 'guides', 'templates'];
    order.forEach(function (key) {
      var el = grid.querySelector('[data-card="' + key + '"]');
      if (el) grid.appendChild(el);
    });
  }

  var select = document.querySelector('[data-persona]');
  if (select) {
    var saved = localStorage.getItem('apd-persona') || 'builder';
    select.value = saved;
    reorderCards(saved);
    select.addEventListener('change', function () {
      localStorage.setItem('apd-persona', select.value);
      reorderCards(select.value);
    });
  }
})();

