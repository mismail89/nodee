import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/router.js';
import cors from 'cors'
dotenv.config()
mongoose.connect(process.env.url).then(() =>{ console.log("conected")})
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api', router)
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello');
})
app.listen(port, () =>{
    console.log("listening on port " + port);
})

app.use((err, req, res) => {
    const statuscode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statuscode).json({
        success: false,
        message,
        statuscode
    })
})