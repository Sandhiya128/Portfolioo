/* ==========================================================================
   SANDHIYA - UI/UX DESIGNER & FRONT-END PORTFOLIO LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. COLOR PALETTE THEME SWITCHER
     -------------------------------------------------------------------------- */
  const paletteBtns = document.querySelectorAll('.palette-btn');
  
  // Set initial theme
  const savedTheme = localStorage.getItem('sandhiya_theme') || 'iris';
  setTheme(savedTheme);

  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-set-theme');
      setTheme(theme);
    });
  });

  function setTheme(themeName) {
    if (themeName === 'iris') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    
    // Update active button state
    paletteBtns.forEach(btn => {
      if (btn.getAttribute('data-set-theme') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    localStorage.setItem('sandhiya_theme', themeName);
  }

  /* --------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & ACTIVE NAVIGATION
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. PROJECT FILTERING LOGIC
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. CASE STUDY MODAL SYSTEM
     -------------------------------------------------------------------------- */
  const modalOverlay = document.getElementById('caseStudyModal');
  const modalContainer = modalOverlay.querySelector('.modal-container');
  const modalClose = modalOverlay.querySelector('.modal-close');
  const openModalBtns = document.querySelectorAll('.open-case-study');

  const caseStudyData = {
    'medicard': {
      title: 'Digital Medicard System - Healthcare UX Case Study',
      category: 'Healthcare UI/UX & Web Solution',
      heroImg: './assets/images/medicard.jpg',
      problem: 'Patients and healthcare providers struggle with scattered paper records, long wait times, and vulnerable data sharing methods during hospital visits.',
      solution: 'Designed a unified digital medicard ecosystem with instant QR record lookup, role-based dashboards for doctors & patients, and strict accessibility standards.',
      role: 'Lead UI/UX Designer & Front-End Developer',
      timeline: '2 Months (2025)',
      tools: 'Figma, Canva, React, JavaScript, MySQL, Prototyping',
      deliverables: ['User Journey Map', 'Figma High-Fi Wireframes', 'Patient Dashboard', 'Doctor Quick-Action Interface', 'Digital Medical QR Card'],
      keyFeatures: [
        'Instant digital access to immunizations, prescriptions, and medical history',
        'Secure doctor-patient encryption & emergency QR card scanning',
        'Intuitive dark-mode dashboard tailored for low eye strain in clinical environments',
        'Eliminated 85% paper usage in trial user workflows'
      ]
    },
    'ecommerce': {
      title: 'Personalized E-Commerce Marketing & AI Customer Experience',
      category: 'AI UX & E-Commerce Mobile App',
      heroImg: './assets/images/ecommerce.jpg',
      problem: 'Generic shopping interfaces lead to high cart abandonment rates and poor engagement due to irrelevant product suggestions.',
      solution: 'Crafted an AI-driven personalized shopping interface featuring dynamic recommendation flows, personalized preference analytics, and seamless one-tap checkout.',
      role: 'UI/UX Designer',
      timeline: '1.5 Months (2025)',
      tools: 'Figma, User Research, A/B Testing, CSS3 Animations, React',
      deliverables: ['A/B Tested Recommendation Wireframes', 'Dynamic Shopping App UI', 'Customer Interest Dashboard', 'Design System Kit'],
      keyFeatures: [
        'Smart interest-based product carousel with smooth hover feedback',
        'Real-time customer preference analytics for shoppers',
        'High-converting micro-interactions on cart add and wishlist actions',
        'Boosted simulated user conversion rate by +32%'
      ]
    },
    'aurora-ui': {
      title: 'Aurora UI Design System & Interactive Component Token Library',
      category: 'Design System & Component Library',
      heroImg: './assets/images/design-system.jpg',
      problem: 'Building digital products without standard design guidelines leads to visual clutter, inconsistent spacing, and accessible contrast issues.',
      solution: 'Engineered a multi-theme, fully compliant UI token framework featuring button variants, glassmorphic cards, typography scale, and WCAG AA color ratios.',
      role: 'UI System Architect & Designer',
      timeline: 'Ongoing Personal Project',
      tools: 'Figma Tokens, CSS Custom Variables, Vanilla JS, HTML5',
      deliverables: ['Design Token Architecture', 'Figma Auto-Layout Component Specs', 'Interactive Web Playground', 'Accessibility Audit Documentation'],
      keyFeatures: [
        '4 curated high-contrast theme color palettes (Obsidian Iris, Emerald, Sunset, Pearl)',
        'Fluid typography scale driven by CSS clamp math',
        'Reusable UI components with active states & keyframe animations',
        '100% WCAG AA contrast compliance'
      ]
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = caseStudyData[projectId];

      if (data) {
        modalOverlay.querySelector('#modalTitle').textContent = data.title;
        modalOverlay.querySelector('#modalCategory').textContent = data.category;
        modalOverlay.querySelector('#modalHeroImg').src = data.heroImg;
        modalOverlay.querySelector('#modalProblem').textContent = data.problem;
        modalOverlay.querySelector('#modalSolution').textContent = data.solution;
        modalOverlay.querySelector('#modalRole').textContent = data.role;
        modalOverlay.querySelector('#modalTimeline').textContent = data.timeline;
        modalOverlay.querySelector('#modalTools').textContent = data.tools;

        // Populate Deliverables
        const delivList = modalOverlay.querySelector('#modalDeliverables');
        delivList.innerHTML = data.deliverables.map(item => `<li>✨ ${item}</li>`).join('');

        // Populate Key Features
        const featList = modalOverlay.querySelector('#modalFeatures');
        featList.innerHTML = data.keyFeatures.map(item => `<li>🚀 ${item}</li>`).join('');

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  /* --------------------------------------------------------------------------
     5. INTERACTIVE COMPONENT PLAYGROUND IN STUDIO SECTION
     -------------------------------------------------------------------------- */
  const demoInput = document.getElementById('demoInput');
  const demoInputLabel = document.getElementById('demoInputLabel');
  const demoBtn = document.getElementById('demoBtn');

  if (demoInput && demoInputLabel) {
    demoInput.addEventListener('input', (e) => {
      const val = e.target.value;
      demoInputLabel.textContent = val ? `Previewing: "${val}"` : 'Type something to test dynamic UI update...';
    });
  }

  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      showToast('🎉 Interactive UI Button Clicked!');
    });
  }

  /* --------------------------------------------------------------------------
     6. CONTACT FORM & EMAIL COPYING
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();

      if (name && email) {
        showToast(`Thank you ${name}! Your message has been sent to Sandhiya.`);
        contactForm.reset();
      } else {
        showToast('Please fill out all required fields.');
      }
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'sandhiya7853@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Email copied to clipboard: sandhiya7853@gmail.com');
      }).catch(() => {
        showToast('Email: sandhiya7853@gmail.com');
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. TOAST NOTIFICATION SYSTEM
     -------------------------------------------------------------------------- */
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span>⚡</span> ${message}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

});
