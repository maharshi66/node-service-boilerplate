import UserService from '../services/sample.user.service';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/helper';

const userService = new UserService();

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return sendSuccessResponse(res, users, 'Successfully fetched users');
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    const { name, email, age } = req.body;
    try {
        const newUser = await userService.createUser({ name, email, age });
        return sendSuccessResponse(res, newUser, 'User created successfully');
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return sendErrorResponse(res, null, 'User not found', 404);
        }
        return sendSuccessResponse(res, user, 'Successfully fetched user');
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, age } = req.body;
    try {
        const updatedUser = await userService.updateUser(userId, { name, email, age });
        if (!updatedUser) {
            return sendErrorResponse(res, null, 'User not found', 404);
        }
        return sendSuccessResponse(res, updatedUser, 'User updated successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            return sendErrorResponse(res, null, 'User not found', 404);
        }
        return sendSuccessResponse(res, null, 'User deleted successfully');
    } catch (error) {
        next(error);
    }
};
