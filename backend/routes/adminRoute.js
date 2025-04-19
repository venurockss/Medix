import express from 'express';
import { addDoctor,adminLogin } from '../controllers/adminController.js';
import {upload} from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
const adminRouter = express.Router();

adminRouter.post('/addDoctor',authAdmin,addDoctor);
adminRouter.post('/login',adminLogin);


export default adminRouter;

