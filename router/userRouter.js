import  express  from "express";
import {verifyAdmin ,verifyUser , verifyUserAndAdmin} from "../Utils/verifyToken.js"
import { deleteUser, getAllUsers, getUerById, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/" , verifyAdmin , getAllUsers);
router.get("/:id" , verifyUserAndAdmin , getUerById);
router.delete("/:id" , verifyUser , deleteUser);
router.put("/:id" , verifyUser , updateUser);

export default router