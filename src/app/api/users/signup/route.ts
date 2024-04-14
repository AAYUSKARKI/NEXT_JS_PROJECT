import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerifificationEmail";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()
        const verifycode = Math.floor(100000 + Math.random() * 900000).toString()
        const existiingUserVerifiedByUsername = await UserModel.findOne({ username,isVerified:true })

        if(existiingUserVerifiedByUsername){
            return Response
            .json({ success: false, message: "UserName is Already taken||Username already exists" },
                {status:400}
            )
        }

        const existiingUserByEmail = await UserModel.findOne({ email })
        if (existiingUserByEmail) {
            if(existiingUserByEmail.isVerified){
            return Response
            .json({ success: false, message: "Email is Already Verified||Email already exists" },
                {status:400}
            )
        }
        else{
            const hashedpassword = await bcrypt.hash(password,10)
            existiingUserByEmail.password = hashedpassword
            existiingUserByEmail.verifycode = verifycode
            existiingUserByEmail.verifycodeexpiry = new Date(Date.now() + 3600000)
            await existiingUserByEmail.save();
            
        }
        }
        else {
            const hashedpassword = await bcrypt.hash(password,10)
            const expirydate = new Date()
            expirydate.setHours(expirydate.getHours()+1)
            const newuser = new UserModel({
                username,
                email,
                password :hashedpassword,
                verifycode,
                verifycodeexpiry : expirydate,
                isVerified : false,
                isacceptingmessage : true,
                messages : [],
            })

            await newuser.save();
             }

        const Emailresponse = await sendVerificationEmail(
            email,
            username,
            verifycode
        )

        if (!Emailresponse.success) {
            return Response
            .json({ 
                success: false,
                message: Emailresponse.message
             },
            {status:500}
        )
        }


        
    } catch (error) {

        console.log("error registering user ", error)
        return Response.json({
            success: false,
            message: "error registering user"
        }, {
            status: 500
        })

    }
}
