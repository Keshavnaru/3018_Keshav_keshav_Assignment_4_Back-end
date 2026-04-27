import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";

interface AuthorizationOptions {
  hasRole: string[];
}

const isAuthorized = (options: AuthorizationOptions) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const role = res.locals.role;

      if (!role) {
        throw new AuthorizationError("Forbidden: No role found", "ROLE_NOT_FOUND");
      }

      if (!options.hasRole.includes(role)) {
        throw new AuthorizationError(
          "Forbidden: Insufficient role",
          "INSUFFICIENT_ROLE"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default isAuthorized;