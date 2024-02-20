import axios from "axios";

export const getUserDetailApi = async (id, accessToken) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};
