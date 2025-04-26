import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        let { userName, email, password } = reqBody;

        //  Trim inputs to remove spaces
        userName = userName.trim();
        email = email.trim();
        password = password.trim();

        //  Check if any field is empty after trimming
        if (!userName || !email || !password) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        //  Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
        }

        //  Password length validation
        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long." }, { status: 400 });
        }

        //  Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        await sendEmail({ email, emailType: "verify", userId: savedUser._id.toString() });

        return NextResponse.json(
            { message: "User registered successfully", success: true, savedUser },
            { status: 201 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}
