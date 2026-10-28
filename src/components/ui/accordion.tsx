"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * shadcn Accordion (radix-nova) on ERIX tokens. Content is always mounted
 * (`forceMount`): every answer is in the server HTML for crawlers and
 * find-in-page, and globals.css hides closed items only when scripts run
 * (`@media (scripting: enabled)`), so without JavaScript all answers show.
 */
function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-border", className)} {...props} />;
}

/** `icon`: drawn by the caller (a server component where possible, so no
 *  icon data ships); `turn` is how it shows the open state; `heading`: the
 *  header element (Radix default h3; "div" where a heading would break the
 *  page outline, such as a contents disclosure). */
function AccordionTrigger({
  className,
  children,
  icon,
  turn = "plus",
  heading: Heading = "h3",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  icon: React.ReactNode;
  turn?: "plus" | "chevron";
  heading?: "h2" | "h3" | "div";
}) {
  return (
    <AccordionPrimitive.Header asChild>
      <Heading className="flex">
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn(
            "group/acc flex flex-1 cursor-pointer items-center justify-between gap-4 py-5 text-left font-sans text-[17px] leading-6 font-semibold text-foreground",
            "rounded-[6px] focus-visible:outline-offset-4",
            className,
          )}
          {...props}
        >
          {children}
          <span
            aria-hidden="true"
            className={cn(
              "flex shrink-0 text-subtle transition-[rotate,color] duration-[var(--dur-base)] ease-[var(--ease-out)] group-data-[state=open]/acc:text-foreground",
              turn === "plus" ? "group-data-[state=open]/acc:rotate-45" : "group-data-[state=open]/acc:rotate-180",
            )}
          >
            {icon}
          </span>
        </AccordionPrimitive.Trigger>
      </Heading>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
