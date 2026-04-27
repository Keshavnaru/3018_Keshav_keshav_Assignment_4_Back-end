import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "../../../config/firebaseConfig";
import { AuthenticationError } from "../errors/errors";

const getRoleByEmail = (email?: string): string | undefined => {
  if (email === "officer@pixell-river.com") return "officer";
  if (email === "manager@pixell-river.com") return "manager";
  if (email === "admin@pixell-river.com") return "admin";

  return undefined;
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;

    if (!token) {
      throw new AuthenticationError(
        "Unauthorized: No token provided",
        "TOKEN_NOT_FOUND"
      );
    }

    const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);

    res.locals.uid = decodedToken.uid;
    res.locals.email = decodedToken.email;
    res.locals.role = decodedToken.role || getRoleByEmail(decodedToken.email);

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      next(error);
      return;
    }

    next(new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID"));
  }
};

export default authenticate;