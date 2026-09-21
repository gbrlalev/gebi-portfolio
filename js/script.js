// ============================================
// FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);
  mobileMenu.classList.toggle('flex', menuOpen);
  menuBtn.setAttribute('aria-expanded', String(menuOpen));

  // animate hamburger -> X
  bar1.style.transform = menuOpen ? 'translateY(6px) rotate(45deg)' : '';
  bar3.style.transform = menuOpen ? 'translateY(-6px) rotate(-45deg)' : '';
  bar2.style.opacity = menuOpen ? '0' : '1';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuBtn.setAttribute('aria-expanded', 'false');
    bar1.style.transform = '';
    bar3.style.transform = '';
    bar2.style.opacity = '1';
  });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ============================================
// SCROLLSPY — highlight active nav link based on visible section
// ============================================
const sections = document.querySelectorAll('section[id], header[id]');
const navLinksDesktop = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksDesktop.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => spyObserver.observe(section));

// ============================================
// SCROLL REVEAL — fade+slide elements into view once
// ============================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ============================================
// PROJECT FILTER
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('hidden-card', !match);
    });
  });
});

// ============================================
// CONTACT FORM — build a mailto link (no backend needed)
// ============================================
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);

  window.location.href = `mailto:email@example.com?subject=${subject}&body=${body}`;

  formNote.classList.remove('hidden');
});

// ============================================
// CERTIFICATE STACK — card persisten, transform di-update (biar animasi jalan)
// ============================================
const certData = [
  {
    title: "FTI Competition 2026 - BEM FTI Untar",
    org: "Event Executive Secretary",
    desc: "Managed event administration, logistics, and on-site operations for a 4-day sports competition in collaboration with Alter Ego Esports (Mobile Legends), overseeing documentation, equipment, and event coordination that was held on 26-29 June 2026 at Universitas Tarumanagara, Jakarta.",
    img: "assets/images/certificates/FTICOMP26.png",
  },
  {
    title: "I/O Festival 2026 - BEM FTI Untar",
    org: "Coordinator of Administration & Information Division",
    desc: "Coordinated the Adminfor team in content creation, participant management, and event registration, overseeing promotional content, communications, and registration processes to support competition outreach that was held on 4-5 June 2026 at Universitas Tarumanagara, Jakarta.",
    img: "assets/images/certificates/IO2026.png",
  },
  {
    title: "Desa Binaan 2026 - BEM FTI Untar",
    org: "Member of Fund & Donation Division",
    desc: "Supported media partnerships, sponsorship efforts, and event operations for a 3-day community program, including leading a hands-on craft activity for children that was held on 16-18 January 2026 at Desa Cireme.",
    img: "assets/images/certificates/DESBIN2026.png",
  },
];

const certOffsets = [
  { rot: -3, x: 1, y: 0 },
  { rot: 5, x: 4, y: 3 },
  { rot: -7, x: -3, y: 5 },
];

const certStackEl = document.getElementById('cert-stack');
let certSlotOrder = certData.map((_, i) => i); // certSlotOrder[slot] = certIndex
let certFlipped = false;
const certEls = [];

function buildCertCards() {
  if (!certStackEl) return;

  certData.forEach((cert, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.innerHTML = `
      <div class="cert-face cert-face-front">
        <img src="${cert.img}" alt="${cert.title}" />
        <div class="cert-caption">
          <p>${cert.title}</p>
          <p>${cert.org}</p>
        </div>
      </div>
      <div class="cert-face cert-face-back">
        <p>${cert.title}</p>
        <p>${cert.desc}</p>
      </div>
    `;
    certEls[i] = card;
    certStackEl.appendChild(card);
  });

  certStackEl.addEventListener('click', handleCertClick);
  certStackEl.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('cert-top')) {
      e.preventDefault();
      handleCertClick(e);
    }
  });

  applyCertLayout();
}

function handleCertClick(e) {
  const clickedCard = e.target.closest('.cert-card');
  if (!clickedCard || !clickedCard.classList.contains('cert-top')) return;

  certFlipped = !certFlipped;
  if (!certFlipped) {
    certSlotOrder.push(certSlotOrder.shift());
  }
  applyCertLayout();
}

function applyCertLayout() {
  certSlotOrder.forEach((certIdx, slot) => {
    const el = certEls[certIdx];
    const offset = certOffsets[slot];
    const isTop = slot === 0;

    el.style.zIndex = String(10 - slot);
    el.style.transform = `translate(${offset.x}%, ${offset.y}%) rotate(${offset.rot}deg) ${isTop && certFlipped ? 'rotateY(180deg)' : ''}`;
    el.classList.toggle('cert-top', isTop);

    if (isTop) {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', certFlipped ? 'Lihat kartu berikutnya' : `Lihat detail: ${certData[certIdx].title}`);
    } else {
      el.removeAttribute('tabindex');
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
    }
  });
}

buildCertCards();