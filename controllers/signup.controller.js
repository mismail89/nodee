import { errorhandler } from "../middleware/error.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

const SignUp = async (req,res, next) => {
    const {Name, Email, Password} = req.body;
   
    if (!Email || !Password || !Name ) {
        res.status(500).json({message: "Please Fill all required fields"});
    } else {
        const hashpass =  bcrypt.hashSync(Password, 10);
        const user = new User({Name, Password:hashpass, Email});
        try {
            user.save();
            res.status(201).json({message: "account created successfully"});
        } catch (error) {
            next(error);
        }
    }

}
export default SignUp;