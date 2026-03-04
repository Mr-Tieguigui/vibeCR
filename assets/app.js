/* ═══════════════════════════════════════════════════════════
   LitPulse — Landing Page Interactivity
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 60-Entry Demo Dataset ───────────────────────────── */
  const DEMO_DATA = [
    { title:"Transformer Scaling Laws Survey", domain:"Survey / Meta-Research", summary:"Meta-analysis of 200+ scaling experiments across model families.", papers:87, steps:34, artifacts:12, updated:"2025-02-28" },
    { title:"Agent Eval Benchmark Suite", domain:"Agent Evaluation", summary:"Standardized evaluation harness for tool-using LLM agents.", papers:42, steps:18, artifacts:8, updated:"2025-03-01" },
    { title:"Secure Skill Supply Chain", domain:"Security / Supply Chain", summary:"Formal verification of agent skill provenance and integrity.", papers:27, steps:12, artifacts:5, updated:"2025-02-15" },
    { title:"Multimodal Reward Modeling", domain:"Multimodal Reasoning", summary:"Vision-language reward models for RLHF with image grounding.", papers:88, steps:45, artifacts:14, updated:"2025-03-04" },
    { title:"Distributed RAG Caching", domain:"Retrieval / RAG", summary:"Locality-aware cache eviction for multi-tenant RAG systems.", papers:33, steps:22, artifacts:7, updated:"2025-02-20" },
    { title:"Interpretability Constellation", domain:"Interpretability", summary:"Mapping feature circuits across model families using SAEs.", papers:104, steps:60, artifacts:20, updated:"2025-03-02" },
    { title:"On-Device Speculative Decoding", domain:"Long-context", summary:"Efficient speculative decoding for edge deployment.", papers:15, steps:9, artifacts:3, updated:"2025-01-30" },
    { title:"Automated Literature Triage", domain:"Tooling / ResearchOps", summary:"LLM-based pipeline for relevance scoring of new papers.", papers:210, steps:14, artifacts:4, updated:"2025-02-25" },
    { title:"Neurosymbolic Verification", domain:"Verification", summary:"Combining theorem provers with neural code generation.", papers:47, steps:19, artifacts:6, updated:"2025-02-10" },
    { title:"LLM Hallucination Detection", domain:"Alignment / Safety", summary:"Classifier ensemble for detecting factual hallucinations.", papers:76, steps:28, artifacts:9, updated:"2025-03-03" },
    { title:"Sparse Autoencoder Circuits", domain:"Interpretability", summary:"Dictionary learning for mechanistic interpretability.", papers:65, steps:31, artifacts:11, updated:"2025-02-22" },
    { title:"Code Repair Agent Eval", domain:"Agent Evaluation", summary:"Benchmark for automated bug detection and repair agents.", papers:39, steps:17, artifacts:5, updated:"2025-02-18" },
    { title:"Data Contamination Probes", domain:"Benchmarking", summary:"Detecting train-test overlap in foundation model evals.", papers:52, steps:25, artifacts:8, updated:"2025-01-28" },
    { title:"Long-Context Memory Tasks", domain:"Long-context", summary:"Needle-in-haystack variants for 1M+ token contexts.", papers:81, steps:40, artifacts:13, updated:"2025-03-01" },
    { title:"Prompt Engineering Catalog", domain:"Tooling / ResearchOps", summary:"Curated taxonomy of effective prompting strategies.", papers:110, steps:55, artifacts:18, updated:"2025-02-27" },
    { title:"Bias Auditing Toolkit", domain:"Alignment / Safety", summary:"Systematic bias measurement across demographic axes.", papers:44, steps:21, artifacts:7, updated:"2025-02-14" },
    { title:"Knowledge Distillation Pipeline", domain:"Benchmarking", summary:"Multi-stage distillation from 70B to 7B models.", papers:29, steps:11, artifacts:4, updated:"2025-01-25" },
    { title:"Uncertainty Quantification", domain:"Uncertainty / Calibration", summary:"Conformal prediction for LLM output confidence.", papers:58, steps:24, artifacts:9, updated:"2025-02-19" },
    { title:"Robotic Manipulation VLA", domain:"Robotics / VLA", summary:"Vision-language-action model for dexterous manipulation.", papers:36, steps:20, artifacts:6, updated:"2025-03-02" },
    { title:"Causal Discovery from Text", domain:"Causal Reasoning", summary:"Extracting causal DAGs from scientific abstracts.", papers:41, steps:16, artifacts:5, updated:"2025-02-11" },
    { title:"HCI for Research Dashboards", domain:"HCI / Productivity", summary:"User studies on research project management UIs.", papers:22, steps:10, artifacts:3, updated:"2025-01-20" },
    { title:"Data Curation for Pretraining", domain:"Data Curation", summary:"Quality filtering pipelines for web-scale corpora.", papers:95, steps:48, artifacts:15, updated:"2025-03-04" },
    { title:"Federated Learning Survey", domain:"Survey / Meta-Research", summary:"Comprehensive review of FL algorithms and applications.", papers:120, steps:38, artifacts:10, updated:"2025-02-26" },
    { title:"Tool-Augmented Agent Routing", domain:"Agent Evaluation", summary:"Dynamic tool selection and routing for multi-step tasks.", papers:55, steps:27, artifacts:8, updated:"2025-03-01" },
    { title:"Adversarial Prompt Injection", domain:"Security / Supply Chain", summary:"Red-teaming LLMs against indirect prompt injection.", papers:34, steps:15, artifacts:6, updated:"2025-02-16" },
    { title:"Video Understanding Benchmark", domain:"Multimodal Reasoning", summary:"Temporal reasoning evaluation for video-language models.", papers:63, steps:32, artifacts:10, updated:"2025-02-23" },
    { title:"Hybrid Search Architecture", domain:"Retrieval / RAG", summary:"Combining dense, sparse, and knowledge-graph retrieval.", papers:48, steps:26, artifacts:9, updated:"2025-02-21" },
    { title:"Activation Patching Toolkit", domain:"Interpretability", summary:"Causal tracing tools for transformer internals.", papers:37, steps:18, artifacts:5, updated:"2025-02-08" },
    { title:"Efficient Inference Survey", domain:"Survey / Meta-Research", summary:"Quantization, pruning, and distillation methods review.", papers:145, steps:42, artifacts:12, updated:"2025-03-03" },
    { title:"Agentic Workflow Orchestration", domain:"Tooling / ResearchOps", summary:"DAG-based orchestration for multi-agent pipelines.", papers:28, steps:13, artifacts:4, updated:"2025-02-17" },
    { title:"Constitutional AI Variants", domain:"Alignment / Safety", summary:"Comparative study of RLHF vs CAI training approaches.", papers:53, steps:29, artifacts:8, updated:"2025-02-24" },
    { title:"Citation Graph Analytics", domain:"Benchmarking", summary:"Network analysis of citation patterns in ML research.", papers:67, steps:22, artifacts:7, updated:"2025-01-31" },
    { title:"Synthetic Data Generation", domain:"Data Curation", summary:"LLM-based synthetic training data quality analysis.", papers:82, steps:35, artifacts:11, updated:"2025-03-02" },
    { title:"Embodied Navigation Sim", domain:"Robotics / VLA", summary:"Photorealistic simulation environments for robot navigation.", papers:31, steps:14, artifacts:5, updated:"2025-02-12" },
    { title:"Counterfactual Explanations", domain:"Causal Reasoning", summary:"Generating minimal counterfactual edits for model outputs.", papers:39, steps:20, artifacts:6, updated:"2025-02-09" },
    { title:"Research Productivity Metrics", domain:"HCI / Productivity", summary:"Quantifying researcher output using project telemetry.", papers:18, steps:8, artifacts:2, updated:"2025-01-22" },
    { title:"Calibration Under Distribution Shift", domain:"Uncertainty / Calibration", summary:"Maintaining prediction calibration across domains.", papers:46, steps:23, artifacts:7, updated:"2025-02-20" },
    { title:"Formal Verification of NN", domain:"Verification", summary:"SMT-based verification of neural network properties.", papers:54, steps:30, artifacts:9, updated:"2025-02-13" },
    { title:"Multi-Hop QA Benchmark", domain:"Retrieval / RAG", summary:"Complex reasoning chains over retrieved documents.", papers:71, steps:33, artifacts:10, updated:"2025-03-01" },
    { title:"Reward Hacking Detection", domain:"Alignment / Safety", summary:"Identifying reward model exploitation during RLHF.", papers:25, steps:12, artifacts:4, updated:"2025-02-07" },
    { title:"Instruction Tuning Survey", domain:"Survey / Meta-Research", summary:"Methods and datasets for instruction-following training.", papers:98, steps:36, artifacts:11, updated:"2025-02-28" },
    { title:"Autonomous Lab Assistant", domain:"Robotics / VLA", summary:"End-to-end robotic system for wet-lab experiment execution.", papers:20, steps:11, artifacts:3, updated:"2025-01-29" },
    { title:"Graph Neural Network Scaling", domain:"Benchmarking", summary:"Scaling GNNs to billion-edge knowledge graphs.", papers:43, steps:19, artifacts:6, updated:"2025-02-15" },
    { title:"Medical Image VLM", domain:"Multimodal Reasoning", summary:"Vision-language models for radiology report generation.", papers:57, steps:28, artifacts:9, updated:"2025-03-03" },
    { title:"Deduplication at Scale", domain:"Data Curation", summary:"Near-duplicate detection in trillion-token corpora.", papers:35, steps:16, artifacts:5, updated:"2025-02-10" },
    { title:"Notebook Workflow Automation", domain:"Tooling / ResearchOps", summary:"Auto-generating Jupyter notebooks from experiment specs.", papers:14, steps:7, artifacts:2, updated:"2025-01-18" },
    { title:"Temporal Causal Inference", domain:"Causal Reasoning", summary:"Time-series causal discovery in observational studies.", papers:50, steps:25, artifacts:8, updated:"2025-02-22" },
    { title:"Annotation Interface Design", domain:"HCI / Productivity", summary:"Efficient UIs for large-scale data labeling tasks.", papers:26, steps:13, artifacts:4, updated:"2025-02-06" },
    { title:"Selective Prediction Methods", domain:"Uncertainty / Calibration", summary:"Abstention strategies for high-stakes LLM deployment.", papers:32, steps:17, artifacts:5, updated:"2025-02-18" },
    { title:"Code Proof Synthesis", domain:"Verification", summary:"LLM-guided proof generation for Lean 4 and Coq.", papers:40, steps:22, artifacts:7, updated:"2025-03-01" },
    { title:"Cross-Lingual Transfer", domain:"Long-context", summary:"Extending long-context capabilities to low-resource languages.", papers:38, steps:19, artifacts:6, updated:"2025-02-14" },
    { title:"Red Team Automation", domain:"Security / Supply Chain", summary:"Automated adversarial testing pipelines for LLM APIs.", papers:30, steps:14, artifacts:5, updated:"2025-02-19" },
    { title:"Agent Memory Systems", domain:"Agent Evaluation", summary:"Evaluating episodic and semantic memory in AI agents.", papers:45, steps:23, artifacts:7, updated:"2025-02-25" },
    { title:"Mixture of Experts Survey", domain:"Survey / Meta-Research", summary:"Architecture variants and routing strategies for MoE.", papers:78, steps:30, artifacts:10, updated:"2025-03-02" },
    { title:"Contrastive Decoding Methods", domain:"Benchmarking", summary:"Comparing decoding strategies for factual accuracy.", papers:33, steps:15, artifacts:4, updated:"2025-02-08" },
    { title:"Multilingual RAG Pipeline", domain:"Retrieval / RAG", summary:"Cross-lingual retrieval with language-agnostic embeddings.", papers:49, steps:24, artifacts:8, updated:"2025-02-26" },
    { title:"Feature Attribution Methods", domain:"Interpretability", summary:"Comparing gradient vs attention-based attributions.", papers:60, steps:28, artifacts:9, updated:"2025-02-21" },
    { title:"Sim-to-Real Transfer", domain:"Robotics / VLA", summary:"Bridging the reality gap for robotic manipulation.", papers:42, steps:21, artifacts:6, updated:"2025-02-17" },
    { title:"Dataset Documentation Standards", domain:"Data Curation", summary:"Datasheets, model cards, and nutrition labels for ML.", papers:24, steps:10, artifacts:3, updated:"2025-01-24" },
    { title:"Intervention Design for Causal ML", domain:"Causal Reasoning", summary:"Optimal experiment design using causal graph structure.", papers:36, steps:18, artifacts:5, updated:"2025-02-13" }
  ];

  const DOMAINS = [...new Set(DEMO_DATA.map(d => d.domain))].sort();

  /* ── Populate domain filter ──────────────────────────── */
  const filterEl = $('#demo-filter');
  if (filterEl) {
    DOMAINS.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      filterEl.appendChild(opt);
    });
  }

  /* ── Build ticker HTML from dataset ──────────────────── */
  function buildCard(item) {
    return `<div class="demo-card">
      <div class="demo-card-title">${item.title}</div>
      <div class="demo-card-domain">${item.domain}</div>
      <div class="demo-card-summary">${item.summary}</div>
      <div class="demo-card-metrics">
        <span>${item.papers} papers</span>
        <span>${item.steps} steps</span>
        <span>${item.artifacts} artifacts</span>
      </div>
    </div>`;
  }

  function renderTicker(items) {
    const track = $('#demo-track');
    const ticker = $('#demo-ticker');
    const countEl = $('#demo-count');
    if (!track || !ticker) return;

    // Update count
    if (countEl) countEl.textContent = items.length + ' projects';

    // Stop any running animation
    track.style.animation = 'none';
    track.offsetHeight; // force reflow

    if (items.length === 0) {
      track.innerHTML = '<div class="demo-empty">No projects match your filters.</div>';
      return;
    }

    // Duplicate items enough times for seamless loop (need at least ~20 visible cards width)
    let pool = [...items];
    const minCards = Math.max(20, items.length);
    while (pool.length < minCards * 2) {
      pool = pool.concat(items);
    }

    // Build two identical halves for seamless looping
    const halfHTML = pool.slice(0, pool.length).map(buildCard).join('');
    track.innerHTML = halfHTML + halfHTML;

    // Calculate animation duration based on card count (slower = more cards)
    const totalCards = pool.length * 2;
    const duration = Math.max(30, totalCards * 0.8);

    if (!prefersReducedMotion) {
      track.style.animation = `tickerScroll ${duration}s linear infinite`;
    } else {
      track.style.animation = 'none';
      ticker.style.overflowX = 'auto';
    }
  }

  /* ── Search + Filter Logic ───────────────────────────── */
  function getFilteredData() {
    const searchVal = ($('#demo-search')?.value || '').toLowerCase().trim();
    const domainVal = $('#demo-filter')?.value || '';
    return DEMO_DATA.filter(item => {
      const matchSearch = !searchVal ||
        item.title.toLowerCase().includes(searchVal) ||
        item.summary.toLowerCase().includes(searchVal);
      const matchDomain = !domainVal || item.domain === domainVal;
      return matchSearch && matchDomain;
    });
  }

  const searchEl = $('#demo-search');
  if (searchEl) {
    let debounce;
    searchEl.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => renderTicker(getFilteredData()), 200);
    });
  }
  if (filterEl) {
    filterEl.addEventListener('change', () => renderTicker(getFilteredData()));
  }
  const resetEl = $('#demo-reset');
  if (resetEl) {
    resetEl.addEventListener('click', () => {
      if (searchEl) searchEl.value = '';
      if (filterEl) filterEl.value = '';
      renderTicker(DEMO_DATA);
    });
  }

  // Initial render
  renderTicker(DEMO_DATA);

  /* ── Pause ticker on hover ───────────────────────────── */
  const ticker = $('#demo-ticker');
  if (ticker && !prefersReducedMotion) {
    ticker.addEventListener('mouseenter', () => {
      const track = $('#demo-track');
      if (track) track.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      const track = $('#demo-track');
      if (track) track.style.animationPlayState = 'running';
    });
  }

  /* ── Sticky Nav Shadow ───────────────────────────────── */
  const nav = $('nav.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.4)' : 'none';
    }, { passive: true });
  }

  /* ── Mobile Nav Toggle ───────────────────────────────── */
  const mobileToggle = $('.nav-mobile-toggle');
  const navLinks = $('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle.textContent = '☰';
    }));
  }

  /* ── Scroll Reveal ───────────────────────────────────── */
  if (!prefersReducedMotion) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => obs.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── Nav Section Highlighting ────────────────────────── */
  const sections = $$('section[id]');
  const navAnchors = $$('.nav-links a[href^="#"]');
  function updateActive() {
    let current = '';
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      if (sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) current = sec.id;
    });
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* ── FAQ Toggle ──────────────────────────────────────── */
  document.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.parentElement;
    $$('.faq-item.open').forEach(o => { if (o !== item) o.classList.remove('open'); });
    item.classList.toggle('open');
  });

});
