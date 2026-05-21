import Link from "next/link";
import type { CategoryBlog } from "@/features/categories/types/category.types";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type CategoryBlogsSectionProps = {
  title: string;
  blogs: CategoryBlog[];
};

export function CategoryBlogsSection({ title, blogs }: CategoryBlogsSectionProps) {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Icons.sparkles className="size-4" />
            Blogs
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.18] text-slate-950 sm:text-4xl">
            Latest insights on {title.replace(" Courses", "")}
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-950/75">
            Short reads to help learners understand trends, applications and
            career possibilities.
          </p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.title}
              className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-40 items-start bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-white/70 text-blue-700">
                  <Icons.bookOpen className="size-5" />
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase text-blue-700">
                  {blog.topic}
                </p>
                <h3 className="mt-4 text-lg font-bold leading-7 text-slate-950">
                  {blog.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-blue-950/75">
                  {blog.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
                  >
                    Read More
                    <Icons.arrowRight className="size-4" />
                  </Link>
                  <span className="text-sm text-blue-900/40">
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
