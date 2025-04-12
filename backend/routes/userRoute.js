import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Validation error or user exists
 */
router.post("/register", registerUser);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Users]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", authMiddleware, logoutUser);

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Users]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: The current user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/me", authMiddleware, getCurrentUser);

export default router;
