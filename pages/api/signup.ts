
import prismadb from '@/lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'


  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).end();

    try {
      const { email, password, firstName, lastName } = req.body

      // Check if user already exists
      const userRegistered = await prismadb.user.findFirst({
        where: {
          email: email
        }
      });

      // If user already exists, return 409
      if (userRegistered) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const user = await prismadb.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: passwordHash,
        }
      })

      return res.status(200).json(user);


    } catch (error) {
      console.error(error);
      res.status(500).end();
    }

  }

  export default handler
