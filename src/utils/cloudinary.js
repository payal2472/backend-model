import {v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your Cloud Name
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

   const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath)  return null;
        // Upload the file to Cloudinary
        const response= await cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto'
        })
        // Wait for the upload to complete
        //file has been uploaded to cloudinary
       
        fs.unlinkSync(localfilepath); // Delete the local file after upload
        return response; // Return the URL of the uploaded file
    } catch (error) { 
        fs.unlinkSync(localfilepath); // Delete the local file if upload fails
        return null;// Return null if upload fails 
    }
   } 

    // cloudinary.config({ 
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your Cloud Name
    //     api_key: process.env.CLOUDINARY_API_KEY, 
    //     api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    // });

    export { uploadOnCloudinary };// Export the function for use in other files