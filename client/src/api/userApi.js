import axios from "axios";
import { queryParams } from "../utils/constants";

export const getUserDetailApi = async (id, accessToken) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const updateUserApi = async (id, request, accessToken) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/user/update/${id}`,
    request,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const getFollowersApi = async (
  page = queryParams.PAGE,
  limit = queryParams.LIMIT,
  sort = queryParams.SORT,
  order = queryParams.ORDER,
  query,
  accessToken
) => {
  let res;

  if (query) {
    res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/all?query=${query}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
  } else {
    res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/user/all?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
  }

  return res.data;
};
