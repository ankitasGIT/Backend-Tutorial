import {asnycHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const resgisterUser = asnycHandler (async (req, res) => {
    //1. get user details from frontend
    //2. validation on all fields - not empty
    //3. check if user already exists: username, email
    //4 check for images, check for avatar
    //5. upload them to cloudinary, check avatar
    //6. create userObject - create entry in db
    //7.8 SEND USER AFTER ENTRY - remove password and refresh token feild from response
    // If check for user creation
    //9. return res, else error

    //1.
    const {fullname, email, username, password} = req.body
    console.log(email); 


    //2. For all feilds: 
    // if(fullname === "")
    // {
    //     throw new ApiError(400, "Fullname is required")
    // }

    //Another way
    if([fullname, email, username, password].some((feild) =>
    feild?.trim() === ""))
    {
        throw new ApiError(400, "All feilds are required!" )
    }


    //3. will ask database to check the passed email for me
    const existingUser = User.findOne({

        $or: [{email}, {username}]
    })
    if(existingUser)
    {
        throw new ApiError(409, "User already exists", )
    }

    //4-> Get files from multer
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files.coverImage[0].path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")       
    }


    //5-> Upload on cloudinary this function is already made
    
    //This make take time wait and dont go further until not complete
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    //6. Check avatar again
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")       
    }


    //7.Make entry in db --> User is only talking with db
    const user = await User.create(
        {
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",// check fro saftey check if not uploaded
            email,
            password,
            username: username.toLowerCase()
        }
    )

    //8 Check for user --> Can use if() OR findById()
    //Mongodb adds _id feild check by that
    // const createdUser = await User.findById(user._id) -> For checking user

    //remove some feilds
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
        //Kya kya nahi chahiye be default sab ate hai i.e thats why - sign
    )

    if(!createdUser)
    {
        throw new ApiError(500, "Something went wrong while registering a user")
    }

    //9.Return response

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})   

export {
    resgisterUser
}