export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    console.log("req.user in roleMiddleware:", req.user);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};