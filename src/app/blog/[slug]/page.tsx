import React from "react";
import { getPostBySlug } from "@/sanity/sanity-utils";
import RenderBodyContent from "@/components/Blog/RenderBodyContent";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
interface Params {
  slug: string;
}

const SingleBlogPage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params; 
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <p>We couldn&apos;t find the post you&apos;re looking for. It might have been deleted or moved.</p>
      </div>
    );
  }
  return (
    <article className="my-10  px-4 py-5 md:px-24  max-w-[1000px] mx-auto">
      <div className="mb-5">
       <Image src={urlFor(post.mainImage).width(800).height(600).url()} alt={post.title} width={100} height={100} className="w-full h-full"></Image>
        <h1 className="text-3xl py-2">{post.title}</h1>
        <p className="pb-1">
          <span className="font-medium">Published:</span>
          {new Date(post.publishedAt).toDateString()}
          <span className="font-medium pl-2">by </span>
          {post.author.name}
        </p>

      </div>

      <article className="prose lg:prose-xl">
        <RenderBodyContent  post={post}  />
      </article>
    </article>
  );
};

export default SingleBlogPage;