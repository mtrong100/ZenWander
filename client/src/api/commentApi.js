import axios from "axios";
import { commentParams } from "../utils/constants";

export const getAllComments = async ({
  page = commentParams.PAGE,
  limit = commentParams.LIMIT,
  order = commentParams.ORDER,
} = {}) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/all`, {
    params: {
      page,
      limit,
      order,
    },
  });

  return res.data;
};

/* CRUD API */
export const createCommentApi = async (token, data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/comment/create`,
    data,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const updateCommentApi = async (accessToken, id, request) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/comment/update/${id}`,
    request,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const deleteCommentApi = async (id, accessToken) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/comment/delete/${id}`,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};
