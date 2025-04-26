import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User does not exist" }, 
                { status: 400 }
            );
        }

        // Check if user is verified
        if (!user.isVerified) {
            return NextResponse.json(
                { message: "Please verify your email first" },
                { status: 401 } 
            );
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { message: "Invalid credentials" }, 
                { status: 400 }
            );
        }

        // Create token data
        const tokenData = {
            id: user._id.toString(),
            userName: user.userName,
            email: user.email,
        };

        // Generate JWT token
        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!, 
            { expiresIn: "1d" }
        );

        // Create response with cookie
        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                isVerified: user.isVerified
            }
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
            sameSite: "strict",
        });

        return response;

    } catch (error: unknown) {
        console.error("Login error:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message }, 
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}