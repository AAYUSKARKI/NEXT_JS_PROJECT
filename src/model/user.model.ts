import mongoose,{Schema,Document} from 'mongoose'


export interface  Message extends Document{

    content : string;
    createdAt : Date;

}

export interface User extends Document {

    username : string;
    email : string;
    password : string;
    verifycode : string;
    verifycodeexpiry : Date;
    isVerified : boolean;
    isacceptingmessage : boolean;
    messages : Message[]
}

const MessageSchema: Schema<Message> = new Schema({
    
    content: {
         type: String, 
         required: true 
        },

    createdAt: { 
        type: Date,
        required: true,
        default: Date.now
         }


})

const UserSchema: Schema<User> = new Schema({

    username: {
        type: String,
        required:[true,'username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required:[true,'email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required:[true,'password is required']
    },
    verifycode: {
        type: String,
        required:[true,'verifycode is required']
    },
    verifycodeexpiry: {
        type: Date,
        required:[true,'verifycodeexpiry is required'],
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isacceptingmessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})


const UserModel = mongoose.models.User as mongoose.Model<User>||mongoose.model<User>('User',UserSchema)

export default UserModel

