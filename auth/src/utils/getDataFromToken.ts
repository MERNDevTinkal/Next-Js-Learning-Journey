import { connect } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();

//  Custom type for JWT payload
interface JwtPayload {
  id: string;
}

export function getDataFromToken(request: NextRequest): string | undefined {
  try {
    const token = request.cookies.get("token")?.value || "";
    
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    return decodedToken.id;
  } catch (error: unknown) {
    console.error("Token verification failed:", error);
    return undefined;
  }
}
