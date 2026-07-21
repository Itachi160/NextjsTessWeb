/**
 * Tesseract InfoSystems - Website Knowledge Base & Context Retriever
 */

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'company-overview',
    category: 'Company Profile',
    title: 'About Tesseract InfoSystems',
    keywords: ['about', 'tesseract', 'company', 'who', 'overview', 'mission', 'founding', 'location', 'baramati', 'pune', 'india'],
    content: `Tesseract InfoSystems was founded by enterprise architects to solve critical industry challenges: compiling stable, scalable, and secure cloud software products without engineering compromises.
Headquarters / Location: Baramati and Pune, Maharashtra, India.
Website: https://tesseractinfosystems.com
Specialization: High-concurrency custom software engineering, hyperscale cloud platform architectures, deep-tech AI & data orchestrations, and zero-trust cybersecurity.`
  },
  {
    id: 'ethos-compliance',
    category: 'Engineering & Compliance',
    title: 'Engineering Ethos, Security & Accreditations',
    keywords: ['ethos', 'security', 'compliance', 'soc2', 'hipaa', 'gdpr', 'aws', 'azure', 'partner', 'quality', 'testing', 'accreditations'],
    content: `Engineering Ethos: We write strictly typed, compiled systems. We reject code shortcuts, enforcing 90%+ unit test coverage and automated vulnerability pipelines before any merge occurs.
Compliance & Security: Built for regulated industries (FinTech, Healthcare, Telecom). SOC 2 Type II audit tracking, strict adherence to GDPR and HIPAA privacy guidelines.
Accreditations: AWS Select Partner, Azure Solutions Hub, SOC 2 Audited.`
  },
  {
    id: 'leadership',
    category: 'Leadership Team',
    title: 'Engineering Leadership & Board',
    keywords: ['ceo', 'leadership', 'team', 'founders', 'alistair', 'vance', 'marcus', 'sterling', 'julia', 'feng', 'who leads'],
    content: `Executive Leadership:
1. Dr. Alistair Vance — Chief Executive Officer (CEO). Former Principal Architect at AWS and Distributed Systems researcher.
2. Marcus Sterling — Head of Software Systems. Vetted database systems lead with 15+ years managing scale infrastructure.
3. Dr. Julia Feng — Director of AI Systems. PhD in Machine Learning and neural graph optimizer designer.`
  },
  {
    id: 'service-software',
    category: 'Services',
    title: 'Custom Software Systems (Layer 01)',
    keywords: ['software', 'service', 'custom', 'java', 'spring boot', 'node', 'go', 'backend', 'api', 'grpc', 'rest', 'architecture', 'solid'],
    content: `Custom Software Systems (Layer 01 - Software Core):
- Tech Stack: Java, Spring Boot, Node.js, Go.
- Capabilities: Creating modular service interfaces, high-concurrency backends, and custom integrations configured under strict SOLID rules.
- Key Features: Clean Architecture compilation, RESTful / gRPC API contracts, high-concurrency logic fabric.`
  },
  {
    id: 'service-cloud',
    category: 'Services',
    title: 'Hyperscale Cloud Deployments (Layer 02)',
    keywords: ['cloud', 'aws', 'kubernetes', 'eks', 'gke', 'terraform', 'istio', 'devops', 'deployment', 'infrastructure', 'iac', 'prometheus', 'grafana'],
    content: `Hyperscale Cloud Deployments (Layer 02 - Cloud Fabric):
- Tech Stack: AWS, Kubernetes, Terraform, Istio.
- Capabilities: Designing failover cluster topologies, hybrid networks, IAM authorization parameters, and automatic telemetry dashboards.
- Key Features: Multi-region active cluster failovers, Infrastructure as Code (IaC) pipelines, Prometheus/Grafana telemetry logs.`
  },
  {
    id: 'service-ai',
    category: 'Services',
    title: 'AI & Data Orchestrations (Layer 03)',
    keywords: ['ai', 'data', 'ml', 'machine learning', 'python', 'pytorch', 'kafka', 'postgresql', 'vector', 'rag', 'llm', 'etl'],
    content: `AI & Data Orchestrations (Layer 03 - Neural Intelligence):
- Tech Stack: Python, PyTorch, Kafka, PostgreSQL.
- Capabilities: Compiling real-time data buffers, deploying LLMs inside application flows, training analysis charts, and structuring ETL queues.
- Key Features: Kafka event-stream integrations, Vector stores for AI retrieval systems, Optimized neural inference engines.`
  },
  {
    id: 'cost-pricing',
    category: 'Pricing & Estimation',
    title: 'Project Cost Estimator & Pricing Ranges',
    keywords: ['cost', 'price', 'pricing', 'estimator', 'quote', 'quotation', 'rate', 'how much', 'rupees', 'lakhs', 'budget', 'sme', 'enterprise'],
    content: `Project Cost Estimator & Pricing:
Tesseract InfoSystems features an Interactive Project Cost Estimator on the /services page.
Pricing starts from ₹5 Lakhs (INR) up to ₹40+ Lakhs depending on:
1. Scope: Custom Software, Cloud-Native, or AI Integration.
2. Scale: SME, Enterprise, or Hyperscale.
3. Security/Compliance: Standard vs. SOC 2 / HIPAA Core.
For official custom architecture quotes, users can email info@tesseractinfosystems.com.`
  },
  {
    id: 'solutions-architectures',
    category: 'Blueprint Solutions',
    title: 'Core Modular Architectures & Blueprint Metrics',
    keywords: ['solutions', 'cld-node', 'ai-core', 'sec-shield', 'tx-fabric', 'uptime', 'latency', 'throughput', 'tps', 'metrics', 'specifications'],
    content: `Customizable Corporate Blueprint Solutions:
1. CLD-NODE (Hyperscale Cloud Platform): 99.99% uptime, <45s auto-scale, 2ms latency. Stack: EKS/GKE, Terraform, Istio.
2. AI-CORE (AI Logistics & Automation Core): 50k/s throughput, 12ms latency, 99.2% accuracy. Stack: PyTorch, Kafka, Redis.
3. SEC-SHIELD (Zero-Trust Cybersecurity Shield): <8ms auth time, realtime audit lag, AES-256 cipher. Stack: OAuth 2.1, eBPF Audits, Vault.
4. TX-FABRIC (Omni-Channel Transaction Core): 25,000 peak TPS, strict sync, instant settlement. Stack: Spring Boot, Postgres Shards, Kafka.`
  },
  {
    id: 'careers-jobs',
    category: 'Careers & Hiring',
    title: 'Careers, Open Positions & Benefits',
    keywords: ['careers', 'jobs', 'hiring', 'work', 'openings', 'salary', 'internship', 'developer', 'engineer', 'architect', 'benefits', 'perks'],
    content: `Careers at Tesseract InfoSystems:
Open Positions:
1. Senior Software Engineer (Java / AWS) — Baramati (Hybrid) | Salary: ₹12L - ₹18L P.A.
2. Cloud Infrastructure Architect — Pune (On-site) | Salary: ₹15L - ₹24L P.A.
3. Deep Learning Intern (AI Models) — Baramati (Remote) | Paid Internship.

Employee Perks & Benefits:
- Flexible hybrid and remote schedules.
- Premium Mac gear & ergonomic hardware budgets.
- ₹1.5 Lakhs annual training & certification allowance.`
  },
  {
    id: 'contact-info',
    category: 'Contact & Support',
    title: 'Contact Information & Communication Channels',
    keywords: ['contact', 'email', 'phone', 'address', 'location', 'reach', 'support', 'inquiry', 'message', 'touch'],
    content: `Contact Tesseract InfoSystems:
- Primary Email: info@tesseractinfosystems.com / contact@tesseractsys.com
- Main Offices: Baramati & Pune, Maharashtra, India.
- Interactive Contact Page: /contact page features a project inquiry submission form and real-time telemetry logs.`
  }
];

/**
 * Retrieve top relevant knowledge chunks based on query matching
 */
export function getRelevantContext(query: string, maxResults = 4): string {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\W+/).filter(w => w.length > 2);

  const scored = KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    // Check keyword matches
    chunk.keywords.forEach(kw => {
      if (lowerQuery.includes(kw)) {
        score += 3;
      }
    });
    // Check title matches
    words.forEach(word => {
      if (chunk.title.toLowerCase().includes(word)) {
        score += 2;
      }
      if (chunk.content.toLowerCase().includes(word)) {
        score += 1;
      }
    });
    return { chunk, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top chunks or default all if query is broad
  const topChunks = scored
    .filter(s => s.score > 0)
    .slice(0, maxResults)
    .map(s => s.chunk.content);

  if (topChunks.length === 0) {
    // Return main general overview chunks as default context
    return KNOWLEDGE_BASE.slice(0, 3).map(c => c.content).join('\n\n---\n\n');
  }

  return topChunks.join('\n\n---\n\n');
}
