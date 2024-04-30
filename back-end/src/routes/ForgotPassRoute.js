import { sendPasswordResetMail } from "../controllers/sendMail";
import { getDbConnection } from "../db";
import { v4 as uuid } from "uuid";
import { ObjectID } from "mongodb";
import jwt from "jsonwebtoken";

export const ForgotPassRoute = {
  method: "post",
  path: "/api/forgot-password",
  handler: async (req, res) => {
    const { email } = req.body;

    const db = await getDbConnection("react-auth-db");

    if (!db) {
      // Handle database connection error
      return res
        .status(500)
        .json({ error: "Unable to connect to the database" });
    }

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "This email is not registered with us" });
    }

    const { _id: id, isVerified, info } = user;

    const resetPasswordString = uuid();

    await db.collection("users").findOneAndUpdate(
      { _id: ObjectID(id) },
      {
        $set: {
          resetPasswordString,
        },
      }
    );

    await sendPasswordResetMail(email, resetPasswordString);

    jwt.sign(
      { _id: id, email, isVerified, info },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) res.status(500).send(err);

        res.status(200).json({ token });
      }
    );
  },
};
