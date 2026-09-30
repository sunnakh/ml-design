import { createElement, type ReactNode } from 'react';
import { icons } from 'lucide-react';
import type { LoaderPlugin } from 'fumadocs-core/source';

// Gradient per icon, so each course stage has a recognizable color.
const gradients: Record<string, [string, string]> = {
  BrainCircuit: ['#8b5cf6', '#d946ef'],
  GraduationCap: ['#3b82f6', '#6366f1'],
  Target: ['#f43f5e', '#f97316'],
  ClipboardList: ['#f59e0b', '#eab308'],
  Database: ['#0ea5e9', '#06b6d4'],
  Layers: ['#14b8a6', '#10b981'],
  Network: ['#6366f1', '#8b5cf6'],
  ChartColumn: ['#22c55e', '#84cc16'],
  Rocket: ['#f97316', '#ef4444'],
  Activity: ['#ec4899', '#f43f5e'],
};
const fallback: [string, string] = ['#64748b', '#94a3b8'];

export function ColorIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = icons[name as keyof typeof icons];
  if (!Icon) return null;
  const [from, to] = gradients[name] ?? fallback;

  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-md text-white shadow-sm"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      <Icon style={{ width: size * 0.6, height: size * 0.6 }} strokeWidth={2.25} />
    </span>
  );
}

// Page-tree plugin: turns `icon: "Rocket"` in frontmatter/meta.json into a
// colored tile (same contract as fumadocs' built-in lucide icons plugin).
export function colorIconsPlugin(): LoaderPlugin {
  function resolve<T extends { icon?: ReactNode }>(node: T): T {
    if (typeof node.icon === 'string') {
      const name = node.icon;
      if (!(name in icons)) console.warn(`[color-icons] Unknown icon: ${name}`);
      else node.icon = createElement(ColorIcon, { name });
    }
    return node;
  }

  return {
    name: 'tech-design:color-icons',
    transformPageTree: {
      file: resolve,
      folder: resolve,
      separator: resolve,
    },
  };
}
