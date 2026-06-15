import express from "express";

import db from "../config/db.js";

const router = express.Router();

/* GET ALL FOODS */

router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM foods";

  db.query(sql, (err, result) => {

    if(err){

      return res.status(500).json({

        message:
          "Database Error"

      });

    }

    res.status(200).json(result);

  });

});

export default router;