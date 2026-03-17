'use strict';

const jwt = require('jsonwebtoken');

// Middleware for verifying JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
}

// Middleware for checking user role
function checkRole(role) {
    return (req, res, next) => {
        if (req.userId) {
            // Logic to check if the user has the right role
            // This could be a database call or in-memory check based on decoded user info
            const userRole = req.user.role; // Assuming user info is stored in req.user
            if (userRole && userRole === role) {
                next();
            } else {
                return res.status(403).send({ message: 'Access denied!' });
            }
        } else {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
    };
}

module.exports = { verifyToken, checkRole };