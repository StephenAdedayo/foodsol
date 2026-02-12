/**
 * @swagger
 * tags:
 *   name: User
 *   description:  Get user data and update User profile
 */

/**
 * @swagger
 * /api/v1/user/user-data:
 *   get:
 *     summary: Get user data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data fetched successfully
 *         content:
 *           application/json:
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/v1/user/update-profile:
 *   post:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []       # 🔹 THIS ADDS TOKEN HEADER
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               phoneNumber:
 *                 type: number
 *                 example: 08012345678
 *               name:
 *                 type: string
 *                 example: John doe
 *               address:
 *                 type: object
 *                 example: {
 *                    "city" : "ibadan",
 *                    "street" : "johndoe street"
 *                  }
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

