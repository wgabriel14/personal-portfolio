import type { Experience, Project, SkillGroup, CareerMilestone } from "@/types";

export const experiences: Experience[] = [
  {
    id: "ipfone-ai",
    title: "AI & Network Automation Engineer",
    company: "IPFone",
    location: "Remote",
    period: "Jul 2025 – Present",
    startDate: "2025-07",
    endDate: null,
    current: true,
    description: [
      "Designed and maintain a production voice AI agent as the primary technical support contact, handling 1,200+ monthly calls with a 90.2% success rate and 97% neutral/positive caller sentiment; built on multi-flow conversational logic with CRM and ticketing caller identification, dual-path handling for new tickets and existing cases, technician availability awareness, and incident-specific troubleshooting.",
      "Delivered 10+ production AI receptionist agents for a diverse roster of business clients, built on multi-agent architectures with 5–10+ tool integrations per agent spanning CRM lookup, ticket creation, call transfer, technician routing and calendar booking via REST APIs; one healthcare deployment processed 4,958 calls in its first month with an 87.6% success rate and a 39-second average duration.",
      "Built additional agents beyond inbound voice: email outreach agents leveraging integrated CRM data, and Cisco Webex chat bots piping monitoring alerts and operational notifications to engineering teams via n8n workflows, extending coverage into multi-channel engagement and internal observability.",
    ],
    technologies: ["Python", "Retell AI", "LLM APIs", "n8n", "Claude Code", "MCP Integrations", "REST APIs", "Prompt Engineering"],
  },
  {
    id: "ipfone-voip",
    title: "VoIP & Network Engineer (Level 2)",
    company: "IPFone",
    location: "Remote",
    period: "May 2024 – Jul 2025",
    startDate: "2024-05",
    endDate: "2025-07",
    description: [
      "Level 2 escalation point for VoIP and internet connectivity issues for business clients across BroadSoft, BICOM and Cisco Webex Calling; coordinated with last-mile ISPs for circuit incidents, fully remote in an English-speaking environment under SLA.",
      "Promoted internally to AI & Network Automation Engineer based on technical performance and programming background, contributing to the company's adoption of conversational AI and workflow automation across client deployments.",
    ],
    technologies: ["Cisco Meraki", "Fortinet", "MikroTik", "BroadSoft", "BICOM", "Python", "SIP/RTP", "BGP", "OSPF"],
  },
  {
    id: "soutec",
    title: "Implementation & Support Engineer",
    company: "SOUTEC",
    location: "Caracas, Venezuela",
    period: "May 2022 – May 2024",
    startDate: "2022-05",
    endDate: "2024-05",
    description: [
      "Led end-to-end network deployments for enterprise clients across Cisco Meraki, Fortinet, MikroTik and Ubiquiti in commercial and industrial sites, providing 24/7 on-call support and escalation handling under strict SLA.",
      "Developed the Meraki Deployment Automator, a Python/Flask web app on the Cisco Meraki Dashboard API for bulk network provisioning, cutting firewall rule deployment time from 1.5–2.5 hours of manual work to under two minutes (~98% effort reduction); deployed in production at three enterprise client sites.",
      "Conducted Ekahau wireless site surveys across six enterprise environments, including Venezuela's main international airport (high-density, mission-critical, multi-AP coordination); also configured a site-to-site IPsec VPN between Cisco Meraki MX appliances and AWS for hybrid-cloud connectivity at a retail enterprise client.",
    ],
    technologies: ["Ubiquiti UniFi", "Cisco Meraki", "Fortinet", "Webex", "MS Teams", "Wireshark", "Ekahau", "PRTG"],
  },
];

export const projects: Project[] = [
  {
    id: "meraki-automator",
    title: "Meraki Deployment Automator",
    description:
      "Python/Flask web app on the Cisco Meraki Dashboard API for bulk network provisioning — cutting firewall rule deployment time from 1.5–2.5 hours of manual work to under two minutes (~98% effort reduction). Deployed in production at three enterprise client sites.",
    technologies: ["Python", "Flask", "Meraki API", "REST", "Jinja2"],
    githubUrl: "https://github.com/wgabriel14",
    status: "live",
    featured: true,
  },
  {
    id: "ai-support-agent",
    title: "AI Receptionist",
    description:
      "Portfolio of production voice AI agents built on Retell AI with multi-agent architecture (receptionist + ticket-classification agent). Features dual-path handling for new and existing tickets, CRM/ticketing API integrations, technician routing, and incident-specific troubleshooting trees. One healthcare deployment processed 4,958 calls in its first month with an 87.6% success rate.",
    technologies: ["Retell AI", "LLM APIs", "n8n", "Python", "REST APIs"],
    status: "live",
    featured: true,
  },
  {
    id: "email-ai-agents",
    title: "AI Email Engagement System",
    description:
      "Two autonomous outbound email agents deployed in production — one for client outreach, one for partner communications — acting as a branded AI contact channel. Sent 2,860+ emails in the first 30 days, generating 156 replies handled autonomously and 36 successful closings. Built on n8n with Microsoft Azure for email management; AI layer uses Anthropic Claude (OpenAI as fallback) for classification, response generation, and escalation routing across 5+ internal departments with human-in-the-loop handoff. Includes security guardrails, a knowledge base, and a custom monitoring dashboard. Developed using Claude Code with the n8n MCP integration.",
    technologies: ["n8n", "Anthropic Claude", "OpenAI", "Microsoft Azure", "Agent Orchestration", "Prompt Engineering", "Claude Code + MCP"],
    status: "live",
    featured: true,
  },
  {
    id: "agent-monitoring-dashboards",
    title: "AI Agent Monitoring Dashboards",
    description:
      "Two production monitoring dashboards built to track real-time performance of deployed AI agents — one for the voice support agent, one for the email engagement agents. Born from recurring stakeholder requests about agent results: each dashboard surfaces the key metrics that matter (call volume, success rates, reply rates, escalations, closings) and can generate email reports filtered by custom date ranges, sent on demand.",
    technologies: ["n8n", "Python", "REST APIs", "Email Reporting"],
    status: "live",
    featured: true,
  },
  {
    id: "webex-alert-bot",
    title: "Cisco Webex Engineering Alert Bot",
    description:
      "Cisco Webex chatbot that pipes real-time monitoring alerts and operational notifications directly to engineering team channels via n8n workflows. Keeps the on-call team informed of infrastructure events without leaving their communication platform, extending observability coverage into the team's existing workflow.",
    technologies: ["n8n", "Cisco Webex", "Webhooks", "REST APIs"],
    status: "live",
    featured: false,
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & Automation",
    icon: "Brain",
    skills: [
      "Conversational AI",
      "Voice AI Agents",
      "LLM APIs",
      "Agent Orchestration",
      "Tool Calling / MCP",
      "Prompt Engineering",
      "n8n",
      "Retell AI",
      "RAG Pipelines",
    ],
  },
  {
    category: "Networking",
    icon: "Network",
    skills: [
      "Cisco (CCNA)",
      "Meraki",
      "Fortinet",
      "MikroTik",
      "Ubiquiti UniFi",
      "BGP / OSPF",
      "VLANs & QoS",
      "VPN / IPSec",
      "Wireless (802.11)",
    ],
  },
  {
    category: "Programming",
    icon: "Code2",
    skills: [
      "Python",
      "Flask",
      "REST APIs",
      "Webhooks",
      "Docker",
      "MySQL",
      "Linux (Ubuntu)",
      "Git",
      "Bash",
    ],
  },
  {
    category: "VoIP & Telephony",
    icon: "Phone",
    skills: [
      "BroadSoft",
      "BICOM",
      "Asterisk",
      "Webex Calling",
      "MS Teams Phone",
      "SIP / RTP",
      "Wireshark",
      "PRTG",
      "Ekahau",
    ],
  },
];

export const careerTimeline: CareerMilestone[] = [
  {
    id: "education",
    label: "Electronics Eng.",
    period: "2017–2024",
    color: "#6366f1",
  },
  {
    id: "networking",
    label: "Networking",
    period: "2022–2025",
    color: "#0080ff",
  },
  {
    id: "ai",
    label: "AI Automation",
    period: "2025–Now",
    color: "#00d4ff",
  },
];

export const socialLinks = {
  github: "https://github.com/wgabriel14",
  linkedin: "https://www.linkedin.com/in/williams-reyes-0584b91a8/",
  email: "reyesmanriquewg@gmail.com",
};

export const siteMetadata = {
  name: "Williams Reyes",
  title: "Williams Reyes — AI & Network Automation Engineer",
  description:
    "Electronics Engineer specializing in AI automation and enterprise networking. Building intelligent systems at the intersection of LLMs, conversational AI, and network infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "reyesmanriquewg@gmail.com",
};
