// @flow strict
import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

async function getBlogs() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch blog data:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog, i) => (
            blog?.cover_image && <BlogCard blog={blog} key={i} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p>No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}