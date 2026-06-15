import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   SIGNUP
========================= */

router.post("/signup", async (req, res) => {

  const {
    name,
    email,
    password
  } = req.body;

  const checkSql =
    "SELECT * FROM users WHERE email = ?";

  db.query(

    checkSql,

    [email],

    async (err, result) => {

      if (err) {

        return res.status(500).json({
          message: "Server Error"
        });

      }

      if (result.length > 0) {

        return res.status(400).json({
          message: "User Already Exists"
        });

      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const sql =
        "INSERT INTO users(name,email,password) VALUES(?,?,?)";

      db.query(

        sql,

        [
          name,
          email,
          hashedPassword
        ],

        (error) => {

          if (error) {

            return res.status(500).json({
              message: "Signup Failed"
            });

          }

          res.status(201).json({
            message: "Signup Successful"
          });

        }

      );

    }

  );

});

/* =========================
   LOGIN
========================= */

router.post("/login", (req, res) => {

  const {
    email,
    password
  } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(

    sql,

    [email],

    async (err, result) => {

      if (err) {

        return res.status(500).json({
          message: "Server Error"
        });

      }

      if (result.length === 0) {

        return res.status(404).json({
          message: "User Not Found"
        });

      }

      const user = result[0];

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message: "Invalid Password"
        });

      }

      const token = jwt.sign(

        {
          id: user.id,
          email: user.email
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }

      );

      res.status(200).json({

        message: "Login Successful",

        token,

        user: {

          id: user.id,
          name: user.name,
          email: user.email

        }

      });

    }

  );

});

/* =========================
   PROFILE
========================= */

router.get(

  "/profile",

  authMiddleware,

  (req, res) => {

    res.status(200).json({

      user: req.user

    });

  }

);

export default router;