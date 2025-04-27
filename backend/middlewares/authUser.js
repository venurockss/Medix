import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ success: false, message: "Invalid Authentication Header. Ensure the Authorization header is set and formatted as 'Bearer <token>'." });
        }

        const token = authHeader.split(' ')[1];
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decodeToken.id;

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default authUser;


