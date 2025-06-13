//  import { Router } from 'express';
//  import { registerUser } from '../controllers/user.controller.js'; 

//  const router = Router();

//  Router.route('/register')
//      .post(registerUser);
 
//  export default Router;

// routes/user.routes.js
import { Router } from 'express';
import { registerUser } from '../controllers/user.controllers.js';
import {upload} from '../middlewares/multer.middlewares.js'; // import multer middleware if needed

const router = Router(); // create router instance

router.route('/register').post(
        upload.fields([
            {
                name: 'avatar', // field name for avatar
                maxCount: 1 // limit to one file for avatar
            },
            {
                name: 'coverImage', // field name for images
                maxCount: 1 // limit to five files for images
            },
            {}
        ]), // use multer middleware for file uploads
        registerUser);  // bind controller

export default router;    // export the instance

