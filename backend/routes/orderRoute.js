import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

/**
 * @openapi
 * /api/orders/place:
 *   post:
 *     summary: Place a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *               - amount
 *               - address
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 67e80ef8d999782e8403a164
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *               amount:
 *                 type: number
 *                 example: 29.97
 *               address:
 *                 type: object
 *                 example:
 *                   street: "123 Elm St"
 *                   city: "Townsville"
 *                   zipcode: "12345"
 *                   country: "Country"
 *     responses:
 *       200:
 *         description: Order placed successfully, returns Stripe session URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 session_url:
 *                   type: string
 *       500:
 *         description: Server error
 */
orderRouter.post("/place", authMiddleware, placeOrder);

/**
 * @openapi
 * /api/orders/verify:
 *   post:
 *     summary: Verify payment for an order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - success
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 60d2a3e0d0f1e9374c45b19b
 *               success:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 example: "true"
 *     responses:
 *       200:
 *         description: Payment verified or order cancelled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
orderRouter.post("/verify", verifyOrder);

/**
 * @openapi
 * /api/orders/userorders:
 *   post:
 *     summary: Get all orders for a user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 67e80ef8d999782e8403a164
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized or invalid token
 *       500:
 *         description: Server error
 */
orderRouter.post("/userorders", authMiddleware, userOrders);

/**
 * @openapi
 * /api/orders/list:
 *   get:
 *     summary: List all orders (admin)
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
orderRouter.get("/list", listOrders);

/**
 * @openapi
 * /api/orders/status:
 *   post:
 *     summary: Update the status of an order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 60d2a3e0d0f1e9374c45b19b
 *               status:
 *                 type: string
 *                 example: Delivered
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
orderRouter.post("/status", updateStatus);

export default orderRouter;
