const admin = function (req, res, next) {
  // here req.user we are getting from auth middleware where we extract user object and its properties from jwt token

  // through this we can access isAdmin propoerty to check if admin is valid or not

  if (!req.user.isAdmin) {
    return res.status(403).send("Access Denied");
  }

  next();
};

module.exports = admin;
