import {
  Cookie,
  Info,
  Settings,
  BarChart3,
  Megaphone,
  Clock,
  ToggleRight,
} from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const cookieDoc: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  pill: "Cookies & Tracking",
  description:
    "What cookies and similar technologies ECODrIx uses, why we use them, and how you can manage your preferences.",
  intro: `This Cookie Policy explains how ${LEGAL.brand} uses cookies and similar technologies on our website and platform. It should be read alongside our Privacy Policy.`,
  sections: [
    {
      id: "what",
      title: "What Are Cookies",
      icon: Info,
      body: [
        "Cookies are small text files stored on your device when you visit a website. We also use similar technologies such as local storage, pixels, and SDKs. Together we refer to these as “cookies”.",
      ],
    },
    {
      id: "essential",
      title: "Strictly Necessary Cookies",
      icon: Settings,
      body: [
        "These are required for the site and platform to function — for example, authentication, session management, security, and load balancing. They cannot be switched off in our systems and do not require consent.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics & Performance Cookies",
      icon: BarChart3,
      body: [
        "We use analytics (for example, Google Analytics) to understand how visitors use our site so we can improve it. These collect aggregated usage data such as pages visited and time on site.",
        {
          list: [
            "Help us measure and improve performance and content.",
            "Set only with consent where required by law.",
          ],
        },
      ],
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      icon: Megaphone,
      body: [
        "With your consent, we may use marketing cookies to measure campaigns and show relevant content. You can decline these without affecting core functionality.",
      ],
    },
    {
      id: "duration",
      title: "How Long Cookies Last",
      icon: Clock,
      body: [
        {
          list: [
            "Session cookies expire when you close your browser.",
            "Persistent cookies remain for a set period or until you delete them.",
          ],
        },
      ],
    },
    {
      id: "manage",
      title: "Managing Your Preferences",
      icon: ToggleRight,
      body: [
        "You can manage non-essential cookies through our cookie banner/preferences (where shown) and via your browser settings, which let you block or delete cookies.",
        {
          note: "Blocking some cookies may impact site functionality and your experience.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      icon: Cookie,
      body: [`Questions about cookies: ${LEGAL.emails.privacy}.`],
    },
  ],
};
