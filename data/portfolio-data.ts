export type CardType = "experience" | "skills" | "projects" | "certifications" | "education" | "volunteering"

export interface CardData {
  id: string
  type: CardType
  title: string
  subtitle: string
  dates?: string
  description: string
  tags?: string[]
  link?: string
  imageUrl?: string
  location?: string
}

export interface PortfolioData {
  experience: CardData[]
  skills: CardData[]
  projects: CardData[]
  certifications: CardData[]
  education: CardData[]
  volunteering: CardData[]
}

export interface Project {
  name: string
  description: string
  tags: string[]
  image: string
  url: string
}

export const portfolioData: PortfolioData = {
  experience: [
    {
      id: "exp0",
      type: "experience",
      title: "Technical Project Manager & Scrum Master",
      subtitle: "Noise Digital Inc., Toronto, ON",
      location: "Toronto, ON",
      dates: "Aug 2024 – Oct 2025",
      description:
        "Lead $750K+ portfolio of SaaS, automation, and data infrastructure projects across tagging, consent/privacy, and platform rollouts for clients in finance, healthcare, education, and retail, including treasury, reporting, and data-governance initiatives that required close coordination with internal stakeholders and hybrid Agile delivery.\n\n" +
        "Run hybrid Agile delivery across selected workstreams, acting as Scrum Master for stand-ups, sprint planning, backlog refinement, and release checkpoints.\n\n" +
        "Coordinate cross-functional teams (engineering, analytics, product, marketing) to deliver scalable programs from scoping to launch.\n\n" +
        "Track delivery using RAID logs and dashboards, flagging risks and surfacing blockers for leadership decision-making.\n\n" +
        "Partner with clients to align priorities, drive approvals, and integrate feedback loops post-launch.\n\n" +
        "Support data governance and integration planning to enable reporting consistency and future-proof architecture.\n\n" +
        "Develop QA plans, change-readiness comms, and support documentation to drive adoption.",
      tags: [
        "Scrum Master",
        "Agile",
        "Hybrid Delivery",
        "SaaS",
        "Data Infrastructure",
        "RAID Logs",
        "Sprint Planning",
        "Backlog Refinement",
        "Stakeholder Management",
        "Data Governance",
        "QA",
        "Cross-functional Teams",
      ],
      imageUrl: "/images/noise-logo.png",
    },
    {
      id: "exp-sitesbyjay",
      type: "experience",
      title: "Founder & Full Stack Consultant",
      subtitle: "Sites By Jay Li, Toronto, ON",
      location: "Toronto, ON",
      dates: "Jul 2025 – Present",
      description:
        "Run a self-directed web consultancy delivering custom sites and CMS solutions for small businesses.\n\n" +
        "Lead full-stack builds, integrations (e.g. GA4, CRM, payments), and ongoing strategy to support growth and data-driven operations.\n\n" +
        "Manage complete ownership of scoping, delivery, and client expectations to navigate ambiguity and protect delivery pace.",
      tags: [
        "Full Stack",
        "Web Development",
        "CMS",
        "GA4",
        "CRM Integration",
        "Payments",
        "Client Management",
        "Small Business",
      ],
    },
    {
      id: "exp1",
      type: "experience",
      title: "Technical Project Manager & Product Owner",
      subtitle: "Fourth Dimension Inc., Toronto, ON",
      location: "Toronto, ON",
      dates: "Mar 2024 – May 2024",
      description:
        "Delivered $250K Agile rebuild of national registry platform, improving security, speed, and UX.\n\n" +
        "Owned backlog, sprint cadence, and roadmap planning across full-stack teams (ShadCN, Node, Stripe, analytics).",
      tags: ["Product Owner", "Agile", "Full Stack", "Stripe", "REST API", "ShadCN", "SQL", "NoSQL", "System Design"],
      imageUrl: "/images/4d-logo.png",
    },
    {
      id: "exp2",
      type: "experience",
      title: "Technical Project Manager & Scrum Master",
      subtitle: "XLMedia Canada Marketing Ltd., Toronto, ON",
      location: "Toronto, ON",
      dates: "Aug 2023 – Feb 2024",
      description:
        "Facilitated Scrum ceremonies and Agile delivery for 3 site migrations and 4 high-impact mobile and web builds with distributed teams across the UK, MX, US, and CA.\n\n" +
        "Managed dependencies between PMO, SEO, engineering, content, and UX; tracked work in JIRA, Confluence, and shared dashboards to maintain delivery momentum and transparency.\n\n" +
        "Led release planning, coordinated defect triage, and aligned testing across multiple time zones.",
      tags: [
        "Scrum Master",
        "Agile",
        "JIRA",
        "Confluence",
        "SEO",
        "Release Planning",
        "Global Teams",
        "Site Migration",
      ],
      imageUrl: "/images/xlmedia-logo.png",
    },
    {
      id: "exp3",
      type: "experience",
      title: "Project Manager",
      subtitle: "Hotspex Media Inc., Toronto, ON",
      location: "Toronto, ON",
      dates: "Dec 2021 – Jul 2023",
      description:
        "Delivered 35+ concurrent digital initiatives ($4.5M+) in a fast-paced agency setting, covering analytics, paid media, and marketing automation—consistently meeting scope, schedule, and quality targets.\n\n" +
        "Coordinated QA, reporting, and campaign optimization using A/B testing frameworks and performance dashboards.",
      tags: [
        "Digital Marketing",
        "Analytics",
        "Paid Media",
        "A/B Testing",
        "Performance Dashboards",
        "Marketing Automation",
        "KPI",
      ],
      imageUrl: "/images/hotspex-logo.png",
    },
  ],
  skills: [
    {
      id: "skill1",
      type: "skills",
      title: "Engineering Operations & Delivery",
      subtitle: "Expert",
      description:
        "🧩 Core Skills\n" +
        "Sprint cadence, planning cycles, release coordination, dependency tracking, work-back plans, KPI/velocity dashboards, QA allocation\n\n" +
        "🔧 Applications\n" +
        "• End-to-end engineering project lifecycle management\n" +
        "• Velocity tracking and sprint metrics\n" +
        "• Cross-team dependency coordination\n" +
        "• Release planning and deployment workflows\n\n" +
        "🎯 Focus Areas\n" +
        "• Large-scale SaaS and web infrastructure delivery\n" +
        "• Engineering team operations and optimization\n" +
        "• Technical project delivery at scale",
      tags: [
        "Sprint Cadence",
        "Release Coordination",
        "Dependency Tracking",
        "KPI Dashboards",
        "Velocity",
        "QA Allocation",
        "Work-back Plans",
      ],
    },
    {
      id: "skill2",
      type: "skills",
      title: "Process & Governance",
      subtitle: "Expert",
      description:
        "🧩 Core Skills\n" +
        "Roadmapping, estimation standards, Jira/Confluence best practices, work intake, status reporting, risk escalation\n\n" +
        "🔧 Tools\n" +
        "• Jira, Confluence (admin & customization)\n" +
        "• Process documentation and templates\n" +
        "• RAID logs and risk management\n\n" +
        "🎯 Focus Areas\n" +
        "• PMO framework setup and optimization\n" +
        "• Governance standards for enterprise clients\n" +
        "• Work intake and prioritization processes",
      tags: [
        "Roadmapping",
        "Estimation",
        "Jira Best Practices",
        "Confluence",
        "Work Intake",
        "Status Reporting",
        "Risk Escalation",
      ],
    },
    {
      id: "skill3",
      type: "skills",
      title: "Agile & Hybrid Delivery",
      subtitle: "Expert",
      description:
        "🧩 Core Skills\n" +
        "Scrum, Kanban, backlog refinement, sprint planning, retros, stand-ups, hybrid workflows\n\n" +
        "🔧 Methodologies\n" +
        "• Scrum framework and ceremonies\n" +
        "• Kanban flow management\n" +
        "• Hybrid Agile for enterprise settings\n\n" +
        "🎯 Focus Areas\n" +
        "• Scrum Master facilitation\n" +
        "• Agile transformation and coaching\n" +
        "• Cross-functional Agile team leadership",
      tags: ["Scrum", "Kanban", "Backlog Refinement", "Sprint Planning", "Retros", "Stand-ups", "Hybrid Workflows"],
    },
    {
      id: "skill4",
      type: "skills",
      title: "Metrics & Tools",
      subtitle: "Advanced",
      description:
        "🧩 Core Skills\n" +
        "Dashboards for velocity, SLAs, incident response; data pipelines, analytics integration\n\n" +
        "🔧 Tools\n" +
        "• Jira, Confluence, Azure DevOps\n" +
        "• Asana, Monday.com\n" +
        "• GA4, Power BI, Looker Studio\n\n" +
        "🎯 Focus Areas\n" +
        "• Custom dashboard creation for stakeholders\n" +
        "• SLA tracking and incident response reporting\n" +
        "• Data-driven project insights and optimization",
      tags: ["Dashboards", "Velocity Tracking", "SLAs", "Jira", "Azure DevOps", "GA4", "Power BI", "Looker Studio"],
    },
    {
      id: "skill5",
      type: "skills",
      title: "Collaboration & Productivity",
      subtitle: "Expert",
      description:
        "🧩 Core Skills\n" +
        "Cross-functional facilitation across engineering, product, QA, business ops\n\n" +
        "🔧 Tools\n" +
        "• Microsoft 365, Google Workspace\n" +
        "• Smartsheet, Slack, Zoom, Miro\n\n" +
        "🎯 Focus Areas\n" +
        "• Remote and distributed team coordination\n" +
        "• Stakeholder communication at all levels\n" +
        "• Building alignment between engineering, product, and business",
      tags: ["Microsoft 365", "Google Workspace", "Smartsheet", "Slack", "Zoom", "Miro", "Cross-functional Teams"],
    },
    {
      id: "skill6",
      type: "skills",
      title: "Testing & QA Support",
      subtitle: "Advanced",
      description:
        "🧩 Core Skills\n" +
        "QA capacity planning, defect triage, performance monitoring, debugging support\n\n" +
        "🔧 Tools\n" +
        "• Lighthouse, Hotjar, ObservePoint\n" +
        "• Chrome DevTools, GA Debugger\n\n" +
        "🎯 Focus Areas\n" +
        "• QA coordination and test planning\n" +
        "• Defect triage and prioritization\n" +
        "• Performance optimization support",
      tags: ["QA Planning", "Defect Triage", "Lighthouse", "Hotjar", "ObservePoint", "Testing Coordination"],
    },
  ],
  projects: [
    {
      id: "proj-elixir1",
      type: "projects",
      title: "Elixir1 Skincare Clinic - Medical Aesthetics Website",
      subtitle: "Client Project | Full Service Web Development",
      dates: "2025",
      description:
        "Led the project from brand strategy through design and development for a luxury medical aesthetics clinic.\n\n" +
        "Defined a luxury brand identity with a gold and dark palette reflecting premium services.\n\n" +
        "Integrated booking and VISIA skin analysis systems seamlessly for client convenience.\n\n" +
        "Built mobile-first responsive design with service pages featuring detailed treatment descriptions and brand partners.",
      tags: [
        "Web Design",
        "Brand Strategy",
        "Next.js",
        "Booking Integration",
        "Responsive Design",
        "UX/UI",
        "Medical Aesthetics",
      ],
      link: "https://www.elixir1.ca/",
      image: "/images/elixir1-screenshot.png",
    },
    {
      id: "proj-browfix",
      type: "projects",
      title: "BrowFix - Premium Beauty Services Booking Platform",
      subtitle: "Client Project | Full Service Web Development",
      dates: "2025",
      description:
        "Led the project from brand strategy through design and development for a premium brow and lash beauty service.\n\n" +
        "Defined a clean, modern brand identity with soft pink accent palette.\n\n" +
        "Integrated seamless booking system for brow and lash appointments with treatment details.\n\n" +
        "Built professional gallery showcasing before/after results with optimized mobile loading and local SEO.",
      tags: ["Web Design", "Brand Strategy", "Booking System", "Responsive Design", "Beauty Services", "UX/UI", "SEO"],
      link: "https://browfix.ca/",
      image: "/images/browfix-screenshot.png",
    },
    {
      id: "proj-macafe",
      type: "projects",
      title: "M&A Cafe - Artisanal Coffee Shop Experience",
      subtitle: "Client Project | Full Service Web Development",
      dates: "2025",
      description:
        "Led the project from brand strategy through design and development for an artisanal coffee shop.\n\n" +
        "Defined a warm, artisanal brand identity with sophisticated gold accents and compelling storytelling.\n\n" +
        "Integrated online ordering system with Uber Eats connectivity for seamless delivery.\n\n" +
        "Created gallery showcase highlighting coffee craftsmanship with mobile-optimized design for on-the-go ordering.",
      tags: ["Web Design", "Brand Strategy", "Next.js", "E-commerce", "Responsive Design", "UX/UI", "Food & Beverage"],
      link: "https://macafeto.ca/",
      image: "/images/macafe-screenshot.png",
    },
    {
      id: "proj-drcat",
      type: "projects",
      title: "Dr. Cat Wellness - Therapeutic Massage Services",
      subtitle: "Client Project | Full Service Web Development",
      dates: "2025",
      description:
        "Built a calming, professional website for a therapeutic massage practice focused on human touch and healing.\n\n" +
        "Designed a serene interface reflecting the healing philosophy with intuitive service exploration.\n\n" +
        "Integrated booking system for multiple massage modalities including Swedish, Deep Tissue, Thai, and Prenatal.\n\n" +
        "Created detailed service descriptions with pricing, benefits, and optional enhancements for personalized care.",
      tags: ["Web Design", "Booking System", "Wellness Services", "Responsive Design", "UX/UI", "Healthcare", "SEO"],
      link: "https://www.drcatwellness.com/",
      image: "/images/drcat-screenshot.png",
    },
    {
      id: "proj-tarot",
      type: "projects",
      title: "Tarot Card Reader - Interactive Web Application",
      subtitle: "Personal Project | Next.js 14, Tailwind CSS, Framer Motion",
      dates: "July 2024",
      description:
        "Built an immersive tarot reading web app with personalized interpretations based on users' focus areas.\n\n" +
        "Created an intuitive three-card spread interface with elegant animations using Framer Motion.\n\n" +
        "Integrated OpenAI to generate personalized card interpretations based on user intentions.\n\n" +
        "Designed a fully responsive interface with accessibility features including screen reader support.",
      tags: [
        "Next.js 14",
        "Tailwind CSS",
        "Framer Motion",
        "OpenAI",
        "Responsive Design",
        "Accessibility",
        "React Context",
      ],
      link: "https://tarot-via.com",
    },
    {
      id: "proj-pmo",
      type: "projects",
      title: "PMO Compare – Project Management Methodology Comparison Tool",
      subtitle: "Personal Project | Next.js, TypeScript, Tailwind, shadcn/ui",
      dates: "June 2024",
      description:
        "Developed a responsive web app that helps users identify the best project management methodologies based on their specific needs.\n\n" +
        "Built an interactive filtering engine with weighted scoring to rank methodologies by project requirements.\n\n" +
        "Implemented side-by-side comparison of methodologies showing strengths, limitations, and use cases.\n\n" +
        "Created with Next.js, TypeScript, and shadcn/ui components for a clean, accessible interface.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Project Management", "PMO", "UX/UI", "Filtering"],
      link: "https://v0-pmo-two.vercel.app/",
    },
    {
      id: "proj0",
      type: "projects",
      title: "Enhancing Community Management with Communiti",
      subtitle: "Launch Academy | Pitch Night Winner",
      dates: "May 2024",
      description:
        "Built a member management feature for Communiti, a platform connecting emerging tech professionals.\n\n" +
        "Led feature scoping, project coordination, and final pitch presentation.\n\n" +
        "Worked with cross-functional teammates to streamline onboarding, community roles, and user flow.\n\n" +
        "Integrated feedback from mentors and incorporated user scenarios to validate MVP direction.",
      tags: ["Product Management", "MVP", "UX Design", "Team Collaboration", "Launch Academy"],
      link: "https://drive.google.com/file/d/19imM6dWTIM3XFlqXajLjaTExpD0QcLPg/view",
    },
    {
      id: "proj1",
      type: "projects",
      title: "Brainstation & Lush Industry Project: A Conscious Shopping Experience",
      subtitle: "Product Manager + Full Stack Developer",
      dates: "August 2023",
      description:
        "Collaborated with a multidisciplinary team to redesign Lush's POS system to align with open-source and ethical tech values.\n\n" +
        "Conducted user interviews, led persona development, and helped define agile sprint cycles.\n\n" +
        "Supported development of MVP using Chakra UI and participated in daily standups via Slack and Jira.\n\n" +
        "Final deliverable included a Figma prototype showcasing an ethical, seamless in-store checkout flow.",
      tags: ["Agile", "POS Systems", "Digital Ethics", "Chakra UI", "User Interviews"],
      link: "https://drive.google.com/file/d/1-Nv3CeXcJZ9O5V7bkuMKIPSnjwOyvBI5/view",
    },
    {
      id: "proj2",
      type: "projects",
      title: "Instock, Scalable Inventory Management System",
      subtitle: "GitHub Full Stack App",
      dates: "May 2023",
      description:
        "Developed a responsive inventory management dashboard allowing users to manage warehouses, addresses, and contact records.\n\n" +
        "Focused on user-friendly UI/UX with modals for editing and confirming deletions.\n\n" +
        "Integrated routing with React Router and used Axios for API handling.\n\n" +
        "Deployed using GitHub Pages and documented setup in the repo.",
      tags: ["React.js", "Axios", "UI Design", "Routing", "GitHub"],
      link: "https://github.com/Jayingli/instock-client",
    },
    {
      id: "proj3",
      type: "projects",
      title: "ThatSpot: Team Restaurant Directory App",
      subtitle: "Full Stack App for Restaurant Discovery",
      dates: "March 2025",
      description:
        "Built a responsive web app to help teams discover and review restaurants near their office.\n\n" +
        "Integrated Google Maps API to calculate distance from 473 Adelaide St W, Toronto.\n\n" +
        "Added filtering, custom submissions, and ratings system with a clean UI.\n\n" +
        "Used React, Tailwind, and Firebase; deployed on Vercel.",
      tags: ["React.js", "Tailwind", "Google Maps API", "Firebase", "UX/UI"],
      link: "https://v0-that-spot-bhxr9l.vercel.app/",
    },
    {
      id: "proj4",
      type: "projects",
      title: "Portfolio Chat UI",
      subtitle: "Personal Project",
      dates: "April 2023",
      description:
        "Created an interactive portfolio chat interface that lets visitors explore experience and projects through conversation.\n\n" +
        "Integrated Google Docs for dynamic content management — no code updates needed.\n\n" +
        "Built admin view with secure refresh functionality to reload content on demand.\n\n" +
        "Used modern stack including Next.js, Tailwind, and Google Docs API.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Google Docs API"],
      link: "https://portfolio-chat.vercel.app",
    },
  ],
  certifications: [
    {
      id: "cert-acp",
      type: "certifications",
      title: "Agile Certified Practitioner (PMI-ACP)",
      subtitle: "Project Management Institute (PMI)",
      dates: "Expected Feb 2026",
      description:
        "Currently pursuing PMI-ACP certification to validate expertise in Agile principles and practices. This certification demonstrates knowledge of Agile methodologies including Scrum, Kanban, Lean, and XP across various project types.",
      tags: ["Agile", "PMI", "Scrum", "Kanban", "Lean", "Project Management"],
    },
    {
      id: "cert1",
      type: "certifications",
      title: "Certified Scrum Master (CSM)",
      subtitle: "Scrum Alliance",
      dates: "2024",
      description:
        "Recognized for Agile team leadership and Scrum framework expertise. Certification validates knowledge of Scrum principles, team facilitation, and Agile project management methodologies.",
      tags: ["Scrum", "Agile", "Team Leadership"],
      imageUrl: "/images/csm-logo.png",
    },
    {
      id: "cert2",
      type: "certifications",
      title: "Certified Scrum Product Owner (CSPO)",
      subtitle: "Scrum Alliance",
      dates: "2024",
      description:
        "Specialized in backlog management, user stories, and Agile delivery. Certification demonstrates ability to maximize business value, prioritize work, and represent stakeholder interests.",
      tags: ["Product Owner", "Agile", "Backlog Management", "User Stories"],
      imageUrl: "/images/cspo-logo.png",
    },
    {
      id: "cert3",
      type: "certifications",
      title: "Generative AI Overview for Project Managers",
      subtitle: "Project Management Institute (PMI)",
      dates: "2024",
      description:
        "Gained insights on AI applications in project management workflows. Learned how to leverage generative AI to improve project planning, execution, and reporting processes.",
      tags: ["AI", "Project Management", "PMI"],
      imageUrl: "/images/pmi-ai-logo.png",
    },
    {
      id: "cert4",
      type: "certifications",
      title: "Atlassian Agile Project Management Certification",
      subtitle: "Atlassian",
      dates: "2023",
      description:
        "Focused on managing Agile projects using Atlassian tools like Jira and Confluence. Certification covers best practices for sprint planning, backlog management, and team collaboration using Atlassian's ecosystem.",
      tags: ["Jira", "Confluence", "Agile", "Atlassian"],
      imageUrl: "/images/atlassian-logo.png",
    },
    {
      id: "cert5",
      type: "certifications",
      title: "IBM CLM® for SAFe® - Level 1",
      subtitle: "IBM",
      dates: "2023",
      description:
        "Learned how to apply SAFe practices using IBM Collaborative Lifecycle Management tools. Certification validates knowledge of scaled Agile frameworks and their implementation in enterprise environments.",
      tags: ["SAFe", "Scaled Agile", "IBM", "Enterprise Agile"],
      imageUrl: "/images/ibm-safe-logo.png",
    },
  ],
  education: [
    {
      id: "edu1",
      type: "education",
      title: "Product Management Certification (PMC™)",
      subtitle: "BrainStation",
      dates: "Apr 2024 – May 2024",
      description:
        "Completed an 8-week, part-time product management certification program.\n\n" +
        "Built product strategies using Agile, Scrum, Lean, and Jobs-To-Be-Done frameworks.\n\n" +
        "Developed product roadmaps, wireframes, and go-to-market strategies.\n\n" +
        "Conducted user research, created personas, PRDs, MVPs, and product analytics reports.\n\n" +
        "Collaborated on product launch planning, stakeholder communication, and risk mitigation.\n\n" +
        "Gained hands-on experience with Figma, Jira, Google Forms, SurveyMonkey, ChatGPT, and industry best practices.\n\n" +
        "Earned the globally recognized Product Manager Certification (PMC™) from BrainStation.",
      tags: [
        "Product Management",
        "Agile",
        "Scrum",
        "Lean",
        "JTBD",
        "Roadmapping",
        "User Research",
        "Wireframing",
        "PRD",
        "MVP",
        "Figma",
        "Jira",
      ],
      imageUrl: "/images/brainstation-logo.png",
    },
    {
      id: "edu2",
      type: "education",
      title: "Diploma, Software Engineering",
      subtitle: "BrainStation",
      dates: "Jan 2023 – Sep 2023",
      description:
        "Completed a 9-month, immersive full-stack program focused on front-end and back-end development.\n\n" +
        "Built applications using HTML, CSS, Sass, JavaScript, React, and Node.js.\n\n" +
        "Developed REST APIs with Express and MySQL, using Postman and Axios.\n\n" +
        "Used Git, GitHub, and JIRA in Agile, pair programming workflows.\n\n" +
        "Deployed apps via Heroku and practiced DevOps principles.\n\n" +
        "Gained experience with GitHub Copilot, Jest, and React Testing Library.\n\n" +
        "Collaborated on real-world projects with partners like Mastercard and Walmart.",
      tags: [
        "Full Stack",
        "React",
        "Node.js",
        "REST API",
        "JavaScript",
        "Express",
        "MySQL",
        "Git",
        "Agile",
        "DevOps",
        "Testing",
      ],
      imageUrl: "/images/brainstation-logo.png",
    },
    {
      id: "edu4",
      type: "education",
      title: "Private Pilot License",
      subtitle: "Epic Flight Academy",
      dates: "Jun 2020 – Dec 2020",
      description:
        "Completed private pilot training program and earned FAA Private Pilot License. Training included ground school, flight maneuvers, navigation, emergency procedures, and cross-country flight planning.",
      tags: ["Aviation", "Pilot License", "Flight Training", "Navigation"],
      imageUrl: "/images/epic-logo.png",
    },
    {
      id: "edu3",
      type: "education",
      title: "B.S. Aeronautical Technology",
      subtitle: "Kansas State University",
      dates: "Aug 2016 – May 2020",
      description:
        "Focused on airport management and aeronautical systems. Coursework included aviation management, aerodynamics, aviation safety, and airport operations.",
      tags: ["Aviation", "Management", "Aeronautical Systems", "Airport Operations"],
      imageUrl: "/images/kstate-logo.png",
    },
  ],
  volunteering: [
    {
      id: "vol1",
      type: "volunteering",
      title: "Vaccine Ambassador",
      subtitle: "Scadding Court Community Centre, Toronto, ON",
      dates: "Mar – Aug 2022",
      description:
        "Awarded City of Toronto Vaccine Ambassador Certificate for disseminating vital public health information across Toronto, particularly within Mandarin-speaking communities, and contributing to building vaccine confidence.",
      tags: ["Community", "Public Health", "Multilingual", "Outreach"],
    },
    {
      id: "vol2",
      type: "volunteering",
      title: "Volunteer",
      subtitle: "Fort York Food Bank, Toronto, ON",
      dates: "Dec 2020 – Present",
      description:
        "Support food distribution and community initiatives to serve vulnerable populations in Toronto. Assist with organizing donations, preparing food packages, and coordinating distribution efforts to help those in need.",
      tags: ["Non-profit", "Community Support", "Food Security", "Social Impact"],
    },
  ],
}

export const projectsForCarousel: Project[] = [
  {
    name: "Elixir1 Skincare Clinic",
    description:
      "Full-service brand identity and website for a premium medical aesthetics clinic. Features gold accent palette, luxury design system, VISIA skin analysis integration, and booking system.",
    tags: ["Brand Strategy", "Web Design", "Booking System"],
    image: "/images/elixir1-screenshot.png",
    url: "https://www.elixir1.ca/",
  },
  {
    name: "BrowFix",
    description:
      "Modern beauty studio website with soft pink branding. Includes service booking integration, before/after gallery, and mobile-optimized design for premium brow and lash services.",
    tags: ["Web Design", "Booking Integration", "Brand Identity"],
    image: "/images/browfix-screenshot.png",
    url: "https://browfix.ca/",
  },
  {
    name: "M&A CAFE",
    description:
      "Artisanal coffee shop website with warm brand identity and sophisticated gold accents. Features online menu, Uber Eats integration, and compelling coffee culture storytelling.",
    tags: ["Web Design", "E-commerce", "Brand Identity"],
    image: "/images/macafe-screenshot.png",
    url: "https://macafeto.ca/",
  },
  {
    name: "Dr. Cat Wellness",
    description:
      "Calming, professional wellness clinic website with Acuity Scheduling integration. Features therapist bio, service descriptions, accessibility compliance, and mobile-first design.",
    tags: ["Web Design", "Booking System", "Brand Strategy"],
    image: "/images/drcat-screenshot.png",
    url: "https://www.drcatwellness.com/",
  },
]
