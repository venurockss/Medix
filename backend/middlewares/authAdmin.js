import jwt from 'jsonwebtoken';
const authAdmin = (req, res, next) => {
    try {
        const {atoken} = req.headers; // Log the token for debugging
        if(!atoken) return res.status(400).json({success:false,message:"Invalid Authentication"});
        const decodeToken = jwt.verify(atoken, process.env.JWT_SECRET);
        if (decodeToken.id !== process.env.ADMIN_ID) { 
            return res.status(400).json({ success: false, message: "Invalid Authentication" });
        }
       
        next();
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}
export default authAdmin;