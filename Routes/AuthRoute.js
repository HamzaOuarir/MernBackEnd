const express = require("express");
const { Login, getUser } = require("../Controllers/UserCont");
const authMiddleware = require("../Middlewares/AuthMid");
const userRouter = express.Router();

userRouter.post('/login', Login)
userRouter.get('/user', authMiddleware, getUser)

module.exports = userRouter;