import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovies = (type?:string) => {

  const getUrl = () => {
    if (type === 'trending') {
      return '/api/trending'
    } else if (type === 'series') {
      return '/api/series'
    } else if (type === 'movies') {
      return '/api/movies'
    } else {
      return '/api/movies'
    }
  }

  const { data, error, isLoading } = useSWR(getUrl(), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading,
    error
  }
};

export default useMovies;

