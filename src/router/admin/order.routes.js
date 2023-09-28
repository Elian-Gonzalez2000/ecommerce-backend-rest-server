const express = require("express");
const {
   requiresSignin,
   adminMiddleware,
} = require("../../common-middleware/index.js");
const { updateOrder } = require("../../controller/admin/order.admin.js");
const router = express.Router();

router.post(`/order/update`, requiresSignin, adminMiddleware, updateOrder);

module.exports = router;
