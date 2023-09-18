import multer from "multer";
import { v1 as uuidV1 } from "uuid";

const uplaodMiddleware = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, './public/imgsUploads/')
        },
        filename: (_req, file, cb) => {
            cb(null, Date.now().toString()+ + uuidV1() + "_" + file.originalname)
        }
    }),
    fileFilter: (_req, file, cb) => {
        const acepptImgs = ["image/png", "image/jpg", "image/jpeg", "image/gif"].find(formt => formt == file.mimetype);
        if (acepptImgs) {
            return cb(null, true);
        }
        return cb(null, false);
    }
});


export default uplaodMiddleware;