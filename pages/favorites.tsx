import FullSiteLoader from "@/components/FullSiteLoader";
import InfiModal from "@/components/InfiModal";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/navBar";
import useFavorites from "@/hooks/useFavorites";
import React, { useState } from "react";

const Favorites = () => {
  const [modalData, setModalData] = useState<any | null>(null);
  const { data, isLoading } = useFavorites();

  return (
    <div>
      <FullSiteLoader isLoading={isLoading} />
      <NavBar isDashboard notFixed />
      <div className="flex flex-wrap gap-10 pb-52">
        <MovieList setModalData={setModalData} data={data} label="Favorites" />
      </div>
      {modalData && <InfiModal setIsOpen={setModalData} data={modalData} />}
    </div>
  );
};

export default Favorites;
