import { Router } from "express";
import { postImage } from "../controllers/uploadImage";
const router = Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post("/upload-avatar", upload.single('avatar'),postImage);

export default router;