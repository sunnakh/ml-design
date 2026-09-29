import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Diagram } from '@/components/diagram';
import {
  Activity,
  BrainCircuit,
  ChartColumn,
  ClipboardList,
  Database,
  Layers,
  Network,
  Rocket,
  Target,
} from 'lucide-react';

// Icons used inside MDX content, e.g. <Card icon={<Rocket />} />
const icons = {
  Activity,
  BrainCircuit,
  ChartColumn,
  ClipboardList,
  Database,
  Layers,
  Network,
  Rocket,
  Target,
};

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
