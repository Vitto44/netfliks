import { NextApiRequest, NextApiResponse } from "next"
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req


  switch (method) {

    case 'GET':
      try {
        await serverAuth(req)
        const movies = await prismadb.movie.findMany({
          where: {
            type: "movie"
          }
        })
        return res.status(200).json(movies)
      } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
      }  
    case 'POST':
      try {
        await serverAuth(req)
        const movie = await prismadb.movie.create({
          data: req.body,
        })
        return res.status(201).json(movie)
      } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
      }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler;