import { createContext, useContext, useState, ReactNode } from "react";
import defaultData from "../data/portfolio-data.json";

export interface ThemeColors {
  primary: string;
  primaryText: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  cardBg: string;
  cardText: string;
  accentSecondary: string;
}

export interface Profile {
  name: string;
  nameJp: string;
  title: string;
  titleJp: string;
  tagline: string;
  about: string;
  photoUrl: string;
  yearsExperience: string;
  projectsShipped: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  contactHeading: string;
  contactSubtext: string;
}

export interface SkillGroup {
  group: string;
  jp: string;
  items: string[];
}

export interface Project {
  title: string;
  jp: string;
  desc: string;
  tags: string[];
  link: string;
  sfx: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface PortfolioTheme {
  preset: string;
  colors: ThemeColors;
}

export interface AuthConfig {
  username: string;
  passwordHash: string;
}

export interface PortfolioDataType {
  profile: Profile;
  contact: Contact;
  typingWords: string[];
  tickerItems: string[];
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  theme: PortfolioTheme;
  auth: AuthConfig;
}

interface PortfolioContextValue {
  data: PortfolioDataType;
  updateData: (newData: PortfolioDataType) => void;
}

const PortfolioDataContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioDataType>(defaultData as PortfolioDataType);

  const updateData = (newData: PortfolioDataType) => {
    setData(newData);
  };

  return (
    <PortfolioDataContext.Provider value={{ data, updateData }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  return ctx;
}
