import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {  email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "user does not exists" }, { status: 400 });
        }

        console.log("user exists", user);

        const valiedPassword = await bcrypt.compare(password, user.password);
        if(! valiedPassword){
            return NextResponse.json({ message: "chake your credentials " }, { status: 400 });

        }
        const tokenData = {
            id : user._id.toString(),
            userName : user.userName,
            email : user.email,
        }

      const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET! ,  { expiresIn: "1d" } )

      const response = NextResponse.json({ message : "user Logged in successfully", success : true})

      response.cookies.set("token", token, {
        httpOnly : true,
        maxAge : 60 * 60 * 24, // 1 day
      })

      return response;

    } catch (error : unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}
