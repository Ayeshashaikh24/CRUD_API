const express = require("express");
const router = express.Router();
const user = require("../model/User");
const { body, validationResult } = require("express-validator");

const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="mynameisendtoendyoutubechanel"

router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  // password must be at least 5 chars long
  body("password", "incorrect password").isLength({ min: 5 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//for decodinf password
    const salt=await bcrypt.genSalt(10);
    let secpassword=await bcrypt.hash(req.body.password,salt)

    try {
      await user.create({
        name: req.body.name,
        password:secpassword,
        email: req.body.email,
        location: req.body.location,
      }).then
      (res.json({
        success: true,
      }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("email").isEmail(),

  // password must be at least 5 chars long
  body("password", "incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userdata = await user.findOne({ email });

      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try Logging With correct Credentials" });
      }
const pwdcompare=await bcrypt.compare(req.body.password,userdata.password)

      if (!pwdcompare) {
        return res
          .status(400)
          .json({ errors: "Try Logging With correct Credentials" });
      }
const data={
    user:{
id:userdata.id
    }
}

const authToken=jwt.sign(data,jwtSecret)

      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
