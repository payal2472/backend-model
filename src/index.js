import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import {app} from "./app.js";


dotenv.config({
    path: "./.env", // Corrected path
});

// const app = express(); // Initialize express

ConnectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT }`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to the database:", error);
    });

  



























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