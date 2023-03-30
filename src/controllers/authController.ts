import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Client } from "../db/entities/client.entity";
import { Mechanic } from "../db/entities/mechanic.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const loginClient = async (req: Request, res: Response) => {
//   const email = req.body.email
//   const password = req.body.password;
//   const client = await myDataSource.getRepository(Client).findOne({ where: { email } });

//   if (!client) {
//     return res.status(404).json({
//       message: "Client not found!, please check the fields"
//     });
//   }

//   const isValidPassword = await bcrypt.compare(password, client.password);

//   if (!isValidPassword) {
//     return res.status(401).json({
//       message: `Passwords aren't the same!`
//     })
//   }

//   const token = jwt.sign({ client }, 'process.env.MY_SECRET', { expiresIn: "3h" });

//   return res.json({
//     Headers: {
//       jwt: token
//     }
//   })
// }