import axios from "axios";

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
