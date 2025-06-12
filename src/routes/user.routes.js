//  import { Router } from 'express';
//  import { registerUser } from '../controllers/user.controller.js'; 

//  const router = Router();

//  Router.route('/register')
//      .post(registerUser);
 
//  export default Router;

// routes/user.routes.js
import { Router } from 'express';
import { registerUser } from '../controllers/user.controllers.js';

const router = Router(); // create router instance

router.route('/register') //  define the route
    .post(registerUser);  // bind controller

export default router;    // export the instance

