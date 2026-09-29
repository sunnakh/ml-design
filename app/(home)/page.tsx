import Link from 'next/link';
import { ArrowRight, BrainCircuit } from 'lucide-react';

const courses = [
  {
    title: 'ML System Design',
    description:
      'Design production machine learning systems end to end, from problem framing to monitoring.',
    href: '/courses/ml-system-design',
    icon: BrainCircuit,
    topics: [
      'Problem Framing',
      'Requirements',
      'Data',
      'Features',
      'Modeling',
      'Evaluation',
      'Deployment',
      'Monitoring',
    ],
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16">
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">tech-design</h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground">
          Learn how real-world technical systems are designed, one structured course at a time.
        </p>
      </section>

      <section id="courses">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">Courses</h2>
          <Link href="/courses" className="text-sm text-fd-muted-foreground hover:text-fd-foreground">
            View all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.href}
              href={course.href}
              className="group rounded-xl border bg-fd-card p-6 transition-colors hover:bg-fd-accent"
            >
              <course.icon className="mb-4 size-8 text-fd-primary" />
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                {course.title}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mb-4 text-sm text-fd-muted-foreground">{course.description}</p>
              <ol className="flex flex-wrap gap-2">
                {course.topics.map((topic, i) => (
                  <li
                    key={topic}
                    className="rounded-full border px-2.5 py-0.5 text-xs text-fd-muted-foreground"
                  >
                    {i + 1}. {topic}
                  </li>
                ))}
              </ol>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
