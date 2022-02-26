//ovaj midleware ide poslje authorizacija midleware
module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).send("😱 Access denied. Niste Autorizovani.");
  next(); // TO ROUTE HANDLER
};
