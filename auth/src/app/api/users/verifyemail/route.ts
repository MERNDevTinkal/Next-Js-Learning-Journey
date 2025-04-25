import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

     const user =   await User.findOneAndUpdate({verifyToken : token ,verifyTokenExpiry : {$gt : Date.now() } })

        if (! user) {
            return NextResponse.json({message : "Invalied Token"},{status : 400});

        }

        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message : "Email verified successfully", success : true},{status : 200});
        
    } catch (error : unknown) {
        if(error instanceof Error ){
            return NextResponse.json({message : error.message},{status : 500});
        }
    }
}
