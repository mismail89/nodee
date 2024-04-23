import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';

const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.secret_key);
            const expiresdate = new Date(Date.now() + 7200000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiresdate }).status(200).json(user);
        } else {
            const generated = Math.random().toString(36).slice(-8);
            const hashpass = bcrypt.hashSync(generated, 10)
            const newuser = new User({ Name: req.body.Name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(), Email: req.body.Email, Password: hashpass, Profilepic: req.body.Photo });
            await newuser.save();
            const token = jwt.sign({ id: newuser._id }, process.env.secret_key);
            const expiresdate = new Date(Date.now() + 7200000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiresdate }).status(200).json(newuser);
        }
    } catch (error) {
        next(error);
    }
}

export default google;
