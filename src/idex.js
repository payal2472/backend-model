import mongoose  from "mongoose";
import {DB_NAME} from "./constants"

import express from "express"
const app= express()

(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
       app.on("error ", ()=>{
        console.log("ERROR", error);
        throw error

       })
       app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.port}`);
       })
        
    } catch (error) {
        console.error("ERROR: ", error )
        throw err
        
    }
})()