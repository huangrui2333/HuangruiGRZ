(function () {
  'use strict';

  var about = document.getElementById('about');
  if (!about) return;

  var selectors = [
    '.about-title',
    '.about-lead',
    '.ability-meta',
    '.ability-card h3',
    '.ability-card p',
    '.about-summary h3',
    '.about-summary p'
  ];
  var textItems = Array.prototype.slice.call(about.querySelectorAll(selectors.join(',')));
  var midline = document.createElement('div');
  midline.className = 'about-midline';
  midline.setAttribute('aria-hidden', 'true');
  document.body.appendChild(midline);

  textItems.forEach(function (item) {
    item.classList.add('about-focus-text');
  });

  var scheduled = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function render() {
    scheduled = false;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var viewportMiddle = viewportHeight / 2;
    var fadeDistance = Math.max(viewportHeight * 0.38, 240);
    var aboutRect = about.getBoundingClientRect();
    var aboutVisible = aboutRect.bottom > 0 && aboutRect.top < viewportHeight;

    midline.classList.toggle('is-visible', aboutVisible);

    textItems.forEach(function (item) {
      var rect = item.getBoundingClientRect();
      var itemMiddle = rect.top + rect.height / 2;
      var distance = itemMiddle - viewportMiddle;
      var above = clamp(-distance / fadeDistance, 0, 1);
      var below = clamp(distance / fadeDistance, 0, 1);

      item.style.setProperty('--about-opacity', (1 - below * 0.2).toFixed(3));
      item.style.setProperty('--about-brightness', (1 - above * 0.1).toFixed(3));
      item.style.setProperty('--about-scale', (1 + above * 0.1).toFixed(3));
    });
  }

  function requestRender() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(render);
  }

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender);
  window.addEventListener('load', requestRender);
  requestRender();
}());
