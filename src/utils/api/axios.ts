import axios from 'axios';
import { toast } from 'react-hot-toast';

const URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'https://adverise-bd111b5e5739.herokuapp.com/';

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
});

const handlePostRequest = async (url: string, data: any): Promise<{ data?: any; status: number; message?: string }> => {
  try {
    const res = await axiosInstance.post(url, data);
    toast.success(res.data.message);
    return { data: res.data.data, status: res.status };
  } catch (error: any) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    return { message: error.response.data.message, status: error.response.status };
  }
};

const handleGetRequest = async (url: string, data?: any) => {
  try {
    const res = await axiosInstance.get(url, data);
    return res.data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    return { message: error.response.data.message, status: error.response.status };
  }
};

const handlePutRequest = async (url: string, data: any) => {
  try {
    const res = await axiosInstance.put(url, data);
    toast.success(res.data.message);
    return res.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

const handleDeleteRequest = async (url: string) => {
  try {
    const res = await axiosInstance.delete(url);
    toast.success(res.data.message);
    return res.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export { handlePostRequest, handleGetRequest, handlePutRequest, handleDeleteRequest };

export default axiosInstance;
