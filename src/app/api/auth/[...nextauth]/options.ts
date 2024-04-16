import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect  from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{label:'Email',type:'text'},
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error('No user found with this email ')
                    }

                    if(!user.isVerified){
                        throw new Error('User is not verified please verify your account')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)

                    if(!isPasswordCorrect){
                        throw new Error('Wrong password')
                    }

                    return user

                }
                 catch (error:any) {
                    throw new Error(error)
                }
            }
        })
    ],
    pages:{
        signIn:"/signin"
    },
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isacceptingmessage = user.isacceptingmessage
                token.username = user.username
            }
            return token
        },
        async session({session,token}:any){
            if(token)
           { 
            session.user._id = token._id
            session.user.isVerified = token.isVerified
            session.user.isacceptingmessage = token.isacceptingmessage
            session.user.username = token.username
           }
        return session
        },

    }
}