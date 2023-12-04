import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

const cookie = getCookie('access_token');
const instanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  // withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  //   timeout: 1000,
});
if (cookie)
  instanceAxios.defaults.headers.common.Authorization = `Bearer ${cookie}`;
// else delete instanceAxios.defaults.headers.common.Authorization;
export default instanceAxios;
