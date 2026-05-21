import type { CategoryDetail, CategoryTab } from "@/features/categories/types/category.types";

const categoryTabs: CategoryTab[] = [
  { label: "All Courses", href: "#courses" },
  { label: "Applications", href: "#applications" },
  { label: "Learning Path", href: "#learning-path" },
  { label: "Careers", href: "#careers" },
  { label: "Overview", href: "#overview" },
  { label: "Blogs", href: "#blogs" },
];

export const categoryDetails: CategoryDetail[] = [
  {
    slug: "ai-finance",
    hero: {
      title: "AI in Finance Courses",
      badge: "Category",
      description:
        "Learn how artificial intelligence, machine learning and generative AI are transforming lending, payments, fraud detection, risk analytics, compliance and financial decision-making.",
      icon: "bot",
      gradient: "blue",
      layout: "stats-right",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "Understand the Domain", href: "#overview", variant: "outline" },
      ],
      stats: [
        { value: "22+", label: "Courses in this category", icon: "bot" },
        { value: "5", label: "Learning levels", icon: "layers" },
        { value: "10+", label: "Career pathways", icon: "briefcase" },
        { value: "100%", label: "Stackable learning design", icon: "route" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      {
        id: "ai-finance-foundations",
        title: "AI in Finance: Foundations and Use Cases",
        categoryLabel: "AI in Finance",
        level: "Discovery",
        duration: "5 hours",
        mode: "Self-paced",
        audience: "Students and professionals",
        fee: "Free",
        priceType: "Free",
        tags: ["AI Basics", "Finance Use Cases", "Digital Finance"],
        isLatest: true,
      },
      {
        id: "ai-banking-fluency",
        title: "AI Fluency for Banking and FinTech Professionals",
        categoryLabel: "AI in Finance",
        level: "Fluency",
        duration: "8 hours",
        mode: "Online Live",
        audience: "Working professionals",
        fee: "Free",
        priceType: "Free",
        tags: ["AI Vocabulary", "Risk", "Credit"],
      },
      {
        id: "ml-credit-risk",
        title: "Machine Learning for Credit Scoring and Risk Analytics",
        categoryLabel: "AI in Finance",
        level: "Beginner",
        duration: "18 hours",
        mode: "Online Live",
        audience: "Analysts and students",
        fee: "INR 12,000 + GST",
        priceType: "Paid",
        tags: ["ML", "Credit Scoring", "Risk Analytics"],
        isLatest: true,
      },
      {
        id: "genai-financial-services",
        title: "Generative AI Applications in Financial Services",
        categoryLabel: "AI in Finance",
        level: "Intermediate",
        duration: "30 hours",
        mode: "Hybrid",
        audience: "Professionals",
        fee: "INR 18,000 + GST",
        priceType: "Paid",
        tags: ["GenAI", "Automation", "Customer Service"],
      },
      {
        id: "fraud-detection-ai",
        title: "Fraud Detection using AI and Data Science",
        categoryLabel: "AI in Finance",
        level: "Intermediate",
        duration: "32 hours",
        mode: "Online Live",
        audience: "BFSI professionals",
        fee: "INR 20,000 + GST",
        priceType: "Paid",
        tags: ["Anomaly Detection", "AML", "Dashboards"],
      },
      {
        id: "responsible-ai-finance",
        title: "Responsible AI, Governance and Explainability in Finance",
        categoryLabel: "AI in Finance",
        level: "Advanced",
        duration: "42 hours",
        mode: "Hybrid",
        audience: "Leaders and regulators",
        fee: "INR 30,000 + GST",
        priceType: "Paid",
        tags: ["XAI", "Policy", "Model Risk"],
        isLatest: true,
      },
    ],
    applications: [
      {
        title: "Credit and Lending",
        description:
          "Use AI models to improve credit scoring, underwriting, loan monitoring and portfolio risk decisions.",
        icon: "chart",
      },
      {
        title: "Fraud and AML",
        description:
          "Detect suspicious patterns, transaction anomalies and financial crime risk using data-led systems.",
        icon: "shieldCheck",
      },
      {
        title: "Customer Intelligence",
        description:
          "Personalise financial journeys through AI-enabled insights, chatbots and segmentation.",
        icon: "message",
      },
      {
        title: "Risk and Compliance",
        description:
          "Support compliance monitoring, explainability, model governance and responsible AI deployment.",
        icon: "scale",
      },
    ],
    learningPath: [
      {
        title: "AI in Finance: Foundations and Use Cases",
        level: "Discovery",
        duration: "5 hours",
        mode: "Self-paced",
        fee: "Free",
        tags: ["AI Basics", "Finance Use Cases", "Digital Finance"],
      },
      {
        title: "AI Fluency for Banking and FinTech Professionals",
        level: "Fluency",
        duration: "8 hours",
        mode: "Online Live",
        fee: "Free",
        tags: ["AI Vocabulary", "Risk", "Credit"],
      },
      {
        title: "Machine Learning for Credit Scoring and Risk Analytics",
        level: "Beginner",
        duration: "18 hours",
        mode: "Online Live",
        fee: "INR 12,000 + GST",
        tags: ["ML", "Credit Scoring", "Risk Analytics"],
      },
    ],
    careers: [
      {
        title: "AI Product Manager",
        salaryRange: "INR 18-40 LPA",
        note: "High demand in BFSI and FinTech",
        skills: ["AI Strategy", "LLMs", "Product Thinking"],
      },
      {
        title: "Financial Data Scientist",
        salaryRange: "INR 12-28 LPA",
        note: "Strong analytics hiring",
        skills: ["Python", "ML", "Risk Models"],
      },
      {
        title: "Fraud Analytics Specialist",
        salaryRange: "INR 10-24 LPA",
        note: "Growing with digital payments",
        skills: ["Anomaly Detection", "AML", "Dashboards"],
      },
      {
        title: "AI Governance Lead",
        salaryRange: "INR 22-45 LPA",
        note: "Emerging leadership role",
        skills: ["XAI", "Policy", "Model Risk"],
      },
    ],
    overview: [
      {
        title: "What it covers",
        body: "This category covers the practical AI concepts, workflows and governance patterns used across modern financial services.",
        callout:
          "Use this category as a guided pathway from business understanding to applied AI implementation.",
      },
      {
        title: "Why learn it now",
        body: "Financial services are becoming increasingly digital, data-led and technology-enabled. AI capability helps learners participate in this shift with relevant skills and vocabulary.",
      },
      {
        title: "Key skills",
        bullets: [
          "Domain vocabulary and core concepts",
          "Applied tools and workflows",
          "Business and regulatory context",
          "Project-based implementation",
          "Responsible and ethical use",
        ],
      },
      {
        title: "Who should learn",
        body: "Students, early-career professionals, working professionals, entrepreneurs, analysts, product teams, compliance teams and regulators can all use this category to build practical AI finance fluency.",
      },
      {
        title: "Industry relevance",
        body: "AI is now visible in lending, insurance, payments, wealth, fraud operations, customer support, risk monitoring and compliance reporting.",
      },
    ],
    blogs: [
      {
        topic: "AI in Finance",
        title: "How AI is changing credit decisions in digital lending",
        excerpt:
          "A practical overview of where machine learning is being used in lending, credit scoring and underwriting.",
        readTime: "6 min read",
      },
      {
        topic: "AI Governance",
        title: "Responsible AI in financial services: what professionals must know",
        excerpt:
          "Why explainability, auditability and fairness are becoming central to AI-enabled financial systems.",
        readTime: "8 min read",
      },
      {
        topic: "GenAI",
        title: "Generative AI use cases for banks and FinTech teams",
        excerpt:
          "From customer service to document intelligence, GenAI is creating new possibilities for financial services.",
        readTime: "7 min read",
      },
    ],
  },
  {
    slug: "fintech-core",
    hero: {
      title: "FinTech Core Courses",
      badge: "Category",
      description:
        "Build a clear foundation in digital finance, FinTech business models, open banking, neo-banking, embedded finance and platform-led financial services.",
      icon: "landmark",
      gradient: "blue",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "View Learning Path", href: "#learning-path", variant: "outline" },
      ],
      stats: [
        { value: "24+", label: "Courses in this category", icon: "bookOpen" },
        { value: "5", label: "Learning levels", icon: "layers" },
        { value: "8+", label: "Career pathways", icon: "briefcase" },
        { value: "Core", label: "Best starting track", icon: "target" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      {
        id: "fintech-fundamentals",
        title: "FinTech Fundamentals and Digital Finance Overview",
        categoryLabel: "FinTech Core",
        level: "Discovery",
        duration: "4 hours",
        mode: "Self-paced",
        audience: "Students and working professionals",
        fee: "Free",
        priceType: "Free",
        tags: ["FinTech Models", "Open Banking", "Digital Finance"],
        isLatest: true,
      },
      {
        id: "open-banking-platforms",
        title: "Open Banking, API Finance and Platform Business Models",
        categoryLabel: "FinTech Core",
        level: "Beginner",
        duration: "16 hours",
        mode: "Online Live",
        audience: "Product and business learners",
        fee: "INR 10,000 + GST",
        priceType: "Paid",
        tags: ["APIs", "Banking", "Embedded Finance"],
      },
      {
        id: "fintech-product-strategy",
        title: "FinTech Product Strategy and Market Design",
        categoryLabel: "FinTech Core",
        level: "Intermediate",
        duration: "24 hours",
        mode: "Hybrid",
        audience: "Founders and product teams",
        fee: "INR 16,000 + GST",
        priceType: "Paid",
        tags: ["Product", "Go-to-market", "Compliance"],
      },
    ],
    applications: [
      { title: "Digital Banking", description: "Understand how banks modernise services through digital channels, API layers and partner ecosystems.", icon: "building" },
      { title: "Embedded Finance", description: "Map how payments, credit and insurance are embedded into non-financial customer journeys.", icon: "layers" },
      { title: "Financial Inclusion", description: "Learn how technology can reduce access gaps for underserved learners, customers and communities.", icon: "users" },
      { title: "Product Strategy", description: "Connect business models, customer needs, regulations and unit economics in FinTech products.", icon: "target" },
    ],
    learningPath: [
      { title: "FinTech Fundamentals and Digital Finance Overview", level: "Discovery", duration: "4 hours", mode: "Self-paced", fee: "Free", tags: ["FinTech Models", "Digital Finance"] },
      { title: "Open Banking, API Finance and Platform Business Models", level: "Beginner", duration: "16 hours", mode: "Online Live", fee: "INR 10,000 + GST", tags: ["APIs", "Banking", "Platforms"] },
      { title: "FinTech Product Strategy and Market Design", level: "Intermediate", duration: "24 hours", mode: "Hybrid", fee: "INR 16,000 + GST", tags: ["Product", "Strategy", "Compliance"] },
    ],
    careers: [
      { title: "FinTech Product Associate", salaryRange: "INR 8-18 LPA", note: "Strong entry path for product roles", skills: ["Product", "Research", "Digital Finance"] },
      { title: "Open Banking Analyst", salaryRange: "INR 10-22 LPA", note: "Useful across banks and API platforms", skills: ["APIs", "Partnerships", "Risk"] },
      { title: "FinTech Strategy Consultant", salaryRange: "INR 14-32 LPA", note: "High value business advisory role", skills: ["Market Design", "Business Models", "Regulation"] },
    ],
    overview: [
      { title: "What it covers", body: "Core FinTech concepts, business models, ecosystem players, digital journeys, platform economics and regulatory context." },
      { title: "Why learn it now", body: "Banks, NBFCs, payment companies and startups increasingly need talent that understands finance, technology and customer behaviour together." },
      { title: "Key skills", bullets: ["FinTech vocabulary", "Business model analysis", "Digital product thinking", "Regulatory awareness", "Customer journey mapping"] },
    ],
    blogs: [
      { topic: "FinTech Core", title: "What every beginner should know before entering FinTech", excerpt: "A clean map of products, players and capabilities that shape modern digital finance.", readTime: "5 min read" },
      { topic: "Open Banking", title: "Why API-led finance is changing banking partnerships", excerpt: "How banks, FinTech companies and platforms work together through open finance rails.", readTime: "7 min read" },
      { topic: "Product", title: "How to think like a FinTech product builder", excerpt: "A practical note on customer problems, trust, regulation and scalable financial workflows.", readTime: "6 min read" },
    ],
  },
  {
    slug: "digital-payments",
    hero: {
      title: "Digital Payments Courses",
      badge: "Category",
      description:
        "Learn the payment rails, product flows, risk controls and ecosystem models behind UPI, cards, wallets, merchant payments, India Stack and future payment infrastructure.",
      icon: "walletCards",
      gradient: "teal",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "Explore Applications", href: "#applications", variant: "outline" },
      ],
      stats: [
        { value: "18+", label: "Courses in this category", icon: "walletCards" },
        { value: "4", label: "Core payment rails", icon: "route" },
        { value: "7+", label: "Career pathways", icon: "briefcase" },
        { value: "UPI", label: "India-first use cases", icon: "sparkles" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      { id: "digital-payments-upi", title: "Introduction to Digital Payments and UPI Ecosystem", categoryLabel: "Digital Payments", level: "Beginner", duration: "12 hours", mode: "Online Live", audience: "Banking, FinTech and commerce learners", fee: "INR 8,000 + GST", priceType: "Paid", tags: ["UPI", "India Stack", "Payment Rails"], isLatest: true },
      { id: "merchant-payments", title: "Merchant Payments, QR Flows and Reconciliation", categoryLabel: "Digital Payments", level: "Fluency", duration: "8 hours", mode: "Self-paced", audience: "Operations and product learners", fee: "Free", priceType: "Free", tags: ["QR", "Settlement", "Reconciliation"] },
      { id: "payment-risk-controls", title: "Payment Risk, Fraud Controls and Dispute Operations", categoryLabel: "Digital Payments", level: "Intermediate", duration: "22 hours", mode: "Hybrid", audience: "Risk and operations teams", fee: "INR 14,000 + GST", priceType: "Paid", tags: ["Fraud", "Disputes", "Controls"] },
    ],
    applications: [
      { title: "UPI and Real-time Payments", description: "Understand instant transfer flows, participants, settlement concepts and user experience patterns.", icon: "route" },
      { title: "Merchant Acceptance", description: "Learn how QR, POS, payment links and checkout flows support commerce.", icon: "building" },
      { title: "Risk and Disputes", description: "Map fraud signals, chargebacks, refunds, reconciliation and operational controls.", icon: "shieldCheck" },
      { title: "Payment Product Design", description: "Connect speed, trust, convenience and compliance in consumer and business payment journeys.", icon: "walletCards" },
    ],
    learningPath: [
      { title: "Merchant Payments, QR Flows and Reconciliation", level: "Fluency", duration: "8 hours", mode: "Self-paced", fee: "Free", tags: ["QR", "Settlement"] },
      { title: "Introduction to Digital Payments and UPI Ecosystem", level: "Beginner", duration: "12 hours", mode: "Online Live", fee: "INR 8,000 + GST", tags: ["UPI", "India Stack"] },
      { title: "Payment Risk, Fraud Controls and Dispute Operations", level: "Intermediate", duration: "22 hours", mode: "Hybrid", fee: "INR 14,000 + GST", tags: ["Fraud", "Disputes"] },
    ],
    careers: [
      { title: "Payments Product Analyst", salaryRange: "INR 8-20 LPA", note: "Relevant for banks and payment startups", skills: ["UPI", "Product", "Metrics"] },
      { title: "Payment Operations Specialist", salaryRange: "INR 6-16 LPA", note: "Critical for scale and reliability", skills: ["Settlement", "Disputes", "Reconciliation"] },
      { title: "Payment Risk Analyst", salaryRange: "INR 9-24 LPA", note: "Growing with real-time payments", skills: ["Fraud", "Rules", "Monitoring"] },
    ],
    overview: [
      { title: "What it covers", body: "Digital payment rails, transaction flows, ecosystem participants, risk controls, merchant acceptance and payment operations." },
      { title: "Why learn it now", body: "Payments sit at the center of digital commerce and financial inclusion, creating demand for talent that understands both product and operations." },
      { title: "Key skills", bullets: ["UPI and payment rail concepts", "Settlement and reconciliation", "Merchant payment workflows", "Fraud and dispute basics", "Payment product thinking"] },
    ],
    blogs: [
      { topic: "UPI", title: "How UPI changed everyday payments in India", excerpt: "A practical view of rails, participants and user experience lessons.", readTime: "5 min read" },
      { topic: "Risk", title: "Why payment fraud controls need both rules and behaviour signals", excerpt: "How teams combine transaction context with operational reviews.", readTime: "6 min read" },
      { topic: "Operations", title: "What payment reconciliation means for growing businesses", excerpt: "A short guide to matching transactions, settlements and exceptions.", readTime: "6 min read" },
    ],
  },
  {
    slug: "data-science-finance",
    hero: {
      title: "Data Science in Finance Courses",
      badge: "Category",
      description:
        "Develop analytics capability for financial data, dashboards, forecasting, customer insight, portfolio monitoring and decision intelligence.",
      icon: "chart",
      gradient: "blue",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "View Careers", href: "#careers", variant: "outline" },
      ],
      stats: [
        { value: "16+", label: "Courses in this category", icon: "chart" },
        { value: "5", label: "Analytics levels", icon: "layers" },
        { value: "9+", label: "Career pathways", icon: "briefcase" },
        { value: "Data", label: "Decision-led focus", icon: "target" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      { id: "financial-data-analytics", title: "Financial Data Analytics for Decision-Making", categoryLabel: "Data Science in Finance", level: "Beginner", duration: "18 hours", mode: "Online Live", audience: "Students, analysts and early professionals", fee: "INR 12,000 + GST", priceType: "Paid", tags: ["Analytics", "Dashboards", "Forecasting"], isLatest: true },
      { id: "portfolio-risk-dashboards", title: "Portfolio Risk Dashboards and KPI Design", categoryLabel: "Data Science in Finance", level: "Fluency", duration: "10 hours", mode: "Self-paced", audience: "Finance and operations learners", fee: "Free", priceType: "Free", tags: ["Dashboards", "KPIs", "Risk"] },
      { id: "predictive-finance-models", title: "Predictive Modelling for Financial Services", categoryLabel: "Data Science in Finance", level: "Intermediate", duration: "28 hours", mode: "Hybrid", audience: "Analysts and data teams", fee: "INR 20,000 + GST", priceType: "Paid", tags: ["Forecasting", "Python", "Models"] },
    ],
    applications: [
      { title: "Portfolio Monitoring", description: "Track performance, risk, exceptions and emerging trends across portfolios.", icon: "lineChart" },
      { title: "Customer Analytics", description: "Segment customers, understand behaviour and identify product opportunities.", icon: "users" },
      { title: "Forecasting", description: "Use historical data to support demand, risk and financial planning decisions.", icon: "trendingUp" },
      { title: "Decision Dashboards", description: "Translate raw financial data into metrics leaders can act on.", icon: "chart" },
    ],
    learningPath: [
      { title: "Portfolio Risk Dashboards and KPI Design", level: "Fluency", duration: "10 hours", mode: "Self-paced", fee: "Free", tags: ["Dashboards", "KPIs"] },
      { title: "Financial Data Analytics for Decision-Making", level: "Beginner", duration: "18 hours", mode: "Online Live", fee: "INR 12,000 + GST", tags: ["Analytics", "Forecasting"] },
      { title: "Predictive Modelling for Financial Services", level: "Intermediate", duration: "28 hours", mode: "Hybrid", fee: "INR 20,000 + GST", tags: ["Python", "Models"] },
    ],
    careers: [
      { title: "Financial Data Analyst", salaryRange: "INR 7-18 LPA", note: "Strong early-career path", skills: ["SQL", "Dashboards", "KPIs"] },
      { title: "Risk Analytics Associate", salaryRange: "INR 10-26 LPA", note: "Important across lending and banking", skills: ["Risk", "Forecasting", "Monitoring"] },
      { title: "Decision Intelligence Consultant", salaryRange: "INR 16-35 LPA", note: "Useful for business transformation", skills: ["Analytics", "Strategy", "Storytelling"] },
    ],
    overview: [
      { title: "What it covers", body: "Financial analytics, data interpretation, dashboards, forecasting, decision support and applied analytics workflows." },
      { title: "Why learn it now", body: "Finance teams need people who can turn data into decisions while understanding business context and risk." },
      { title: "Key skills", bullets: ["Data interpretation", "Dashboard design", "Forecasting concepts", "Financial KPIs", "Decision storytelling"] },
    ],
    blogs: [
      { topic: "Analytics", title: "The finance dashboard metrics every analyst should know", excerpt: "A starter guide to tracking business, risk and customer indicators.", readTime: "5 min read" },
      { topic: "Forecasting", title: "Where predictive modelling helps financial teams", excerpt: "Common use cases across demand, risk, collections and planning.", readTime: "7 min read" },
      { topic: "Careers", title: "How to move from Excel reporting to data science in finance", excerpt: "A practical transition path for finance learners.", readTime: "6 min read" },
    ],
  },
  {
    slug: "cybersecurity-finance",
    hero: {
      title: "Cybersecurity in Finance Courses",
      badge: "Category",
      description:
        "Learn digital trust, identity controls, fraud prevention, secure financial systems and cyber risk practices for banks, FinTech teams and digital platforms.",
      icon: "lock",
      gradient: "blue",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "Understand Risk", href: "#overview", variant: "outline" },
      ],
      stats: [
        { value: "15+", label: "Courses in this category", icon: "lock" },
        { value: "24/7", label: "Security operations context", icon: "shieldCheck" },
        { value: "8+", label: "Career pathways", icon: "briefcase" },
        { value: "Trust", label: "Customer safety focus", icon: "badgeCheck" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      { id: "cybersecurity-readiness", title: "Cybersecurity Readiness for Financial Systems", categoryLabel: "Cybersecurity in Finance", level: "Fluency", duration: "8 hours", mode: "Self-paced", audience: "Professionals and regulators", fee: "Free", priceType: "Free", tags: ["Identity", "Fraud", "Controls"], isLatest: true },
      { id: "secure-fintech-products", title: "Secure FinTech Product Design and Threat Modelling", categoryLabel: "Cybersecurity in Finance", level: "Beginner", duration: "18 hours", mode: "Online Live", audience: "Product and engineering learners", fee: "INR 13,000 + GST", priceType: "Paid", tags: ["Threats", "Controls", "Product"] },
      { id: "financial-cyber-risk", title: "Cyber Risk Governance for Financial Institutions", categoryLabel: "Cybersecurity in Finance", level: "Advanced", duration: "36 hours", mode: "Hybrid", audience: "Managers and compliance teams", fee: "INR 24,000 + GST", priceType: "Paid", tags: ["Governance", "Audit", "Risk"] },
    ],
    applications: [
      { title: "Identity Security", description: "Understand authentication, access control and account protection in financial products.", icon: "lock" },
      { title: "Fraud Prevention", description: "Connect cyber signals with payment, account and customer fraud monitoring.", icon: "shieldCheck" },
      { title: "Secure Product Design", description: "Build security thinking into digital onboarding, payments and servicing journeys.", icon: "clipboardCheck" },
      { title: "Cyber Governance", description: "Map audit, policies, incident response and board-level risk reporting.", icon: "fileText" },
    ],
    learningPath: [
      { title: "Cybersecurity Readiness for Financial Systems", level: "Fluency", duration: "8 hours", mode: "Self-paced", fee: "Free", tags: ["Identity", "Fraud"] },
      { title: "Secure FinTech Product Design and Threat Modelling", level: "Beginner", duration: "18 hours", mode: "Online Live", fee: "INR 13,000 + GST", tags: ["Threats", "Controls"] },
      { title: "Cyber Risk Governance for Financial Institutions", level: "Advanced", duration: "36 hours", mode: "Hybrid", fee: "INR 24,000 + GST", tags: ["Governance", "Audit"] },
    ],
    careers: [
      { title: "Cyber Risk Analyst", salaryRange: "INR 8-22 LPA", note: "Strong demand in regulated finance", skills: ["Risk", "Controls", "Monitoring"] },
      { title: "Fraud Strategy Specialist", salaryRange: "INR 10-28 LPA", note: "Important for payments and lending", skills: ["Fraud", "Rules", "Investigation"] },
      { title: "Security Governance Lead", salaryRange: "INR 20-45 LPA", note: "Leadership role in mature teams", skills: ["Policy", "Audit", "Response"] },
    ],
    overview: [
      { title: "What it covers", body: "Identity controls, secure systems, threat modelling, fraud prevention, governance and cyber risk operations." },
      { title: "Why learn it now", body: "Digital finance depends on trust. As adoption grows, security and fraud readiness become core business capabilities." },
      { title: "Key skills", bullets: ["Cyber risk basics", "Identity and access concepts", "Threat modelling", "Fraud control vocabulary", "Governance and incident response"] },
    ],
    blogs: [
      { topic: "Security", title: "Why cybersecurity is a business skill in finance", excerpt: "How trust, controls and customer protection shape modern financial products.", readTime: "6 min read" },
      { topic: "Fraud", title: "How fraud and cyber risk connect in digital payments", excerpt: "A simple map of signals, controls and response workflows.", readTime: "7 min read" },
      { topic: "Governance", title: "What cyber governance means for financial institutions", excerpt: "Policies, accountability and reporting patterns that leaders should understand.", readTime: "8 min read" },
    ],
  },
  {
    slug: "regtech-suptech",
    hero: {
      title: "RegTech and SupTech Courses",
      badge: "Category",
      description:
        "Understand compliance automation, KYC, AML monitoring, reporting, supervisory technology and governance workflows for regulated financial services.",
      icon: "shieldCheck",
      gradient: "teal",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "Review Overview", href: "#overview", variant: "outline" },
      ],
      stats: [
        { value: "14+", label: "Courses in this category", icon: "shieldCheck" },
        { value: "KYC", label: "Compliance workflow focus", icon: "clipboardCheck" },
        { value: "6+", label: "Career pathways", icon: "briefcase" },
        { value: "Audit", label: "Governance-ready learning", icon: "fileText" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      { id: "regtech-compliance", title: "RegTech, SupTech and Compliance Automation", categoryLabel: "RegTech / SupTech", level: "Advanced", duration: "42 hours", mode: "Hybrid", audience: "Regulators and compliance teams", fee: "INR 25,000 + GST", priceType: "Paid", tags: ["KYC", "Monitoring", "Governance"], isLatest: true },
      { id: "kyc-aml-workflows", title: "KYC, AML and Customer Due Diligence Workflows", categoryLabel: "RegTech / SupTech", level: "Beginner", duration: "16 hours", mode: "Online Live", audience: "Compliance learners", fee: "INR 10,000 + GST", priceType: "Paid", tags: ["KYC", "AML", "CDD"] },
      { id: "compliance-reporting-basics", title: "Compliance Reporting and Audit Readiness Basics", categoryLabel: "RegTech / SupTech", level: "Fluency", duration: "6 hours", mode: "Self-paced", audience: "Students and operations teams", fee: "Free", priceType: "Free", tags: ["Reporting", "Audit", "Controls"] },
    ],
    applications: [
      { title: "KYC and Onboarding", description: "Map customer verification, risk scoring and due diligence steps.", icon: "user" },
      { title: "AML Monitoring", description: "Understand alerts, investigations, suspicious activity and escalation workflows.", icon: "shieldCheck" },
      { title: "Regulatory Reporting", description: "Learn how data quality, templates and controls support reporting obligations.", icon: "fileText" },
      { title: "Supervisory Technology", description: "Explore how regulators use data and tools to monitor market behaviour.", icon: "landmark" },
    ],
    learningPath: [
      { title: "Compliance Reporting and Audit Readiness Basics", level: "Fluency", duration: "6 hours", mode: "Self-paced", fee: "Free", tags: ["Reporting", "Audit"] },
      { title: "KYC, AML and Customer Due Diligence Workflows", level: "Beginner", duration: "16 hours", mode: "Online Live", fee: "INR 10,000 + GST", tags: ["KYC", "AML"] },
      { title: "RegTech, SupTech and Compliance Automation", level: "Advanced", duration: "42 hours", mode: "Hybrid", fee: "INR 25,000 + GST", tags: ["Monitoring", "Governance"] },
    ],
    careers: [
      { title: "Compliance Analyst", salaryRange: "INR 7-18 LPA", note: "Reliable entry path in BFSI", skills: ["KYC", "AML", "Reporting"] },
      { title: "RegTech Product Specialist", salaryRange: "INR 12-30 LPA", note: "Growing in compliance platforms", skills: ["Workflow", "Rules", "Product"] },
      { title: "SupTech Policy Analyst", salaryRange: "INR 14-34 LPA", note: "Useful for public and regulatory teams", skills: ["Data", "Policy", "Monitoring"] },
    ],
    overview: [
      { title: "What it covers", body: "Compliance automation, KYC, AML, monitoring, reporting, governance and supervisory technology concepts." },
      { title: "Why learn it now", body: "Regulated finance needs faster, cleaner and more auditable compliance workflows as digital volumes increase." },
      { title: "Key skills", bullets: ["KYC and AML vocabulary", "Control design", "Reporting workflows", "Audit readiness", "Regulatory technology awareness"] },
    ],
    blogs: [
      { topic: "RegTech", title: "How compliance automation changes financial operations", excerpt: "A practical introduction to workflows, rules and monitoring.", readTime: "6 min read" },
      { topic: "KYC", title: "KYC basics every FinTech learner should know", excerpt: "Customer due diligence concepts explained in plain operational language.", readTime: "5 min read" },
      { topic: "SupTech", title: "What supervisory technology means for regulators", excerpt: "How data and tooling can support market oversight.", readTime: "7 min read" },
    ],
  },
  {
    slug: "blockchain-dlt",
    hero: {
      title: "Blockchain and DLT Courses",
      badge: "Category",
      description:
        "Learn blockchain, distributed ledgers, smart contracts, tokenisation, CBDCs and enterprise DLT use cases for financial services.",
      icon: "coins",
      gradient: "green",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "Explore Use Cases", href: "#applications", variant: "outline" },
      ],
      stats: [
        { value: "17+", label: "Courses in this category", icon: "coins" },
        { value: "DLT", label: "Enterprise technology focus", icon: "layers" },
        { value: "7+", label: "Career pathways", icon: "briefcase" },
        { value: "CBDC", label: "Future rails context", icon: "landmark" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      { id: "blockchain-finance-basics", title: "Blockchain and DLT Foundations for Finance", categoryLabel: "Blockchain & DLT", level: "Discovery", duration: "6 hours", mode: "Self-paced", audience: "Students and finance learners", fee: "Free", priceType: "Free", tags: ["Blockchain", "DLT", "Tokens"], isLatest: true },
      { id: "smart-contracts-finance", title: "Smart Contracts and Tokenisation in Financial Markets", categoryLabel: "Blockchain & DLT", level: "Beginner", duration: "18 hours", mode: "Online Live", audience: "Product and technology learners", fee: "INR 12,000 + GST", priceType: "Paid", tags: ["Smart Contracts", "Tokenisation", "Markets"] },
      { id: "cbdc-enterprise-dlt", title: "CBDCs and Enterprise DLT for Financial Infrastructure", categoryLabel: "Blockchain & DLT", level: "Intermediate", duration: "28 hours", mode: "Hybrid", audience: "Professionals and policy learners", fee: "INR 20,000 + GST", priceType: "Paid", tags: ["CBDC", "Infrastructure", "Settlement"] },
    ],
    applications: [
      { title: "Tokenisation", description: "Understand digital representation of assets, ownership records and market workflows.", icon: "coins" },
      { title: "Smart Contracts", description: "Explore automated agreements and programmable financial workflows.", icon: "clipboardCheck" },
      { title: "CBDCs", description: "Map central bank digital currency concepts and future payment rails.", icon: "landmark" },
      { title: "Enterprise DLT", description: "Learn where shared ledgers can improve settlement, auditability and coordination.", icon: "layers" },
    ],
    learningPath: [
      { title: "Blockchain and DLT Foundations for Finance", level: "Discovery", duration: "6 hours", mode: "Self-paced", fee: "Free", tags: ["Blockchain", "DLT"] },
      { title: "Smart Contracts and Tokenisation in Financial Markets", level: "Beginner", duration: "18 hours", mode: "Online Live", fee: "INR 12,000 + GST", tags: ["Smart Contracts", "Tokens"] },
      { title: "CBDCs and Enterprise DLT for Financial Infrastructure", level: "Intermediate", duration: "28 hours", mode: "Hybrid", fee: "INR 20,000 + GST", tags: ["CBDC", "Settlement"] },
    ],
    careers: [
      { title: "Blockchain Business Analyst", salaryRange: "INR 9-22 LPA", note: "Useful bridge role for finance teams", skills: ["DLT", "Use Cases", "Process"] },
      { title: "Tokenisation Product Specialist", salaryRange: "INR 12-32 LPA", note: "Emerging market infrastructure role", skills: ["Assets", "Markets", "Compliance"] },
      { title: "CBDC Research Associate", salaryRange: "INR 10-26 LPA", note: "Relevant to policy and payment teams", skills: ["Payments", "Policy", "Infrastructure"] },
    ],
    overview: [
      { title: "What it covers", body: "Blockchain concepts, DLT architecture, smart contracts, tokenisation, CBDCs and enterprise finance use cases." },
      { title: "Why learn it now", body: "Financial institutions are evaluating shared infrastructure for settlement, transparency, auditability and new asset models." },
      { title: "Key skills", bullets: ["Blockchain vocabulary", "Tokenisation concepts", "Smart contract basics", "CBDC awareness", "Enterprise use case mapping"] },
    ],
    blogs: [
      { topic: "Blockchain", title: "Where blockchain fits in financial services", excerpt: "A practical lens on when DLT helps and when simpler systems are enough.", readTime: "6 min read" },
      { topic: "Tokenisation", title: "Tokenised assets explained for finance learners", excerpt: "How ownership records, transferability and compliance shape tokenised markets.", readTime: "7 min read" },
      { topic: "CBDC", title: "CBDCs and the future of payment infrastructure", excerpt: "Key concepts behind central bank digital currency experiments.", readTime: "8 min read" },
    ],
  },
  {
    slug: "sustainable-finance",
    hero: {
      title: "Sustainable Finance Courses",
      badge: "Category",
      description:
        "Learn climate finance, ESG, green FinTech, impact investing and financial inclusion through a practical, learner-friendly pathway.",
      icon: "sprout",
      gradient: "green",
      ctas: [
        { label: "Browse Courses", href: "#courses" },
        { label: "Explore Impact", href: "#applications", variant: "outline" },
      ],
      stats: [
        { value: "12+", label: "Courses in this category", icon: "sprout" },
        { value: "ESG", label: "Sustainability context", icon: "badgeCheck" },
        { value: "6+", label: "Career pathways", icon: "briefcase" },
        { value: "Impact", label: "Inclusion-first learning", icon: "heartHandshake" },
      ],
    },
    tabs: categoryTabs,
    courses: [
      { id: "sustainable-finance-basics", title: "Sustainable Finance and ESG Fundamentals", categoryLabel: "Sustainable Finance", level: "Discovery", duration: "5 hours", mode: "Self-paced", audience: "Students and early professionals", fee: "Free", priceType: "Free", tags: ["ESG", "Climate", "Impact"], isLatest: true },
      { id: "green-fintech-products", title: "Green FinTech Product Models and Inclusion", categoryLabel: "Sustainable Finance", level: "Beginner", duration: "14 hours", mode: "Online Live", audience: "Product and social-impact learners", fee: "INR 9,000 + GST", priceType: "Paid", tags: ["Green FinTech", "Inclusion", "Products"] },
      { id: "climate-risk-finance", title: "Climate Risk and Sustainable Investment Workflows", categoryLabel: "Sustainable Finance", level: "Intermediate", duration: "26 hours", mode: "Hybrid", audience: "Finance and risk professionals", fee: "INR 18,000 + GST", priceType: "Paid", tags: ["Climate Risk", "Investment", "Reporting"] },
    ],
    applications: [
      { title: "Green Finance", description: "Understand lending, investment and product models that support sustainability outcomes.", icon: "sprout" },
      { title: "ESG Reporting", description: "Map sustainability metrics, disclosures and decision workflows.", icon: "fileText" },
      { title: "Financial Inclusion", description: "Explore how digital finance can support access, affordability and resilience.", icon: "heartHandshake" },
      { title: "Climate Risk", description: "Learn how climate exposure affects lending, investment and portfolio decisions.", icon: "trendingUp" },
    ],
    learningPath: [
      { title: "Sustainable Finance and ESG Fundamentals", level: "Discovery", duration: "5 hours", mode: "Self-paced", fee: "Free", tags: ["ESG", "Climate"] },
      { title: "Green FinTech Product Models and Inclusion", level: "Beginner", duration: "14 hours", mode: "Online Live", fee: "INR 9,000 + GST", tags: ["Products", "Inclusion"] },
      { title: "Climate Risk and Sustainable Investment Workflows", level: "Intermediate", duration: "26 hours", mode: "Hybrid", fee: "INR 18,000 + GST", tags: ["Risk", "Investment"] },
    ],
    careers: [
      { title: "ESG Analyst", salaryRange: "INR 7-20 LPA", note: "Growing in reporting and investment teams", skills: ["ESG", "Metrics", "Research"] },
      { title: "Sustainable Finance Associate", salaryRange: "INR 10-26 LPA", note: "Relevant for banks and funds", skills: ["Climate", "Risk", "Portfolio"] },
      { title: "Financial Inclusion Program Lead", salaryRange: "INR 12-28 LPA", note: "Impact-focused leadership path", skills: ["Inclusion", "Partnerships", "Products"] },
    ],
    overview: [
      { title: "What it covers", body: "Sustainable finance concepts, ESG reporting, climate risk, inclusion, impact investing and green financial products." },
      { title: "Why learn it now", body: "Capital, regulation and public interest are moving toward sustainability, creating demand for finance professionals with practical ESG fluency." },
      { title: "Key skills", bullets: ["ESG vocabulary", "Climate risk basics", "Impact measurement", "Inclusion product thinking", "Sustainability reporting"] },
    ],
    blogs: [
      { topic: "ESG", title: "ESG basics for finance learners", excerpt: "A simple guide to environmental, social and governance concepts in finance.", readTime: "5 min read" },
      { topic: "Climate Risk", title: "How climate risk affects lending and investment", excerpt: "Why physical and transition risk matter for financial decisions.", readTime: "7 min read" },
      { topic: "Inclusion", title: "Why financial inclusion is a product design challenge", excerpt: "How access, affordability and trust shape inclusive financial services.", readTime: "6 min read" },
    ],
  },
];

export function getCategoryDetail(slug: string) {
  return categoryDetails.find((category) => category.slug === slug);
}
