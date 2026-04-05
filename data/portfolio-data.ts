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

export const portfolioData: PortfolioData = {
  experience: [
    {
      id: "exp0",
      type: "experience",
      title: "Technical Project Manager & Product Owner",
      subtitle: "Noise Digital Inc., Toronto, ON",
      location: "Toronto, ON",
      dates: "Aug 2024 – Present",
      description:
        "Manage $750K+ Martech and data initiatives for enterprise clients across insurance, healthcare, higher education, finance, advertising, and law sectors—overseeing GTM migrations, GA4 framework builds, and OneTrust consent deployments to ensure GDPR/CCPA compliance and timely delivery.\n\n" +
        "Own end-to-end delivery of 10+ active projects across Agile and Waterfall life cycles, including SOW creation, sprint planning, stakeholder alignment, QA coordination, and production handoff.\n\n" +
        "Translate business objectives into technical specifications for GA4 event tracking, BigQuery-based CDMPs, and consent management workflows; bridge gaps between legal, engineering, and marketing teams to streamline execution.\n\n" +
        "Develop and maintain project documentation including RAID logs, test plans, and dataLayer schemas; lead weekly standups and status calls to drive clarity across distributed teams.\n\n" +
        "Proactively identify and manage 30+ project risks such as data pipeline delays, GTM code conflicts, and inconsistent taxonomies; implement mitigation plans to minimize delivery disruption.\n\n" +
        "Lead project communications and client-facing deliverables, including technical briefs, QA summary reports, and post-implementation support plans; secure stakeholder buy-in for key changes such as schema redesigns and container rebuilds.\n\n" +
        "Coordinate full project lifecycle from scoping to invoicing, working closely with analytics leads, engineering resources, clients, and third-party vendors.",
      tags: [
        "Agile",
        "Waterfall",
        "Martech",
        "GA4",
        "GTM",
        "BigQuery",
        "OneTrust",
        "GDPR/CCPA",
        "SOW",
        "RAID",
        "Stakeholder Management",
        "Technical Documentation",
      ],
      imageUrl: "/images/noise-logo.png",
    },
    {
      id: "exp1",
      type: "experience",
      title: "Technical Project Manager & Product Owner",
      subtitle: "Fourth Dimension Inc., Toronto, ON",
      location: "Toronto, ON",
      dates: "Mar 2024 – May 2024",
      description:
        "Led a $250K national registry rebuild.\n\n" +
        "Delivered backend, UI, and secure Stripe integration using ShadCN.\n\n" +
        "Implemented schema restructuring, SQL-to-NoSQL migration, message queuing, and real-time analytics tools.",
      tags: ["Product Owner", "Full Stack", "Stripe", "REST API", "ShadCN", "SQL", "NoSQL", "System Design"],
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
        "Directed 3 site migrations and 4 global tech projects.\n\n" +
        "Boosted sprint velocity by 33%, streamlined processes, and aligned roadmaps with business goals.\n\n" +
        "Deployed Monday.com for global PM visibility.",
      tags: ["Agile", "Scrum", "Monday.com", "SEO", "Roadmapping", "UX/UI", "Global Teams"],
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
        "Oversaw 35+ marketing projects with budgets over $4.5M.\n\n" +
        "Increased stakeholder satisfaction by 16% through improved reporting and KPI tracking across Meta, TikTok, LinkedIn, and Google Ads campaigns.",
      tags: ["Media", "Digital Marketing", "Reporting", "KPI", "PowerBI", "Looker Studio", "Paid Media"],
      imageUrl: "/images/hotspex-logo.png",
    },
  ],
  skills: [
    {
      id: "skill1",
      type: "skills",
      title: "Project & Product Management",
      subtitle: "Expert",
      description:
        "🧩 Core Skills\n" +
        "Technical Project Management, Product Ownership, Agile, Scrum, Waterfall, Kanban, SDLC, PMLC, MoSCoW, RICE\n\n" +
        "🔧 Applications\n" +
        "• Roadmapping & Strategic Planning\n" +
        "• SOW & Requirements Gathering\n" +
        "• Sprint Planning & Retrospectives\n" +
        "• Budgeting & Cost Control\n" +
        "• Risk & Issue Management\n" +
        "• Change Management\n" +
        "• Stakeholder Engagement\n" +
        "• Vendor Management & Procurement\n" +
        "• Cross-Functional Team Leadership\n\n" +
        "🎯 Focus Areas\n" +
        "• Technical delivery in marketing & analytics\n" +
        "• Agile transformation\n" +
        "• Stakeholder alignment",
      tags: [
        "Project Management",
        "Product Ownership",
        "Agile",
        "Scrum",
        "Roadmapping",
        "Requirements",
        "Stakeholder Management",
      ],
    },
    {
      id: "skill2",
      type: "skills",
      title: "Tools & Platforms",
      subtitle: "Advanced",
      description:
        "🧩 Core Skills\n" +
        "Jira, Asana, Monday.com, Teamwork, Airtable, Microsoft Office, Google Workspace, CODA, Figma, Miro, Mural\n\n" +
        "🔧 Applications\n" +
        "• Project tracking & workflow management\n" +
        "• Documentation & knowledge sharing\n" +
        "• Design collaboration & prototyping\n" +
        "• Data visualization & reporting\n" +
        "• Team communication & coordination\n\n" +
        "🎯 Focus Areas\n" +
        "• Workflow optimization\n" +
        "• Cross-tool integration\n" +
        "• Process automation",
      tags: ["Jira", "Asana", "Monday.com", "Figma", "Miro", "Power BI", "Looker Studio"],
    },
    {
      id: "skill3",
      type: "skills",
      title: "Software Engineering Skills",
      subtitle: "Intermediate",
      description:
        "🧩 Core Skills\n" +
        "HTML, CSS, JavaScript, React.js, Node.js, Express.js, REST APIs, MySQL, NoSQL, AWS\n\n" +
        "🔧 Applications\n" +
        "• Frontend development with React\n" +
        "• API integration & authentication\n" +
        "• Database schema design\n" +
        "• Testing & debugging\n" +
        "• Version control with Git\n" +
        "• Deployment workflows\n\n" +
        "🎯 Focus Areas\n" +
        "• Technical feasibility assessment\n" +
        "• Developer collaboration\n" +
        "• Code quality standards",
      tags: ["JavaScript", "React", "Node.js", "REST API", "MySQL", "NoSQL", "Testing"],
    },
    {
      id: "skill4",
      type: "skills",
      title: "Product Management & UX",
      subtitle: "Advanced",
      description:
        "🧩 Core Skills\n" +
        "Product Strategy, Market Research, User Research, Wireframing, Prototyping, Usability Testing, Analytics\n\n" +
        "🔧 Applications\n" +
        "• Product-market fit analysis\n" +
        "• MVP definition & roadmapping\n" +
        "• User personas & journey mapping\n" +
        "• PRDs & user stories\n" +
        "• A/B testing & feature validation\n" +
        "• KPI tracking & optimization\n\n" +
        "🎯 Focus Areas\n" +
        "• User-centered design\n" +
        "• Data-driven decision making\n" +
        "• Cross-functional collaboration",
      tags: ["Product Strategy", "MVPs", "Wireframing", "Usability Testing", "Personas", "Analytics", "User Stories"],
    },
  ],
  projects: [
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
      id: "cert0",
      type: "certifications",
      title: "Product Manager Certification (PMC™)",
      subtitle: "BrainStation",
      dates: "2024",
      description:
        "Completed an 8-week, part-time product management certification program.\n\n" +
        "Built product strategies using Agile, Scrum, Lean, and Jobs-To-Be-Done frameworks.\n\n" +
        "Developed product roadmaps, wireframes, and go-to-market strategies.\n\n" +
        "Conducted user research, created personas, PRDs, MVPs, and product analytics reports.\n\n" +
        "Collaborated on product launch planning, stakeholder communication, and risk mitigation.\n\n" +
        "Gained hands-on experience with Figma, Jira, Google Forms, SurveyMonkey, ChatGPT, and industry best practices.",
      tags: ["Product Management", "Agile", "Scrum", "Lean", "JTBD", "Roadmapping", "User Research", "Wireframing"],
      imageUrl: "/images/brainstation-pmc-logo.svg",
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
      title: "Atlassian Agile Project Management",
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
