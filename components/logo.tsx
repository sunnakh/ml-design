import type { SVGProps } from 'react';

// Vector redraw of the brand mark: an open ring with three nodes and a lime
// dot. The ring follows the text color, so it works in light and dark themes.
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="250 240 750 750" aria-hidden {...props}>
      <path d="M895.4 447.8A290 290 0 1 0 895.4 772.2" fill="none" stroke="currentColor" strokeWidth="76" />
      <circle cx="523" cy="352" r="80" fill="currentColor" />
      <circle cx="368" cy="610" r="84" fill="currentColor" />
      <circle cx="650" cy="900" r="82" fill="currentColor" />
      <circle cx="886" cy="610" r="62" className="fill-[#65a30d] dark:fill-[#c4f24a]" />
    </svg>
  );
}
