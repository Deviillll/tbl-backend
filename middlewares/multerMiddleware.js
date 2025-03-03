import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    let trimFileName = file.originalname.trim().replace(/\s+/g, '');
    
    cb(null, `${Date.now()}-${trimFileName}`);
  },
});

// Init upload
const upload = multer({
  storage: storage,
}).single("file");


export default upload;
