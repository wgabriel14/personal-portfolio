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
      "Designing and deploying conversational AI agents for enterprise clients using LLMs, Vapi, and n8n, reducing manual support workload by automating common customer interactions.",
      "Building Python-based automation pipelines that integrate Cisco Meraki APIs with internal ticketing and monitoring systems.",
      "Architecting multi-step n8n workflows connecting CRMs, telephony platforms, and AI inference endpoints for end-to-end automation.",
      "Collaborating cross-functionally with sales and support teams to identify automation opportunities and translate business requirements into technical solutions.",
    ],
    technologies: ["Python", "LLMs", "Vapi", "n8n", "Meraki API", "Flask", "REST APIs", "Prompt Engineering"],
  },
  {
    id: "ipfone-voip",
    title: "VoIP and Network Engineer",
    company: "IPFone",
    location: "Remote",
    period: "May 2024 – Jul 2025",
    startDate: "2024-05",
    endDate: "2025-07",
    description: [
      "Provisioned and maintained Cisco Meraki, Fortinet, and MikroTik network infrastructure for multi-site enterprise deployments across the US.",
      "Configured and troubleshot BroadSoft and BICOM VoIP platforms, resolving complex SIP, RTP, and codec issues for high-availability voice environments.",
      "Developed Python scripts to automate repetitive network configuration tasks, cutting provisioning time by over 60%.",
      "Provided L2/L3 network support including BGP/OSPF routing, VLAN segmentation, QoS configuration, and VPN tunneling.",
    ],
    technologies: ["Cisco Meraki", "Fortinet", "MikroTik", "BroadSoft", "BICOM", "Python", "SIP/RTP", "BGP", "OSPF"],
  },
  {
    id: "soutec",
    title: "Implementation and Support Engineer",
    company: "SOUTEC",
    location: "Caracas, Venezuela",
    period: "May 2022 – May 2024",
    startDate: "2022-05",
    endDate: "2024-05",
    description: [
      "Led end-to-end network deployments for enterprise clients including structured cabling, wireless surveys (Ekahau), and switch/router configuration.",
      "Installed and configured Ubiquiti UniFi, Cisco, and Mikrotik networks for commercial and industrial environments.",
      "Performed VoIP system installations and end-user training for Webex Calling and Microsoft Teams Phone deployments.",
      "Conducted network health assessments using Wireshark, PRTG, and GNS3 simulation for pre-deployment validation.",
    ],
    technologies: ["Ubiquiti UniFi", "Cisco", "Webex", "MS Teams", "Wireshark", "PRTG", "Ekahau", "GNS3"],
  },
];

export const projects: Project[] = [
  {
    id: "meraki-automator",
    title: "Meraki Deployment Automator",
    description:
      "A Python/Flask web application that automates bulk Cisco Meraki network provisioning via the Meraki Dashboard API. Supports templated configurations for MX security appliances, MS switches, and MR access points — reducing deployment time from hours to minutes.",
    technologies: ["Python", "Flask", "Meraki API", "REST", "Jinja2"],
    githubUrl: "https://github.com/wgabriel14",
    status: "live",
    featured: true,
  },
  {
    id: "ai-support-agent",
    title: "AI Customer Support Agent",
    description:
      "Conversational AI voice agent for enterprise customer support, built on Vapi for voice I/O, n8n for workflow orchestration, and a fine-tuned LLM backend. Handles appointment scheduling, FAQ resolution, and escalation routing autonomously.",
    technologies: ["LLMs", "Vapi", "n8n", "Python", "REST APIs"],
    status: "coming-soon",
    featured: true,
  },
  {
    id: "network-dashboard",
    title: "Network Monitoring Dashboard",
    description:
      "A real-time network monitoring dashboard aggregating data from PRTG and Meraki APIs into a unified React interface. Provides alerting, device health scoring, and historical trend analysis for multi-site enterprise networks.",
    technologies: ["Python", "PRTG API", "React", "TypeScript", "WebSockets"],
    status: "coming-soon",
    featured: false,
  },
  {
    id: "n8n-voip-workflow",
    title: "VoIP Incident Automation",
    description:
      "n8n workflow automation that monitors BroadSoft platform health, automatically creates and routes support tickets on anomaly detection, and sends contextual alerts with diagnostic data to the on-call engineer via Slack and email.",
    technologies: ["n8n", "BroadSoft API", "Python", "Slack API", "Webhooks"],
    status: "coming-soon",
    featured: false,
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & Automation",
    icon: "Brain",
    skills: [
      "LLMs",
      "Conversational AI",
      "Agent Development",
      "Prompt Engineering",
      "n8n",
      "Make (Integromat)",
      "Vapi",
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
      "TypeScript",
      "React",
      "Git",
      "Ansible",
      "Bash",
      "C",
    ],
  },
  {
    category: "VoIP & Tools",
    icon: "Phone",
    skills: [
      "BICOM",
      "BroadSoft",
      "Webex Calling",
      "Microsoft Teams Phone",
      "Wireshark",
      "Ekahau",
      "PRTG",
      "GNS3",
      "SIP / RTP",
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
