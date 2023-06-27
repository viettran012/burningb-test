import axios from "axios";

export const get = async (path: string, params = {}, headers = {}) => {
  const response = await axios.get(path, { params: params, headers: headers });
  return response.data;
};

export const post = async (path: string, body = {}, options: object) => {
  const response = await axios.post(path, body, {
    ...options,
  });
  return response.data;
};
