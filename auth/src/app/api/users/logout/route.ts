import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request : NextRequest) {
    try {
        const responce = NextResponse.json({ message : "user Logged out successfully", success : true})

        responce.cookies.set("token", "",{
            httpOnly : true,
            expires : new Date(0) 
        },)

        return responce;
    } catch (error : unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}