import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { AuthenticationError } from "../errors/errors";

interface FirebaseSignInResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const apiKey = process.env.FIREBASE_WEB_API_KEY;

    if (!apiKey) {
      throw new Error("Firebase Web API key is missing");
    }

    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = (await firebaseResponse.json()) as FirebaseSignInResponse;

    if (!firebaseResponse.ok) {
      throw new AuthenticationError(
        "Unauthorized: Invalid credentials",
        "INVALID_CREDENTIALS"
      );
    }

    res.status(HTTP_STATUS.OK).json(data);
  } catch (error) {
    next(error);
  }
};