import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Authorization token is required",
    });
  }

  const token = authHeader.slice("Bearer ".length);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Admin access required",
      });
    }
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "user") {
      return res.status(403).json({
        status: "error",
        message: "User access required",
      });
    }
    next(); // any logged in user can access
  });
};

export const verifyOwnership = (req, res, next) => {
  if (typeof req.user.id !== "string" || req.user.id.toLowerCase() !== req.params.id.toLowerCase()) {
    return res.status(403).json({
      status: "error",
      message: "You can only update your own account",
    });
  }

  next();
};
