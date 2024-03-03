const express = require("express");

const authMiddleware = require("../Middlewares/AuthMid");
const { addWX, getWXS, delWX } = require("../Controllers/WorkExpController");
const router = express.Router();
const multer = require("multer")
const upload = multer();
router.post("/", authMiddleware, upload.none(), addWX);
router.get("/", getWXS);
router.delete("/:id", authMiddleware, delWX);
module.exports = router;