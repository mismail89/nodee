import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { errorhandler } from '../middleware/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const SignIn = async(req,res, next) => {
    const { Email, Password } = req.body;
    try {
        const valideuser = await User.findOne({ Email })
        if(!valideuser) return next(errorhandler(404, "user not found"));
        const validepassword = bcrypt.compareSync(Password, valideuser.Password)
        if(!validepassword) return next(errorhandler(401, "wrong password"));
        const token = jwt.sign({id:valideuser._id}, process.env.secret_key);
        const validuser = valideuser.toObject()
        delete validuser.Password
        const expiresdate = new Date(Date.now() + 60);
        res.cookie( 'access_token', token, {httpOnly: true, expires: expiresdate }).status( 200 ).json(validuser);
    } catch (error) {
        next(error);
    }
}
export default SignIn;