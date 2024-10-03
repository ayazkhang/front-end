import axios from 'axios';
export const login = async (email: string, password: string) => {
  return axios.post('login', { email, password });
};

export const logout = async () => {
  return axios.post('logout');
};

export const register = async (email: string, password: string) => {
  return axios.post('register', { email, password });
};
