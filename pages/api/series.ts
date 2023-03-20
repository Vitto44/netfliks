import { NextApiRequest, NextApiResponse } from "next"
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  
      try {
        await serverAuth(req)
        const movies = await prismadb.movie.findMany({
          where: {
            type: "series"
          }
        })
        return res.status(200).json(movies)
      } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
      }  
   
}

export default handler;