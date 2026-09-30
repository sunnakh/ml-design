import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Diagram } from '@/components/diagram';
import { ColorIcon } from '@/lib/icons';

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
  iconNames.map((name) => [name, () => <ColorIcon name={name} size={28} />]),
);

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...icons,
    Diagram,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
