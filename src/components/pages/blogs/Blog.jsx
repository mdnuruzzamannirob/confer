import { useLoaderData } from "react-router-dom";
import BlogCard from "./BlogCard";

const Blog = () => {
  const newsData = useLoaderData();

  return (
    <div className="max-w-7xl mx-5 xl:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-7 mx-auto mt-16 mb-20">
        {newsData?.map((newsCard) => (
          <BlogCard key={newsCard.id} newsCard={newsCard}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default Blog;
