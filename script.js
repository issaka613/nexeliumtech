

document.addEventListener('DOMContentLoaded', () => {


  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 30
      ? '0 4px 30px rgba(0,0,0,.13)'
      : '0 2px 24px rgba(0,0,0,.07)';
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id], div[id="hero"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
  });


  /* ──────────────────────────────────
     2. HERO PARTICLES
  ────────────────────────────────── */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const colors = ['rgba(30,144,255,0.5)', 'rgba(0,212,255,0.4)', 'rgba(255,255,255,0.3)'];
    const count  = 28;

    for (let i = 0; i < count; i++) {
      const p   = document.createElement('div');
      p.classList.add('particle');

      const size   = Math.random() * 5 + 2;
      const left   = Math.random() * 100;
      const delay  = Math.random() * 12;
      const dur    = Math.random() * 10 + 8;
      const color  = colors[Math.floor(Math.random() * colors.length)];

      Object.assign(p.style, {
        width:            `${size}px`,
        height:           `${size}px`,
        left:             `${left}%`,
        bottom:           `-${size}px`,
        background:       color,
        animationDuration:`${dur}s`,
        animationDelay:   `${delay}s`,
      });

      particleContainer.appendChild(p);
    }
  }


  /* ──────────────────────────────────
     3. SCROLL REVEAL (lightweight AOS alternative)
  ────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.hero-content, .hero-visual, .about-visual, .about-content, ' +
    '.service-card, .services-header, .industry-visual, .industry-content, ' +
    '.stat-item, .testimonials-header, .testimonial-card, ' +
    '.contact-info, .contact-form, .faq-header, .faq-item'
  );

  // Set initial hidden state
  revealEls.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .65s ease, transform .65s ease';
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────
     4. COUNTER ANIMATION (Stats section)
  ────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num[data-count]');

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const dur    = 1800; // ms
        const step   = 16;
        const inc    = target / (dur / step);
        let   cur    = 0;

        const timer = setInterval(() => {
          cur += inc;
          if (cur >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(cur).toLocaleString();
          }
        }, step);

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statNums.forEach(el => countObserver.observe(el));


  /* ──────────────────────────────────
     5. TESTIMONIALS SLIDER
  ────────────────────────────────── */
  const cards = document.querySelectorAll('.testimonial-card');
  const dots  = document.querySelectorAll('.dot');
  let   current = 0;
  let   autoSlide;

  if (cards.length && dots.length) {
    function goTo(index) {
      if (!cards[current] || !dots[current]) return;
      cards[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + cards.length) % cards.length;
      if (!cards[current] || !dots[current]) return;
      cards[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startAuto() {
      autoSlide = setInterval(() => goTo(current + 1), 5000);
    }
    function stopAuto() { clearInterval(autoSlide); }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAuto();
        goTo(parseInt(dot.getAttribute('data-i')));
        startAuto();
      });
    });

    startAuto();
  }


  /* ──────────────────────────────────
     6. INDUSTRY TABS
  ────────────────────────────────── */
  const tabBtns     = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));

      btn.classList.add('active');
      const tc = document.getElementById(`tab-${target}`);
      if (tc) tc.classList.add('active');
    });
  });


  /* ──────────────────────────────────
     7. FAQ ACCORDION
  ────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });


  /* ──────────────────────────────────
     8. CONTACT FORM
  ────────────────────────────────── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');

      // Simulate sending
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        success.style.display  = 'block';
        submitBtn.disabled     = false;
        submitBtn.innerHTML    = 'Send Message <i class="fas fa-paper-plane"></i>';
        form.reset();

        setTimeout(() => {
          success.style.display = 'none';
        }, 5000);
      }, 1400);
    });
  }


  /* ──────────────────────────────────
     9. ABOUT SECTION – slide arrows (cosmetic)
  ────────────────────────────────── */
  const slideTexts = [
    { icon: 'fas fa-users',         label: 'Our Team at Work'    },
    { icon: 'fas fa-laptop-code',   label: 'Engineering Experts' },
    { icon: 'fas fa-chart-line',    label: 'Growth & Strategy'   },
  ];
  let slideIdx = 0;

  const aboutBox = document.querySelector('.about-img-box');

  function updateSlide() {
    if (!aboutBox) return;
    const { icon, label } = slideTexts[slideIdx];
    const i = aboutBox.querySelector('i');
    const p = aboutBox.querySelector('p');
    if (i) { i.className = icon; }
    if (p) { p.textContent = label; }
  }

  document.getElementById('prevSlide')?.addEventListener('click', () => {
    slideIdx = (slideIdx - 1 + slideTexts.length) % slideTexts.length;
    updateSlide();
  });
  document.getElementById('nextSlide')?.addEventListener('click', () => {
    slideIdx = (slideIdx + 1) % slideTexts.length;
    updateSlide();
  });


  /* ──────────────────────────────────
     10. SCROLL-TO-TOP BUTTON
  ────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
  });


  /* ──────────────────────────────────
     11. SMOOTH ANCHOR SCROLL
  ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ──────────────────────────────────
     12. SERVICE CARDS – staggered reveal
  ────────────────────────────────── */
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });

  console.log('✅ CodeNova Solutions – JS loaded.');

});


  /* ──────────────────────────────────
     12. SERVICE formation digitale
  ────────────────────────────────── */
const categories = {
  bureau:  { label: "Bureautique & Gestion",   color: "var(--c-bureau)" },
  dev:     { label: "Développement",           color: "var(--c-dev)" },
  cyber:   { label: "Cybersécurité",            color: "var(--c-cyber)" },
  data:    { label: "Data & Analyse",           color: "var(--c-data)" },
  reseau:  { label: "Réseau & Systèmes",        color: "var(--c-reseau)" },
  manage:  { label: "Management & Marketing",   color: "var(--c-manage)" },
};

const courses = [
  {
    id: "01", symbol: "Bu", cat: "bureau",
    name: "Bureautique appliquée",
    desc: "Maîtrisez Word, Excel et PowerPoint pour produire des documents professionnels et des tableaux de bord fiables au quotidien.",
    duree: "4 semaines", niveau: "Débutant", format: "Présentiel", cert: "Oui"
  },
  {
    id: "02", symbol: "Dw", cat: "dev",
    name: "Développement Web",
    desc: "Construisez des sites et applications avec HTML, CSS et JavaScript, de la première page à un projet déployé en ligne.",
    duree: "10 semaines", niveau: "Débutant à intermédiaire", format: "Hybride", cert: "Oui"
  },
  {
    id: "03", symbol: "Cs", cat: "cyber",
    name: "Cybersécurité fondamentale",
    desc: "Identifiez les menaces courantes et mettez en place les bonnes pratiques de protection pour un poste ou un réseau d'entreprise.",
    duree: "6 semaines", niveau: "Intermédiaire", format: "Présentiel", cert: "Oui"
  },
  {
    id: "04", symbol: "Da", cat: "data",
    name: "Data & Excel avancé",
    desc: "Analysez des données, construisez des tableaux croisés dynamiques et automatisez vos rapports avec les fonctions avancées d'Excel.",
    duree: "5 semaines", niveau: "Intermédiaire", format: "Hybride", cert: "Oui"
  },
  {
    id: "05", symbol: "Ir", cat: "reseau",
    name: "Réseaux & Systèmes",
    desc: "Installez, configurez et administrez des infrastructures réseau et des serveurs, en environnement Windows et Linux.",
    duree: "8 semaines", niveau: "Intermédiaire", format: "Présentiel", cert: "Oui"
  },
  {
    id: "06", symbol: "Gp", cat: "manage",
    name: "Gestion de projet digital",
    desc: "Pilotez des projets numériques avec les méthodes agiles : planification, suivi d'équipe et livraison itérative.",
    duree: "4 semaines", niveau: "Tous niveaux", format: "En ligne", cert: "Oui"
  },
  {
    id: "07", symbol: "Md", cat: "manage",
    name: "Marketing digital",
    desc: "Développez une présence de marque efficace sur les réseaux sociaux et mesurez l'impact réel de vos campagnes.",
    duree: "5 semaines", niveau: "Débutant", format: "En ligne", cert: "Oui"
  },
  {
    id: "08", symbol: "Cd", cat: "dev",
    name: "Cloud & DevOps essentiels",
    desc: "Déployez et automatisez vos applications avec les outils cloud et les pratiques DevOps utilisés en entreprise.",
    duree: "7 semaines", niveau: "Avancé", format: "Hybride", cert: "Oui"
  },
];

const grid = document.getElementById('grid');
const legend = document.getElementById('legend');
const emptyMsg = document.getElementById('emptyMsg');
let activeFilter = null;

function buildLegend(){
  const allChip = document.createElement('button');
  allChip.className = 'chip active';
  allChip.type = 'button';
  allChip.innerHTML = `<span class="dot" style="background:#8b96ac"></span> Toutes`;
  allChip.addEventListener('click', () => setFilter(null, allChip));
  legend.appendChild(allChip);

  Object.entries(categories).forEach(([key, cat]) => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.type = 'button';
    chip.style.setProperty('color', cat.color);
    chip.innerHTML = `<span class="dot" style="background:${cat.color}"></span> ${cat.label}`;
    chip.addEventListener('click', () => setFilter(key, chip, cat.color));
    legend.appendChild(chip);
  });

  legend.prepend(allChip);
}

function setFilter(key, chipEl, color){
  activeFilter = key;
  [...legend.children].forEach(c => { c.classList.remove('active'); c.style.borderColor = ''; });
  chipEl.classList.add('active');
  if(color) chipEl.style.borderColor = color;
  renderGrid();
}

function buildGrid(){
  courses.forEach(course => {
    const cat = categories[course.cat];
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'tile';
    tile.dataset.cat = course.cat;
    tile.style.setProperty('--tile-color', cat.color);
    tile.innerHTML = `
      <div class="tile-top">
        <span class="tile-id mono">Nx-${course.id}</span>
        <span class="tile-level mono">${cat.label}</span>
      </div>
      <div class="tile-symbol">${course.symbol}</div>
      <div>
        <div class="tile-name">${course.name}</div>
        <div class="tile-meta">${course.duree} · ${course.niveau}</div>
      </div>
    `;
    tile.addEventListener('click', () => openModal(course));
    grid.appendChild(tile);
  });
}

function renderGrid(){
  let visibleCount = 0;
  [...grid.children].forEach((tile, i) => {
    const course = courses[i];
    const match = !activeFilter || course.cat === activeFilter;
    tile.classList.toggle('hidden', !match);
    if(match) visibleCount++;
  });
  emptyMsg.classList.toggle('show', visibleCount === 0);
}

const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

function openModal(course){
  const cat = categories[course.cat];
  modal.style.setProperty('--tile-color', cat.color);
  document.getElementById('modalSymbol').textContent = course.symbol;
  document.getElementById('modalCat').textContent = cat.label;
  document.getElementById('modalTitle').textContent = course.name;
  document.getElementById('modalDesc').textContent = course.desc;
  document.getElementById('modalDuree').textContent = course.duree;
  document.getElementById('modalNiveau').textContent = course.niveau;
  document.getElementById('modalFormat').textContent = course.format;
  document.getElementById('modalCert').textContent = course.cert;
  overlay.classList.add('open');
  document.getElementById('modalClose').focus();
}

function closeModal(){
  overlay.classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });
document.getElementById('modalCTA').addEventListener('click', closeModal);

buildLegend();
buildGrid();

