import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, itemId]
 *             properties:
 *               userId: { type: string, example: 67e80ef8d999782e8403a164 }
 *               itemId: { type: string, example: 60d2a3e0d0f1e9374c45b19b }
 *     responses:
 *       200:
 *         description: Item added to cart
 *       401:
 *         description: Unauthorized
 */
router.post('/add', authMiddleware, addToCart);

/**
 * @openapi
 * /api/cart/remove:
 *   post:
 *     summary: Remove an item from the user's cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, itemId]
 *             properties:
 *               userId: { type: string }
 *               itemId: { type: string }
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       401:
 *         description: Unauthorized
 */
router.post('/remove', authMiddleware, removeFromCart);

/**
 * @openapi
 * /api/cart/get:
 *   post:
 *     summary: Get the current contents of the user's cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId]
 *             properties:
 *               userId: { type: string }
 *     responses:
 *       200:
 *         description: Returns the user's cart data
 *       401:
 *         description: Unauthorized
 */
router.post('/get', authMiddleware, getCart);

export default router;
