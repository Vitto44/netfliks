/* eslint-disable @next/next/no-img-element */
import FullSiteLoader from '@/components/FullSiteLoader';
import NavBar from '@/components/navBar';
import useMovie from '@/hooks/useMovie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

const Watch = () => {
  const {movieId} = useRouter().query;
  const {data, isLoading} = useMovie(movieId);

  return (
    <>
    <NavBar notFixed isDashboard/>
    <FullSiteLoader isLoading={isLoading}/>
    <div className='px-2 md:px-5 lg:px-10 text-white '>
      <video controls className='h-full w-full ' poster={data?.thumbnailUrl} src={data?.videoUrl} />
      {data &&
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-10 '>
          <div className='flex flex-col justify-between'>
            <div>
              <h1 className='text-2xl md:text-2xl font-bold'>{data?.title}</h1>
              <p className='text-md mt-5'>{data?.description}</p>
            </div>
            <div>
            <div className='flex flex-row gap-2 mt-5 text-lg '>
              <p className='font-bold'>year: </p>
              <p>{data?.year}</p>
            </div>
            <div className='flex flex-row gap-2 mt-1 text-lg '>
              <p className='font-bold'>duration: </p>
              <p>{data?.duration}</p>
            </div>
            <div className='flex flex-row gap-2 mt-1 text-lg'>
              <p className='font-bold'>genres: </p>
              {data?.genre?.split(' ').map((genre:string) => (
                <p className='bg-white text-black rounded-3xl px-4 font-semibold' key={genre}>{genre}</p>
              ))}
            </div>
            </div>
          </div>
            <img className='rounded-md' src={data?.thumbnailUrl} alt={`${data?.title} poster`} />
            
        </div>
      }
    </div>
    </>
  )
}

export default Watch