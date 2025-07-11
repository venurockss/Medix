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
const allowedOrigins = [
    'http://localhost:5173',             // Frontend local
    'http://localhost:5174',             // Admin local
    'https://medix-9ox1.vercel.app',  // Frontend deployed      // Admin deployed
  ];

//middlewares
app.use(express.json())
  
  // app.use(cors({
  //   origin: allowedOrigins,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization', 'atoken'],
  //   credentials: true
  // }));

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'atoken'],
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