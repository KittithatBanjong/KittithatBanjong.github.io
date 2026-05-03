document.addEventListener('DOMContentLoaded', function(){
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for internal links (enhanced)
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      const target = this.getAttribute('href');
      if(target.length > 1){
        const el = document.querySelector(target);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
          // close mobile nav if open
          const nav = document.querySelector('.main-nav');
          const toggle = document.querySelector('.nav-toggle');
          if(toggle && toggle.getAttribute('aria-expanded') === 'true'){
            toggle.setAttribute('aria-expanded','false');
            nav.classList.remove('open');
          }
        }
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', function(){
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Highlight nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  function onScroll(){
    const scrollPos = window.scrollY + 100;
    sections.forEach(function(sec){
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      if(scrollPos >= top && scrollPos < bottom){
        navLinks.forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#'+id);
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});
