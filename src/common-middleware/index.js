const jwt = require("jsonwebtoken");

exports.requiresSignin = (req, res, next) => {
   if (req.headers.authorization) {
      // Separate the token and save the position with the code in a variable
      const token = req.headers.authorization.split(" ")[1];

      // Function decode of JsonWebToken recieve the token and the JsonWebToken Secret Key
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      //jwt.decode()
   } else {
      return res.status(400).json({ message: "Authorization required" });
   }
   next();
};

exports.userMiddleware = (req, res, next) => {
   if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
   }
   next();
};

exports.adminMiddleware = (req, res, next) => {
   if (req.user.role !== "admin") {
      return res.status(400).json({ message: "Admin access denied" });
   }
   next();
};
