import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllBlogsApi } from "../api/blogApi";

export default function useGetBlogByCategory(category) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [category]);

  async function fetchBlog() {
    try {
      setIsLoading(true);
      const res = await getAllBlogsApi({ category });
      setBlogs(res?.docs);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.log(`Failed to fetch blogs =>`, error);
      setIsLoading(false);
      setBlogs([]);
    }
  }

  return { blogs, isLoading };
}
