import { jwtTokenKey } from "../config.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        const token = cookies.split('=')[1];
        console.log(token);
        if (!token) {
          return res.status(401).json({ message: "No token found" });
        }
        jwt.verify(String(token), jwtTokenKey, (err, user) => {
          if (err) {
            return res.status(401).json({ message: "Invalid Token" });
          }
          req.id = user._id;
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    next();
    return res.status(200).json({ message: "Completed" });
}

const getUser = async (req, res, next) =>{
    const userId = req.id;
    let user;
    try {
      user = await User.findById(userId, "-password");
    } catch (error) {
      return new Error(error);
    }
  
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user})
  }

// exports.verifyToken = verifyToken;
// exports.getUser = getUser;

export {verifyToken, getUser};
// export default getUser;