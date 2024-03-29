const express = require("express");
const {
   requiresSignin,
   adminMiddleware,
} = require("../common-middleware/index.js");
const {
   addCategory,
   getCategories,
   updateCategory,
   deleteCategories,
} = require("../controller/category.js");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
   },
   filename: function (req, file, cb) {
      cb(null, `${shortid.generate()}-${file.originalname}`);
   },
});

const upload = multer({ storage });

router.post(
   "/category/create",
   requiresSignin,
   adminMiddleware,
   upload.single("categoryImage"),
   addCategory
);
router.get("/category/getcategory", getCategories);
router.post("/category/update", upload.array("categoryImage"), updateCategory);
router.post("/category/delete", deleteCategories);

module.exports = router;
