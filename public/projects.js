/**
 * Instrument Panel & Interactive Systems Engine
 * Features:
 * - Cursor-following panel glow
 * - Learning map diagram with traveling notes chip & spark burst
 * - Pinned scroll-scrubbed work scene with floating step card & frame counter
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Cursor Follow Glow on all .panel elements
  document.querySelectorAll('.panel').forEach((panel) => {
    panel.addEventListener('pointermove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      panel.style.setProperty('--mx', `${x}%`);
      panel.style.setProperty('--my', `${y}%`);
    });
  });

  // 2. Interactive Learning Map
  const nodes = [
    { title: 'MACHINE LEARNING', desc: 'Where I started: how models learn from data, how to check whether they are any good, and why a simple baseline is usually worth trying first.' },
    { title: 'DEEP LEARNING', desc: 'Neural networks, backpropagation, and the training loops that make them work. Mostly small experiments, read carefully and rerun until the numbers make sense.' },
    { title: 'TRANSFORMERS', desc: 'Attention, tokenisation, and the architecture behind most of what I use today. I am reading the papers slowly and re-implementing pieces to see how they actually fit.' },
    { title: 'LLMS & AGENTS', desc: 'LangChain, LangGraph, the Deep Agents SDK, and MCP tool calls. This is where I spend most of my time: state, memory, and keeping an agent honest.' },
    { title: 'CLOUD & DEVOPS', desc: 'Deployment, containers, and the practical plumbing around a model. Less glamorous than training, but it is what turns a notebook into something people can use.' }
  ];

  window.selectArchitectureNode = function (index) {
    const nodeData = nodes[index];
    if (!nodeData) return;

    // Update diagram node DOM states
    document.querySelectorAll('.diagram-node').forEach((nodeEl, idx) => {
      if (idx === index) {
        nodeEl.setAttribute('data-state', 'active');
      } else if (idx < index) {
        nodeEl.setAttribute('data-state', 'success');
      } else {
        nodeEl.setAttribute('data-state', 'idle');
      }
    });

    // Update Detail Text in Inspector
    const titleEl = document.getElementById('arch-inspector-title');
    const descEl = document.getElementById('arch-inspector-desc');
    const statePill = document.getElementById('arch-inspector-state');

    if (titleEl) titleEl.textContent = `${nodeData.title} // 0${index + 1}`;
    if (descEl) descEl.textContent = nodeData.desc;
    if (statePill) statePill.textContent = 'LEARNING';

    // Sync chip active state
    document.querySelectorAll('.chips-row .chip').forEach((chip, idx) => {
      chip.classList.toggle('is-active', idx === index);
      chip.classList.toggle('chip--accent', idx === index);
    });

    // Trigger Traveling Message Chip Animation along Connector
    animateTravelingPacket(index);
  };

  function animateTravelingPacket(step) {
    const chip = document.getElementById('traveling-message-chip');
    const path = document.getElementById(`connector-path-${step}`);
    if (!chip || !path) return;

    chip.style.opacity = '1';
    const totalLength = path.getTotalLength();
    const startTime = performance.now();
    const duration = 900; // ms

    function stepMotion(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const point = path.getPointAtLength(progress * totalLength);

      chip.style.left = `${point.x}px`;
      chip.style.top = `${point.y}px`;

      if (progress < 1) {
        requestAnimationFrame(stepMotion);
      } else {
        // Arrival: Fire particles burst at screen coordinates
        const rect = chip.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent('particles:burst', {
          detail: {
            from: { x: rect.left, y: rect.top },
            to: { x: rect.left + 80, y: rect.top - 40 },
            count: 140,
            color: '#f28a2e'
          }
        }));

        setTimeout(() => {
          chip.style.opacity = '0';
        }, 200);
      }
    }
    requestAnimationFrame(stepMotion);
  }

  // Setup click listeners on SVG nodes
  document.querySelectorAll('.diagram-node').forEach((nodeEl, idx) => {
    nodeEl.addEventListener('click', () => {
      window.selectArchitectureNode(idx);
    });
  });

  // Run initial node
  setTimeout(() => {
    window.selectArchitectureNode(0);
  }, 500);

  // 3. Pinned Scroll-Scrubbed Scene: Learning Through Work
  const pinnedScene = document.getElementById('work-scene');

  const workSteps = [
    {
      stepNum: '01 / 04',
      title: 'TOOLS FIRST',
      action: 'EXPLORE',
      stateColor: '#8fb4ff',
      badgeIcon: '⚡',
      desc: 'Most of the work starts with tools: wrapping APIs and data sources so a model can call them cleanly through MCP.'
    },
    {
      stepNum: '02 / 04',
      title: 'STATE AND MEMORY',
      action: 'REMEMBER',
      stateColor: '#f28a2e',
      badgeIcon: '◈',
      desc: 'A lot of time goes into state: what the agent has done, what it should remember, and when to start fresh.'
    },
    {
      stepNum: '03 / 04',
      title: 'PRETRAINED MODELS',
      action: 'WIRE',
      stateColor: '#ffd27a',
      badgeIcon: '◇',
      desc: 'Integrating pretrained LLMs into the loop, with enough structure around them that failures are visible instead of silent.'
    },
    {
      stepNum: '04 / 04',
      title: 'READ, BREAK, REPEAT',
      action: 'ITERATE',
      stateColor: '#7ee08f',
      badgeIcon: '↻',
      desc: 'Reading traces, breaking things on purpose, and rebuilding parts of the graph until it behaves.'
    }
  ];

  let currentStepIndex = 0;

  function updateSecurityStep(stepIdx, fractionInsideStep) {
    if (stepIdx !== currentStepIndex) {
      currentStepIndex = stepIdx;
      const data = workSteps[stepIdx];

      // Update Card Header & Texts with fade/translate
      const card = document.getElementById('security-step-card');
      const counterEl = document.getElementById('sec-step-counter');
      const titleEl = document.getElementById('sec-step-title');
      const descEl = document.getElementById('sec-step-desc');
      const actionEl = document.getElementById('sec-step-action');
      const iconEl = document.getElementById('sec-step-icon');

      if (card) {
        card.style.borderTopColor = data.stateColor;
        card.style.boxShadow = `0 40px 80px -30px rgba(0, 0, 0, 0.9), 0 0 30px ${data.stateColor}33`;
      }
      if (counterEl) counterEl.textContent = data.stepNum;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.innerHTML = data.desc;
      if (actionEl) {
        actionEl.textContent = data.action;
        actionEl.style.color = data.stateColor;
      }
      if (iconEl) {
        iconEl.textContent = data.badgeIcon;
        iconEl.style.borderColor = data.stateColor;
        iconEl.style.color = data.stateColor;
      }

      // Update SVG Scene Node Highlights
      document.querySelectorAll('.sec-diagram-stage').forEach((stEl, idx) => {
        if (idx === stepIdx) {
          stEl.classList.add('is-active');
        } else if (idx < stepIdx) {
          stEl.classList.remove('is-active');
          stEl.classList.add('is-done');
        } else {
          stEl.classList.remove('is-active', 'is-done');
        }
      });
    }

    // Segment progress updates
    const segments = document.querySelectorAll('.sec-step-segment-fill');
    segments.forEach((segFill, idx) => {
      if (idx < stepIdx) {
        segFill.style.width = '100%';
        segFill.style.backgroundColor = workSteps[stepIdx].stateColor;
      } else if (idx === stepIdx) {
        segFill.style.width = `${Math.round(fractionInsideStep * 100)}%`;
        segFill.style.backgroundColor = workSteps[stepIdx].stateColor;
      } else {
        segFill.style.width = '0%';
      }
    });
  }

  if (typeof ScrollTrigger !== 'undefined' && pinnedScene && !prefersReducedMotion) {
    if (window.innerWidth >= 1024) {
      ScrollTrigger.create({
        trigger: pinnedScene,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const frame = Math.round(p * 960);
          window.setSceneFrame(frame, self.isActive);

          const stepCount = workSteps.length;
          const rawStep = p * stepCount;
          const stepIndex = Math.min(stepCount - 1, Math.floor(rawStep));
          const frac = rawStep - stepIndex;

          updateSecurityStep(stepIndex, frac);
        }
      });
    }
  }

})();
