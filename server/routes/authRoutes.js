const express =
  require("express");

const jwt =
  require("jsonwebtoken");

const bcrypt =
  require("bcryptjs");

const router =
  express.Router();

/* ADMIN DATA */

const admin = {

  email:
    "admin@shamtex.com",

  password:
    bcrypt.hashSync(
      "123456",
      10
    ),

};

/* LOGIN */

router.post(
  "/login",

  async (req, res) => {

    const {
      email,
      password,
    } = req.body;

    /* CHECK EMAIL */

    if (
      email !== admin.email
    ) {

      return res
        .status(401)
        .json({
          message:
            "Invalid Email",
        });

    }

    /* CHECK PASSWORD */

    const validPassword =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (
      !validPassword
    ) {

      return res
        .status(401)
        .json({
          message:
            "Invalid Password",
        });

    }

    /* TOKEN */

    const token =
      jwt.sign(

        {
          email:
            admin.email,
        },

        process.env.JWT_SECRET,

        {
          expiresIn:
            "7d",
        }

      );

    res.cookie(
      "token",
      token,

      {

        httpOnly: true,

        secure: false,

        sameSite:
          "lax",

      }
    );

    res.json({

      success: true,

      token,

    });

  }
);

/* VERIFY */

router.get(
  "/verify",

  (req, res) => {

    const token =
      req.cookies.token;

    if (!token) {

      return res
        .status(401)
        .json({
          authenticated:
            false,
        });

    }

    try {

      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      res.json({
        authenticated:
          true,
      });

    } catch {

      res
        .status(401)
        .json({
          authenticated:
            false,
        });

    }

  }
);

/* LOGOUT */

router.post(
  "/logout",

  (req, res) => {

    res.clearCookie(
      "token"
    );

    res.json({
      success: true,
    });

  }
);

module.exports =
  router;