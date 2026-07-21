/**
 * Schema.org JSON-LD Structured Data Builder for Tesseract InfoSystems
 * Fully compliant with Google Rich Results, E-E-A-T, and Search Central Guidelines.
 */

const BASE_URL = 'https://tesseractinfosystems.com';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Tesseract InfoSystems',
    alternateName: ['Tesseract Tech', 'Tesseract Systems', 'TesseractSys'],
    url: BASE_URL,
    logo: `${BASE_URL}/android-chrome-512x512.png`,
    image: `${BASE_URL}/Logo%20Hd.png`,
    description:
      'Tesseract InfoSystems designs and deploys custom enterprise software platforms, hyperscale cloud-native architectures, AI & automation solutions, and zero-trust security infrastructure.',
    email: 'contact@tesseractinfosystems.com',
    telephone: '+91 20 5555 0199',
    foundingDate: '2021',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ozarde Estate, Tc College Road',
      addressLocality: 'Baramati',
      addressRegion: 'Maharashtra',
      postalCode: '413102',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/tesseractsys',
      'https://github.com/tesseractsys',
      'https://twitter.com/tesseractsys',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 20 5555 0199',
        contactType: 'customer support',
        email: 'info@tesseractinfosystems.com',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
      },
      {
        '@type': 'ContactPoint',
        email: 'contact@tesseractsys.com',
        contactType: 'sales',
        availableLanguage: ['English'],
      },
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Tesseract InfoSystems',
    image: `${BASE_URL}/Logo%20Hd.png`,
    url: BASE_URL,
    telephone: '+91 20 5555 0199',
    email: 'contact@tesseractinfosystems.com',
    priceRange: '₹5 Lakhs - ₹40+ Lakhs',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ozarde Estate, Tc College Road',
      addressLocality: 'Baramati, Pune',
      addressRegion: 'Maharashtra',
      postalCode: '413102',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.1565,
      longitude: 74.5771,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Tesseract InfoSystems',
    description:
      'Enterprise Software Engineering, Cloud-Native Systems & AI Orchestration Architectures.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith('http') ? it.item : `${BASE_URL}${it.item}`,
    })),
  };
}

export function getServicesListSchema() {
  const services = [
    {
      name: 'Custom Software Development',
      description:
        'Building bespoke, scalable, and ultra-reliable software tailored for enterprise goals and high-concurrency workloads.',
      url: `${BASE_URL}/services#custom-software`,
    },
    {
      name: 'Enterprise Applications',
      description:
        'Designing fault-tolerant backends, transaction managers, and systems engineered to scale for thousands of concurrent users.',
      url: `${BASE_URL}/services#enterprise-apps`,
    },
    {
      name: 'Hyperscale Cloud Deployments',
      description:
        'Architecting multi-cloud hybrid systems and serverless topologies to reduce latencies and optimize cloud cost footprints.',
      url: `${BASE_URL}/services#cloud-solutions`,
    },
    {
      name: 'DevOps & Infrastructure Engineering',
      description:
        'Implementing secure CI/CD pipelines, automated deployments, configuration management, and robust microservices.',
      url: `${BASE_URL}/services#devops`,
    },
    {
      name: 'AI & Automation Solutions',
      description:
        'Automating complex workflows, saving operational time, and boosting productivity with smart intelligent agents and custom neural pipelines.',
      url: `${BASE_URL}/services#ai-automation`,
    },
    {
      name: 'Digital Marketing Services',
      description:
        'Data-driven SEO, PPC, social media growth strategies, and high-converting content marketing that drives real measurable results.',
      url: `${BASE_URL}/services#digital-marketing`,
    },
    {
      name: 'IT Staffing Solutions',
      description:
        'Accessing top IT talent, vetted software engineers, and specialized engineering pods quickly and efficiently to scale tech teams.',
      url: `${BASE_URL}/services#it-staffing`,
    },
    {
      name: 'Web Platform Development',
      description:
        'Developing fast, secure, search-engine-optimized frontend platforms that offer premium, immersive interactions.',
      url: `${BASE_URL}/services#web-dev`,
    },
    {
      name: 'Mobile Application Engineering',
      description:
        'Building native or cross-platform mobile apps for iOS and Android with offline-first synchronization.',
      url: `${BASE_URL}/services#mobile-dev`,
    },
    {
      name: 'Digital Transformation',
      description:
        'Migrating outdated legacy platforms to cloud-native stacks, boosting speeds, and modernizing workflows.',
      url: `${BASE_URL}/services#digital-transformation`,
    },
    {
      name: 'Cybersecurity & Zero Trust Architecture',
      description:
        'Deploying multi-layered network security, automated vulnerability auditing, eBPF telemetry, and SOC 2/HIPAA compliance.',
      url: `${BASE_URL}/services#security`,
    },
    {
      name: 'Data & Analytics Engineering',
      description:
        'Structuring real-time data pipelines, high-throughput ETL buffers, vector search stores, and predictive analytics engines.',
      url: `${BASE_URL}/services#data-analytics`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tesseract InfoSystems Engineering Services',
    description: 'Complete catalog of software, cloud, AI, marketing, and staffing capability frameworks.',
    numberOfItems: services.length,
    itemListElement: services.map((s, idx) => ({
      '@type': 'Service',
      position: idx + 1,
      name: s.name,
      description: s.description,
      url: s.url,
      provider: {
        '@id': `${BASE_URL}/#organization`,
      },
    })),
  };
}

export function getSolutionsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tesseract InfoSystems Corporate Blueprint Solutions',
    description: 'Pre-engineered customizable architecture modules for cloud, AI, security, and transaction processing.',
    itemListElement: [
      {
        '@type': 'SoftwareApplication',
        position: 1,
        name: 'CLD-NODE (Hyperscale Cloud Platform)',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Linux, AWS, Kubernetes',
        description: 'Automated Kubernetes cluster orchestration with elastic load balancing and zero-downtime rolling updates.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '500000',
        },
      },
      {
        '@type': 'SoftwareApplication',
        position: 2,
        name: 'AI-CORE (AI Logistics & Automation Engine)',
        applicationCategory: 'AIApplication',
        operatingSystem: 'Python, PyTorch, Kafka',
        description: 'Deep learning pipeline to structure files, optimize routes, and trigger automatic data models.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '600000',
        },
      },
      {
        '@type': 'SoftwareApplication',
        position: 3,
        name: 'SEC-SHIELD (Zero-Trust Cybersecurity Shield)',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Linux, eBPF, OAuth 2.1',
        description: 'Advanced network isolation layer integrating automatic threat detection protocols and hardware access controls.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '400000',
        },
      },
      {
        '@type': 'SoftwareApplication',
        position: 4,
        name: 'TX-FABRIC (Omni-Channel Transaction Core)',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Java, Spring Boot, Postgres Shards',
        description: 'High-availability transaction orchestrator featuring atomic ledger updates and distributed state cache checks.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '800000',
        },
      },
    ],
  };
}

export function getJobPostingsSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: 'Senior Software Engineer (Java / AWS)',
      description:
        'Lead high-concurrency microservice architectures, JVM performance tuning, and Spring Boot cloud integrations at Tesseract InfoSystems.',
      identifier: {
        '@type': 'PropertyValue',
        name: 'Tesseract InfoSystems',
        value: 'JVM-SE',
      },
      datePosted: '2026-07-01',
      validThrough: '2026-12-31',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@id': `${BASE_URL}/#organization`,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Baramati',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: 1200000,
          maxValue: 1800000,
          unitText: 'YEAR',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: 'Cloud Infrastructure Architect',
      description:
        'Architect multi-region Kubernetes clusters, Terraform Infrastructure as Code, and Istio service mesh networks at Tesseract InfoSystems.',
      identifier: {
        '@type': 'PropertyValue',
        name: 'Tesseract InfoSystems',
        value: 'CLD-ARCH',
      },
      datePosted: '2026-07-01',
      validThrough: '2026-12-31',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@id': `${BASE_URL}/#organization`,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pune',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: 1500000,
          maxValue: 2400000,
          unitText: 'YEAR',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: 'Deep Learning Intern (AI Models)',
      description:
        'Train neural network graphs, fine-tune LLMs, and structure vector stores alongside senior AI researchers.',
      identifier: {
        '@type': 'PropertyValue',
        name: 'Tesseract InfoSystems',
        value: 'AI-INT',
      },
      datePosted: '2026-07-01',
      validThrough: '2026-12-31',
      employmentType: 'INTERN',
      hiringOrganization: {
        '@id': `${BASE_URL}/#organization`,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Baramati',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
    },
  ];
}

export function getLeadershipSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Alistair Vance',
      jobTitle: 'Chief Executive Officer (CEO)',
      worksFor: {
        '@id': `${BASE_URL}/#organization`,
      },
      description: 'Former Principal Architect at AWS and Distributed Systems researcher.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Marcus Sterling',
      jobTitle: 'Head of Software Systems',
      worksFor: {
        '@id': `${BASE_URL}/#organization`,
      },
      description: 'Database systems lead with 15+ years managing scale infrastructure.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Julia Feng',
      jobTitle: 'Director of AI Systems',
      worksFor: {
        '@id': `${BASE_URL}/#organization`,
      },
      description: 'PhD in Machine Learning and neural graph optimizer designer.',
    },
  ];
}

export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Tesseract InfoSystems provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tesseract InfoSystems specializes in Custom Software Development, Enterprise Applications, Hyperscale Cloud Deployments, DevOps Engineering, AI & Automation Solutions, Digital Marketing, and IT Staffing Solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where are Tesseract InfoSystems offices located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tesseract InfoSystems headquarters are located in Baramati and Pune, Maharashtra, India.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does custom software or cloud architecture development cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Architecture project estimates range from ₹5 Lakhs to ₹40+ Lakhs (INR) depending on project scope (Custom Software, Cloud-Native, AI Integration), corporate scale (SME, Enterprise, Hyperscale), and compliance requirements (SOC 2, HIPAA).',
        },
      },
      {
        '@type': 'Question',
        name: 'How can clients request a project quotation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Clients can request a custom project quote through the interactive estimator on the /services page or by emailing info@tesseractinfosystems.com or contact@tesseractsys.com.',
        },
      },
    ],
  };
}
