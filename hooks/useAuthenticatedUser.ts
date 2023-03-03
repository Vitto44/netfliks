import fetcher from "@/lib/fetcher";
import useSWR from "swr";


const useAuthenticatedUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}

export default useAuthenticatedUser;
