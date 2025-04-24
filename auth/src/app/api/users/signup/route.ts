import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer"

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { userName, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "user already exists" }, { status: 400 });
        }
        // bcrupt passeord
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email 

        await sendEmail({ email, emailType: "verify", userId: savedUser._id.tostring() })
        return NextResponse.json({ message: "user registered successfully", 
            success: true,
             savedUser },
              { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}
