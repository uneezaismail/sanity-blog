import { getPosts } from "@/sanity/sanity-utils";
import BlogItem from "@/components/Blog";

export default async function Home() {
  const posts = await getPosts();
  // console.log("Posts in Home component:", posts);
  return (
    <div className="py-5 mx-auto px-7 md:px-24">
      {posts?.length > 0 ? (
        
        posts.map((post: any, i) => <BlogItem key={i} blog={post} />)
      
      ) : (
        <p >No posts found</p>
      )}
    </div>
  );
}

