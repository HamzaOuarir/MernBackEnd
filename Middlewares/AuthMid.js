// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    const token = await req.headers.authorization.split(' ')[1];
    console.log(token)
    try { // Extract the JWT token from the request headers

        const decoded = jwt.verify(token, "qwertyuioplkjhgfdsazxcvbnmklpii");
        // Attach the decoded user information to the request object

        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
module.exports = authMiddleware;