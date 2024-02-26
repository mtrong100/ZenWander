import axios from "axios";

export const getBlogDetailApi = async (id, accessToken) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/${id}`, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

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

export const updateBlogApi = async (id, request, accessToken) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/blog/update/${id}`,
    request,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const deleteBlogApi = async (id, request, accessToken) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/blog/delete/${id}`,
    request,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};
