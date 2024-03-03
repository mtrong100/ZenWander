import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getBlogDetailApi } from "../api/blogApi";

export default function useGetBlogDetail(blogId) {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  async function fetchBlog() {
    try {
      setIsLoading(true);
      const res = await getBlogDetailApi(blogId);
      setBlog(res);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch current blog");
      console.log(`Failed to fetch current blog #${blogId}  =>`, error);
      setIsLoading(false);
      setBlog(null);
    }
  }

  return { blog, setBlog, isLoading };
}
