// Minimal role-based routing for the Start button
(function () {
  var map = {
    builder: "start/builder/",
    pm: "start/pm/",
    founder: "start/founder/"
  };
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var sel = document.getElementById("role");
    var btn = document.getElementById("start-btn");
    if (sel && btn) {
      sel.addEventListener("change", function () { btn.href = map[sel.value] || map.builder; });
    }
  });
})();

