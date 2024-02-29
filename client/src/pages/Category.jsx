import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllBlogsApi } from "../api/blogApi";
import { toast } from "sonner";
import BlogArticle, { BlogArticleSkeleton } from "../components/BlogArticle";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogSidebar from "../components/shared/BlogSidebar";
import { displayCategoryBadge } from "../utils/helper";

const Category = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [nextPage]);

  async function fetchBlogs() {
    try {
      setIsLoading(true);
      const data = await getAllBlogsApi({
        page: nextPage,
        limit: 5,
        category: slug,
      });

      setBlogs(data?.docs);
      setTotalPages(data?.totalPages);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch lastest blogs");
      console.log("Failed to fetch lastest blogs ->", error);
      setTotalPages(1);
      setIsLoading(false);
      setBlogs([]);
    }
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    setNextPage(event.selected + 1);
  };

  return (
    <section className="my-8">
      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold">Looking for: </p>
        <span
          className={`${displayCategoryBadge(
            slug
          )} uppercase rounded text-white w-fit font-bold px-3 py-1 cursor-default flex items-center gap-2 hover:opacity-90`}
        >
          {slug}
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,_1fr)_300px] gap-8 mt-8">
        {/* Leftside */}
        <div>
          <ul className="flex flex-col gap-5">
            {isLoading &&
              Array(5)
                .fill(0)
                .map((item, index) => <BlogArticleSkeleton key={index} />)}

            {!isLoading &&
              blogs?.map((item) => <BlogArticle key={item?._id} data={item} />)}
          </ul>

          {blogs?.length > 5 && (
            <div className="mt-12 mb-3">
              <ReactPaginate
                breakLabel="..."
                nextLabel={<ChevronRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel={<ChevronLeft />}
                renderOnZeroPageCount={null}
                forcePage={currentPage}
              />
            </div>
          )}
        </div>

        {/* Rightside */}
        <BlogSidebar />
      </div>
    </section>
  );
};

export default Category;
