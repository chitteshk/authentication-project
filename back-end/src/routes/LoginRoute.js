import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const LoginRoute = {
  method: "post",
  path: "/api/login",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = await getDbConnection("react-auth-db");

    if (!db) {
      // Handle database connection error
      return res
        .status(500)
        .json({ error: "Unable to connect to the database" });
    }

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      res.status(401);
    }

    const { _id: id, isVerified, passWordHash, info } = user;

    const isCorrect = await bcrypt.compare(password, passWordHash);

    if (isCorrect) {
        jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, {
            expiresIn: "2d",
          }, (err, token) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json({ token });
            }
          });
          
    }
    else {
      res.status(400).json({message: "Password is invalid"})
    }
  },
};
