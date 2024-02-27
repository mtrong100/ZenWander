import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../../components/TitleSection";
import ListboxRoot from "../../components/ListboxRoot";
import {
  blogCategories,
  orderOptions,
  blogParams,
  blogSortOptions,
} from "../../utils/constants";
import Searchbox from "../../components/Searchbox";
import useOnchange from "../../hooks/useOnchange";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import Checkbox from "../../components/Checkbox";
import ReactPaginate from "react-paginate";
import useDebounce from "../../hooks/useDebounce";
import BlogTable from "../../components/BlogTable";
import { toast } from "sonner";
import { getBlogsFromUserApi } from "../../api/blogApi";
import { useSelector, useDispatch } from "react-redux";
import { loadingBlogs, storeBlogs } from "../../redux/slices/blogSlice";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Button from "../../components/Button";

const ManageBlog = () => {
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const { isLoading, blogs } = useSelector((state) => state.blog);

  const [nextPage, setNextPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState(blogSortOptions[0].value);
  const [order, setOrder] = useState(orderOptions[0].value);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { value, handleChange } = useOnchange();
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
    const token = JSON.parse(localStorage.getItem("ZENWANDER_TOKEN") || "");

    try {
      const data = await getBlogsFromUserApi(token, currentUser?._id, {
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

  return (
    <section>
      <TitleSection>Manage your blogs</TitleSection>

      <div className="my-10">
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

                      <div>
                        <DownloadTableExcel
                          filename="Blog table"
                          sheet="Blog"
                          currentTableRef={tableRef.current}
                        >
                          <Button className="w-full ">Export to Excel</Button>
                        </DownloadTableExcel>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>

        <ul>
          {!isLoading && blogs?.length === 0 ? (
            <p className="text-center font-medium my-5 opacity-60">
              No data found...
            </p>
          ) : (
            <BlogTable ref={tableRef} />
          )}
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

export default ManageBlog;
