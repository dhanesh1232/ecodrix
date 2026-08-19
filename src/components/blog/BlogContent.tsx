/**
 * BlogContent — renders HTML blog body with scoped styles.
 * No @tailwindcss/typography dependency. Own styles for headings, lists, links, code, images.
 */

interface BlogContentProps {
  html: string;
}

export function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
