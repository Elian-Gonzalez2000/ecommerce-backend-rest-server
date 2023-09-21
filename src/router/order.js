const {
   requiresSignin,
   userMiddleware,
} = require("../common-middleware/index.js");
const { addOrder, getOrders } = require("../controller/order.js");
const router = require("express").Router();

router.post("/add-order", requiresSignin, userMiddleware, addOrder);
router.get("/get-orders", requiresSignin, userMiddleware, getOrders);

module.exports = router;
