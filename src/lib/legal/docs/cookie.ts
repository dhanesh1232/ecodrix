import {
  Cookie,
  Info,
  Globe,
  BarChart3,
  Settings,
  MessageCircle,
  ToggleRight,
  FolderOpen,
} from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const cookieDoc: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  pill: "Cookies & Tracking",
  description:
    "Every cookie and browser storage item ECODrIx uses on ecodrix.com, in the ERIX console and in the chat widget: its name, purpose and how long it lasts.",
  intro: `This Cookie Policy lists every cookie and browser storage item ${LEGAL.brand} uses: on ecodrix.com, in the ERIX console (${LEGAL.appUrl}) and in the ERIX chat widget on a business's website. Read it with our Privacy Policy.`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "what",
      title: "What We Mean by Cookies",
      icon: Info,
      body: [
        "Cookies are small files a website stores in your browser. Local storage and session storage do the same job, so this policy covers them too and calls them all “cookies”.",
        "We use no advertising or marketing cookies, no tracking pixels and no third-party advertising tools.",
      ],
    },
    {
      id: "website",
      title: "On ecodrix.com",
      icon: Globe,
      body: [
        {
          table: {
            headers: ["Name", "Type", "What it does", "How long"],
            rows: [
              [
                "ecodrix_cookie_consent",
                "Local storage",
                "Remembers your cookie choice",
                "Until you clear it or change your choice",
              ],
              [
                "erix-docs-lang",
                "Local storage",
                "Remembers the code language you picked in our developer docs",
                "Until you clear it",
              ],
              [
                "ecdx_landing",
                "Session storage",
                "Remembers where this visit started (the site that sent you, the first page, campaign tags). It stays in your browser and is sent to us only if you allow analytics",
                "Until you close the tab",
              ],
              [
                "ecdx_vid",
                "Session storage",
                "A random visit ID for our own visit counts. Set only after you allow analytics",
                "Until you close the tab",
              ],
              [
                "_ga",
                "Cookie (Google Analytics)",
                "Tells visitors apart for Google Analytics. Set only after you allow analytics",
                "2 years",
              ],
              [
                "_ga_DK8Q4TLZPM",
                "Cookie (Google Analytics)",
                "Keeps the visit's state for Google Analytics. Set only after you allow analytics",
                "2 years",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics Only With Your Consent",
      icon: BarChart3,
      body: [
        "Analytics is off until you turn it on in the cookie banner. Until then, the Google Analytics script does not load, nothing is sent to Google, and our own visit tracking sends nothing.",
        "If you allow analytics, we and Google Analytics see the pages you view, the site that sent you, campaign tags, your device, browser and approximate country. Our own records keep a one-way hash of your IP address, not the address itself, and are deleted after 180 days.",
        "The banner also has a Marketing switch. It is off by default, and we run no advertising or marketing tags whatever you choose.",
      ],
    },
    {
      id: "console",
      title: "In the ERIX Console",
      icon: Settings,
      body: [
        "The console uses only what it needs to sign you in and remember your settings. It runs no analytics or advertising.",
        {
          table: {
            headers: ["Name", "Type", "What it does", "How long"],
            rows: [
              [
                "__Secure-ecodrix.session-token",
                "Cookie (essential)",
                "Keeps you signed in",
                "30 days, renewed while you use the console",
              ],
              [
                "__Secure-ecodrix.callback-url",
                "Cookie (essential)",
                "Remembers the page to return to after you sign in",
                "Until you close the browser",
              ],
              [
                "__Secure-ecodrix.csrf-token",
                "Cookie (essential)",
                "Protects the sign-in form against forged requests",
                "Until you close the browser",
              ],
              [
                "__ecodrix_rg",
                "Cookie (essential)",
                "Stops sign-in redirect loops",
                "About 10 seconds",
              ],
              ["ecodrix-theme", "Local storage", "Your light or dark theme", "Until you clear it"],
              ["erix.inbox.sound", "Local storage", "Whether the inbox plays a sound", "Until you clear it"],
              ["ecodrix:search:recents", "Local storage", "Your recent console searches", "Until you clear it"],
              ["ecodrix-askai-width", "Local storage", "The width of the AI side panel", "Until you clear it"],
              [
                "erix.activationChecklist.dismissed",
                "Local storage",
                "That you hid the setup checklist",
                "Until you clear it",
              ],
              [
                "erix.onboarding.draft",
                "Session storage",
                "Your answers during workspace setup, so a reload does not lose them",
                "Until you close the tab",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "webchat",
      title: "In the ERIX Chat Widget",
      icon: MessageCircle,
      body: [
        "A business can add the ERIX chat widget to its own website. The business decides whether to use it, and its own cookie policy covers its site. The widget stores two items in your browser (the code at the end identifies the business):",
        {
          table: {
            headers: ["Name", "Type", "What it does", "How long"],
            rows: [
              [
                "ecodrix.webchat.session.{code}",
                "Local storage",
                "A random ID so you see your earlier chat with that business",
                "Until you clear it",
              ],
              [
                "ecodrix.webchat.details.{code}",
                "Local storage",
                "That you already answered or skipped the widget's contact-details question",
                "Until you clear it",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "portal",
      title: "In the Client Project Portal",
      icon: FolderOpen,
      body: [
        "A business can share a project with its own client through the ERIX project portal. If you sign in there, the portal stores two items for that browser tab only:",
        {
          table: {
            headers: ["Name", "Type", "What it does", "How long"],
            rows: [
              [
                "portal_token",
                "Session storage",
                "Keeps you signed in to the project you opened",
                "Until you close the tab",
              ],
              [
                "portal_project_id",
                "Session storage",
                "Remembers which project you signed in to",
                "Until you close the tab",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "manage",
      title: "Changing Your Choice",
      icon: ToggleRight,
      body: [
        "Open “Cookie preferences” in the footer of any ecodrix.com page to change your choice at any time. You can also clear or block cookies and storage in your browser settings.",
        {
          note: "If you block the console's essential cookies, you cannot sign in.",
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
