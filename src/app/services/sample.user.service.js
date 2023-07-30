import ErrorResponse from '../../utils/errorResponse';

// Mock data for the example
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
];

export default class UserService {
    async getAllUsers() {
        try {
            // Simulate an asynchronous database query
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(users);
                }, 200);
            });
        } catch (error) {
            throw new ErrorResponse('Internal Server Error', 500);
        }
    }

    async createUser({ name, email, age }) {
        try {
            // Simulate an asynchronous database query to create a user
            return new Promise((resolve) => {
                setTimeout(() => {
                    const newUser = { id: users.length + 1, name, email, age };
                    users.push(newUser);
                    resolve(newUser);
                }, 200);
            });
        } catch (error) {
            throw new ErrorResponse('Internal Server Error', 500);
        }
    }

    async getUserById(userId) {
        try {
            // Simulate an asynchronous database query to get a user by ID
            return new Promise((resolve) => {
                setTimeout(() => {
                    const user = users.find((u) => u.id === parseInt(userId));
                    resolve(user);
                }, 200);
            });
        } catch (error) {
            throw new ErrorResponse('Internal Server Error', 500);
        }
    }

    async updateUser(userId, { name, email, age }) {
        try {
            // Simulate an asynchronous database query to update a user
            return new Promise((resolve) => {
                setTimeout(() => {
                    const userIndex = users.findIndex((u) => u.id === parseInt(userId));
                    if (userIndex !== -1) {
                        users[userIndex].name = name;
                        users[userIndex].email = email;
                        users[userIndex].age = age;
                        resolve(users[userIndex]);
                    } else {
                        resolve(null);
                    }
                }, 200);
            });
        } catch (error) {
            throw new ErrorResponse('Internal Server Error', 500);
        }
    }

    async deleteUser(userId) {
        try {
            // Simulate an asynchronous database query to delete a user
            return new Promise((resolve) => {
                setTimeout(() => {
                    const userIndex = users.findIndex((u) => u.id === parseInt(userId));
                    if (userIndex !== -1) {
                        const deletedUser = users.splice(userIndex, 1);
                        resolve(deletedUser[0]);
                    } else {
                        resolve(null);
                    }
                }, 200);
            });
        } catch (error) {
            throw new ErrorResponse('Internal Server Error', 500);
        }
    }
}
