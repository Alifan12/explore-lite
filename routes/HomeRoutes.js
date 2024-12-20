import express from "express";
import { 
    getHome, 
    // getUsersById, 
    createHome,
    // updateUser,
    // deleteUser
} from "../controllers/HomeController.js";

// Membuat route
const router = express.Router();

router.get('/home', getHome);
// router.get('/users/:id', getUsersById);
router.post('/home', createHome);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;