import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";


const handler = async (req:NextApiRequest, res:NextApiResponse) => {

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    await serverAuth(req);
    const { movieId } = req.query
    if (!movieId) {
      return res.status(400).json({ message: "Bad request" })
    }
    if (typeof movieId !== "string") {
      return res.status(400).json({ message: "Bad request" })
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    })
    if (!movie) {
      return res.status(404).json({ message: "Not found" })
    }

    return res.status(200).json(movie)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }

}

export default handler

