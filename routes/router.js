import express  from "express";
import SignUp from "../controllers/signup.controller.js";
import SignIn from "../controllers/signin.controller.js";
import Google from "../controllers/google.controller.js";
import Reviewuser from "../controllers/review.controller.js";
import totalreviews from "../controllers/reviewget.controller.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/google", Google);
router.post("/review", Reviewuser);
router.post("/getreviews", totalreviews);
export default router;