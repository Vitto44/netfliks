/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface InfoModalProps {
  setIsOpen: Function;
  data: {
    id: string;
    title: string;
    description: string;
    year: number;
    genre: string;
    duration: string;
    thumbnailUrl: string;
  } | null;
}

const InfiModal: React.FC<InfoModalProps> = ({ data, setIsOpen }) => {
  const router = useRouter();

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data?.id}`),
    [router, data?.id]
  );

  return (
    <div
      onClick={() => setIsOpen(null)}
      className={`bg-gray-700 bg-opacity-70 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center`}
    >
      <div className="w-4/5 lg:w-2/3 bg-gray-800 px-8 rounded-lg text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 ">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-2xl font-bold">{data?.title}</h1>
              <p className="text-md mt-5">{data?.description}</p>
            </div>
            <div>
              <div className="flex flex-row gap-2 mt-5 text-lg ">
                <p className="font-bold">year: </p>
                <p>{data?.year}</p>
              </div>
              <div className="flex flex-row gap-2 mt-1 text-lg ">
                <p className="font-bold">duration: </p>
                <p>{data?.duration}</p>
              </div>
              <div className="flex flex-row gap-2 mt-1 text-lg flex-wrap">
                <p className="font-bold">genres: </p>
                {data?.genre?.split(" ").map((genre: string) => (
                  <p
                    className="bg-white text-black rounded-3xl px-4 font-semibold"
                    key={genre}
                  >
                    {genre}
                  </p>
                ))}
              </div>
              <button
                onClick={() => redirectToWatch()}
                className="bg-red-600 md:w-fit bg-opacity-90 text-white mt-5 px-10 py-3 rounded-md text-sm font-bold transition hover:bg-red-700"
              >
                Watch
              </button>
            </div>
          </div>
          <img
            className="rounded-md"
            src={data?.thumbnailUrl}
            alt={`${data?.title} poster`}
          />
        </div>
      </div>
    </div>
  );
};

export default InfiModal;
