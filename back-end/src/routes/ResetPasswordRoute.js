import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";
import bcrypt from "bcrypt";

export const ResetPasswordRoute = {
  method: "put",
  path: "/api/reset-password",
  handler: async (req, res) => {
    const { resetPasswordString, newPassword } = req.body;

    const db = await getDbConnection("react-auth-db");

    if (!db) {
      // Handle database connection error
      return res
        .status(500)
        .json({ error: "Unable to connect to the database" });
    }

    const user = await db.collection("users").findOne({ resetPasswordString });

    if (!user) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const { _id: id, email, isVerified, info } = user;

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await db.collection("users").findOneAndUpdate(
      {
        _id: ObjectID(id),
      },
      {
        $set: {
          passWordHash: newPasswordHash,
        },
      }
    );
     jwt.sign(
      { id, email, isVerified, info },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(200).json({ token });
      }
    );
  },
};
