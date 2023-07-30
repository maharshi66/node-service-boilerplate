import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/sample.user.controller';
import { validateUser } from '../validations/sample.user.validations';
import authMiddleware from '../middleware/sample.auth';

const router = express.Router();

// Route: /users
router.get('/', authMiddleware, getAllUsers);
router.post('/', validateUser, authMiddleware, createUser);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', validateUser, authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;