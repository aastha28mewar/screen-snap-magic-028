/** All portfolio content in one place so sections stay presentational. */

export const profile = {
  name: "Aastha",
  roles: ["Full Stack Developer", "AI/ML Enthusiast", "Problem Solver"],
  tagline: "I build things that think.",
  email: "aastha.mewar2801@gmail.com",
  phone: "+91 9625100688",
  links: {
    linkedin: "https://linkedin.com/in/aastha-354827323",
    github: "https://github.com/aasthamewar",
    leetcode: "https://leetcode.com/",
  },
};

export const about = {
  paragraphs: [
    "I'm a Computer Science undergrad who likes the unglamorous middle of software — the part where a model, an API and a real user's workflow have to agree with each other. Most of my work lives there: RAG pipelines that actually retrieve the right section, permission systems that hold up across sites and regions, dashboards that tell a factory operator something useful before a shift goes wrong.",
    "Right now I'm a full stack intern at PanScience Innovations, building industrial energy analytics for Britannia with Django REST and React. Off the clock I'm usually shipping an AI side project or working through DSA — 350+ problems and counting.",
  ],
  stats: [
    { label: "CGPA", value: "8.9" },
    { label: "LeetCode rating", value: "1713" },
    { label: "DSA problems", value: "350+" },
    { label: "Global percentile", value: "Top 12.5%" },
  ],
};

export const education = {
  school: "JIMS Engineering Management Technical Campus (GGSIPU)",
  period: "Sep 2023 – 2027",
  degree: "B.Tech, Computer Science and Engineering",
  detail: "CGPA 8.9",
};

export const experience = [
  {
    company: "PanScience Innovations (PSI)",
    role: "Full Stack Intern",
    location: "New Delhi",
    period: "Aug 2026 – Present",
    bullets: [
      "Built and enhanced a Django REST + React industrial energy analytics platform for Britannia: production alerts, variant-specific SEC thresholds, automated email notifications, site-scoped KPI/energy analytics and dynamic equipment mapping.",
      "Prototyped a multi-site architecture with Role-Based Access Control across organization, region and site levels — backend API authorization, data isolation and frontend access controls for factory operations.",
    ],
  },
  {
    company: education.school,
    role: education.degree,
    location: "GGSIPU",
    period: education.period,
    bullets: [`${education.detail} — coursework across systems, algorithms and applied machine learning.`],
  },
];

export const projects = [
  {
    name: "AI-Research-Mentor",
    date: "May 2026",
    problem:
      "Research papers are long and readers need answers from a specific section, not a whole-document summary.",
    approach:
      "A RAG assistant with section-wise Q&A and semantic search over PDFs: extraction → cleaning → section-aware chunking → all-MiniLM-L6-v2 embeddings → semantic retrieval with CrossEncoder reranking. FastAPI backend with modular routes and conversational memory, Streamlit frontend, Dockerized and deployed.",
    stack: ["Python", "FastAPI", "Ollama (Llama 3.2:1B)", "ChromaDB", "Docker", "Hugging Face Spaces"],
    github: "https://github.com/aasthamewar",
    live: "https://huggingface.co/spaces",
  },
  {
    name: "RoomMitra",
    date: "Aug 2025",
    problem: "Roommate matching is done on gut feeling, and mismatches surface only after moving in.",
    approach:
      "An AI compatibility scoring system fed by real-time webhook data, using hybrid scoring: TextBlob sentiment analysis on free-text answers plus a TF-IDF + Linear Regression model. RESTful backend with clean API contracts, CORS handling and modular services.",
    stack: ["React.js", "TypeScript", "Python", "FastAPI", "TextBlob", "REST APIs"],
    github: "https://github.com/aasthamewar",
    live: null,
  },
  {
    name: "GhostBuster",
    date: "Jan 2026",
    problem: "Team projects get 'ghosted' and self-reported progress hides who actually contributed.",
    approach:
      "Tracks real GitHub contributions instead of self-reports. Leaders create projects, members join via verified invites, and serverless contribution analysis via Supabase Edge Functions + GitHub APIs powers dashboards for early inactivity detection.",
    stack: ["React.js", "TypeScript", "Supabase", "GitHub OAuth", "Octokit"],
    github: "https://github.com/aasthamewar",
    live: null,
  },
];

export const skillGroups = [
  { category: "Languages", icon: "Code2", items: ["C++", "Python", "C", "JavaScript"] },
  {
    category: "Frameworks",
    icon: "Boxes",
    items: ["React.js", "Node.js", "REST APIs", "LangChain", "NumPy", "Pandas", "Playwright", "OAuth"],
  },
  { category: "Databases", icon: "Database", items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"] },
  {
    category: "AI / ML",
    icon: "BrainCircuit",
    items: [
      "Machine Learning",
      "LLM Integration",
      "RAG",
      "Vector Databases",
      "Embeddings",
      "Prompt Engineering",
    ],
  },
  {
    category: "Tools",
    icon: "Wrench",
    items: ["VS Code", "Git", "GitHub", "Docker", "Postman", "Jupyter Notebook"],
  },
  {
    category: "Concepts",
    icon: "Network",
    items: ["System Design", "SDLC", "Serverless Architecture", "API Integration"],
  },
];

export const achievements = [
  {
    value: 1713,
    suffix: "",
    label: "LeetCode rating",
    detail: "Top 12.57% globally",
  },
  { value: 350, suffix: "+", label: "DSA problems solved", detail: "Across arrays, graphs, DP" },
  { value: 8.9, suffix: "", label: "CGPA", decimals: 1, detail: "B.Tech CSE, GGSIPU" },
];

export const extraAchievement =
  "Completed Google's 5-Day AI Agents Intensive Course (2025), including a capstone project on AI agent systems.";

export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
