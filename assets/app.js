/* ═══════════════════════════════════════════════════════════
   LabPilot — Landing Page Interactivity
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
  /* ── Load config ─────────────────────────────────────── */
  let CFG = {};
  let DEMO = [];
  try {
    const cfgResp = await fetch('config/site.config.json');
    CFG = await cfgResp.json();
  } catch (e) { console.warn('Config load failed, using defaults', e); }
  try {
    const demoResp = await fetch('assets/demo-data.json');
    DEMO = await demoResp.json();
  } catch (e) { console.warn('Demo data load failed', e); }

  /* ── Populate from config ────────────────────────────── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  if (CFG.productName) {
    const heroTitle = $('#hero-title');
    if (heroTitle) heroTitle.textContent = CFG.productName;
    document.title = `${CFG.productName} — ${CFG.subtitle || 'Research Workspace'}`;
    $$('.brand-name').forEach(el => { el.textContent = CFG.productName; });
  }
  if (CFG.tagline) {
    const el = $('#hero-tagline');
    if (el) el.textContent = CFG.tagline;
  }
  if (CFG.description) {
    const el = $('#hero-description');
    if (el) el.textContent = CFG.description;
  }
  if (CFG.subtitle) {
    $$('.brand-subtitle').forEach(el => { el.textContent = CFG.subtitle; });
  }
  if (CFG.githubUrl) {
    $$('.github-link').forEach(el => { el.href = CFG.githubUrl; });
  }

  /* ── Stats from config ───────────────────────────────── */
  if (CFG.stats) {
    const s = CFG.stats;
    const map = { 'stat-projects': s.projects, 'stat-papers': s.papers, 'stat-steps': s.steps, 'stat-reports': s.reports };
    for (const [id, val] of Object.entries(map)) {
      const el = document.getElementById(id);
      if (el && val != null) el.setAttribute('data-target', val);
    }
  }

  /* ── Render quickstart cards from config ─────────────── */
  const qsGrid = $('#qs-grid');
  if (qsGrid && CFG.quickstart) {
    qsGrid.innerHTML = CFG.quickstart.map(step => `
      <div class="qs-card reveal">
        <div class="qs-num">${step.num}</div>
        <h3>${step.title}</h3>
        <div class="qs-bullets">
          <div class="qs-bullet-group">
            <h4>What you do</h4>
            <ul>${step.whatYouDo.map(b => `<li>${b}</li>`).join('')}</ul>
          </div>
          <div class="qs-bullet-group">
            <h4>What you get</h4>
            <ul>${step.whatYouGet.map(b => `<li>${b}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="qs-code">${escHtml(step.code)}</div>
      </div>
    `).join('');
  }

  /* ── Render features from config ─────────────────────── */
  const featContainer = $('#features-container');
  if (featContainer && CFG.features) {
    const clusters = [
      { key: 'literature', label: 'Literature Intelligence' },
      { key: 'execution', label: 'Execution Discipline' },
      { key: 'reporting', label: 'Reporting & Traceability' },
    ];
    featContainer.innerHTML = clusters.map(c => {
      const items = CFG.features[c.key] || [];
      return `
        <div class="features-cluster">
          <div class="features-cluster-label">${c.label}</div>
          <div class="features-grid">
            ${items.map(f => `
              <div class="feature-card reveal">
                <div class="feature-icon">${f.icon}</div>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  /* ── Render FAQ from config ──────────────────────────── */
  const faqList = $('#faq-list');
  if (faqList && CFG.faq) {
    faqList.innerHTML = CFG.faq.map(f => `
      <div class="faq-item">
        <div class="faq-q" role="button" tabindex="0" aria-expanded="false">${escHtml(f.q)}</div>
        <div class="faq-a" role="region">${escHtml(f.a)}</div>
      </div>
    `).join('');
  }

  /* ── Demo Showcase ───────────────────────────────────── */
  const demoGrid = $('#demo-grid');
  const demoSearch = $('#demo-search');
  const demoFilter = $('#demo-filter');
  const demoCount = $('#demo-count');

  // Collect all unique tags
  const allTags = [...new Set(DEMO.flatMap(p => p.tags))].sort();
  if (demoFilter) {
    demoFilter.innerHTML = '<option value="">All tags</option>' +
      allTags.map(t => `<option value="${t}">${t}</option>`).join('');
  }

  function renderDemoCards() {
    if (!demoGrid) return;
    const query = (demoSearch?.value || '').toLowerCase();
    const tag = demoFilter?.value || '';
    const filtered = DEMO.filter(p => {
      const matchQ = !query || p.title.toLowerCase().includes(query) || p.definition.toLowerCase().includes(query) || p.tags.some(t => t.includes(query));
      const matchT = !tag || p.tags.includes(tag);
      return matchQ && matchT;
    });
    if (demoCount) demoCount.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;

    demoGrid.innerHTML = filtered.map(p => {
      const statusClass = p.status === 'Active' ? 'badge-success' : (p.status === 'Paused' ? 'badge-warning' : 'badge-muted');
      return `
        <div class="demo-card reveal" data-id="${p.id}">
          <div class="demo-card-top">
            <h4>${escHtml(p.title)}</h4>
            <span class="badge ${statusClass}">${p.status}</span>
          </div>
          <div class="demo-card-def">${escHtml(p.definition)}</div>
          <div class="demo-card-tags">
            ${p.tags.map(t => `<span class="badge badge-accent">${t}</span>`).join('')}
          </div>
          <div class="demo-card-metrics">
            <span><strong>${p.papers}</strong> papers</span>
            <span><strong>${p.steps}</strong> steps</span>
            <span><strong>${p.artifacts}</strong> artifacts</span>
          </div>
          <div class="demo-card-progress">
            <div class="demo-card-progress-item">
              <div class="label"><span>VC</span><span>${p.vcProgress}%</span></div>
              <div class="bar"><div class="fill fill-vc" style="width:${p.vcProgress}%"></div></div>
            </div>
            <div class="demo-card-progress-item">
              <div class="label"><span>VR</span><span>${p.vrProgress}%</span></div>
              <div class="bar"><div class="fill fill-vr" style="width:${p.vrProgress}%"></div></div>
            </div>
          </div>
          <div class="demo-card-footer">
            <span>${p.lastUpdated}</span>
            <button class="demo-card-expand" aria-expanded="false">Show details ▾</button>
          </div>
          <div class="demo-card-detail">
            <h5>Example Steps</h5>
            <ul>${(p.exampleSteps || []).map(s => `<li>${escHtml(s)}</li>`).join('')}</ul>
            <h5>Example Artifacts</h5>
            <ul>${(p.exampleArtifacts || []).map(a => `<li>${escHtml(a)}</li>`).join('')}</ul>
          </div>
        </div>
      `;
    }).join('');

    // Re-observe for scroll reveal
    initRevealObserver();
    // Re-bind expand buttons
    demoGrid.querySelectorAll('.demo-card-expand').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.demo-card');
        const isExpanded = card.classList.toggle('expanded');
        btn.textContent = isExpanded ? 'Hide details ▴' : 'Show details ▾';
        btn.setAttribute('aria-expanded', isExpanded);
      });
    });
  }

  if (demoSearch) demoSearch.addEventListener('input', renderDemoCards);
  if (demoFilter) demoFilter.addEventListener('change', renderDemoCards);
  renderDemoCards();

  /* ── FAQ toggle ──────────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.parentElement;
    $$('.faq-item.open').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    const open = item.classList.toggle('open');
    q.setAttribute('aria-expanded', open);
  });

  /* ── Sticky nav shadow ───────────────────────────────── */
  const nav = $('nav.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ───────────────────────────────── */
  const mobileToggle = $('.nav-mobile-toggle');
  const navLinks = $('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  /* ── Scroll reveal (IntersectionObserver) ────────────── */
  function initRevealObserver() {
    const revealEls = $$('.reveal:not(.visible)');
    if (!revealEls.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }
  initRevealObserver();

  /* ── Active nav + TOC highlight ──────────────────────── */
  const sectionIds = ['quickstart', 'demo', 'literature', 'features', 'docs', 'faq'];
  const navAnchors = $$('.nav-links a[href^="#"]');
  const tocAnchors = $$('.toc a[href^="#"]');

  function updateActive() {
    let current = '';
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 100) current = id;
    }
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
    tocAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* ── Animated stat counters ──────────────────────────── */
  let statsAnimated = false;
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
        statsObs.unobserve(statsSection);
      }
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
  }

  function animateCounters() {
    $$('.stat-number').forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || el.textContent.replace(/,/g, ''), 10);
      if (isNaN(target)) return;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = current >= 1000 ? current.toLocaleString() : String(current);
        if (progress < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    });
  }

  /* ── Utility ─────────────────────────────────────────── */
  function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
});
