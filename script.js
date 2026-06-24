// ═══ COUNTDOWN TIMER ═══
(function () {
  var deadline = new Date();
  deadline.setDate(deadline.getDate() + 3);
  deadline.setHours(deadline.getHours() + 2);
  deadline.setMinutes(deadline.getMinutes() + 6);
  deadline.setSeconds(deadline.getSeconds() + 51);

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var diff = Math.max(0, deadline - new Date());
    var days  = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins  = Math.floor((diff % 3600000) / 60000);
    var secs  = Math.floor((diff % 60000) / 1000);

    var set = function (id, val) {
      var el = document.getElementById(id);
      if (el && el.textContent !== val) el.textContent = val;
    };

    set('cd-days',  pad(days));
    set('cd-hours', pad(hours));
    set('cd-mins',  pad(mins));
    set('cd-secs',  pad(secs));

    var fEl = document.getElementById('final-countdown');
    if (fEl) fEl.textContent = days + ' ngày ' + pad(hours) + ':' + pad(mins) + ':' + pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// ═══ FAQ ACCORDION ═══
function toggleFaq(btn) {
  var item   = btn.parentElement;
  var answer = item.querySelector('.faq-a');
  var isOpen = btn.classList.contains('open');

  document.querySelectorAll('.faq-q.open').forEach(function (b) {
    b.classList.remove('open');
    b.parentElement.classList.remove('open-item');
    b.parentElement.querySelector('.faq-a').classList.remove('show');
  });

  if (!isOpen) {
    btn.classList.add('open');
    item.classList.add('open-item');
    answer.classList.add('show');
  }
}

// ═══ SCROLL REVEAL ═══
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el, i) {
    el.style.transitionDelay = (i % 6) * 0.07 + 's';
    observer.observe(el);
  });
})();

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = a.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ═══ STICKY HEADER ═══
window.addEventListener('scroll', function () {
  var h = document.querySelector('.header');
  if (h) h.style.boxShadow = window.scrollY > 40 ? '0 4px 40px rgba(0,0,0,0.6)' : 'none';
}, { passive: true });

// ═══ BOOK HOVER EFFECT ═══
(function () {
  var scene = document.querySelector('.book-scene');
  if (!scene) return;
  scene.addEventListener('mousemove', function (e) {
    var rect = scene.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var rotY = ((e.clientX - cx) / rect.width) * 20 - 10;
    scene.style.animation = 'none';
    scene.style.transform = 'translateY(-8px) rotateY(' + (-15 + rotY) + 'deg)';
  });
  scene.addEventListener('mouseleave', function () {
    scene.style.animation = '';
    scene.style.transform = '';
  });
})();

// ═══ COUNT-UP ANIMATION FOR STATS ═══
(function () {
  var stats = document.querySelectorAll('.stat-number');
  var animated = false;

  var observer = new IntersectionObserver(function (entries) {
    if (animated) return;
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animated = true;
        stats.forEach(function (el) {
          el.style.opacity = '0';
          setTimeout(function () {
            el.style.transition = 'opacity 0.4s';
            el.style.opacity = '1';
          }, 100);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (stats[0]) observer.observe(stats[0]);
})();
