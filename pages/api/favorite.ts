import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";


const handler = async (req: NextApiRequest, res:NextApiResponse) => {
  
  try {
    if (req.method === "POST") {
      const {user} = await serverAuth(req);
      const favorite = await prismadb.movie.findUnique({
        where: {
          id: req.body.movieId
        }
      });
      if (!favorite) {
        return res.status(404).json({message: "Movie not found"});
      }
      const userDB = await prismadb.user.update({
        where: {
          id: user.id
        },
        data: {
          favorites: {
            push: favorite.id
        }
      }
      })

      return res.status(200).json(userDB);
    }

    if (req.method === "DELETE") {
      const {user} = await serverAuth(req);
      const favorite = await prismadb.movie.findUnique({
        where: {
          id: req.body.movieId
        }
      });
      if (!favorite) {
        return res.status(404).json({message: "Movie not found"});
      }
      const userDB = await prismadb.user.update({
        where: {
          id: user.id
        },
        data: {
          favorites: user.favorites.filter((movieId) => movieId !== favorite.id)
        }
      });

      return res.status(200).json(userDB);
    }
    return res.status(405).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
    
  }
    
  
}

export default handler;
