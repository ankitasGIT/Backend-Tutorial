// We are trying to upload a file from our local server to cloudinary 

import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//1 get file path from local storage
const uploadOnCloudinary = async function(localfilePath){
    try {
        if(!localfilePath)
        {
            return null
        }

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto"
        })

        //file uploaded sucessfully
        // console.log(response);
        // console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localfilePath);
        return response;
    } catch (error) {
        fs.unlinkSnyc(localfilePath) //Remove the locally saved file as the upload got failed
        return null;
    }
}


export {uploadOnCloudinary}

