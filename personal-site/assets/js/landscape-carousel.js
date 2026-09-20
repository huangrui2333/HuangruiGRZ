(function () {
  'use strict';
  var carousel = document.querySelector('.landscape-carousel');
  if (!carousel) return;

  var photos = [
    { src: 'images/landscape/landscape-01.jpg', portrait: false },
    { src: 'images/landscape/landscape-02.jpg', portrait: false },
    { src: 'images/landscape/landscape-06.jpg', portrait: false },
    { src: 'images/landscape/portrait-01.jpg', portrait: true },
    { src: 'images/landscape/portrait-06.jpg', portrait: true },
    { src: 'images/landscape/landscape-07.jpg', portrait: false },
    { src: 'images/landscape/portrait-03.jpg', portrait: true },
    { src: 'images/landscape/landscape-04.jpg', portrait: false },
    { src: 'images/landscape/portrait-02.jpg', portrait: true },
    { src: 'images/landscape/landscape-08.jpg', portrait: false },
    { src: 'images/landscape/portrait-05.jpg', portrait: true },
    { src: 'images/landscape/landscape-05.jpg', portrait: false },
    { src: 'images/landscape/landscape-09.jpg', portrait: false }
  ];
  var total = photos.length;
  var current = 0;
  var timer;
  var cards = {
    left: carousel.querySelector('.landscape-card-left img'),
    current: carousel.querySelector('.landscape-card-current img'),
    right: carousel.querySelector('.landscape-card-right img')
  };
  var number = carousel.querySelector('.landscape-current-number');
  var progress = carousel.querySelector('.landscape-progress span');

  function wrapped(index) {
    return (index + total) % total;
  }

  function render(animate) {
    if (animate) carousel.classList.add('is-changing');
    window.setTimeout(function () {
      var left = wrapped(current - 1);
      var right = wrapped(current + 1);
      setCard(cards.left, left);
      setCard(cards.current, current);
      setCard(cards.right, right);
      cards.current.alt = '当前风景照片，第 ' + (current + 1) + ' 张';
      number.textContent = String(current + 1).padStart(2, '0');
      progress.style.transform = 'scaleX(' + (current + 1) + ')';
      carousel.classList.remove('is-changing');
    }, animate ? 260 : 0);
  }

  function setCard(image, index) {
    var card = image.closest('.landscape-card');
    var photo = photos[index];
    image.src = photo.src;
    card.classList.toggle('is-portrait', photo.portrait);
    card.classList.toggle('is-landscape', !photo.portrait);
  }

  function go(step) {
    current = wrapped(current + step);
    render(true);
    restart();
  }

  function restart() {
    window.clearInterval(timer);
    timer = window.setInterval(function () { go(1); }, 4800);
  }

  carousel.querySelector('.landscape-prev').addEventListener('click', function () { go(-1); });
  carousel.querySelector('.landscape-next').addEventListener('click', function () { go(1); });
  carousel.querySelector('.landscape-card-left').addEventListener('click', function () { go(-1); });
  carousel.querySelector('.landscape-card-right').addEventListener('click', function () { go(1); });
  carousel.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') go(-1);
    if (event.key === 'ArrowRight') go(1);
  });
  carousel.addEventListener('mouseenter', function () { window.clearInterval(timer); });
  carousel.addEventListener('mouseleave', restart);
  carousel.addEventListener('focusin', function () { window.clearInterval(timer); });
  carousel.addEventListener('focusout', restart);

  render(false);
  restart();
}());
