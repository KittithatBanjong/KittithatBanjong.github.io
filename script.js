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

  // Reveal on scroll using IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const ro = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          ro.unobserve(entry.target);
        }
      });
    },{threshold:0.18});
    revealEls.forEach(el=>ro.observe(el));
  } else {
    // fallback
    revealEls.forEach(el=>el.classList.add('in-view'));
  }

  // Animate skill bars when skills section enters
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillsSection = document.getElementById('skills');
  if(skillsSection && 'IntersectionObserver' in window){
    const so = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          skillFills.forEach(f=>{
            const v = f.getAttribute('data-fill') || '60';
            f.style.width = v + '%';
          });
          so.unobserve(skillsSection);
        }
      });
    },{threshold:0.3});
    so.observe(skillsSection);
  } else {
    skillFills.forEach(f=>f.style.width = (f.getAttribute('data-fill')||'60') + '%');
  }

  // Interactive tilt for hero card
  const heroCard = document.querySelector('.hero-card.interactive-tilt');
  if(heroCard){
    const rect = ()=>heroCard.getBoundingClientRect();
    heroCard.addEventListener('pointermove', (ev)=>{
      const r = rect();
      const px = ev.clientX - r.left;
      const py = ev.clientY - r.top;
      const cx = r.width/2; const cy = r.height/2;
      const dx = (px - cx) / cx; const dy = (py - cy) / cy;
      const rotateX = (dy * 6).toFixed(2);
      const rotateY = (-dx * 8).toFixed(2);
      heroCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    heroCard.addEventListener('pointerleave', ()=>{ heroCard.style.transform = ''; });
  }
});
