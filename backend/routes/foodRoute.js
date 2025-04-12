import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

/**
 * @openapi
 * /api/foods/add:
 *   post:
 *     summary: Add a new food item
 *     tags:
 *       - Foods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food added successfully
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
 *                   example: Food Added
 *       500:
 *         description: Server error
 */
foodRouter.post("/add", addFood); // Updated: No image upload needed

/**
 * @openapi
 * /api/foods/list:
 *   get:
 *     summary: List all food items
 *     tags:
 *       - Foods
 *     responses:
 *       200:
 *         description: A list of food items
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
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *                       image:
 *                         type: string
 *       500:
 *         description: Server error
 */
foodRouter.get("/list", listFood);

/**
 * @openapi
 * /api/foods/remove:
 *   post:
 *     summary: Remove a food item by ID
 *     tags:
 *       - Foods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the food item to delete
 *     responses:
 *       200:
 *         description: Food removed successfully
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
 *                   example: Food Removed
 *       500:
 *         description: Server error
 */
foodRouter.post("/remove", removeFood);

export default foodRouter;
