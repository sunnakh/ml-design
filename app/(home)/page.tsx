import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import { Bricolage_Grotesque } from 'next/font/google';
import { ColorIcon, iconGradient } from '@/lib/icons';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['700'] });

const contentDir = path.join(process.cwd(), 'content');

const courses = [
  {
    slug: 'ml-system-design',
    title: 'ML System Design',
    icon: 'BrainCircuit',
    description:
      'Design a production machine learning system end to end, from framing the problem to monitoring the model in production, with worked examples like fraud detection and recommendations.',
    // Stage icons in course order; drives the color strip on the card.
    stages: [
      ['Problem Framing', 'Target'],
      ['Requirements', 'ClipboardList'],
      ['Data', 'Database'],
      ['Features', 'Layers'],
      ['Modeling', 'Network'],
      ['Evaluation', 'ChartColumn'],
      ['Deployment', 'Rocket'],
      ['Monitoring', 'Activity'],
    ],
  },
];

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return nested.flat();
}

// A part counts as a lesson once it's fully taught: its `## 1.2` / `## A3`
// section has sub-headings. Summary-only parts don't count.
function countLessons(mdx: string) {
  return mdx
    .split(/^## /m)
    .filter((section) => /^(?:\d\.\d|[A-G]\d)\b/.test(section) && /^### /m.test(section)).length;
}

async function courseStats(slug: string) {
  const pages = (await walk(path.join(contentDir, 'courses', slug))).filter((f) => f.endsWith('.mdx'));
  const texts = await Promise.all(pages.map((f) => readFile(f, 'utf8')));
  const lessons = texts.reduce((n, t) => n + countLessons(t), 0);
  // Diagrams live under content/diagrams/<stage>; count those used by this course.
  const used = new Set(texts.flatMap((t) => [...t.matchAll(/<Diagram src="([^"]+)"/g)].map((m) => m[1])));
  return { lessons, diagrams: used.size };
}

export default async function HomePage() {
  const stats = await Promise.all(courses.map((c) => courseStats(c.slug)));

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-16 md:px-8 md:pt-24">
      <section className="max-w-2xl">
        <h1
          className={`${display.className} text-[2.5rem] leading-[1.05] font-bold tracking-[-0.02em] text-balance md:text-[3.5rem]`}
        >
          Learn how real systems are designed, one decision at a time.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fd-muted-foreground">
          Each course works through realistic examples, from the first question to running in production, with
          the trade-offs and failure modes behind every choice.
        </p>
      </section>

      <section aria-labelledby="courses" className="mt-20">
        <h2 id="courses" className="text-xl font-semibold">
          Courses
        </h2>

        <ul className="mt-5 grid gap-4">
          {courses.map((course, ci) => (
            <li key={course.slug}>
              <Link
                href={`/courses/${course.slug}`}
                className="course-card group grid gap-6 rounded-2xl border bg-fd-card p-6 no-underline transition-colors hover:border-fd-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-primary md:grid-cols-[1fr_auto] md:items-center md:p-8"
              >
                <div className="flex gap-5">
                  <ColorIcon name={course.icon} size={48} />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-fd-muted-foreground">
                      {course.description}
                    </p>

                    <div className="mt-5 flex h-1.5 max-w-md gap-1" aria-hidden>
                      {course.stages.map(([name, icon]) => {
                        const [from, to] = iconGradient(icon);
                        return (
                          <span
                            key={name}
                            title={name}
                            className="flex-1 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
                          />
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs tabular-nums text-fd-muted-foreground">
                      {course.stages.length} stages, {stats[ci].lessons} lessons and {stats[ci].diagrams} diagrams
                    </p>
                  </div>
                </div>

                <span className="justify-self-start rounded-lg bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity group-hover:opacity-90 md:justify-self-end">
                  Open course
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
