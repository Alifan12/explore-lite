import express from "express";
import {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/categories', verifyUser, getCategory);
router.get('/categories/:id', verifyUser, getCategoryById);
router.post('/categories', verifyUser, createCategory);
router.patch('/categories/:id', verifyUser, updateCategory);
router.delete('/categories/:id', verifyUser, deleteCategory);

export default router;