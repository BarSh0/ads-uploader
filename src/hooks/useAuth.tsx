import { useQuery } from 'react-query';
import axiosInstance from '../utils/api/axios';

export type PlatformName = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok';

export type Platforms = Record<PlatformName, Platform>;

export type Platform = {
  isConnect: boolean;
  accessToken: string;
  secretToken: string;
};

export interface IUser {
  _id: string;
  username: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  platforms: Platforms;
}

const fetchUserDetails = async (): Promise<IUser | null> => {
  try {
    // const accessToken = localStorage.getItem('token');
    // if (!accessToken) return null;
    const response = await axiosInstance.get<IUser>('/users/me');
    return response.data;
  } catch (error) {
    return null;
  }
};

const useAuth = () => {
  const { data: user, isLoading } = useQuery('user', fetchUserDetails, {
    staleTime: 600000, // 10 minutes, how long to consider the data fresh, reduce for more real-time updates
    refetchOnWindowFocus: false, // Do not refetch when the window regains focus
    retry: false, // Do not retry failed requests
  });

  return { user, isLoading };
};

export default useAuth;
