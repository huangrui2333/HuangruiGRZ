(function () {
  var showcase = document.querySelector('.amazon-showcase');
  if (!showcase) return;

  var groups = Array.prototype.slice.call(showcase.querySelectorAll('[data-amazon-group]'));
  var pages = Array.prototype.slice.call(showcase.querySelectorAll('[data-amazon-page]'));
  var current = 0;

  function show(index) {
    current = (index + groups.length) % groups.length;
    groups.forEach(function (group, groupIndex) {
      var active = groupIndex === current;
      group.hidden = !active;
      group.classList.toggle('is-active', active);
    });
    pages.forEach(function (page, pageIndex) {
      var active = pageIndex === current;
      page.classList.toggle('is-active', active);
      page.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  pages.forEach(function (page) {
    page.addEventListener('click', function () {
      show(Number(page.getAttribute('data-amazon-page')));
    });
  });
  showcase.querySelector('.amazon-showcase-prev').addEventListener('click', function () { show(current - 1); });
  showcase.querySelector('.amazon-showcase-next').addEventListener('click', function () { show(current + 1); });
}());
