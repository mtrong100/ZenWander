import React, { useEffect, useState } from "react";
import Searchbox from "../components/Searchbox";
import BlogCard, { BlogCardSkeleton } from "../components/BlogCard";
import ListboxRoot from "../components/ListboxRoot";
import {
  blogCategories,
  blogParams,
  blogSortOptions,
  orderOptions,
} from "../utils/constants";
import useOnchange from "../hooks/useOnchange";
import useDebounce from "../hooks/useDebounce";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import Checkbox from "../components/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { loadingBlogs, storeBlogs } from "../redux/slices/blogSlice";
import { getAllBlogsApi } from "../api/blogApi";
import { toast } from "sonner";
import ReactPaginate from "react-paginate";
import Button from "../components/Button";

const Blog = () => {
  const dispatch = useDispatch();
  const { isLoading, blogs } = useSelector((state) => state.blog);
  const [nextPage, setNextPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState(blogSortOptions[0].value);
  const [order, setOrder] = useState(orderOptions[0].value);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { value, handleChange, setValue } = useOnchange();
  const searchQuery = useDebounce(value, 500);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [dispatch, nextPage, order, searchQuery, selectedCategory, sort]);

  // Fetching blogs
  async function fetchBlogs() {
    dispatch(loadingBlogs(true));

    try {
      const data = await getAllBlogsApi({
        page: nextPage,
        sort: sort,
        order: order,
        category: selectedCategory,
        query: searchQuery,
      });

      setTotalPages(data?.totalPages);
      dispatch(storeBlogs(data?.docs));
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.log("Failed to fetch blogs ->", error);
      dispatch(storeBlogs([]));
      dispatch(loadingBlogs(false));
      setTotalPages(1);
    }
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    setNextPage(event.selected + 1);
  };

  const handleReset = () => {
    setOrder(orderOptions[0].value);
    setSort(blogSortOptions[0].value);
    setValue("");
    setSelectedCategory("");
  };

  return (
    <section className="my-10">
      <h1 className="text-6xl text-center font-bold mb-20">
        <span className="text-primary">Finding</span> your best blogs
      </h1>

      <div>
        <div className="flex items-center gap-3">
          <ListboxRoot
            list={blogCategories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            placeholder="Choose category"
          />
          <Searchbox
            queryValue={value}
            handleSearch={handleChange}
            placeHolder="Search your blog..."
          />
          <Popover className="relative">
            {() => (
              <>
                <Popover.Button className="flex items-center justify-center h-[50px] w-[50px] rounded-lg hover:bg-blue-600 bg-primary text-white">
                  <ListFilter />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-50 mt-3 bg-white w-[300px] rounded-lg shadow-md p-5 border border-gray-300">
                    <div className="space-y-5">
                      <div>
                        <h1 className="text-xl font-semibold">Filter</h1>
                        <ul className="mt-2 grid grid-cols-2 gap-3">
                          {blogSortOptions.map((item) => (
                            <li
                              key={item.title}
                              onClick={() => setSort(item.value)}
                              className="flex items-center gap-3"
                            >
                              {sort === item.value ? (
                                <Checkbox type="checked" />
                              ) : (
                                <Checkbox />
                              )}
                              <p className="cursor-default">{item.title}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h1 className="text-xl font-semibold">Order</h1>
                        <ul className="mt-2 flex flex-col gap-3">
                          {orderOptions.map((item) => (
                            <li
                              key={item.title}
                              onClick={() => setOrder(item.value)}
                              className="flex items-center gap-3"
                            >
                              {order === item.value ? (
                                <Checkbox type="checked" />
                              ) : (
                                <Checkbox />
                              )}
                              <p className="cursor-default">{item.title}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button onClick={handleReset} className="w-full">
                        Reset changes
                      </Button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>

        {!isLoading && blogs?.length === 0 && (
          <p className="text-center font-medium my-8 text-lg opacity-60">
            No data found...
          </p>
        )}

        <ul className="grid grid-cols-4 gap-3 mt-6">
          {isLoading &&
            Array(20)
              .fill(0)
              .map((item, index) => <BlogCardSkeleton key={index} />)}

          {!isLoading &&
            blogs?.map((item) => <BlogCard key={item?._id} data={item} />)}
        </ul>

        {blogs?.length > blogParams.LIMIT && (
          <div className="mt-8 mb-3">
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
    </section>
  );
};

export default Blog;
