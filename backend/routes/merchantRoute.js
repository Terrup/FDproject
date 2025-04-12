import express from 'express';
import { registerMerchant, loginMerchant, getMerchantProfile } from '../controllers/merchantController.js';

const router = express.Router();

/**
 * @openapi
 * /api/merchants/register:
 *   post:
 *     summary: Create merchant profile (no token required for this registration)
 *     tags: [Merchants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - businessEmail
 *               - phone
 *               - address
 *               - registrationNumber
 *               - password
 *             properties:
 *               businessName:       { type: string, example: Acme Foods }
 *               businessEmail:      { type: string, format: email, example: merchant@acme.com }
 *               phone:              { type: string, example: "+1-555-1234" }
 *               address:            { type: string, example: "123 Market St" }
 *               registrationNumber: { type: string, example: "REG-2025-0001" }
 *               password:           { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Merchant profile created/updated
 *       403:
 *         description: Unauthorized (only existing users can become merchants)
 */
router.post('/register', registerMerchant);

/**
 * @openapi
 * /api/merchants/login:
 *   post:
 *     summary: Login as a merchant using email and password
 *     tags: [Merchants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessEmail
 *               - password
 *             properties:
 *               businessEmail: { type: string, example: "merchant@acme.com" }
 *               password:      { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', loginMerchant);

/**
 * @openapi
 * /api/merchants/profile:
 *   get:
 *     summary: Retrieve the authenticated merchant's profile
 *     tags: [Merchants]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Merchant profile data
 *       404:
 *         description: Profile not found
 */
router.get('/profile', getMerchantProfile);

export default router;
