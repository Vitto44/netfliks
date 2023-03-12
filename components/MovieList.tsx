import MovieCard from "./MovieCard";


interface MovieListProps {
  data?: {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    id: string;
    genre: string;
    duration: string;
  }[];
  label?: string;
  setModalData: Function;
}


const MovieList: React.FC<MovieListProps> = ({data, label, setModalData }) => {
  return (
    data?.length?
    <div className="px-4 md:px-12 mt-4 space-y-8 w-full">
      <div>
        <p className="text-md md:text-xl lg:text-2xl text-white font-bold">
          {label}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-[90vw] h-auto">
          {data?.map((item) => (
            <MovieCard setModalData={setModalData} key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
    :
    null
  )
}

export default MovieList