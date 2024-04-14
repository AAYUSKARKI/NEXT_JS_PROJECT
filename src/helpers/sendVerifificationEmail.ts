import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    username: string,
    email: string,
    verifycode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verify your account",
            react: VerificationEmail ({username,otp:verifycode})

        })
        return { success: true, message: "Verification email sent" };
    } catch (error) {
        console.error("Error sending verification email:", error);
        return { success: false, message: "Error sending verification email" };
    }
    }


 
