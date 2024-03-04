import axios from "axios";

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
