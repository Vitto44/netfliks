import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { MdFavorite } from "react-icons/md";

interface FavButtonProps {
  movieId: string;
}

const FavButton: React.FC<FavButtonProps> = ({ movieId }) => {
  const { data, mutate } = useFavorites();
  const { data: user, mutate: mutateUser } = useAuthenticatedUser();

  const isFavorite = useMemo(
    () => user?.favorites?.includes(movieId),
    [movieId, user?.favorites]
  );

  const toggleFav = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete(`/api/favorite`, { data: { movieId } });
    } else {
      response = await axios.post(`/api/favorite`, { movieId });
    }
    const updated = response?.data?.favorites;
    mutateUser({ ...user, favorites: updated });
    mutate();
  }, [isFavorite, movieId, mutate, mutateUser, user]);

  return (
    <div
      onClick={toggleFav}
      className="group/item w-10 h-10 lg:w-10 lg:h-10 cursor-pointer flex justify-center items-center"
    >
      <MdFavorite
        className={`text-2xl lg:text-4xl ${
          isFavorite ? "text-red-700" : "text-white"
        }`}
      />
    </div>
  );
};

export default FavButton;
