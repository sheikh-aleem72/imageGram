import multer from "multer";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file) {
      if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error("Only .jpg, .jpeg, .png and .webp formats are supported."),
          false
        );
      }
    }
  },
});
