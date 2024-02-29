import axios from "axios";
import { blogParams } from "../utils/constants";

export const getAllBlogsApi = async ({
  page = blogParams.PAGE,
  limit = blogParams.LIMIT,
  sort = blogParams.SORT,
  order = blogParams.ORDER,
  category,
  query,
  status,
} = {}) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/all`, {
      params: {
        category,
        query,
        page,
        limit,
        sort,
        order,
        status,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getBlogsFromUserApi = async (
  accessToken,
  authorId,
  {
    page = blogParams.PAGE,
    limit = blogParams.LIMIT,
    sort = blogParams.SORT,
    order = blogParams.ORDER,
    category,
    query,
  } = {}
) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/blog/user/${authorId}`,
      {
        params: {
          category,
          query,
          page,
          limit,
          sort,
          order,
        },
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getBlogDetailApi = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/${id}`);
  return res.data;
};

/* CRUD API */
export const createBlogApi = async (token, data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/blog/create`,
    data,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const updateBlogApi = async (accessToken, id, request) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/blog/update/${id}`,
    request,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const deleteBlogApi = async (id, accessToken) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/blog/delete/${id}`,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};
