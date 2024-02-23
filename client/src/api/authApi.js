import axios from "axios";

export const registerApi = async (request) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/register`,
    request
  );
  return res.data;
};

export const loginApi = async (request) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    request
  );

  return res.data;
};

export const googleLoginApi = async (request) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/google-login`,
    request
  );

  return res.data;
};

export const verifyEmailApi = async (token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/auth/verify-email?token=${token}`
  );

  return res.data;
};

export const sendOtpResetPasswordApi = async (request) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/send-otp`,
    request
  );

  return res.data;
};

export const resetPasswordApi = async (request) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
    request
  );

  return res.data;
};
