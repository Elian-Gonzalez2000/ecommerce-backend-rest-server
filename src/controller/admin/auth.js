const User = require("../../models/auth.js");
const env = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

env.config();

// exports something with specific name
exports.signup = (req, res) => {
   User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (user)
         return res.status(400).json({
            message: "Admin already registered",
         });

      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
         firstName,
         lastName,
         email,
         hash_password,
         username: shortid.generate(),
         role: "admin",
      });

      _user.save((error, data) => {
         if (error) {
            return res.status(400).json({
               message: "Something went wrong ",
               error: error,
            });
         }

         if (data) {
            return res.status(201).json({
               message: "Admin created  successfuly",
            });
         }
      });
   });
};

exports.signin = (req, res) => {
   User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
         const isPassword = await user.authenticate(req.body.password);
         if (isPassword && user.role === "admin") {
            // Create a token with JsonWebToken, expires in 2 hours
            const token = jwt.sign(
               { _id: user._id, role: user.role },
               process.env.JWT_SECRET,
               {
                  expiresIn: "2d",
               }
            );
            const { _id, firstName, lastName, email, role, fullName } = user;
            res.cookie("token", token, { expiresIn: "2d" });
            res.status(200).json({
               token,
               user: {
                  _id,
                  firstName,
                  lastName,
                  email,
                  role,
                  fullName,
               },
            });
         } else {
            return res.status(400).json({
               message: "Invalid Password",
            });
         }
      } else {
         return res.status(400).json({ message: "Something went wront" });
      }
   });
};

exports.signout = (req, res) => {
   res.clearCookie("token");
   res.status(200).json({
      message: "Signout succefully... !",
   });
};
