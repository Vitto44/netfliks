import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";


const handler = async (req: NextApiRequest, res:NextApiResponse) => {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const {user} = await serverAuth(req);
    
    const favorites = await prismadb.movie.findMany({
      where: {
        id: {
          in: user.favorites
        }
      }
    });

    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }

}

export default handler