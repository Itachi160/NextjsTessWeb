import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from '../../../client-pages/BlogPost';
import { BLOG_POSTS, getBlogPostBySlug } from '../../../lib/blogs';
import { getBreadcrumbSchema, getBlogPostSchema } from '../../../lib/seoSchemas';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Tesseract Infosystems',
    };
  }

  const url = `https://tesseractinfosystems.com/blog/${post.slug}`;

  return {
    title: `${post.title} | Tesseract Engineering Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'Tesseract Infosystems',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage.startsWith('http') ? post.coverImage : `https://tesseractinfosystems.com${post.coverImage}`,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);

  const blogPostSchema = getBlogPostSchema(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
