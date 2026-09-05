import type { Project } from '@/types'

/**
 * Selected work.
 *
 * Ground rules applied here:
 *  - No invented metrics. The only number in this file is the 77% recall on the
 *    churn model, because that is the only real, stated one.
 *  - Every `links.href` points at a repository that exists on
 *    github.com/sarvajithsankar (verified against the GitHub API). Where no
 *    public repo exists — the Maveric agent is company work, and Phishermen has
 *    no public repository — the project ships with no link rather than a
 *    guessed URL. Add the URL here when it exists; the cards adapt.
 */

export const projects: Project[] = [
  {
    slug: 'research-agent',
    name: 'Autonomous AI Research Agent',
    tier: 'featured',
    context: 'MAVERIC SYSTEMS',
    year: '2026',
    category: 'AI AGENT',
    summary:
      'A multi-step agent that plans a research query, retrieves across three sources, and writes the synthesis up as a structured document — without human intervention.',
    tags: ['LangChain', 'LangGraph', 'MCP', 'Deep Agents SDK'],
    problem:
      'Research synthesis is slow and fragmented. An analyst opens a search engine, a wiki, and a paper repository, reads across all three, then writes the summary by hand. Retrieval and writing are separate jobs, and the handoff between them is where detail gets lost.',
    built: [
      'An autonomous research agent on LangChain and LangGraph that decomposes a query and runs a multi-step retrieval loop to answer it.',
      'MCP clients for Tavily (web search), Wikipedia, and arXiv, exposed to the agent as callable tools behind one interface.',
      'A synthesis stage that turns retrieved material into a structured research document the agent writes itself.',
      'A second agent framework on the Deep Agents SDK: create_deep_agent over a FilesystemBackend, with capabilities defined as pluggable SKILL.md files and Gemini as the default model.',
    ],
    decisions: [
      'MCP instead of bespoke function wrappers — one protocol across three very different sources means a fourth source is a configuration change, not a new integration.',
      'LangGraph instead of a linear chain: retrieval needs conditionals. A source that returns nothing should re-route the graph, not fail the run.',
      'Filesystem-backed state in the Deep Agents build, so intermediate artifacts stay inspectable as files instead of vanishing into memory.',
      'Skills as SKILL.md rather than code, so agent behaviour can be revised without redeploying it.',
    ],
    noPublicRepoNote:
      'Built during the Maveric Systems internship — the codebase is company property.',
    stack: [
      'Python',
      'LangChain',
      'LangGraph',
      'Model Context Protocol',
      'Tavily',
      'Wikipedia API',
      'arXiv API',
      'Deep Agents SDK',
      'Gemini',
    ],
    links: [],
    architecture: {
      label: 'RESEARCH AGENT — EXECUTION PATH',
      layers: [
        { id: 'query', caption: 'INPUT', nodes: ['Research Query'] },
        { id: 'plan', caption: 'ORCHESTRATION', nodes: ['LangGraph Planner'] },
        { id: 'tools', caption: 'MCP TOOL CALLS', nodes: ['Tavily', 'Wikipedia', 'arXiv'] },
        { id: 'state', caption: 'STATE', nodes: ['Synthesis + Filesystem Backend'] },
        { id: 'out', caption: 'OUTPUT', nodes: ['Structured Research Document'] },
      ],
    },
  },
  {
    slug: 'tenet-ai',
    name: 'TENET-AI Security Middleware',
    tier: 'featured',
    context: 'SSOC SEASON 5',
    year: '2026',
    category: 'LLM SECURITY',
    summary:
      'Defensive middleware that sits in front of LLM endpoints and inspects every prompt for injection, jailbreak, and data-extraction patterns before it reaches the model.',
    tags: ['FastAPI', 'Redis', 'PostgreSQL', 'Kubernetes'],
    problem:
      'LLMs deployed in production have no standardized security layer. Application code calls the model directly, so an adversarial prompt travels exactly the same path as a legitimate one — and nothing in between is looking at it.',
    built: [
      'A FastAPI service that fronts LLM endpoints and inspects inbound prompts before forwarding them.',
      'Detectors for prompt injection, jailbreak attempts, and data-extraction patterns, evaluated on the request path.',
      'Redis for detection state and PostgreSQL for the audit trail, giving SOC-style visibility into what was attempted and what was blocked.',
      'Containerised with Docker and deployed on Kubernetes.',
    ],
    decisions: [
      'Middleware rather than an SDK: a team gets protection by pointing at a different base URL instead of rewriting application code.',
      'Redis in front of the detectors so a repeated payload is classified once, not on every request.',
      'PostgreSQL as an append-only audit log — a security control that cannot show you what it blocked is not a control.',
      'Detection runs before the model call, so a blocked request costs no tokens and no latency budget downstream.',
    ],
    stack: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    links: [{ label: 'GitHub', href: 'https://github.com/sarvajithsankar/TENET-AI', kind: 'github' }],
    architecture: {
      label: 'TENET-AI — REQUEST PATH',
      layers: [
        { id: 'client', caption: 'CALLER', nodes: ['LLM Client'] },
        { id: 'gateway', caption: 'INGRESS', nodes: ['FastAPI Gateway'] },
        {
          id: 'detectors',
          caption: 'DETECTION',
          nodes: ['Injection Rules', 'Jailbreak Detection', 'Extraction Patterns'],
        },
        { id: 'state', caption: 'STATE + AUDIT', nodes: ['Redis', 'PostgreSQL'] },
        { id: 'model', caption: 'FORWARD', nodes: ['Sanitised Request → Model'] },
      ],
    },
  },
  {
    slug: 'vit-smart-assistant',
    name: 'VIT Smart Assistant',
    tier: 'personal',
    context: 'PERSONAL',
    year: '2026',
    category: 'RAG',
    summary:
      'A RAG assistant for VIT campus queries — rebuilt from naive prompt-stuffing into real retrieval-augmented generation.',
    tags: ['Gemini Embeddings', 'ChromaDB', 'Streamlit'],
    problem:
      'The first version pasted the entire campus knowledge base into the prompt. It worked until the corpus outgrew the context window — and it spent tokens on material irrelevant to the question actually asked.',
    built: [
      'Chunked the corpus and embedded it with Gemini embeddings (gemini-embedding-001) into a ChromaDB collection.',
      'Query-time retrieval, so only the chunks relevant to the question enter the context.',
      'A Streamlit front end with conversation memory for multi-turn questions.',
    ],
    decisions: [
      'ChromaDB over a hosted vector store: local, no infrastructure, and sufficient for a campus-sized corpus.',
      'gemini-embedding-001 to keep embedding and generation with one provider and one billing surface.',
      'Retrieval over a longer context window — cheaper per query, and accuracy stops degrading as the corpus grows.',
    ],
    stack: ['Python', 'Gemini API', 'gemini-embedding-001', 'ChromaDB', 'Streamlit'],
    links: [
      { label: 'GitHub', href: 'https://github.com/sarvajithsankar/Vit-Smart-Assistant', kind: 'github' },
    ],
  },
  {
    slug: 'sentinel-vault',
    name: 'Sentinel-Vault',
    tier: 'personal',
    context: 'PERSONAL',
    year: '2026',
    category: 'SYSTEMS',
    summary:
      'A SIEM prototype with a hand-built storage engine — written to understand how security event data behaves at the data structure level.',
    tags: ['C++17', 'AVL Trees', 'RAID-1'],
    problem:
      'SIEMs are usually operated rather than understood. I wanted to know how one keeps high-velocity log data queryable under continuous ingest, so I built the storage engine instead of reading about it.',
    built: [
      'An AVL-tree-indexed event store in C++17, keeping insert and range lookup balanced as the log stream grows.',
      'A RAID-1 simulation that mirrors every event, exposing mirror count and last sync time as queryable stats.',
      'A hand-written Merge Sort for ordered event reporting.',
      'A FastAPI read layer serving paginated event queries over the vault.',
    ],
    decisions: [
      'AVL tree over a hash map: log queries are range queries, and a balanced BST keeps them ordered.',
      'Mirroring implemented in application code rather than delegated to the filesystem, so failure behaviour is observable rather than assumed.',
      'Merge Sort written by hand instead of std::sort — its stability matters when timestamps collide.',
    ],
    stack: ['C++17', 'AVL Trees', 'Merge Sort', 'RAID-1', 'FastAPI'],
    links: [{ label: 'GitHub', href: 'https://github.com/sarvajithsankar/Sentinel-Vault', kind: 'github' }],
  },
  {
    slug: 'phishermen',
    name: 'Phishermen',
    tier: 'personal',
    context: 'PERSONAL',
    year: '2026',
    category: 'APPLIED ML',
    summary:
      'A phishing URL detector that reasons about URL structure with unsupervised anomaly detection rather than matching a blocklist.',
    tags: ['Flask', 'Isolation Forest', 'Vercel'],
    problem:
      'Blocklists only catch phishing URLs that have already been reported. A newly registered domain is unknown by definition, so detection has to reason about the URL itself.',
    built: [
      'Feature extraction over URL structure — length, subdomain depth, character ratios, and suspicious token patterns.',
      'An Isolation Forest that flags URLs sitting far from the learned distribution of normal traffic.',
      'A Flask front end deployed on Vercel.',
    ],
    decisions: [
      'Unsupervised over supervised: labelled phishing corpora go stale, and anomaly detection needs no re-labelling to cover a new campaign.',
      'Isolation Forest specifically — it isolates outliers in fewer splits than a density method, keeping per-request scoring cheap.',
      'Flask over a heavier framework: one model, one endpoint, nothing else to maintain.',
    ],
    stack: ['Python', 'Flask', 'scikit-learn', 'Isolation Forest', 'Vercel'],
    // No public repository at the time of writing — intentionally left empty
    // rather than linked to a guessed URL.
    noPublicRepoNote: 'No public repository at the time of writing.',
    links: [],
  },
  {
    slug: 'customer-churn',
    name: 'Customer Churn Prediction',
    tier: 'personal',
    context: 'PERSONAL',
    year: '2026',
    category: 'MACHINE LEARNING',
    summary:
      'A gradient boosting churn model tuned for the minority class, with an interactive simulator for exploring what moves a prediction.',
    tags: ['Gradient Boosting', 'ipywidgets'],
    metric: { value: '77%', label: 'recall on the churn class' },
    problem:
      'Churn datasets are heavily imbalanced. Accuracy looks excellent while the model quietly misses most of the customers who actually leave — the only ones worth catching.',
    built: [
      'A gradient boosting classifier tuned for recall on the churn class, reaching 77%.',
      'An interactive ipywidgets simulator for exploring how feature changes move an individual prediction.',
      'Exploratory analysis with boxplots and confusion matrices to identify the real drivers of attrition.',
    ],
    decisions: [
      'Optimised for recall rather than accuracy: on imbalanced churn data a missed positive costs far more than a false alarm.',
      'Gradient boosting over a single tree — the interaction effects between churn features carry most of the signal.',
      'ipywidgets so the model is explorable by someone who will never open the notebook.',
    ],
    stack: ['Python', 'scikit-learn', 'Gradient Boosting', 'ipywidgets', 'Jupyter'],
    links: [
      { label: 'GitHub', href: 'https://github.com/sarvajithsankar/customer_churn', kind: 'github' },
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.tier === 'featured')
export const personalProjects = projects.filter((project) => project.tier === 'personal')
