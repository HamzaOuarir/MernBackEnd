const express = require("express");
const { addDep, getDeps, delDep } = require("../Controllers/CertDepController");
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

router.post("/", authMiddleware, upload.single('imgDep'), addDep);
router.get("/", getDeps);

router.delete("/:id", authMiddleware, delDep);
module.exports = router;