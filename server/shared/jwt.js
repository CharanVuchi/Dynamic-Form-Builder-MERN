import jwt from "jsonwebtoken";


const generateToken = (payload) => {
  const expiry = `${process.env.JWT_TOKEN_EXPIRY}`;
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
  console.log(`Token generated → uid: ${payload.uid} | expires: ${expiry}`);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
