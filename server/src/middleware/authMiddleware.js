import jwt from "jsonwebtoken";
import { apiResponse } from "../../shared/response.js";

export const extractAndVerifyToken = (req) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { success: false, action: 3 };
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return { success: false, action: 3 };
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.uid) {
      return { success: false, action: 15 };
    }

    return { success: true, user: decoded, uid: decoded.uid };
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return { success: false, action: 15 };
    }

    throw error;
  }
};

export const authenticateToken = (req, res, next) => {
  try {
    const result = extractAndVerifyToken(req);

    if (!result.success) {
      return apiResponse(res, { action: result.action });
    }

    req.user = result.user;
    req.userId = result.uid;

    
    req.AccessedBy = result.uid;

    if (!req.body || typeof req.body !== "object") {
      req.body = {};
    }

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      req.body.CreatedBy = result.uid;
      req.body.UpdatedBy = result.uid;
    }

    if (req.method === "DELETE") {
      req.body.UpdatedBy = result.uid;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return apiResponse(res, {
      action: 4,
    });
  }

  next();
};
