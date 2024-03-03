const express = require("express");
const { addPro, getProjects, addTool, delPro } = require("../Controllers/ProjectController");
const multer = require("multer");
const authMiddleware = require("../Middlewares/AuthMid");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, 'public/')
    },
    filename: function(req, file, cb) {
        return (cb(null, `${Date.now()}_${file.originalname}`))
    }
});
const upload = multer({ storage })
const router = express.Router();

router.post("/", authMiddleware, upload.single('Image'), addPro);

router.put("/", authMiddleware, upload.single('ImageTol'), addTool);
router.get("/", getProjects);

router.delete("/:id", authMiddleware, delPro);
module.exports = router;