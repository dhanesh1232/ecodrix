/**
 * BlogContent — sanitizes and applies Tailwind classes to blog HTML content.
 * Strips inline styles from CMS/editor output and replaces with controlled classes.
 * Works with both raw HTML and JSON-based content.
 */

/** Tag-to-class mapping — every element gets controlled Tailwind styles */
const TAG_STYLES: Record<string, string> = {
  h1: "text-[28px] font-display font-bold text-foreground mt-12 mb-4 tracking-[-0.02em] leading-tight",
  h2: "text-[26px] font-display font-bold text-foreground mt-12 mb-3 tracking-[-0.02em] leading-tight",
  h3: "text-[20px] font-sans font-semibold text-foreground mt-8 mb-2",
  h4: "text-[17px] font-sans font-semibold text-foreground mt-6 mb-2",
  p: "text-[17px] leading-[1.75] text-muted-foreground mb-4",
  a: "text-accent border-b border-accent/30 hover:border-accent transition-colors",
  strong: "font-semibold text-foreground",
  em: "italic",
  ul: "list-disc pl-5 mb-5 space-y-2 text-[17px] text-muted-foreground marker:text-accent",
  ol: "list-decimal pl-5 mb-5 space-y-2 text-[17px] text-muted-foreground marker:text-accent",
  li: "leading-[1.7]",
  blockquote: "rounded-[12px] bg-background px-6 py-4 my-8 text-[19px] text-foreground",
  pre: "rounded-[12px] bg-background p-5 overflow-x-auto my-6 text-[13px] leading-relaxed",
  code: "text-[0.875em] rounded-[4px] bg-background px-1.5 py-0.5",
  img: "w-full h-auto my-8 rounded-[16px]",
  hr: "border-none h-px bg-border my-10",
  table: "w-full border-collapse my-6 text-[15px]",
  th: "text-left bg-background text-foreground font-semibold p-3 border-b border-border",
  td: "p-3 border-b border-border-soft text-muted-foreground",
  figure: "my-8",
  figcaption: "text-xs text-muted-foreground mt-2 text-center",
};

/**
 * Processes raw HTML string:
 * 1. Strips all inline `style="..."` attributes
 * 2. Strips existing `class="..."` attributes (editor bloat)
 * 3. Injects controlled Tailwind classes per tag
 */
function processHtml(html: string): string {
  // Strip inline styles
  let processed = html.replace(/\s*style="[^"]*"/gi, "");

  // Strip existing classes from CMS output
  processed = processed.replace(/\s*class="[^"]*"/gi, "");

  // Inject our controlled classes for each known tag
  for (const [tag, classes] of Object.entries(TAG_STYLES)) {
    // Handle self-closing tags (img, hr)
    const selfClosingRegex = new RegExp(`<${tag}([^>]*?)\\s*/?>`, "gi");
    // Handle opening tags
    const openingRegex = new RegExp(`<${tag}(\\s[^>]*)?>`, "gi");

    if (tag === "img" || tag === "hr") {
      processed = processed.replace(selfClosingRegex, `<${tag}$1 class="${classes}" />`);
    } else {
      processed = processed.replace(openingRegex, `<${tag}$1 class="${classes}">`);
    }
  }

  // Remove empty paragraphs (common CMS artifact)
  processed = processed.replace(/<p[^>]*>\s*(<br\s*\/?>)?\s*<\/p>/gi, "");

  return processed;
}

interface BlogContentProps {
  html: string;
}

export function BlogContent({ html }: BlogContentProps) {
  const processedHtml = processHtml(html);

  return (
    <div
      className="blog-content max-w-none"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}
