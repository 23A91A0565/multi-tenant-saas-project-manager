export const tenantIsolation = (req, res, next) => {
  if (!req.user || !req.user.tenantId) {
    return res.status(403).json({ message: "Tenant context missing" });
  }

  req.tenantId = req.user.tenantId;
  next();
};
