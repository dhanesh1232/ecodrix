import type { ComponentProps } from "react";
import { Pause, Play } from "@/components/icons";
import { SceneDriver } from "./motion";

/**
 * A looping product scene (see SceneDriver in motion.tsx). This wrapper draws
 * the pause/play icons on the server and hands them to the client driver,
 * so the icon set never ships in the page's first JavaScript.
 */
export function Scene(props: Omit<ComponentProps<typeof SceneDriver>, "pauseIcon" | "playIcon">) {
  return (
    <SceneDriver
      {...props}
      pauseIcon={<Pause aria-hidden="true" className="size-3.5" />}
      playIcon={<Play aria-hidden="true" className="size-3.5" />}
    />
  );
}
