import jwt from 'jsonwebtoken';


export const authMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Invalid Header"
        })
    }
    try{
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}