const express = require("express");
const { addSkill, getSkills, delSK } = require("../Controllers/SkillCOntroller");
const router = express.Router();
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

router.post("/", authMiddleware, upload.single('ImageS'), addSkill);
router.get("/", getSkills);
router.delete("/:id", authMiddleware, delSK);
module.exports = router;