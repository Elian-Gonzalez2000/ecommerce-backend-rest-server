const express = require("express");
const { upload, createPage } = require("../../common-middleware/index.js");
const router = express.Router();

router.post(
   "/page/create",
   upload.fields([
      ({ name: "banners", maxCount: 5 }, { name: "products", maxCount: 5 }),
   ]),
   createPage
);

module.exports = router;
