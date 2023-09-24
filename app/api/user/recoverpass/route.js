import { NextResponse } from "next/server";
import User from '../../modals/user.js'; // Assuming your model is named "User"
import bcrypt from 'bcrypt';
import Connection from "@/app/database/config";


Connection();

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { email, password } = body;

        if (!email || !password) {
            return new NextResponse("Email and password are required!", {
                status: 400, // Bad Request
            });
        }

        const user = await User.findOne({ Email: email });

        if (!user) {
            return new NextResponse('User not found', {
                status: 404, // Not Found
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        const res = NextResponse.json({ message: 'Password updated successfully' }, {
            status: 200, // Internal Server Error
        });
        return res;
    } catch (error) {
        console.error('Error updating password:', error);
        return new NextResponse.json({ message: 'Internal Server Error' }, {
            status: 500, // Internal Server Error
        });
    }
}