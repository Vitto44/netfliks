import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { signOut } from "next-auth/react";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {


  if (req.method === "PUT") {
    try {
      const { user } = await serverAuth(req);
      const { firstName, lastName, email } = req.body;

      if (!firstName || !lastName || !email) {
        res.status(400).end();
      }
      if (user.email !== email) {
        res.status(400).end();
      }

      const updatedUser = await prismadb.user.update({
        where: { id: user.id },
        data: {
          firstName,
          lastName,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(401).end();
    }
  }

  if (req.method === "DELETE") {
    try {

     await prismadb.user.delete({
        where: { email: req.body.email },
     })
      
      res.status(200).end();
    } catch (error) {
      res.status(401).end();
    }
  }

   if (req.method === "GET") {
    try {
      const { user } = await serverAuth(req);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(401).end();
    }
  }
  res.status(405).end();
}

export default handler;