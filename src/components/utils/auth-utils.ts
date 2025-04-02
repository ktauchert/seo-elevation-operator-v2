import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const validateTokenAndGetUserId = async (
  req: NextRequest
): Promise<string | null> => {
  const secret = process.env.NEXT_AUTH_SECRET;

  try {
    const token = await getToken({ req, secret });


    if (!token) {
      return null;
    }

    return token.sub || null;
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
};
