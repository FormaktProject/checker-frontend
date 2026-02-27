import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPostBySlug } from "./_components/blogpost";
import BlogPostContent from "./_components/blogpostcontent";


/* ─── Static params for SSG ────────────────────────────── */

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ─── Dynamic Metadata ─────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | CheckerIst Blog",
    };
  }

  return {
    title: `${post.title} | CheckerIst Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          alt: post.coverImageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

/* ─── Page (Server Component) ──────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // BlogPostContent is a Client Component — we pass the data down
  return <BlogPostContent post={post} />;
}