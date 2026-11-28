"use client";

import type { FigureId } from "@/content/blog";
import Cheats from "./Cheats";
import Distance from "./Distance";
import Door from "./Door";
import Filter from "./Filter";
import Growth from "./Growth";
import Playbook from "./Playbook";
import Wall from "./Wall";

/** The charts and scenes an essay can place between its paragraphs, by id (content/blog). */
const FIGURES: Record<FigureId, () => React.ReactElement> = {
  door: Door,
  playbook: Playbook,
  cheats: Cheats,
  growth: Growth,
  filter: Filter,
  distance: Distance,
  wall: Wall,
};

export default function EssayFigure({ id }: { id: FigureId }) {
  const Figure = FIGURES[id];
  return <Figure />;
}
