import { readFile } from 'node:fs/promises';
import path from 'node:path';

const diagramsDir = path.join(process.cwd(), 'content/diagrams');

// Renders a trusted, repo-local SVG/HTML diagram inline so it picks up the
// site theme through the `.ml-diagram` styles in app/global.css.
export async function Diagram({ src, caption }: { src: string; caption?: string }) {
  const file = path.resolve(diagramsDir, src);
  if (!file.startsWith(diagramsDir + path.sep)) {
    throw new Error(`Diagram path escapes content/diagrams: ${src}`);
  }
  const markup = await readFile(file, 'utf8');
  if (/<script|\son[a-z]+\s*=|javascript:/i.test(markup)) {
    throw new Error(`Diagram contains script or event handlers: ${src}`);
  }

  return (
    <figure className="ml-diagram not-prose my-6">
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
