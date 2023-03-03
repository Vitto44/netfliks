import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useBanner = () => {
  const { data, error, isLoading } = useSWR('/api/randomMv', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    isLoading,
    error
  };
}

export default useBanner;