import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from 'uuid';
import { sendEmailVerificationMail } from "../controllers/sendMail";

export const SignUpRoute = {
  method: "post",
  path: "/api/signup",
  handler: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Attempt to establish a connection to MongoDB
      const db = getDbConnection("react-auth-db");
      

      if (!db) {
        // Handle database connection error
        return res.status(500).json({ error: "Unable to connect to the database" });
      }

      // Continue with user signup logic
      const user = await db.collection("users").findOne({ email });

      if (user) {
        return res.status(409); // Conflict: User already exists
      }

      const passWordHash = await bcrypt.hash(password, 10);

      const verificationString = uuid();

      const startingInfo = {
        hairColor: "",
        skinColor: "",
        bio: "",
      };
      const result = await db.collection("users").insertOne({
        email,
        passWordHash, // Store hashed password
        info: startingInfo,
        isVerified: false,
        verificationString,
      });

      const { insertedId } = result;

      // Send verification email
      await sendEmailVerificationMail(email, verificationString);

      jwt.sign(
        {
          id: insertedId,
          email,
          info: startingInfo,
          isVerified: false,
        },
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
    } catch (error) {
      console.error("Error occurred during signup:", error);
      res.status(500).json({ error: "An error occurred during signup" });
    }
  },
};
