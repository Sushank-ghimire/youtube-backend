import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./Public/temp");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); // Corrected here
  },
});

export const upload = multer({
  storage,
});
