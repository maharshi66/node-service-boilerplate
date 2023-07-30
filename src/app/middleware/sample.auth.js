const authMiddleware = (req, res, next) => {
    //*Implement authentication logic here for eg. JWT Token
    const isAuthenticated = true;

    if (!isAuthenticated) {
        // If authentication fails, throw an error to mimic failure
        return next(new Error("Authentication failed"));
    }

    // If authentication passes, proceed to the next middleware/route handler
    next();
};

export default authMiddleware;
