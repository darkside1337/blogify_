const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization;

  if (!authHeaders?.startsWith("Bearer")) {
    /* console.log("failed cuz no token"); */
    return res.status(401).json({ error: "Unauthorised" });
  }
  const token = authHeaders.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      /* console.log("failed cuz token is invalid"); */

      return res.status(401).json({ error: "Unauthorised" });
    } else {
      /* console.log("success");
      console.log("Decoded: ", decoded); */
      req.user = decoded;
      return next();
    }
  });
};

const ensureAdmin = (req, res, next) => {
  const { isAdmin } = req.user;

  if (isAdmin) {
    /*  console.log("success"); */

    return next();
  } else {
    /* console.log("token is invalid"); */

    return res.status(401).json({ error: "Unauthorised" });
  }
};
module.exports = { verifyJWT, ensureAdmin };
