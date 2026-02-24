export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies: string[];
  current?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "live" | "coming-soon" | "wip";
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  draft?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface CareerMilestone {
  id: string;
  label: string;
  period: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
