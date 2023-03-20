import Banner from "@/components/Banner";
import FullSiteLoader from "@/components/FullSiteLoader";
import InfiModal from "@/components/InfiModal";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/navBar";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useBanner from "@/hooks/useBanner";
import useFavorites from "@/hooks/useFavorites";
import useMovies from "@/hooks/useMovies";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useMemo, useState } from "react";

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function Home() {
  const [modalData, setModalData] = useState<any | null>(null);

  const { isLoading: load1 } = useAuthenticatedUser();
  const { data: movies, isLoading: load2 } = useMovies("trending");
  const { data: favorites, isLoading: load3 } = useFavorites();
  const { isLoading: load4 } = useBanner();

  const isLoading = useMemo(
    () => load1 || load2 || load3 || load4,
    [load1, load2, load3, load4]
  );

  return (
    <div>
      <FullSiteLoader isLoading={isLoading} />
      <NavBar isDashboard />
      <Banner setModalData={setModalData} />
      <div className="flex flex-wrap gap-10 pb-52">
        <MovieList setModalData={setModalData} data={movies} label="Trending" />
        <MovieList
          setModalData={setModalData}
          data={favorites}
          label="Favorites"
        />
      </div>
      {modalData && <InfiModal setIsOpen={setModalData} data={modalData} />}
    </div>
  );
}
