import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';
import { LogoMark } from '@/components/logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <LogoMark className="size-6" />
          <span className="font-semibold">{appName}</span>
        </>
      ),
    },
    links: [{ text: 'Courses', url: '/courses', active: 'nested-url' }],
  };
}
