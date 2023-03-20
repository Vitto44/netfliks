import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res:NextApiResponse) => {

  if (req.method !== "GET") {
    res.status(405).json({message: "Method not allowed"});
  }

  try {
    await serverAuth(req);
    const count = await prismadb.movie.count();
    const random = Math.floor(Math.random() * count);
    const movie = await prismadb.movie.findFirst({
      take: 1,
      skip: random,
    });
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).end();
    
  }

}

export default handler;