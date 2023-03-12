/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AiOutlineInfoCircle, AiOutlinePlayCircle } from "react-icons/ai";
import FavButton from "./favButton";

interface MovieCardProps {
  data: {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    id: string;
    genre: string;
    duration: string;
    year?: number;
  };
  setModalData: Function;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, setModalData }) => {
  const router = useRouter();
  // const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  );

  return (
    <div className="group bg-gray-800 col-span relative">
      <img
        src={data.thumbnailUrl}
        alt="Movie"
        draggable={false}
        className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-200
        w-full
        h-44
        md:h-[12vw]
      "
      />
      <div
        className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        delay-200
        w-full
        scale-0
        group-hover:scale-105
        md:group-hover:scale-110
        group-hover:-translate-y-[6vw]
        md:group-hover:translate-x-[2vw]
        group-hover:opacity-100
      "
      >
        <img
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-44
          md:h-[12vw]
        "
        />
        <div
          className="
          z-10
          bg-gray-900
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          "
        >
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={redirectToWatch}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <AiOutlinePlayCircle className="text-gray-800 w-4 lg:w-6 text-2xl" />
            </div>
            <FavButton movieId={data?.id} />
            <div className="cursor-pointer ml-auto group/item flex justify-center items-center">
              <AiOutlineInfoCircle
                onClick={() => setModalData(data)}
                className="text-white text-2xl lg:text-3xl group-hover/item:text-neutral-300"
              />
            </div>
          </div>
          {data && "year" in data && data.year === 2023 && (
            <p className="text-green-400 font-semibold mt-4">
              New <span className="text-white">2023</span>
            </p>
          )}
          <p className="text-white text-lg lg:text-md font-bold mt-0 md:mt-2">
            {data.title}
          </p>

          <div className="flex flex-row flex-wrap items-center gap-2 mt-2 text-[8px] lg:text-sm">
            {data?.genre?.split(" ").map((genre: string) => (
              <p
                className="bg-white text-black rounded-3xl px-4 font-semibold"
                key={genre}
              >
                {genre}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
