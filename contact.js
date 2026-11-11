/**
 * Small console + decorative GitHub activity motif
 * - Shell prompt with real commands only
 * - Quick-action chips
 * - Abstract, non-numeric activity grid (no fabricated stats)
 */

(function () {
  'use strict';

  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-cmd-input');
  const terminalForm = document.getElementById('terminal-form');

  const commands = {
    whoami: () => [
      'Sarvajith Sankar — I study CS at VIT Vellore and data science at IIT Madras.',
      'Currently an AI intern at Maveric Systems, working with agents.',
      'Interested in how models, tools, memory and state fit together.'
    ],
    learning: () => [
      'Machine learning and deep learning, from the maths up.',
      'Transformers: reading the papers and re-implementing the pieces.',
      'LLMs and agents with LangChain, LangGraph, the Deep Agents SDK and MCP.',
      'Cloud and DevOps, because shipping is part of the work.'
    ],
    stack: () => [
      'Languages:  Python, C++, Java, SQL, Shell',
      'AI & agents: LangChain, LangGraph, Deep Agents SDK, MCP, PyTorch',
      'Backend:    FastAPI, Flask, Redis, PostgreSQL, Docker'
    ],
    links: () => [
      'GitHub:   <a class="terminal-link" href="https://github.com/sarvajithsankar" target="_blank" rel="noopener noreferrer">github.com/sarvajithsankar</a>',
      'LinkedIn: <a class="terminal-link" href="https://www.linkedin.com/in/sarvajithsankar/" target="_blank" rel="noopener noreferrer">linkedin.com/in/sarvajithsankar</a>',
      'Email:    <a class="terminal-link" href="mailto:sarvajith2knot8@gmail.com">sarvajith2knot8@gmail.com</a>'
    ],
    clear: () => {
      if (terminalOutput) terminalOutput.innerHTML = '';
      return [];
    },
    help: () => [
      'Available commands: whoami, learning, stack, links, clear, help'
    ]
  };

  function printPrompt(cmdStr) {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.textContent = '$';
    const cmd = document.createElement('span');
    cmd.className = 'terminal-cmd';
    cmd.textContent = cmdStr;
    line.append(prompt, document.createTextNode(' '), cmd);
    terminalOutput.appendChild(line);
  }

  function printLine(html) {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    const out = document.createElement('span');
    out.className = 'terminal-out';
    out.innerHTML = html;
    line.appendChild(out);
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  window.runTerminalCommand = function (cmdStr) {
    const cleanCmd = cmdStr.trim().toLowerCase();
    printPrompt(cleanCmd);

    if (commands[cleanCmd]) {
      commands[cleanCmd]().forEach((l) => printLine(l));
    } else {
      const msg = document.createElement('div');
      msg.className = 'terminal-line';
      const out = document.createElement('span');
      out.className = 'terminal-out';
      out.textContent = `command not found: ${cleanCmd}. Type help for options.`;
      msg.appendChild(out);
      if (terminalOutput) terminalOutput.appendChild(msg);
    }

    if (terminalOutput) terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      if (val) {
        window.runTerminalCommand(val);
        terminalInput.value = '';
      }
    });
  }

  // Quick Action Chips in Terminal
  document.querySelectorAll('.terminal-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (cmd) {
        window.runTerminalCommand(cmd);
      }
    });
  });

  // Decorative GitHub activity motif: abstract levels only, no counts or labels.
  const activity = document.getElementById('gh-activity');
  if (activity) {
    const COLS = 26;
    const ROWS = 7;
    let seed = 20251;
    const next = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const frag = document.createDocumentFragment();
    for (let c = 0; c < COLS; c++) {
      const column = document.createElement('div');
      column.className = 'gh-col';
      for (let r = 0; r < ROWS; r++) {
        const cell = document.createElement('span');
        cell.className = 'gh-cell';
        const v = next();
        // Mostly quiet days, with occasional clusters.
        const level = v > 0.86 ? 3 : v > 0.62 ? 2 : v > 0.34 ? 1 : 0;
        cell.dataset.level = String(level);
        column.appendChild(cell);
      }
      frag.appendChild(column);
    }
    activity.appendChild(frag);
  }
})();
