import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";


const userSchema = new Schema(
    {
        userName:{
            type: String,
            required: true, 
            unique: true, 
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            required: true, 
            unique: true, 
            lowercase: true,
            trim: true,
        },
        fullname:{
            type: String,
            required: true, 
            trim: true,
            index: true
        },
        avatar:{
            type: String, //cloudinary url
            required: true

        },
        coverImage:{
            type: String
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            unique: true,
            required: [true, 'Password is reuired']
        },
        refreshToken:{
            type: String
        }
    }, {timestamps : true}
)


userSchema.pre("save", async function (next){
    if(!this.isModified("password"))    return next();

    this.password = await bcrypt.hash(this.password, 10)
    return next()
})


userSchema.methods.isPasswordCorrect = async function (){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessTokens = function () {
    return jwt.sign({
        //payload/data : coming  from db
        _id: this.id,
        email: this.email,
        username: this.userName,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshTokens = function () {
    return jwt.sign({
        //payload/data : coming  from db
        _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}



export const User = mongoose.model("User", userSchema)