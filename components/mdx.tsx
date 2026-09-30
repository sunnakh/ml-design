import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Diagram } from '@/components/diagram';
import { ColorIcon } from '@/lib/icons';
import { Card as BaseCard } from 'fumadocs-ui/components/card';
import type { ComponentProps } from 'react';

// Icons used inside MDX content, e.g. <Card icon={<Rocket />} />
const iconNames = [
  'Activity',
  'BrainCircuit',
  'ChartColumn',
  'ClipboardList',
  'Database',
  'Layers',
  'Network',
  'Rocket',
  'Target',
] as const;

const icons = Object.fromEntries(
  iconNames.map((name) => [name, () => <ColorIcon name={name} size={24} />]),
);

// Show the colored icon inline with the title instead of inside the
// default bordered icon box, which framed the tile twice.
function Card({ icon, title, ...props }: ComponentProps<typeof BaseCard>) {
  return (
    <BaseCard
      {...props}
      title={
        icon ? (
          <span className="flex items-center gap-2.5">
            {icon}
            <span>{title}</span>
          </span>
        ) : (
          title
        )
      }
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...icons,
    Card,
    Diagram,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
