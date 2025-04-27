// import express from 'express';
// import { addDoctor,adminLogin } from '../controllers/adminController.js';
// import {upload} from '../middlewares/multer.js';
// import authAdmin from '../middlewares/authAdmin.js';
// const adminRouter = express.Router();

// adminRouter.post('/addDoctor',authAdmin,addDoctor);
// adminRouter.post('/login',adminLogin);


// export default adminRouter;



// routes/adminRouter.js
import express from 'express';
import { addDoctor, adminLogin, appointmentCancel,appointmentsAdmin, dashboardStatistics, getAllDoctors } from '../controllers/adminController.js';
import { upload } from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

// Add the 'upload.single('image')' middleware before the addDoctor handler
adminRouter.post('/addDoctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.get('/all-doctors',  getAllDoctors);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin); // Add this line to get all appointments
adminRouter.post('/appointment-cancel', authAdmin, appointmentCancel); // Add this line to cancel an appointment
adminRouter.get('/dashboard', authAdmin, dashboardStatistics);
export default adminRouter;
