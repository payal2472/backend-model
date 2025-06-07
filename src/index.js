import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
dotenv.config({

    path: "./env"
});

ConnectDB();



























// import express from "express"
// const app= express()

// (async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
//        app.on("error ", ()=>{
//         console.log("ERROR", error);
//         throw error

//        })
//        app.listen(process.env.PORT, ()=>{
//         console.log(`Server is running on port ${process.env.port}`);
//        })
        
//     } catch (error) {
//         console.error("ERROR: ", error )
//         throw err
        
//     }
// })()