import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCLoudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoutes.js';



//app config 
const app = express();
const port = process.env.PORT || 4000;
connectDb()
connectCLoudinary()

//middlewares
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],  // Allow both frontend and admin frontend origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'atoken'] // Include 'atoken' in allowed headers
}));
  


//api endpoint 
app.use('/api/admin',adminRouter);
app.use('/api/users',userRouter);


app.get('/',(req,res)=>{
    res.send("api working");
});

console.log("Admin Email from .env:", process.env.ADMIN_EMAIL);
console.log("Admin Password from .env:", process.env.ADMIN_PASSWORD);
console.log("JWT Secret:", process.env.JWT_SECRET);



app.listen(port,()=>{
    console.log("server is started",port);
});