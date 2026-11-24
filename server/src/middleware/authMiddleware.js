import jwt from "jsonwebtoken";

const extractAndVerifyToken = (req) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return { success: false, status: 401, message: "Access Token missing", user: null };
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return { success: false, status: 401, message: "Access Token missing", user: null };
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(`Token verified → uid: ${decoded.uid}`);
      return {
        success: true,
        status: 200,
        message: "Token verified successfully",
        user: decoded,
        id: decoded.id,
      };
    } catch (jwtError) {
      console.log(`JWT error: ${jwtError.message}`);
      return { success: false, status: 403, message: "Invalid or expired token", user: null };
    }
  } catch (error) {
    console.log(`extractAndVerifyToken: ${error.message}`);
    return { success: false, status: 500, message: "Internal Server Error", user: null, errors: error.message };
  }
};

//  Authenticate Token Middleware
const authenticateToken = (req, res, next) => {
  const result = extractAndVerifyToken(req);
  if (!result.success) return response(res, result);

  if (!req.body) req.body = {};

  const Method = ["POST", "PUT", "PATCH", "DELETE"];

  if (Method.includes(req.method)) {
    req.body.CreatedBy = result.uid;
    req.body.UpdatedBy = result.uid;
  }

  if (req.method === "GET") {
    req.AccessedBy = result.uid;
  }

  req.user = result.user;
  next();
};

export { extractAndVerifyToken, authenticateToken };
